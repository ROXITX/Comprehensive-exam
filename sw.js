// App shell: stale-while-revalidate. Question data: network-first so new questions arrive, cache for offline.
const CACHE = 'cq-v3';
const SHELL = ['./', 'index.html', 'styles.css', 'app.js', 'sync.js', 'firebase-config.js', 'manifest.webmanifest', 'assets/icon.svg', 'assets/icon-192.png', 'assets/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(SHELL);
    try {
      const res = await fetch('data/index.json', { cache: 'no-cache' });
      await c.put('data/index.json', res.clone());
      const idx = await res.json();
      await c.addAll(idx.subjects.map((s) => `data/${s.id}.json`));
    } catch { /* data gets cached on first use */ }
    self.skipWaiting();
  })());
});
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (url.pathname.includes('/data/')) e.respondWith(networkFirst(req));
    else e.respondWith(staleWhileRevalidate(req.mode === 'navigate' ? 'index.html' : req));
  } else if (url.hostname === 'www.gstatic.com') {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { caches.open(CACHE).then((c) => c.put(req, res.clone())); return res; })));
  }
});
async function networkFirst(req) {
  const c = await caches.open(CACHE);
  try {
    const res = await fetch(req, { cache: 'no-cache' });
    if (res.ok) c.put(req, res.clone());
    return res;
  } catch {
    return (await c.match(req, { ignoreSearch: true })) || Response.error();
  }
}
async function staleWhileRevalidate(req) {
  const c = await caches.open(CACHE);
  const hit = await c.match(req, { ignoreSearch: true });
  const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
  return hit || net;
}
