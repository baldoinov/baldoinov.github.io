(function () {
  var headings = Array.prototype.slice.call(document.querySelectorAll('article h2, article h3'));
  var railList = document.getElementById('toc-list');
  var inlineList = document.getElementById('toc-list-inline');

  if (!headings.length || (!railList && !inlineList)) return;

  function slugify(text) {
    return text.toLowerCase().trim().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '');
  }

  headings.forEach(function (heading) {
    if (!heading.id) heading.id = slugify(heading.textContent);
  });

  function buildList(container) {
    headings.forEach(function (heading) {
      var item = document.createElement('li');
      if (heading.tagName === 'H3') item.className = 'toc-sub';

      var link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      link.dataset.target = heading.id;

      item.appendChild(link);
      container.appendChild(item);
    });
  }

  if (railList) buildList(railList);
  if (inlineList) buildList(inlineList);

  var allLinks = Array.prototype.slice.call(document.querySelectorAll('#toc-list a, #toc-list-inline a'));

  function setActive(id) {
    allLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.target === id);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    var visible = entries.filter(function (entry) { return entry.isIntersecting; });
    if (!visible.length) return;
    visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
    setActive(visible[0].target.id);
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

  headings.forEach(function (heading) { observer.observe(heading); });
  setActive(headings[0].id);

  allLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      document.getElementById(link.dataset.target).scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
