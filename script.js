const PRODUCTS = [
  {
    id: "grace-tee",
    name: "Grace Over Fear Tee",
    category: "tees",
    gender: "unisex",
    price: 48,
    badge: "New",
    image: "images/product-grace-tee.svg",
    secondImage: "images/product-grace-tee-back.svg",
    description: "A heavyweight oversized tee built around a simple reminder: grace speaks louder than fear.",
    verse: "2 Timothy 1:7",
    sizes: ["S", "M", "L", "XL"],
    details: ["240 GSM heavyweight cotton", "Oversized unisex fit", "Screen-printed front and back artwork", "Pre-shrunk fabric"]
  },
  {
    id: "called-hoodie",
    name: "Called Hoodie",
    category: "hoodies",
    gender: "unisex",
    price: 92,
    badge: "Best Seller",
    image: "images/product-called-hoodie.svg",
    secondImage: "images/product-called-hoodie-back.svg",
    description: "A premium heavyweight hoodie for everyday wear, centered on identity, purpose, and calling.",
    verse: "Romans 8:28",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["460 GSM brushed cotton blend", "Relaxed oversized fit", "Embroidered chest detail", "Double-layer hood"]
  },
  {
    id: "salt-light-crew",
    name: "Salt + Light Crewneck",
    category: "crewnecks",
    gender: "unisex",
    price: 78,
    badge: "",
    image: "images/product-salt-light.svg",
    secondImage: "images/product-salt-light-back.svg",
    description: "A clean crewneck inspired by the call to live visibly, faithfully, and with purpose.",
    verse: "Matthew 5:13–16",
    sizes: ["S", "M", "L", "XL"],
    details: ["400 GSM fleece", "Dropped shoulder", "Minimal front embroidery", "Back scripture reference graphic"]
  },
  {
    id: "courage-cap",
    name: "Courage Cap",
    category: "accessories",
    gender: "unisex",
    price: 34,
    badge: "",
    image: "images/product-courage-cap.svg",
    secondImage: "images/product-courage-cap-back.svg",
    description: "A structured everyday cap embroidered with a quiet reminder to move with courage.",
    verse: "Joshua 1:9",
    sizes: ["One Size"],
    details: ["6-panel construction", "Adjustable metal clasp", "Embroidered front mark", "100% cotton twill"]
  },
  {
    id: "renewed-tee",
    name: "Renewed Mind Tee",
    category: "tees",
    gender: "men",
    price: 52,
    badge: "",
    image: "images/product-renewed-tee.svg",
    secondImage: "images/product-renewed-tee-back.svg",
    description: "A graphic tee built around transformation, discipline, and renewed thinking.",
    verse: "Romans 12:2",
    sizes: ["S", "M", "L", "XL"],
    details: ["250 GSM cotton", "Boxy fit", "Pigment-dyed finish", "Water-based print"]
  },
  {
    id: "abide-hoodie",
    name: "Abide Hoodie",
    category: "hoodies",
    gender: "women",
    price: 96,
    badge: "Limited",
    image: "images/product-abide-hoodie.svg",
    secondImage: "images/product-abide-hoodie-back.svg",
    description: "A soft, substantial hoodie designed around rest, dependence, and remaining rooted in Christ.",
    verse: "John 15:5",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["450 GSM cotton blend", "Relaxed fit", "Tonal embroidery", "Ribbed cuffs and hem"]
  },
  {
    id: "faithful-tote",
    name: "Faithful Canvas Tote",
    category: "accessories",
    gender: "unisex",
    price: 28,
    badge: "",
    image: "images/product-faithful-tote.svg",
    secondImage: "images/product-faithful-tote-back.svg",
    description: "A durable canvas carryall with a minimal statement about faithfulness in the ordinary.",
    verse: "Luke 16:10",
    sizes: ["One Size"],
    details: ["14 oz canvas", "Reinforced handles", "Interior pocket", "Screen-printed artwork"]
  },
  {
    id: "steadfast-crew",
    name: "Steadfast Crewneck",
    category: "crewnecks",
    gender: "men",
    price: 82,
    badge: "New",
    image: "images/product-steadfast-crew.svg",
    secondImage: "images/product-steadfast-crew-back.svg",
    description: "A heavyweight essential inspired by endurance, resilience, and unwavering faith.",
    verse: "James 1:12",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["420 GSM fleece", "Relaxed athletic fit", "Raised embroidery", "Pre-washed finish"]
  }
];

const money = n => `$${Number(n).toFixed(2)}`;

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("covenantCart")) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("covenantCart", JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, size = "M", qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const key = `${productId}-${size}`;
  const existing = cart.find(i => i.key === key);
  if (existing) existing.qty += qty;
  else cart.push({
    key,
    id: product.id,
    name: product.name,
    size,
    price: product.price,
    image: product.image,
    qty
  });
  saveCart(cart);
  openCart();
}

function changeCartQty(key, delta) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  const next = cart.filter(i => i.qty > 0);
  saveCart(next);
}

function removeCartItem(key) {
  saveCart(getCart().filter(i => i.key !== key));
}

function updateCartUI() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = totalQty);

  const items = document.querySelector("[data-cart-items]");
  const total = document.querySelector("[data-cart-total]");
  if (!items || !total) return;

  if (!cart.length) {
    items.innerHTML = `<div class="empty-state">Your bag is empty.<br><br><a class="text-link" href="shop.html">Shop the collection</a></div>`;
    total.textContent = money(0);
    return;
  }

  items.innerHTML = cart.map(item => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>Size: ${item.size}</p>
        <div class="mini-qty">
          <button aria-label="Decrease quantity" data-cart-dec="${item.key}">−</button>
          <span>${item.qty}</span>
          <button aria-label="Increase quantity" data-cart-inc="${item.key}">+</button>
        </div>
        <button class="remove-item" data-cart-remove="${item.key}">Remove</button>
      </div>
      <strong>${money(item.price * item.qty)}</strong>
    </article>
  `).join("");

  total.textContent = money(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
}

function openCart() {
  document.body.classList.add("cart-open", "no-scroll");
}
function closeCart() {
  document.body.classList.remove("cart-open", "no-scroll");
}
function openMobileMenu() {
  document.body.classList.add("mobile-menu-open", "no-scroll");
}
function closeMobileMenu() {
  document.body.classList.remove("mobile-menu-open", "no-scroll");
}

function productCard(product) {
  return `
    <article class="product-card" data-category="${product.category}" data-gender="${product.gender}">
      <a href="product.html?id=${encodeURIComponent(product.id)}">
        <div class="product-media">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <div>
            <div class="product-title">${product.name}</div>
            <div class="product-category">${product.verse}</div>
          </div>
          <div class="product-price">${money(product.price)}</div>
        </div>
      </a>
    </article>
  `;
}

function renderFeaturedProducts() {
  document.querySelectorAll("[data-featured-products]").forEach(el => {
    const limit = Number(el.dataset.limit || 4);
    el.innerHTML = PRODUCTS.slice(0, limit).map(productCard).join("");
  });
}

function renderShop() {
  const grid = document.querySelector("[data-shop-grid]");
  if (!grid) return;

  let currentFilter = "all";
  let currentSort = "featured";

  const render = () => {
    let list = [...PRODUCTS];
    if (currentFilter !== "all") {
      list = list.filter(p => p.category === currentFilter || p.gender === currentFilter);
    }
    if (currentSort === "price-low") list.sort((a, b) => a.price - b.price);
    if (currentSort === "price-high") list.sort((a, b) => b.price - a.price);
    if (currentSort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    grid.innerHTML = list.map(productCard).join("");
  };

  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  const sort = document.querySelector("[data-sort]");
  if (sort) sort.addEventListener("change", () => {
    currentSort = sort.value;
    render();
  });

  render();
}

function renderProductPage() {
  const root = document.querySelector("[data-product-page]");
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id") || PRODUCTS[0].id;
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  document.title = `${product.name} | COVENANT / FORM`;

  root.innerHTML = `
    <div class="product-layout">
      <div class="product-gallery">
        <img src="${product.image}" alt="${product.name} front view">
        <img src="${product.secondImage}" alt="${product.name} alternate view">
        <img src="${product.image}" alt="${product.name} editorial view">
        <img src="${product.secondImage}" alt="${product.name} detail view">
      </div>

      <aside class="product-panel">
        <div class="eyebrow">${product.verse}</div>
        <h1 class="display">${product.name}</h1>
        <div class="price">${money(product.price)}</div>
        <p class="description">${product.description}</p>

        <span class="option-label">Size</span>
        <div class="size-options" data-size-options>
          ${product.sizes.map((size, i) => `<button class="size-btn ${i === 0 ? "active" : ""}" data-size="${size}">${size}</button>`).join("")}
        </div>

        <span class="option-label">Quantity</span>
        <div class="qty-row">
          <button type="button" data-product-dec aria-label="Decrease quantity">−</button>
          <span data-product-qty>1</span>
          <button type="button" data-product-inc aria-label="Increase quantity">+</button>
        </div>

        <button class="btn btn--full" data-product-add>Add to Bag</button>

        <ul class="details-list">
          ${product.details.map(d => `<li>${d}</li>`).join("")}
        </ul>
      </aside>
    </div>
  `;

  let selectedSize = product.sizes[0];
  let qty = 1;

  root.querySelectorAll("[data-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      root.querySelectorAll("[data-size]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.dataset.size;
    });
  });

  root.querySelector("[data-product-dec]").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    root.querySelector("[data-product-qty]").textContent = qty;
  });
  root.querySelector("[data-product-inc]").addEventListener("click", () => {
    qty += 1;
    root.querySelector("[data-product-qty]").textContent = qty;
  });
  root.querySelector("[data-product-add]").addEventListener("click", () => {
    addToCart(product.id, selectedSize, qty);
  });
}

function setupForms() {
  document.querySelectorAll("[data-demo-form]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const msg = form.querySelector("[data-form-message]");
      if (msg) {
        msg.textContent = "Thanks — this demo form is working on the front end. Connect a form service before production.";
        msg.classList.add("show");
      }
      form.reset();
    });
  });
}

document.addEventListener("click", e => {
  const open = e.target.closest("[data-open-cart]");
  const close = e.target.closest("[data-close-cart]");
  const backdrop = e.target.closest(".cart-backdrop");
  const menuOpen = e.target.closest("[data-open-menu]");
  const menuClose = e.target.closest("[data-close-menu]");

  if (open) openCart();
  if (close || backdrop) closeCart();
  if (menuOpen) openMobileMenu();
  if (menuClose) closeMobileMenu();

  const inc = e.target.closest("[data-cart-inc]");
  const dec = e.target.closest("[data-cart-dec]");
  const remove = e.target.closest("[data-cart-remove]");
  if (inc) changeCartQty(inc.dataset.cartInc, 1);
  if (dec) changeCartQty(dec.dataset.cartDec, -1);
  if (remove) removeCartItem(remove.dataset.cartRemove);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeCart();
    closeMobileMenu();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  renderFeaturedProducts();
  renderShop();
  renderProductPage();
  setupForms();
});
