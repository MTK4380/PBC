(function () {
  var formatter = window.PBC_Cart ? window.PBC_Cart.formatPrice : function (n) {
    return "PKR " + n;
  };

  function renderProduct(item) {
    return (
      "<article class=\"catalog-product\" data-id=\"" + item.id + "\">" +
      "<div class=\"catalog-product-info\">" +
      "<p class=\"catalog-product-meta\"><span class=\"catalog-brand\">" + item.brand + "</span> · " + item.category + "</p>" +
      "<h3 class=\"catalog-product-title\">" + item.size + " — " + item.design + "</h3>" +
      "<p class=\"catalog-product-spec\">Ply " + item.ply + "</p>" +
      "</div>" +
      "<div class=\"catalog-product-actions\">" +
      "<p class=\"catalog-product-price\">" + formatter(item.price) + "</p>" +
      "<div class=\"catalog-qty-row\">" +
      "<label class=\"visually-hidden\" for=\"qty-" + item.id + "\">Quantity</label>" +
      "<input type=\"number\" id=\"qty-" + item.id + "\" class=\"catalog-qty\" min=\"1\" value=\"1\" data-product-id=\"" + item.id + "\">" +
      "<button type=\"button\" class=\"btn btn-primary btn-add-cart\" data-product-id=\"" + item.id + "\">Add to cart</button>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function renderSection(containerId, vehicle, title) {
    var root = document.getElementById(containerId);
    if (!root || !window.PBC_Catalog) return;

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

    root.querySelector(".catalog-search").addEventListener("input", function (e) {
      var q = e.target.value.trim().toLowerCase();
      root.querySelectorAll(".catalog-product").forEach(function (card) {
        card.hidden = q.length > 0 && card.textContent.toLowerCase().indexOf(q) === -1;
      });
    });

    root.querySelectorAll(".btn-add-cart").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-product-id");
        var product = items.find(function (p) {
          return p.id === id;
        });
        if (!product) return;
        var qtyInput = root.querySelector("#qty-" + id);
        var qty = qtyInput ? qtyInput.value : 1;
        window.PBC_Cart.add(product, qty);
        btn.textContent = "Added";
        setTimeout(function () {
          btn.textContent = "Add to cart";
        }, 1200);
      });
    });
  }

  function init() {
    renderSection("car-tyres-catalog", "car", "Car tyres");
    renderSection("truck-tyres-catalog", "truck", "Truck tyres");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
