const CACHE_NAME = 'student-party-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/policy.html',
  '/idea-board.html',
  '/impact-dashboard.html',
  '/speed-game.html',
  '/gesture-workshop.html',
  '/style.css',
  '/script.js',
  '/chatbot.js',
  '/assets/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
