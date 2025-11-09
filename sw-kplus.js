const CACHE = 'kplus-cache-v1';
const ASSETS = [
  './',
  'services.html',
  'sw-kplus.js',
  'index.html',
  'about.html',
  'contact.html',
  // images used (external images will be cached on first visit)
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', ev => {
  ev.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', ev => {
  // network-first for wa.me links and API calls? We'll do cache-first for static.
  const req = ev.request;
  const url = new URL(req.url);

  // For navigation, try cache first then network
  if(req.mode === 'navigate'){
    ev.respondWith(
      fetch(req).catch(_ => caches.match('services.html'))
    );
    return;
  }

  ev.respondWith(
    caches.match(req).then(match => {
      return match || fetch(req).then(res => {
        // optionally cache fetched external images
        return res;
      }).catch(()=> match);
    })
  );
});
