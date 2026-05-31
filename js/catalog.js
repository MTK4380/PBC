(function () {
  function slug(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function vehicleType(brandId, categoryId) {
    return brandId === "gtr" && categoryId === "pcr" ? "car" : "truck";
  }

  var catalogDetails = {
    "bg-thunder-max": {
      name: "BG Thunder Max",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-bg-thunder-max.webp",
      summary: "Asymmetric high-performance tyre designed for strong wet and dry surface control.",
      features: ["Wide circumferential grooves", "Steel belted casing", "V-rated high-performance pattern"]
    },
    "bg-luxo-plus": {
      name: "BG Luxo Plus",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-bg-luxo-plus.webp",
      summary: "Asymmetric design with multiple circumferential ribs for ride comfort and handling.",
      features: ["Wide grooves", "Multiple circumferential ribs", "H-rated comfort design"]
    },
    "bg-falcon": {
      name: "BG Falcon",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-bg-falcon.webp",
      summary: "New generation high-performance tyre for ride comfort and road grip.",
      features: ["Wide circumferential grooves", "Steel belted casing", "Low noise and rolling resistance"]
    },
    "bg-trako-plus": {
      name: "BG Trako Plus",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-bg-trako-plus.webp",
      summary: "Built for high performance with a comfortable, smooth ride.",
      features: ["Steel belted radial construction", "New generation tread pattern", "H-rated speed capability"]
    },
    "bg-performa": {
      name: "BG Performa",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-bg-performa.webp",
      summary: "Comfort-focused passenger pattern with good road grip.",
      features: ["New generation tread pattern", "Steel belted casing", "Heat and abrasion resistance"]
    },
    "bg-traker": {
      name: "BG Traker",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-bg-traker.webp",
      summary: "Latest pattern tyre that performs well on local road conditions.",
      features: ["European tread design", "Smooth rolling and steering stability", "T-rated pattern"]
    },
    "bg-econo": {
      name: "BG Econo",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-bg-econo.webp",
      summary: "Passenger car radial tyre for better fuel economy and ride comfort.",
      features: ["Computerised tread pattern", "Steel belted casing", "T-rated construction"]
    },
    "bg-tempo-plus": {
      name: "BG Tempo Plus",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-bg-tempo-plus.webp",
      summary: "Radial tyre for better road grip, smooth ride, and precise steering response.",
      features: ["Solid center steering rib", "Open tread shoulder groove", "Full cap ply"]
    },
    "euro-star": {
      name: "Euro Star",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-euro-star.webp",
      summary: "Ultimate comfort design with good grip for wet and dry traction.",
      features: ["Computerized tread pattern", "Long sipes for traction", "Full cap ply"]
    },
    "euro-kruze": {
      name: "Euro Kruze",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-euro-kruze.webp",
      summary: "Directional pattern tyre for excellent road grip.",
      features: ["Four circumferential grooves", "Multiple tread sipes", "T-rated tyre"]
    },
    "euro-tycoon": {
      name: "Euro Tycoon",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-euro-tycoon.webp",
      summary: "Latest tyre design for excellent road grip and steering stability.",
      features: ["European design", "Smooth rolling", "Ride comfort and traction"]
    },
    "euro-glide": {
      name: "Euro Glide",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-euro-glide.webp",
      summary: "Latest directional pattern for a comfortable and smooth drive.",
      features: ["European design", "High-speed optimized belt system", "Radial polyester cord body"]
    },
    "euro-kompact": {
      name: "Euro Kompact",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-euro-kompact.webp",
      summary: "Non-directional tubeless radial tyre for compact cars.",
      features: ["European design", "Stylized black sidewall", "Full cap ply"]
    },
    "radial-st": {
      name: "Radial ST",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-radial-st.webp",
      summary: "All-weather radial pattern designed for local road conditions.",
      features: ["Computer designed tread", "Mud and snow rated", "Lateral slots"]
    },
    "xp-2000-ii": {
      name: "XP 2000 II",
      category: "Passenger Car Radial Tyre",
      image: "images/tyres/gtr-xp-2000-ii.webp",
      summary: "Steel belted tubeless radial tyre with a wider footprint.",
      features: ["Wider footprint tread", "Mud and snow rated", "Tubeless radial construction"]
    },
    "pjc": {
      name: "PJC",
      category: "Light Truck Bias Tyre",
      image: "images/tyres/gtr-pjc.webp",
      summary: "Rib pattern light truck tyre for load-carrying service.",
      features: ["Rib pattern", "Tube-type light truck construction", "Commercial load service"]
    },
    "chief": {
      name: "Chief",
      category: "Light Truck Bias Tyre",
      image: "images/tyres/gtr-chief.webp",
      summary: "Light truck bias pattern for commercial use.",
      features: ["Rib pattern", "Tube-type construction", "Durable commercial casing"]
    },
    "power-rib": {
      name: "Power Rib",
      category: "Light Truck Bias Tyre",
      image: "images/tyres/gtr-power-rib.webp",
      summary: "Rib-type light truck tyre for steering stability.",
      features: ["Rib tread", "Bias construction", "Commercial service design"]
    },
    "spjc": {
      name: "SPJC",
      category: "Light Truck Bias Tyre",
      image: "images/tyres/gtr-pjc.webp",
      summary: "Super PJC light truck rib pattern for load service.",
      features: ["Rib pattern", "Tube-type casing", "Commercial load rating"]
    },
    "nd": {
      name: "ND",
      category: "Light Truck Bias Tyre",
      image: "images/tyres/gtr-nd.webp",
      summary: "Non-directional lug pattern for light truck service.",
      features: ["Lug pattern", "Bias construction", "Strong load-carrying casing"]
    },
    "traction-rib-lt": {
      name: "TR",
      category: "Light Truck Bias Tyre",
      image: "images/tyres/gtr-traction-rib-lt.webp",
      summary: "Light truck rib pattern for steerability and long service.",
      features: ["Rib tread", "Tube-type construction", "Commercial service"]
    },
    "glt-ii": {
      name: "GLT II",
      category: "Light Truck Tyre",
      image: "images/tyres/gtr-glt-ii.webp",
      summary: "Designed for conditions where extra traction is required.",
      features: ["Rib/lug tread", "High void-to-lug ratio", "Wider footprint"]
    },
    "load-star": {
      name: "Load Star",
      category: "Light Truck Bias Tyre",
      image: "images/tyres/gtr-load-star.webp",
      summary: "Load-focused lug pattern for small commercial vehicles.",
      features: ["Lug tread", "Bias construction", "Load service casing"]
    },
    "bg-cargo": {
      name: "BG Cargo",
      category: "Light Truck Radial Tyre",
      image: "images/tyres/gtr-bg-cargo.webp",
      summary: "Cargo radial tyre for light commercial vehicles.",
      features: ["Commercial radial construction", "Load-carrying design", "Rib pattern"]
    },
    "star-sprinter": {
      name: "Star Sprinter (SS)",
      category: "Light Truck Radial Tyre",
      image: "images/tyres/gtr-star-sprinter.webp",
      summary: "Radial rib tubeless tyre for reliable drive on varied surfaces.",
      features: ["Steel belted", "Four-rib free rolling tread", "Cap ply"]
    },
    "bg-vano-plus": {
      name: "BG Vano Plus",
      category: "Light Truck Radial Tyre",
      image: "images/tyres/gtr-bg-vano-plus.webp",
      summary: "Non-directional tread pattern for powerful traction on wet surfaces.",
      features: ["Wider tyre", "Specially designed grooves", "Durable casing"]
    },
    "bg-alro-plus": {
      name: "BG Alro Plus",
      category: "Light Truck Radial Tyre",
      image: "images/tyres/gtr-bg-alro-plus.webp",
      summary: "Light truck radial rib pattern for commercial use.",
      features: ["Rib pattern", "Steel belted radial casing", "Load service design"]
    },
    "euro-load": {
      name: "Euro Load",
      category: "Light Truck Radial Tyre",
      image: "images/tyres/gtr-euro-load.webp",
      summary: "Light truck radial tyre for pickup and van service.",
      features: ["Rib tread", "Commercial load rating", "Radial casing"]
    },
    "bg-power-terrain": {
      name: "BG Power Terrain",
      category: "4x4 Radial Tyre",
      image: "images/tyres/gtr-bg-power-terrain.webp",
      summary: "Block type pattern for outstanding off-road traction.",
      features: ["Zigzag grooves", "Open shoulder grooves", "Strong casing"]
    },
    "sag": {
      name: "SAG",
      category: "4x4 Radial Tyre",
      image: "images/tyres/gtr-sag.webp",
      summary: "Rib/lug commercial radial pattern for 4x4 and light truck service.",
      features: ["Rib/lug pattern", "10 ply rating", "Commercial radial casing"]
    },
    "bg-raptor": {
      name: "BG Raptor",
      category: "SUV/Crossover Tyre",
      image: "images/tyres/gtr-bg-raptor.webp",
      summary: "SUV tyre for powerful control and better road grip.",
      features: ["Multi-rib design", "Heat resistant tread rubber", "Flat tread"]
    },
    "bg-max-sport": {
      name: "BG Max Sport",
      category: "SUV/Crossover Tyre",
      image: "images/tyres/gtr-bg-max-sport.webp",
      summary: "Rib pattern SUV tyre designed for steering control and grip.",
      features: ["Asymmetric high performance tread", "Jointless cap ply", "Steel belted casing"]
    },
    "bg-velotrak-plus": {
      name: "BG Velotrak Plus",
      category: "SUV/Crossover Tyre",
      image: "images/tyres/gtr-bg-velotrak-plus.webp",
      summary: "Asymmetric SUV tyre for better grip and style on all surfaces.",
      features: ["Wide circumferential grooves", "Increased sipe density", "Low noise pattern"]
    },
    "bg-alro-grip": {
      name: "BG Alro Grip",
      category: "SUV/Crossover Tyre",
      image: "images/tyres/gtr-bg-alro-grip.webp",
      summary: "Symmetric SUV/crossover pattern for stable road grip.",
      features: ["Symmetric tread", "V-rated pattern", "Wide footprint"]
    },
    "traction-rib-tr": {
      name: "Traction Rib (TR)",
      category: "Truck & Bus Bias Tyre",
      image: "images/tyres/gtr-traction-rib-tr.webp",
      summary: "Popular rib pattern for steering truck tyres and all-position bus tyres.",
      features: ["Rib type tread", "Flat tread", "Excellent steerability"]
    },
    "super-tiger": {
      name: "Super Tiger (STGR)",
      category: "Truck & Bus Bias Tyre",
      image: "images/tyres/gtr-super-tiger.webp",
      summary: "Ultimate tyre for long haul service.",
      features: ["Nylon construction", "Wide deep lugs", "Drive wheel traction"]
    },
    "super-loader": {
      name: "Super Loader (SL)",
      category: "Truck & Bus Bias Tyre",
      image: "images/tyres/gtr-super-loader.webp",
      summary: "Engineered for heavy duty service on highway and off road.",
      features: ["Wide flat tread", "Nylon construction", "New generation tread design"]
    },
    "gqt": {
      name: "GQT",
      category: "Truck & Bus Bias Tyre",
      image: "images/tyres/gtr-gqt.webp",
      summary: "Front wheel position tyre for long haul trucks and all-wheel bus position.",
      features: ["Rib type tread", "Strong flexible tread rubber", "Mud and snow rated"]
    },
    "hct": {
      name: "Heavy Contract Transport (HCT)",
      category: "Truck & Bus Bias Tyre",
      image: "images/tyres/gtr-hct.webp",
      summary: "Non-directional pattern tyre for heavy duty service.",
      features: ["Minimum heat build-up", "Strong flexible tread rubber", "Mud and snow rated"]
    },
    "bg-super-excave": {
      name: "BG Super Excave",
      category: "Excavator Tyre",
      image: "images/tyres/gtr-bg-super-excave.webp",
      summary: "Powerful excavator tyre for heavy construction equipment.",
      features: ["Deep tread and thick sidewall", "Cut-resistant lug tread", "Strong nylon construction"]
    },
    "bg-rhino-power": {
      name: "BG Rhino Power",
      category: "OTR Tyre",
      image: "images/tyres/gtr-bg-rhino-power.webp",
      summary: "Heavy duty loader tyre for digging and load operations.",
      features: ["Wide flat tread area", "Robust sidewall", "Enhanced wear compound"]
    },
    "agri-trac": {
      name: "Agri Trac (AT)",
      category: "Tractor Front Tyre",
      image: "images/tyres/gtr-agri-trac.webp",
      summary: "Front tractor tyre for MF, Fiat, and other tractors.",
      features: ["Rib pattern", "Strong casing", "Tube-type tractor construction"]
    },
    "agri-rib": {
      name: "Agri Rib (AR)",
      category: "Tractor Front Tyre",
      image: "images/tyres/gtr-agri-rib.webp",
      summary: "Rib tractor pattern for front axle guidance.",
      features: ["Rib tread", "Tube-type casing", "Front tractor service"]
    },
    "agri-power": {
      name: "Agri Power (AP)",
      category: "Tractor Front Tyre",
      image: "images/tyres/gtr-agri-power.webp",
      summary: "Rib/lug tractor pattern for field service.",
      features: ["Rib/lug pattern", "Tube-type casing", "Front tractor application"]
    },
    "agri-gold": {
      name: "Agri Gold (AG)",
      category: "Tractor Front Tyre",
      image: "images/tyres/gtr-agri-gold.webp",
      summary: "Front position tyre for Belarus tractor service.",
      features: ["Rib/lug pattern", "Self-cleaning design", "Strong nylon construction"]
    },
    "power-lug": {
      name: "Power Lug (PL)",
      category: "Tractor Rear Tyre",
      image: "images/tyres/gtr-power-lug.webp",
      summary: "Rear tractor tyre for traction, stability, and flotation.",
      features: ["Open centre design", "Wide cleats", "Nylon body"]
    },
    "super-power-lug": {
      name: "Super Power Lug (SPL)",
      category: "Tractor Rear Tyre",
      image: "images/tyres/gtr-super-power-lug.webp",
      summary: "Rear tractor lug tyre for heavier field service.",
      features: ["Lug pattern", "Tube-type casing", "Rear tractor application"]
    },
    "agri-lug": {
      name: "Agri Lug",
      category: "Tractor Rear Tyre",
      image: "images/tyres/gtr-agri-lug.webp",
      summary: "Rear tractor tyre for farm service.",
      features: ["Farm service tread", "Nylon body", "Strong carcass"]
    },
    "black-bull": {
      name: "Black Bull",
      category: "Tractor Rear Tyre",
      image: "images/tyres/gtr-black-bull.webp",
      summary: "Rear tractor tyre for heavier loads on all surfaces.",
      features: ["Angular lugs", "Open center design", "Strong nylon casing"]
    },
    "double-bull-power": {
      name: "Double Bull Power",
      category: "Tractor Rear Tyre",
      image: "images/tyres/gtr-double-bull-power.webp",
      summary: "Heavy rear tractor lug tyre for field traction.",
      features: ["Deep lug pattern", "Tube-type casing", "Heavy service design"]
    },
    "sagt": {
      name: "SAGT",
      category: "Tractor Rear Tyre",
      image: "images/tyres/gtr-sagt.webp",
      summary: "Rear tractor lug tyre for high traction farm work.",
      features: ["Lug pattern", "Tube-type casing", "Heavy farm service"]
    },
    "plp": {
      name: "PLP",
      category: "Tractor Rear Tyre",
      image: "images/tyres/gr-plp-rear.webp",
      summary: "Rear tractor lug tyre for power and flotation.",
      features: ["Lug pattern", "Tube-type casing", "Rear tractor service"]
    }
  };

  var catalogAliases = {
    "rst": "radial-st",
    "radial-st": "radial-st",
    "xp-2000-ii": "xp-2000-ii",
    "xp-2000": "xp-2000-ii",
    "bg-velo-trak-plus": "bg-velotrak-plus",
    "bg-velotrak-plus": "bg-velotrak-plus",
    "bg-power-terrain-a-t": "bg-power-terrain",
    "tr": "traction-rib-tr",
    "super-tiger-set": "super-tiger",
    "load-star-set": "load-star",
    "pjc-set": "pjc",
    "ss": "star-sprinter",
    "sl": "super-loader",
    "shct": "hct",
    "hct": "hct",
    "bg-super-excave-set": "bg-super-excave",
    "at": "agri-trac",
    "at-eco": "agri-trac",
    "ar": "agri-rib",
    "ap": "agri-power",
    "ap-plus": "agri-power",
    "ag": "agri-gold",
    "pl": "power-lug",
    "plp": "plp",
    "spl": "super-power-lug",
    "power-gold": "power-lug"
  };

  function detailFor(categoryId, design) {
    var designKey = slug(design);
    var key = catalogAliases[designKey] || designKey;
    if (designKey === "tr" && categoryId === "ltb") key = "traction-rib-lt";
    return catalogDetails[key] || null;
  }

  function buildCatalog() {
    var items = [];
    if (!window.PBC_PRICE_LISTS) return items;

    window.PBC_PRICE_LISTS.brands.forEach(function (brand) {
      brand.categories.forEach(function (category) {
        category.items.forEach(function (item) {
          var vehicle = vehicleType(brand.id, category.id);
          var detail = detailFor(category.id, item.design);
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
            price: item.price,
            catalogName: detail ? detail.name : item.design,
            catalogCategory: detail ? detail.category : category.name,
            summary: detail ? detail.summary : "",
            features: detail ? detail.features.slice() : [],
            image: detail ? detail.image : "",
            imageAlt: detail ? detail.name + " tyre from the GTR product catalogue" : ""
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
