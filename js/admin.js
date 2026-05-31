(function () {
  var loginForm = document.getElementById("admin-login");
  var panel = document.getElementById("admin-panel");
  var listingForm = document.getElementById("listing-form");
  var table = document.getElementById("admin-listings");
  var AUTH_KEY = "pbc-admin-auth";

  if (!loginForm) return;

  function isAuthed() {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  }

  function showPanel() {
    loginForm.hidden = true;
    if (panel) panel.hidden = false;
    renderListings();
  }

  function renderListings() {
    if (!table || !window.PBC_Store) return;
    var items = window.PBC_Store.getPostedListings();
    if (!items.length) {
      table.innerHTML = "<p>No posted tyres yet.</p>";
      return;
    }
    table.innerHTML = "<table class=\"price-table\"><thead><tr><th>Size</th><th>Design</th><th>Price</th><th></th></tr></thead><tbody>" +
      items.map(function (p) {
        return "<tr><td>" + p.size + "</td><td>" + p.design + "</td><td>" + (window.PBC_Quote ? window.PBC_Quote.formatPrice(p.price) : "PKR " + p.price) + "</td><td><button type=\"button\" class=\"cart-remove\" data-del=\"" + p.id + "\">Delete</button></td></tr>";
      }).join("") + "</tbody></table>";
    table.querySelectorAll("[data-del]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.PBC_Store.deleteListing(btn.getAttribute("data-del"));
        renderListings();
      });
    });
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var pass = new FormData(loginForm).get("password");
    var expected = (window.PBC_CONFIG && window.PBC_CONFIG.admin.password) || "pbcadmin";
    if (pass === expected) {
      sessionStorage.setItem(AUTH_KEY, "1");
      showPanel();
    } else {
      alert("Invalid password");
    }
  });

  if (listingForm) {
    listingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!isAuthed()) return;
      var fd = new FormData(listingForm);
      window.PBC_Store.saveListing({
        brand: fd.get("brand"),
        brandId: fd.get("brandId"),
        category: fd.get("category"),
        categoryId: fd.get("categoryId") || "custom",
        vehicle: fd.get("vehicle"),
        size: fd.get("size"),
        design: fd.get("design"),
        ply: parseInt(fd.get("ply"), 10) || 4,
        price: parseInt(fd.get("price"), 10) || 0
      });
      listingForm.reset();
      renderListings();
      alert("Tyre posted to shop (visible in browser storage).");
    });
  }

  if (isAuthed()) showPanel();
})();
