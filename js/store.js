(function () {
  var LISTINGS_KEY = "pbc-listings";
  var ORDERS_KEY = "pbc-orders";

  function readListings() {
    try {
      return JSON.parse(localStorage.getItem(LISTINGS_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function writeListings(items) {
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(items));
  }

  function readOrders() {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function writeOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function rimFromSize(size) {
    var m = String(size).match(/R-?(\d{2})/i);
    return m ? "R" + m[1] : "";
  }

  function enrich(item) {
    return Object.assign({}, item, {
      rim: rimFromSize(item.size),
      searchText: [
        item.brand,
        item.brandId,
        item.category,
        item.size,
        item.design,
        item.catalogName,
        item.catalogCategory,
        item.summary,
        (item.features || []).join(" "),
        item.ply,
        item.vehicle,
        item.price
      ].join(" ").toLowerCase()
    });
  }

  function getCatalogItems() {
    var base = window.PBC_Catalog ? window.PBC_Catalog.getAll() : [];
    var posted = readListings().map(function (p) {
      return enrich(Object.assign({ source: "posted", inStock: true }, p));
    });
    return base.map(function (p) {
      return enrich(Object.assign({ source: "catalog", inStock: true }, p));
    }).concat(posted);
  }

  function uniqueValues(items, key) {
    var set = {};
    items.forEach(function (item) {
      var v = item[key];
      if (v) set[v] = true;
    });
    return Object.keys(set).sort();
  }

  window.PBC_Store = {
    getAll: getCatalogItems,

    getById: function (id) {
      return getCatalogItems().find(function (p) {
        return p.id === id;
      });
    },

    filter: function (criteria) {
      var items = getCatalogItems();
      var q = (criteria.q || "").trim().toLowerCase();
      var brandId = criteria.brandId || "";
      var vehicle = criteria.vehicle || "";
      var categoryId = criteria.categoryId || "";
      var rim = criteria.rim || "";
      var minPrice = criteria.minPrice ? parseInt(criteria.minPrice, 10) : 0;
      var maxPrice = criteria.maxPrice ? parseInt(criteria.maxPrice, 10) : Infinity;
      var sort = criteria.sort || "price-asc";

      items = items.filter(function (item) {
        if (q && item.searchText.indexOf(q) === -1) return false;
        if (brandId && item.brandId !== brandId) return false;
        if (vehicle && item.vehicle !== vehicle) return false;
        if (categoryId && item.categoryId !== categoryId) return false;
        if (rim && item.rim !== rim) return false;
        if (item.price < minPrice) return false;
        if (item.price > maxPrice) return false;
        return true;
      });

      items.sort(function (a, b) {
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "name") return a.design.localeCompare(b.design);
        if (sort === "size") return a.size.localeCompare(b.size);
        return a.price - b.price;
      });

      return items;
    },

    getFilterOptions: function () {
      var items = getCatalogItems();
      return {
        brands: [
          { id: "gtr", name: "GTR TYRE" },
          { id: "sr", name: "SR TYRE" },
          { id: "gr", name: "GR TYRE" }
        ],
        vehicles: [
          { id: "car", name: "Car" },
          { id: "truck", name: "Truck / Commercial" }
        ],
        rims: uniqueValues(items, "rim").filter(Boolean),
        categories: uniqueValues(items, "categoryId"),
        priceMin: Math.min.apply(null, items.map(function (i) { return i.price; })),
        priceMax: Math.max.apply(null, items.map(function (i) { return i.price; }))
      };
    },

    saveListing: function (product) {
      var items = readListings();
      var id = product.id || "post-" + Date.now();
      var existing = items.findIndex(function (p) { return p.id === id; });
      var row = enrich(Object.assign({ source: "posted", inStock: true }, product, { id: id }));
      if (existing >= 0) items[existing] = row;
      else items.push(row);
      writeListings(items);
      return row;
    },

    deleteListing: function (id) {
      writeListings(readListings().filter(function (p) { return p.id !== id; }));
    },

    getPostedListings: readListings,

    createOrder: function (order) {
      var orders = readOrders();
      order.id = "ORD-" + Date.now();
      order.createdAt = new Date().toISOString();
      orders.unshift(order);
      writeOrders(orders);
      return order;
    },

    getOrders: readOrders
  };
})();
