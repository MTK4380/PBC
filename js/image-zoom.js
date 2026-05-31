(function () {
  var overlay;
  var lastTrigger;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char];
    });
  }

  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'tyre-lightbox';
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="tyre-lightbox-panel" role="dialog" aria-modal="true" aria-label="Large tyre image">' +
      '<button type="button" class="tyre-lightbox-close" aria-label="Close image">&times;</button>' +
      '<img class="tyre-lightbox-img" alt="">' +
      '<p class="tyre-lightbox-caption"></p>' +
      '</div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay || event.target.classList.contains('tyre-lightbox-close')) {
        closeOverlay();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && overlay && !overlay.hidden) closeOverlay();
    });

    return overlay;
  }

  function openOverlay(src, alt, trigger) {
    var lightbox = ensureOverlay();
    var img = lightbox.querySelector('.tyre-lightbox-img');
    var caption = lightbox.querySelector('.tyre-lightbox-caption');
    lastTrigger = trigger || null;
    img.src = src;
    img.alt = alt || 'Tyre image';
    caption.innerHTML = escapeHtml(alt || 'Tyre image');
    lightbox.hidden = false;
    document.body.classList.add('tyre-lightbox-open');
    lightbox.querySelector('.tyre-lightbox-close').focus();
  }

  function closeOverlay() {
    if (!overlay) return;
    overlay.hidden = true;
    overlay.querySelector('.tyre-lightbox-img').src = '';
    document.body.classList.remove('tyre-lightbox-open');
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('.js-image-zoom');
    if (!trigger) return;
    var src = trigger.getAttribute('data-zoom-src');
    if (!src) return;
    event.preventDefault();
    openOverlay(src, trigger.getAttribute('data-zoom-alt'), trigger);
  });
})();
