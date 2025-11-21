// ========================================
// 🗡️ ROUBLARD - SERVICE WORKER
// ========================================

const CACHE_NAME = 'roublard-v1';
const urlsToCache = [
  './',
  './index.html',
  './app-complet.js',
  './manifest.json'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Cache ouvert');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Certains fichiers ne peuvent pas être cachés (c\'est ok):', err);
          return cache.add('./index.html');
        });
      })
  );
  self.skipWaiting();
});

// Activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Stratégie Cache First
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner depuis le cache si disponible
        if (response) {
          return response;
        }

        // Sinon faire une requête réseau
        return fetch(event.request).then(response => {
          // Ne pas cacher les réponses non-200
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cloner et cacher la réponse
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(err => {
        console.log('Fetch failed:', err);
        // Retourner une page offline si disponible
        return caches.match('./index.html');
      })
  );
});

console.log('✅ Service Worker enregistré');