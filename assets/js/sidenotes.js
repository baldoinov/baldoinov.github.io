(function () {
  var refs = Array.prototype.slice.call(document.querySelectorAll('article sup[id^="fnref"]'));
  if (!refs.length) return;

  refs.forEach(function (sup) {
    var link = sup.querySelector('a.footnote');
    if (!link) return;

    var targetId = link.getAttribute('href').slice(1);
    var definition = document.getElementById(targetId);
    if (!definition) return;

    var clone = definition.cloneNode(true);
    var backlink = clone.querySelector('.reversefootnote');
    if (backlink) backlink.remove();

    var note = document.createElement('span');
    note.className = 'sidenote';
    note.innerHTML = '<span class="sidenote-number">' + link.textContent + '</span>' + clone.innerHTML;

    sup.insertAdjacentElement('afterend', note);

    // Keep punctuation that immediately follows the reference (e.g. "GitHub[^1].")
    // attached to the sentence instead of stranded after the note block.
    var trailingText = note.nextSibling;
    if (trailingText && trailingText.nodeType === Node.TEXT_NODE) {
      var match = trailingText.textContent.match(/^\s*[.,;:!?]+/);
      if (match) {
        sup.parentNode.insertBefore(document.createTextNode(match[0]), note);
        trailingText.textContent = trailingText.textContent.slice(match[0].length);
      }
    }
  });

  var footnotesContainer = document.querySelector('article .footnotes');
  if (footnotesContainer) footnotesContainer.remove();
})();
