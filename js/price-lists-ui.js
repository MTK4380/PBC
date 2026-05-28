(function () {
  var data = window.PBC_PRICE_LISTS;
  var root = document.getElementById("price-lists-root");
  if (!data || !root) return;

  var formatter = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  });

  function formatPrice(n) {
    return formatter.format(n);
  }

  function renderTable(brandId, category) {
    var rows = category.items.map(function (item) {
      return (
        "<tr>" +
        "<td data-label=\"Size\">" + item.size + "</td>" +
        "<td data-label=\"Design\">" + item.design + "</td>" +
        "<td data-label=\"Ply\">" + item.ply + "</td>" +
        "<td data-label=\"Price\">" + formatPrice(item.price) + "</td>" +
        "</tr>"
      );
    }).join("");

    return (
      "<div class=\"price-category\" id=\"cat-" + brandId + "-" + category.id + "\">" +
      "<h3>" + category.name + "</h3>" +
      "<div class=\"price-table-wrap\">" +
      "<table class=\"price-table\">" +
      "<thead><tr>" +
      "<th scope=\"col\">Size / Description</th>" +
      "<th scope=\"col\">Design</th>" +
      "<th scope=\"col\">Ply</th>" +
      "<th scope=\"col\">Consumer price (PKR)</th>" +
      "</tr></thead>" +
      "<tbody>" + rows + "</tbody>" +
      "</table></div></div>"
    );
  }

  function renderBrand(brand, active) {
    var categoriesHtml = brand.categories.map(function (cat) {
      return renderTable(brand.id, cat);
    }).join("");
    var figureHtml = brand.image
      ? (
        "<figure class=\"price-sheet-figure\">" +
        "<img src=\"" + brand.image + "\" alt=\"" + brand.imageAlt + "\" loading=\"lazy\" width=\"900\" height=\"1200\">" +
        "<figcaption>Official " + brand.name + " consumer price list (reference image)</figcaption>" +
        "</figure>"
      )
      : "";

    return (
      "<section class=\"price-brand-panel" + (active ? " is-active" : "") + "\" id=\"brand-" + brand.id + "\" role=\"tabpanel\" aria-labelledby=\"tab-" + brand.id + "\">" +
      "<header class=\"price-brand-header\">" +
      "<h2>" + brand.name + " — consumer prices</h2>" +
      "<p class=\"price-effective\">Effective: " + data.effectiveDate + " · Prices per tyre unless noted (SET)</p>" +
      "</header>" +
      "<div class=\"price-search-wrap\">" +
      "<label class=\"visually-hidden\" for=\"search-" + brand.id + "\">Search " + brand.name + " tyres</label>" +
      "<input type=\"search\" id=\"search-" + brand.id + "\" class=\"price-search\" placeholder=\"Search size or design…\" data-brand=\"" + brand.id + "\" autocomplete=\"off\">" +
      "</div>" +
      "<div class=\"price-categories\" data-brand=\"" + brand.id + "\">" + categoriesHtml + "</div>" +
      detailsToggle(brand.id, figureHtml) +
      "</section>"
    );
  }

  function detailsToggle(brandId, figureHtml) {
    return (
      "<details class=\"price-sheet-details\">" +
      "<summary>View official " + brandId.toUpperCase() + " price list image</summary>" +
      figureHtml +
      "</details>"
    );
  }

  var tabsHtml = data.brands.map(function (brand, i) {
    return (
      "<button type=\"button\" class=\"price-tab" + (i === 0 ? " is-active" : "") + "\" id=\"tab-" + brand.id + "\" role=\"tab\" aria-selected=\"" + (i === 0) + "\" aria-controls=\"brand-" + brand.id + "\" data-brand=\"" + brand.id + "\">" + brand.name + "</button>"
    );
  }).join("");

  var panelsHtml = data.brands.map(function (brand, i) {
    return renderBrand(brand, i === 0);
  }).join("");

  root.innerHTML =
    "<p class=\"price-list-intro\">Browse GTR, SR, and GR tyre consumer prices below. For bulk, fleet, or <a href=\"tenders.html\">government tender</a> orders, <a href=\"quote.html\">request a quote</a>.</p>" +
    "<div class=\"price-tabs\" role=\"tablist\" aria-label=\"Tyre brands\">" + tabsHtml + "</div>" +
    "<div class=\"price-panels\">" + panelsHtml + "</div>";

  root.querySelectorAll(".price-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-brand");
      root.querySelectorAll(".price-tab").forEach(function (t) {
        var on = t.getAttribute("data-brand") === id;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on);
      });
      root.querySelectorAll(".price-brand-panel").forEach(function (p) {
        p.classList.toggle("is-active", p.id === "brand-" + id);
      });
    });
  });

  root.querySelectorAll(".price-search").forEach(function (input) {
    input.addEventListener("input", function () {
      var brandId = input.getAttribute("data-brand");
      var q = input.value.trim().toLowerCase();
      var panel = root.querySelector("#brand-" + brandId);
      if (!panel) return;
      panel.querySelectorAll(".price-table tbody tr").forEach(function (row) {
        var text = row.textContent.toLowerCase();
        row.hidden = q.length > 0 && text.indexOf(q) === -1;
      });
      panel.querySelectorAll(".price-category").forEach(function (cat) {
        var visible = cat.querySelectorAll("tbody tr:not([hidden])").length;
        cat.hidden = visible === 0 && q.length > 0;
      });
    });
  });
})();
