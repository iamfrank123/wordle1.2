const CACHE_NAME = 'wordle-cache-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './solo.js',
  './duello.html',
  './duello.js',
  './maratona.html',
  './maratona.js',
  './immagini/splash.png',
  './audio/audio_win.mp3',
  './audio/audio_turn.mp3',
  './audio/tick.mp3',
  './audio/myturn.mp3'
];

self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE).catch(() => {
          // Silently ignore cache errors during installation
          console.log('Some assets failed to cache, continuing anyway');
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  // Clean up old caches and take control immediately
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients
      return self.clients.claim();
    })
  );
});

// Don't intercept fetch requests at all - let everything go directly to the network
// This prevents ALL "Failed to fetch" errors with Socket.IO and dynamic requests
self.addEventListener('fetch', (event) => {
  // Do nothing - let requests pass through normally
});
