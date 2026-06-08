/**
 * Shared <head> assets (favicon, PWA manifest, etc.).
 * Include in <head> on every page: <script src="head-includes.js"></script>
 */
(function () {
  const FAVICON_VERSION = '20260608';
  const base = '/images/favicon/';

  const links = [
    { rel: 'icon', type: 'image/png', href: `${base}favicon-96x96.png?v=${FAVICON_VERSION}`, sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg?v=${FAVICON_VERSION}` },
    { rel: 'shortcut icon', href: `${base}favicon.ico?v=${FAVICON_VERSION}` },
    { rel: 'apple-touch-icon', sizes: '180x180', href: `${base}apple-touch-icon.png?v=${FAVICON_VERSION}` },
    { rel: 'manifest', href: `${base}site.webmanifest?v=${FAVICON_VERSION}` },
  ];

  links.forEach((attrs) => {
    const link = document.createElement('link');
    Object.entries(attrs).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
  });

  const meta = document.createElement('meta');
  meta.name = 'apple-mobile-web-app-title';
  meta.content = 'Sam Thompson';
  document.head.appendChild(meta);
})();
