var CACHE_NAME = 'registro-v1';

var resourcesToCache = [
    '/registro',
    'list.html',
    'index.html',
    'img/off.gif',
    'css/stylesheet.css',
    'css//bootstrap.min.css',
    'js/pouchdb-6.3.4.min.js',
    'js/register-service-worker.js',
    'js/store.js'
];

self.addEventListener('install', function (event) {
    console.info('installing service worker');

    event.waitUntil(
            caches.open(CACHE_NAME)
            .then(function (cache) {
                console.info('cache opened');

                return cache.addAll(resourcesToCache);
            })
            );
});

self.addEventListener('activate', function (event) {
    console.info('service worker activated');
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
            caches.match(event.request)
            .then(function (response) {
                console.log('request:', event.request);

                if (response) {
                    console.info('cache hit');
                    return response;
                }

                console.info('fetching');
                return fetch(event.request);
            })
            );
});
function showImage() {
    var img = document.createElement("img");
    img.src = "img/off.gif";
    document.body.appendChild(img);
}