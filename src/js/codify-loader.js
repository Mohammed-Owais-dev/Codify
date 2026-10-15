/* Codify simple loader – shows on page load, fades out when the page is ready */
(function () {
    'use strict';

    var root = document.documentElement;
    var LOGO_SRC = '/src/assets/logos/main-logo.svg';
    var MIN_SHOW = 600;   // ms
    var MAX_WAIT = 5000;  // ms

    var loader = document.createElement('div');
    loader.id = 'codify-loader';
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-label', 'Loading');
    loader.innerHTML =
        '<div class="cl-ring">' +
          '<img class="cl-logo" src="' + LOGO_SRC + '" alt="">' +
          '<span class="cl-glyph" aria-hidden="true">&lt;/&gt;</span>' +
        '</div>';
    loader.querySelector('.cl-logo').addEventListener('error', function () {
        loader.classList.add('cl-nologo');
    });

    document.body.appendChild(loader);
    root.classList.add('cl-loading', 'cl-ready');

    var pageLoaded = new Promise(function (res) {
        if (document.readyState === 'complete') res();
        else window.addEventListener('load', res, { once: true });
    });

    var navbarReady = new Promise(function (res) {
        var ph = document.getElementById('navbar-placeholder');
        if (!ph || ph.childElementCount) return res();
        var iv = setInterval(function () {
            if (ph.childElementCount) { clearInterval(iv); res(); }
        }, 50);
        setTimeout(function () { clearInterval(iv); res(); }, 3000);
    });

    var minTime = new Promise(function (res) { setTimeout(res, MIN_SHOW); });
    var timeout = new Promise(function (res) { setTimeout(res, MAX_WAIT); });

    Promise.race([Promise.all([pageLoaded, navbarReady, minTime]), timeout]).then(function () {
        loader.classList.add('cl-out');
        root.classList.remove('cl-loading');
        setTimeout(function () { loader.remove(); }, 600);
    });

    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) return;
        var l = document.getElementById('codify-loader');
        if (l) l.remove();
        root.classList.remove('cl-loading');
    });
})();
