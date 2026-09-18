/* InterviewLoop service worker
   - 预缓存应用外壳 + 协议 + 分类库 + 模板，断网可用
   - 只拦截同源 GET，网络优先、断网回退缓存；用户主动触发的模型 / 语音 API 请求（跨域）一律不经过本 worker
   - 除预缓存外不发起任何网络请求 */
const VERSION = 'il-v1.0.2';
const SHELL = [
  './', './index.html', './app.js', './style.css', './manifest.webmanifest',
  './icon.svg', './icon-192.png', './icon-512.png',
  '../PROTOCOL.md', '../PROTOCOL.en.md', '../GLOSSARY.md',
  '../taxonomy/cn/interviewer-types.md', '../taxonomy/cn/skeletons.md', '../taxonomy/cn/signals.md',
  '../taxonomy/cn/pitfalls.md', '../taxonomy/cn/stages.md',
  '../taxonomy/en/interviewer-types.md', '../taxonomy/en/skeletons.md', '../taxonomy/en/signals.md',
  '../taxonomy/en/pitfalls.md', '../taxonomy/en/stages.md',
  '../templates/zh/handbook.md', '../templates/zh/post-interview-notes.md',
  '../templates/en/handbook.md', '../templates/en/post-interview-notes.md'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then(async (c) => {
      // 逐个加，单个缺失（如 png 未生成）不阻塞安装
      await Promise.all(SHELL.map((u) => c.add(u).catch(() => null)));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 跨域（模型 API 等）不拦截、不缓存
  // 网络优先：有网就拿最新（部署更新即时生效），断网回退缓存
  e.respondWith(
    fetch(req).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || new Response('offline', { status: 503 })))
  );
});
