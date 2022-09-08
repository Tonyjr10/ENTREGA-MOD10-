'use strict';

const CACHE_NAME = 'static-cache-v9';

const FILES_TO_CACHE = [

    '/offline.html',
    '/index.html',
    '/assets/bueno_muerto.png',
    '/assets/bueno.png',
    '/assets/clases.png',
    '/assets/dados.png',
    '/assets/game_over.png',
    '/assets/homer.png',
    '/assets/jefe_muerto.png',
    '/assets/jefe.png',
    '/assets/malo_muerto.png',
    '/assets/malo.png',
    '/assets/screenshot.png',
    '/assets/shot1.png',
    '/assets/shot2.png',
    '/assets/yoshi.png',
    '/assets/you_win.png',
    '/install.js'
];

self.addEventListener('install', (ev) => {
    console.log('[ServiceWorker] Install');

    ev.waitUntil(
         caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);

        })


    );
    self.skipWaiting();
});

self.addEventListener('activate', (ev) => {
    console.log('[ServiceWorker] Activate');

    ev.waitUntil(
         caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME){
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));

        })


    );
    self.clients.claim();
});

self.addEventListener('fetch', (ev) => {
    console.log('[ServiceWorker] Fetch', ev.request.url);
    ev.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(ev.request).then((response) => {
                console.log("RESP", response);
                return response || fetch(ev.request);
            });
        })
    );
  
});

