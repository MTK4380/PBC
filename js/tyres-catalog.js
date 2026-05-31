(function () {
  var formatter = window.PBC_Quote ? window.PBC_Quote.formatPrice : function (n) {
    return "PKR " + n;
  };

  var titles = { car: "Car tyres", truck: "Truck tyres" };

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

  function searchText(item) {
    return [
      item.brand,
      item.category,
      item.catalogName,
      item.catalogCategory,
      item.size,
      item.design,
      item.summary,
      (item.features || []).join(" "),
      String(item.ply),
      String(item.price)
    ].join(" ").toLowerCase();
  }

  function renderProduct(item) {
    var title = item.catalogName || item.design;
    var mediaStyle = "min-height:6.75rem;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:0.5rem;";
    var imageStyle = "display:block;width:auto;height:7rem;max-width:100%;max-height:7rem;object-fit:contain;";
    var imageAlt = item.imageAlt || title + " tyre";
    var imageUrl = item.image ? item.image + "?v=20260531-plp-imgfix1" : "";
    var image = item.image
      ? "<div class="catalog-product-media" style="" + mediaStyle + ""><button type="button" class="tyre-image-zoom js-image-zoom" data-zoom-src="" + escapeHtml(imageUrl) + "" data-zoom-alt="" + escapeHtml(imageAlt) + "" aria-label="View larger image of " + escapeHtml(imageAlt) + ""><img src="" + escapeHtml(imageUrl) + "" alt="" + escapeHtml(imageAlt) + "" loading="lazy" style="" + imageStyle + ""></button></div>"
      : "<div class="catalog-product-media catalog-product-media--placeholder" aria-hidden="true" style="" + mediaStyle + ""></div>";
    var summary = item.summary ? "<p class=\"catalog-product-summary\">" + escapeHtml(item.summary) + "</p>" : "";
    var features = item.features && item.features.length
      ? "<ul class=\"catalog-product-features\">" + item.features.slice(0, 3).map(function (feature) {
        return "<li>" + escapeHtml(feature) + "</li>";
      }).join("") + "</ul>"
      : "";
    return (
      "<article class=\"catalog-product\" data-id=\"" + item.id + "\" data-search=\"" + escapeHtml(searchText(item)).replace(/"/g, "") + "\">" +
      image +
      "<div class=\"catalog-product-info\">" +
      "<p class=\"catalog-product-meta\"><span class=\"catalog-brand\">" + escapeHtml(item.brand) + "</span> · " + escapeHtml(item.catalogCategory || item.category) + "</p>" +
      "<h3 class=\"catalog-product-title\">" + escapeHtml(title) + "</h3>" +
      "<p class=\"catalog-product-spec\">" + escapeHtml(item.size) + " · Ply " + escapeHtml(item.ply) + "</p>" +
      summary +
      features +
      "</div>" +
      "<div class=\"catalog-product-actions\">" +
      "<p class=\"catalog-product-price\">" + formatter(item.price) + "</p>" +
      "<div class=\"catalog-qty-row\">" +
      "<label class=\"visually-hidden\" for=\"qty-" + item.id + "\">Quantity</label>" +
      "<input type=\"number\" id=\"qty-" + item.id + "\" class=\"catalog-qty\" min=\"1\" value=\"1\" data-product-id=\"" + item.id + "\">" +
      "<button type=\"button\" class=\"btn btn-primary btn-quote-tyre\" data-product-id=\"" + item.id + "\">Add to Quote</button>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function renderSection(containerId, vehicle) {
    var root = document.getElementById(containerId);
    if (!root || !window.PBC_Catalog) return;

    var title = titles[vehicle] || "Tyres";
    var items = window.PBC_Catalog.getByVehicle(vehicle);
    if (!items.length) {
      root.innerHTML = "<p>No tyres listed in this category.</p>";
      return;
    }

    var searchId = "search-" + vehicle;
    root.innerHTML =
      "<div class=\"catalog-toolbar\">" +
      "<label class=\"visually-hidden\" for=\"" + searchId + "\">Search " + title + "</label>" +
      "<input type=\"search\" id=\"" + searchId + "\" class=\"price-search catalog-search\" placeholder=\"Search " + title.toLowerCase() + "…\" data-vehicle=\"" + vehicle + "\">" +
      "<p class=\"catalog-count\">" + items.length + " tyres · Prices effective " + window.PBC_Catalog.effectiveDate + "</p>" +
      "</div>" +
      "<div class=\"catalog-list\" data-vehicle=\"" + vehicle + "\">" +
      items.map(renderProduct).join("") +
      "</div>";

    var searchInput = root.querySelector(".catalog-search");
    var countEl = root.querySelector(".catalog-count");
    var products = root.querySelectorAll(".catalog-product");

    function applySearch() {
      var q = searchInput.value.trim().toLowerCase();
      var visible = 0;

      products.forEach(function (card) {
        var haystack = card.getAttribute("data-search") || card.textContent.toLowerCase();
        var match = !q || haystack.indexOf(q) !== -1;
        card.classList.toggle("catalog-product--hidden", !match);
        if (match) visible += 1;
      });

      if (countEl) {
        if (q) {
          countEl.textContent = visible + " of " + items.length + " tyres shown · Prices effective " + window.PBC_Catalog.effectiveDate;
        } else {
          countEl.textContent = items.length + " tyres · Prices effective " + window.PBC_Catalog.effectiveDate;
        }
      }
    }

    searchInput.addEventListener("input", applySearch);
    searchInput.addEventListener("search", applySearch);
    searchInput.addEventListener("keyup", applySearch);

    root.querySelectorAll(".btn-quote-tyre").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-product-id");
        var product = items.find(function (p) {
          return p.id === id;
        });
        if (!product || !window.PBC_Quote) return;
        var qtyInput = document.getElementById("qty-" + id);
        window.PBC_Quote.addProduct(product, qtyInput ? qtyInput.value : 1);
        btn.textContent = 'Added to Quote';
        setTimeout(function () { btn.textContent = 'Add to Quote'; }, 1200);
      });
    });
  }

  function init() {
    var vehicle = document.body.getAttribute("data-catalog");
    if (vehicle) {
      renderSection("tyre-catalog-root", vehicle);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
