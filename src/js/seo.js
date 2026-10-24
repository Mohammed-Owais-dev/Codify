// Keeps SEO tags correct on pages whose content is loaded by JavaScript
// (course, lesson and quick-notes pages share one template per page type).
(function () {
  var SITE = 'https://learn-codify.vercel.app';
  var head = document.head;
  var NAMES = { c: 'C', cpp: 'C++', css: 'CSS', html: 'HTML', java: 'Java', javascript: 'JavaScript', python: 'Python' };

  function meta(attr, name) {
    var el = head.querySelector('meta[' + attr + '="' + name + '"]');
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); head.appendChild(el); }
    return el;
  }
  function path() {
    var p = location.pathname.replace(/\/index\.html$/, '/').replace(/(.)\/+$/, '$1');
    return p || '/';
  }
  function breadcrumbs() {
    var parts = path().split('/').filter(Boolean), items = [{ name: 'Home', url: SITE + '/' }];
    var root = parts[0];
    if (root !== 'courses' && root !== 'quick-notes') return null;
    items.push({ name: root === 'courses' ? 'Courses' : 'Quick Notes', url: SITE + '/' + root });
    if (parts[1]) items.push({ name: (NAMES[parts[1]] || parts[1]) + (root === 'courses' ? ' Course' : ' Quick Notes'), url: SITE + '/' + root + '/' + parts[1] });
    if (parts[2] && parts[2] !== 'enroll') items.push({ name: document.title.replace(/\s*\|.*$/, ''), url: SITE + path() });
    return { '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: items.map(function (it, i) { return { '@type': 'ListItem', position: i + 1, name: it.name, item: it.url }; }) };
  }
  function sync() {
    var url = SITE + path();
    var link = head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; head.appendChild(link); }
    link.href = url;
    meta('property', 'og:url').content = url;
    meta('property', 'og:title').content = document.title;
    meta('name', 'twitter:title').content = document.title;
    var d = head.querySelector('meta[name="description"]');
    if (d && d.content) { meta('property', 'og:description').content = d.content; meta('name', 'twitter:description').content = d.content; }
    var bc = breadcrumbs();
    if (bc) {
      var s = head.querySelector('script#seo-breadcrumbs');
      if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'seo-breadcrumbs'; head.appendChild(s); }
      s.textContent = JSON.stringify(bc);
    }
  }
  sync();
  if (window.MutationObserver) {
    var t = head.querySelector('title'); if (t) new MutationObserver(sync).observe(t, { childList: true, characterData: true, subtree: true });
    var d = head.querySelector('meta[name="description"]'); if (d) new MutationObserver(sync).observe(d, { attributes: true, attributeFilter: ['content'] });
  }
})();
