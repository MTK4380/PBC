(function () {
  var grid = document.getElementById("shop-grid");
  var form = document.getElementById("shop-filters");
  var countEl = document.getElementById("shop-result-count");
  if (!grid || !form || !window.PBC_Store) return;

  var opts = window.PBC_Store.getFilterOptions();

  function formatPrice(n) {
    return window.PBC_Quote ? window.PBC_Quote.formatPrice(n) : new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(n || 0);
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function renderImage(item) {
    var alt = item.imageAlt || item.design + ' tyre';
    var imageUrl = item.image ? item.image + '?v=20260531-plp-imgfix1' : '';
    if (item.image) {
      return (
        '<div class="shop-card-img shop-card-img--' + item.vehicle + '">' +
        '<button type="button" class="tyre-image-zoom js-image-zoom" data-zoom-src="' + escapeHtml(imageUrl) + '" data-zoom-alt="' + escapeHtml(alt) + '" aria-label="View larger image of ' + escapeHtml(alt) + '">' +
        '<img src="' + escapeHtml(imageUrl) + '" alt="' + escapeHtml(alt) + '" loading="lazy">' +
        '</button>' +
        '</div>'
      );
    }
    return '<div class="shop-card-img shop-card-img--' + item.vehicle + '" role="img" aria-label="' + escapeHtml(item.size + ' ' + item.design) + '"></div>';
  }

  function renderCard(item) {
    var title = item.catalogName || item.design;
    var summary = item.summary ? '<p class="shop-card-summary">' + escapeHtml(item.summary) + '</p>' : '';
    return (
      '<article class="shop-card" data-id="' + item.id + '">' +
      renderImage(item) +
      '<div class="shop-card-body">' +
      '<p class="shop-card-meta">Tyres</p>' +
      '<h3 class="shop-card-title"><a href="product.html?id=' + encodeURIComponent(item.id) + '">' + escapeHtml(title + ' ' + item.size) + '</a></h3>' +
      '<p class="shop-card-design">' + escapeHtml(item.brand) + ' · Ply ' + escapeHtml(item.ply) + '</p>' +
      summary +
      '<p class="shop-card-price">' + formatPrice(item.price) + '</p>' +
      '<div class="shop-card-actions">' +
      '<input type="number" class="catalog-qty" min="1" value="1" aria-label="Quantity" data-id="' + item.id + '">' +
      '<button type="button" class="btn btn-primary btn-sm btn-quote-shop" data-id="' + item.id + '">Add to Quote</button>' +
      '</div></div></article>'
    );
  }

  function getCriteria() {
    var fd = new FormData(form);
    return {
      q: fd.get("q") || "",
      brandId: fd.get("brandId") || "",
      vehicle: fd.get("vehicle") || "",
      categoryId: fd.get("categoryId") || "",
      rim: fd.get("rim") || "",
      minPrice: fd.get("minPrice") || "",
      maxPrice: fd.get("maxPrice") || "",
      sort: fd.get("sort") || "price-asc"
    };
  }

  function render() {
    var items = window.PBC_Store.filter(getCriteria());
    if (countEl) {
      countEl.textContent = items.length + " tyre" + (items.length === 1 ? "" : "s") + " found";
    }
    if (!items.length) {
      grid.innerHTML = "<p class=\"shop-empty\">No tyres match your filters. <a href=\"shop.html\">Clear filters</a></p>";
      return;
    }
    grid.innerHTML = items.map(renderCard).join("");
    bindCardActions(items);
  }

  function bindCardActions(items) {
    grid.querySelectorAll(".btn-quote-shop").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var product = window.PBC_Store.getById(id);
        if (!product || !window.PBC_Quote) return;
        var qtyEl = grid.querySelector('.catalog-qty[data-id="' + id + '"]');
        window.PBC_Quote.addProduct(product, qtyEl ? qtyEl.value : 1);
        btn.textContent = 'Added to Quote';
        setTimeout(function () { btn.textContent = 'Add to Quote'; }, 1200);
      });
    });
  }

  function applyUrlParams() {
    var params = new URLSearchParams(window.location.search);
    ["q", "brandId", "vehicle", "categoryId", "rim", "minPrice", "maxPrice", "sort"].forEach(function (key) {
      if (params.has(key) && form.elements[key]) {
        form.elements[key].value = params.get(key);
      }
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    render();
  });
  form.addEventListener("input", render);
  form.addEventListener("change", render);
  form.addEventListener("reset", function () {
    setTimeout(render, 0);
  });

  document.getElementById("filter-clear")?.addEventListener("click", function (e) {
    e.preventDefault();
    form.reset();
    render();
  });

  applyUrlParams();
  render();
})();
