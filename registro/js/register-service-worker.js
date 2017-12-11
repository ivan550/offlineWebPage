if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/registro/service-worker.js').then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (e) {
        console.error(e, 'service worker registration failed');
    });
}
