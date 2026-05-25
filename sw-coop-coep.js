/*
 * 跨域隔离 Service Worker
 *
 * 问题原因：FFmpeg WASM 依赖 SharedArrayBuffer，而 SharedArrayBuffer 需要
 * Cross-Origin-Opener-Policy: same-origin 和 Cross-Origin-Embedder-Policy: require-corp
 * 这两个 HTTP 响应头才能在浏览器中启用。
 *
 * GitHub Pages 默认不提供这两个响应头，导致 FFmpeg WASM 无法正常工作，
 * 表现为音频提取卡在 0% 进度。
 *
 * 本 Service Worker 拦截所有请求，为响应添加必要的 COOP/COEP 头。
 * 同时处理跨域资源的 credentialless 模式，避免外部 CDN 资源加载失败。
 */

const HEADERS_TO_ADD = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'credentialless',
};

// 需要添加 crossorigin 属性的 CDN 域名
const CDN_DOMAINS = [
  'unpkg.com',
  'cdn.jsdelivr.net',
  'cdn.jsdelivr.net',
];

self.addEventListener('install', (event) => {
  console.log('[COOP/COEP SW] 安装中...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[COOP/COEP SW] 已激活');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 跳过 chrome-extension 等非 http(s) 请求
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
  try {
    const response = await fetch(request);

    // 克隆响应以便修改头
    const newHeaders = new Headers(response.headers);

    // 添加 COOP/COEP 头
    for (const [key, value] of Object.entries(HEADERS_TO_ADD)) {
      newHeaders.set(key, value);
    }

    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });

    return newResponse;
  } catch (error) {
    console.error('[COOP/COEP SW] 请求失败:', error);
    return new Response('Network error', { status: 500 });
  }
}
