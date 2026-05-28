(function () {
  function slug(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function vehicleType(brandId, categoryId) {
    return brandId === "gtr" && categoryId === "pcr" ? "car" : "truck";
  }

  function buildCatalog() {
    var items = [];
    if (!window.PBC_PRICE_LISTS) return items;

    window.PBC_PRICE_LISTS.brands.forEach(function (brand) {
      brand.categories.forEach(function (category) {
        category.items.forEach(function (item) {
          var vehicle = vehicleType(brand.id, category.id);
          items.push({
            id: slug(brand.id + "-" + category.id + "-" + item.size + "-" + item.design + "-" + item.ply),
            brand: brand.name,
            brandId: brand.id,
            category: category.name,
            categoryId: category.id,
            vehicle: vehicle,
            size: item.size,
            design: item.design,
            ply: item.ply,
            price: item.price
          });
        });
      });
    });
    return items;
  }

  window.PBC_Catalog = {
    get effectiveDate() {
      return window.PBC_PRICE_LISTS ? window.PBC_PRICE_LISTS.effectiveDate : "";
    },
    getAll: buildCatalog,
    getByVehicle: function (vehicle) {
      return buildCatalog().filter(function (item) {
        return item.vehicle === vehicle;
      });
    }
  };
})();
