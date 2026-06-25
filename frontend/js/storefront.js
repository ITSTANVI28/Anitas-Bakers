// --- ANITA'S BAKERS PUBLIC STOREFRONT APP LOGIC ---

if (document.getElementById("productsGrid")) {
  let cart = [];
  let appliedPromo = null;
  let selectedCategory = "All";

  // Elements
  const productsGrid = document.getElementById("productsGrid");
  const mobileMenuToggleBtn = document.getElementById("mobileMenuToggleBtn");
  const mainNavigation = document.querySelector("header nav");
  const categoryFilterContainer = document.getElementById("categoryFilterContainer");
  const cartToggleBtn = document.getElementById("cartToggleBtn");
  const cartBadgeCount = document.getElementById("cartBadgeCount");
  const cartSidebar = document.getElementById("cartSidebar");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const overlayBackdrop = document.getElementById("overlayBackdrop");
  const cartItemsList = document.getElementById("cartItemsList");
  
  // Checkout & Cart Summary
  const cartSubtotal = document.getElementById("cartSubtotal");
  const discountRow = document.getElementById("discountRow");
  const discountPercentage = document.getElementById("discountPercentage");
  const cartDiscount = document.getElementById("cartDiscount");
  const cartDeliveryFee = document.getElementById("cartDeliveryFee");
  const cartTotal = document.getElementById("cartTotal");
  const promoCodeInput = document.getElementById("promoCodeInput");
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  const promoStatusMessage = document.getElementById("promoStatusMessage");
  const checkoutBtn = document.getElementById("checkoutBtn");
  
  // Custom Cake Configurator Modal Elements
  const configuratorModal = document.getElementById("configuratorModal");
  const closeConfigModalBtn = document.getElementById("closeConfigModalBtn");
  const configCakeId = document.getElementById("configCakeId");
  const configCakeImg = document.getElementById("configCakeImg");
  const configCakeTitle = document.getElementById("configCakeTitle");
  const configCakeBasePrice = document.getElementById("configCakeBasePrice");
  const cakeWeight = document.getElementById("cakeWeight");
  const cakeFlavor = document.getElementById("cakeFlavor");
  const cakeEggless = document.getElementById("cakeEggless");
  const cakeMessage = document.getElementById("cakeMessage");
  const configTotalPrice = document.getElementById("configTotalPrice");
  const addConfiguredToCartBtn = document.getElementById("addConfiguredToCartBtn");
  const cakeVisualContainer = document.getElementById("cakeVisualContainer");

  // Wizard Elements
  const cakeShape = document.getElementById("cakeShape");
  const topCherries = document.getElementById("topCherries");
  const topSprinkles = document.getElementById("topSprinkles");
  const topCandles = document.getElementById("topCandles");
  const prevStepBtn = document.getElementById("prevStepBtn");
  const nextStepBtn = document.getElementById("nextStepBtn");
  const wizardProgressLine = document.getElementById("wizardProgressLine");
  const indStep1 = document.getElementById("indStep1");
  const indStep2 = document.getElementById("indStep2");
  const indStep3 = document.getElementById("indStep3");
  const configPanelStep1 = document.getElementById("configPanelStep1");
  const configPanelStep2 = document.getElementById("configPanelStep2");
  const configPanelStep3 = document.getElementById("configPanelStep3");

  // Spin the Wheel Elements
  const spinWheelTrigger = document.getElementById("spinWheelTrigger");
  const spinWheelModal = document.getElementById("spinWheelModal");
  const closeSpinWheelModalBtn = document.getElementById("closeSpinWheelModalBtn");
  const wheelCanvas = document.getElementById("wheelCanvas");
  const spinWheelBtn = document.getElementById("spinWheelBtn");
  const spinResultArea = document.getElementById("spinResultArea");
  const spinResultText = document.getElementById("spinResultText");
  const winCodeDisplay = document.getElementById("winCodeDisplay");

  // Invoice Elements
  const invoiceModal = document.getElementById("invoiceModal");
  const closeInvoiceModalBtn = document.getElementById("closeInvoiceModalBtn");
  const invoiceItemsBody = document.getElementById("invoiceItemsBody");
  const invCustomerName = document.getElementById("invCustomerName");
  const invCustomerPhone = document.getElementById("invCustomerPhone");
  const invRefId = document.getElementById("invRefId");
  const invPreferredTime = document.getElementById("invPreferredTime");
  const invoiceDate = document.getElementById("invoiceDate");
  const invSubtotal = document.getElementById("invSubtotal");
  const invDiscountRow = document.getElementById("invDiscountRow");
  const invDiscountValue = document.getElementById("invDiscountValue");
  const invDeliveryFee = document.getElementById("invDeliveryFee");
  const invTax = document.getElementById("invTax");
  const invGrandTotal = document.getElementById("invGrandTotal");
  const printInvoiceBtn = document.getElementById("printInvoiceBtn");
  const sendInvoiceWhatsAppBtn = document.getElementById("sendInvoiceWhatsAppBtn");

  // Tracker Elements
  const orderTrackerInput = document.getElementById("orderTrackerInput");
  const trackOrderBtn = document.getElementById("trackOrderBtn");
  const trackerError = document.getElementById("trackerError");
  const trackerVisualArea = document.getElementById("trackerVisualArea");
  const trackerCustName = document.getElementById("trackerCustName");
  const trackerOrderItems = document.getElementById("trackerOrderItems");
  const timelineProgressFill = document.getElementById("timelineProgressFill");
  const stepPlaced = document.getElementById("step-placed");
  const stepBaking = document.getElementById("step-baking");
  const stepDecorating = document.getElementById("step-decorating");
  const stepShipping = document.getElementById("step-shipping");
  const stepDelivered = document.getElementById("step-delivered");

  // Product Quick View Elements
  const quickViewModal = document.getElementById("quickViewModal");
  const closeQuickViewModalBtn = document.getElementById("closeQuickViewModalBtn");
  const qvImg = document.getElementById("qvImg");
  const qvTitle = document.getElementById("qvTitle");
  const qvPrice = document.getElementById("qvPrice");
  const qvDesc = document.getElementById("qvDesc");
  const qvAddToCartBtn = document.getElementById("qvAddToCartBtn");
  let activeQuickViewProdId = null;
  
  // Checkout Modal Elements
  const checkoutModal = document.getElementById("checkoutModal");
  const closeCheckoutModalBtn = document.getElementById("closeCheckoutModalBtn");
  const checkoutForm = document.getElementById("checkoutForm");
  const submitOrderBtn = document.getElementById("submitOrderBtn");

  // Custom Inquiry Elements
  const cakeInquiryForm = document.getElementById("cakeInquiryForm");
  const inqName = document.getElementById("inqName");
  const inqPhone = document.getElementById("inqPhone");
  const inqTiers = document.getElementById("inqTiers");
  const inqShape = document.getElementById("inqShape");
  const inqDesc = document.getElementById("inqDesc");
  const inqImageFile = document.getElementById("inqImageFile");
  const inqImageBase64 = document.getElementById("inqImageBase64");
  const inqUploadPlaceholder = document.getElementById("inqUploadPlaceholder");
  const inqPreviewContainer = document.getElementById("inqPreviewContainer");
  const inqPreviewImg = document.getElementById("inqPreviewImg");
  const btnRemoveInqPreview = document.getElementById("btnRemoveInqPreview");

  // Testimonials & Reviews Submission Elements
  const testimonialsGrid = document.getElementById("testimonialsGrid");
  const submitReviewForm = document.getElementById("submitReviewForm");
  const starsRatingSelector = document.getElementById("starsRatingSelector");
  const selectedStarValue = document.getElementById("selectedStarValue");
  const revAuthor = document.getElementById("revAuthor");
  const revType = document.getElementById("revType");
  const revText = document.getElementById("revText");
  
  // Toast Element
  const toastNotification = document.getElementById("toastNotification");
  const toastMessage = document.getElementById("toastMessage");

  // Show dynamic toast notifications
  function showToast(message, type = "success") {
    if (toastMessage && toastNotification) {
      toastMessage.textContent = message;
      toastNotification.className = `toast-container ${type} show`;
      setTimeout(() => {
        toastNotification.classList.remove("show");
      }, 2800);
    }
  }

  // Load Contact Info Dynamically from settings
  async function loadContactInfo() {
    try {
      const settings = await getSettings();
      const phoneEl = document.getElementById("contactPhone");
      const addressEl = document.getElementById("contactAddress");
      const hoursEl = document.getElementById("contactHours");
      
      if (phoneEl && settings) phoneEl.textContent = settings.whatsApp;
      if (addressEl && settings) addressEl.textContent = settings.address;
      if (hoursEl && settings) hoursEl.innerHTML = settings.hours.replace(/,/g, "<br>");
    } catch (err) {
      console.error("Failed to load contact info:", err);
    }
  }

  // Toggle Mobile Navigation Menu
  if (mobileMenuToggleBtn && mainNavigation) {
    mobileMenuToggleBtn.addEventListener("click", () => {
      mainNavigation.classList.toggle("open");
    });
    
    // Close the menu when any nav option link is clicked
    mainNavigation.querySelectorAll("ul li a").forEach(link => {
      link.addEventListener("click", () => {
        mainNavigation.classList.remove("open");
      });
    });
  }

  // Initialize Page Details
  loadContactInfo().catch(err => console.error(err));

  // Render Testimonials (Approved Only)
  async function renderTestimonials() {
    if (!testimonialsGrid) return;
    try {
      const reviews = await getReviews();
      const approvedReviews = reviews.filter(r => r.approved);
      testimonialsGrid.innerHTML = "";

      if (approvedReviews.length === 0) {
        testimonialsGrid.innerHTML = `<div class="cart-empty-state" style="grid-column: 1/-1;"><p>No testimonials available.</p></div>`;
        return;
      }

      approvedReviews.forEach(rev => {
        const card = document.createElement("div");
        card.className = "testimonial-card";
        
        let starsHTML = "";
        for (let i = 0; i < 5; i++) {
          const isActive = i < rev.stars ? "active" : "";
          starsHTML += `
            <svg viewBox="0 0 24 24" class="${isActive}">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          `;
        }

        card.innerHTML = `
          <div class="star-rating">${starsHTML}</div>
          <p class="testimonial-text">"${rev.text}"</p>
          <div class="testimonial-author">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" alt="${rev.author}" class="author-avatar">
            <div class="author-info">
              <div class="author-name">${rev.author}</div>
              <p>${rev.type || 'Bakery Guest'}</p>
            </div>
          </div>
        `;
        testimonialsGrid.appendChild(card);
      });
    } catch (err) {
      console.error("Failed to render testimonials:", err);
    }
  }
  renderTestimonials().catch(err => console.error(err));

  // Review Star Selector logic
  if (starsRatingSelector) {
    const stars = starsRatingSelector.querySelectorAll("svg");
    stars.forEach(star => {
      star.addEventListener("click", () => {
        const idx = parseInt(star.getAttribute("data-index"));
        selectedStarValue.value = idx;
        
        stars.forEach((s, i) => {
          if (i < idx) {
            s.classList.add("active");
            s.style.fill = "currentColor";
          } else {
            s.classList.remove("active");
            s.style.fill = "none";
          }
        });
      });
    });
    // Set default 5 star highlight on start
    stars.forEach(s => {
      s.classList.add("active");
      s.style.fill = "currentColor";
    });
  }

  // Submit Review Form
  if (submitReviewForm) {
    submitReviewForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const author = revAuthor.value.trim();
      const type = revType.value.trim();
      const text = revText.value.trim();
      const rating = parseInt(selectedStarValue.value);

      const newReview = {
        author,
        type,
        stars: rating,
        text
      };

      try {
        await submitReview(newReview);

        // Reset
        submitReviewForm.reset();
        selectedStarValue.value = 5;
        const stars = starsRatingSelector.querySelectorAll("svg");
        stars.forEach(s => {
          s.classList.add("active");
          s.style.fill = "currentColor";
        });

        showToast("Review submitted! Pending approval.", "success");
        alert("Thank you for your feedback! Your review has been submitted and will display once approved by our administrator.");
      } catch (err) {
        showToast("Failed to submit review. Try again.", "error");
      }
    });
  }

  // Render Category Filters Pills
  async function renderCategories() {
    if (!categoryFilterContainer) return;
    try {
      const products = await getProducts();
      const categories = ["All", ...new Set(products.map(p => p.category))];
      categoryFilterContainer.innerHTML = "";
      
      categories.forEach(cat => {
        const button = document.createElement("button");
        button.className = `category-pill ${cat === selectedCategory ? "active" : ""}`;
        button.textContent = cat;
        button.addEventListener("click", async () => {
          selectedCategory = cat;
          categoryFilterContainer.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
          button.classList.add("active");
          await renderProducts();
        });
        categoryFilterContainer.appendChild(button);
      });
    } catch (err) {
      console.error("Failed to render categories:", err);
    }
  }

  // Render Product Catalog
  async function renderProducts() {
    if (!productsGrid) return;
    try {
      const products = await getProducts();
      productsGrid.innerHTML = "";
      
      const filteredProducts = selectedCategory === "All" 
        ? products 
        : products.filter(p => p.category === selectedCategory);
        
      if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `<div class="cart-empty-state" style="grid-column: 1/-1;"><h3>No products available in this category.</h3></div>`;
        return;
      }

      filteredProducts.forEach(prod => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        
        const badgeHTML = prod.inStock 
          ? "" 
          : `<span class="product-badge out-of-stock">Sold Out</span>`;
          
        const actionButtonHTML = prod.inStock
          ? (prod.isCustomisable 
              ? `<button class="btn-add-cart" onclick="openConfigurator('${prod.id}')">Configure Cake</button>`
              : `<button class="btn-add-cart" onclick="addToCartDirect('${prod.id}')">Add to Cart</button>`)
          : `<button class="btn-add-cart" disabled>Sold Out</button>`;

        productCard.innerHTML = `
          ${badgeHTML}
          <div class="product-image-container">
            <img src="${prod.image}" alt="${prod.name}">
          </div>
          <div class="product-info">
            <span class="product-category">${prod.category}</span>
            <h3 class="product-title">${prod.name}</h3>
            <p class="product-desc">${prod.desc}</p>
            <div class="product-footer">
              <span class="product-price">₹${prod.price}</span>
              <div class="product-actions">
                <button class="btn-quick-view" onclick="openQuickView('${prod.id}')" title="Quick View Product">
                  <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
                ${actionButtonHTML}
              </div>
            </div>
          </div>
        `;
        productsGrid.appendChild(productCard);
      });
    } catch (err) {
      console.error("Failed to render products:", err);
    }
  }

  // Handle direct cart addition
  window.addToCartDirect = async function(productId) {
    try {
      const products = await getProducts();
      const product = products.find(p => String(p.id) === String(productId));
      if (!product || !product.inStock) return;

      const existingItem = cart.find(item => String(item.id) === String(productId) && !item.customised);
      if (existingItem) {
        existingItem.qty++;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          price: product.price,
          qty: 1,
          customised: false
        });
      }

      await updateCartUI();
      showToast(`Added ${product.name} to cart!`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  // Open Product Quick View Modal
  window.openQuickView = async function(productId) {
    try {
      const products = await getProducts();
      const product = products.find(p => String(p.id) === String(productId));
      if (!product) return;

      activeQuickViewProdId = product.id;
      qvImg.src = product.image;
      qvTitle.textContent = product.name;
      qvPrice.textContent = `₹${product.price}`;
      qvDesc.textContent = product.desc;

      if (product.inStock) {
        qvAddToCartBtn.disabled = false;
        qvAddToCartBtn.textContent = "Add to Shopping Cart";
      } else {
        qvAddToCartBtn.disabled = true;
        qvAddToCartBtn.textContent = "Sold Out";
      }

      quickViewModal.classList.add("open");
      overlayBackdrop.classList.add("open");
    } catch (err) {
      console.error("Failed to load quick view:", err);
    }
  };

  if (closeQuickViewModalBtn) {
    closeQuickViewModalBtn.addEventListener("click", () => {
      quickViewModal.classList.remove("open");
      overlayBackdrop.classList.remove("open");
    });
  }

  if (qvAddToCartBtn) {
    qvAddToCartBtn.addEventListener("click", async () => {
      if (activeQuickViewProdId) {
        try {
          const products = await getProducts();
          const product = products.find(p => String(p.id) === String(activeQuickViewProdId));
          
          if (product && product.isCustomisable) {
            quickViewModal.classList.remove("open");
            await openConfigurator(product.id);
          } else if (product) {
            await addToCartDirect(product.id);
            quickViewModal.classList.remove("open");
            overlayBackdrop.classList.remove("open");
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  // --- INTERACTIVE CAKE VISUALIZER GENERATOR ---
  function updateVisualCakeStack() {
    if (!cakeVisualContainer) return;
    
    // Clear Stack
    cakeVisualContainer.innerHTML = "";
    
    const weightVal = parseFloat(cakeWeight.value);
    const flavor = cakeFlavor.value;
    const isEggless = cakeEggless.checked;
    const message = cakeMessage.value.trim();
    const shape = cakeShape.value;

    let tierCount = 1;
    if (weightVal === 1.5 || weightVal === 2) tierCount = 2;
    if (weightVal === 3) tierCount = 3;

    // Establish Flavor Color class
    let flavorClass = "tier-chocolate";
    if (flavor === "Red Velvet") flavorClass = "tier-red-velvet";
    else if (flavor === "Butterscotch Crunch") flavorClass = "tier-butterscotch";
    else if (flavor === "Fresh Pineapple") flavorClass = "tier-pineapple";
    else if (flavor === "Choco-Hazelnut") flavorClass = "tier-hazelnut";

    // Stacking tier cylinders
    for (let i = 0; i < tierCount; i++) {
      const tierDiv = document.createElement("div");
      
      let width = 145;
      if (tierCount === 2) {
        width = i === 0 ? 145 : 110;
      } else if (tierCount === 3) {
        if (i === 0) width = 145;
        if (i === 1) width = 115;
        if (i === 2) width = 85;
      }

      tierDiv.className = `cake-visual-tier ${flavorClass}`;
      tierDiv.style.width = `${width}px`;
      tierDiv.style.zIndex = tierCount - i;

      // Apply border radius according to shape
      if (shape === "Square") {
        tierDiv.style.borderRadius = "4px";
      } else if (shape === "Heart") {
        tierDiv.style.borderRadius = "30px 30px 15px 15px / 20px 20px 15px 15px";
      } else {
        tierDiv.style.borderRadius = "50px / 18px";
      }

      // On top tier, print icing message, eggless leaf and toppings
      if (i === tierCount - 1) {
        if (message) {
          const icingMsg = document.createElement("span");
          icingMsg.className = "cake-icing-message";
          icingMsg.textContent = message;
          tierDiv.appendChild(icingMsg);
        }
        
        if (isEggless) {
          const leafBadge = document.createElement("div");
          leafBadge.className = "eggless-leaf-indicator";
          leafBadge.title = "Eggless";
          leafBadge.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
          `;
          tierDiv.appendChild(leafBadge);
        }

        // Toppings visualizer overlays
        if (topSprinkles.checked) {
          const sprinklesOverlay = document.createElement("div");
          sprinklesOverlay.className = "sprinkles-overlay";
          if (shape === "Square") sprinklesOverlay.style.borderRadius = "4px";
          else if (shape === "Heart") sprinklesOverlay.style.borderRadius = "30px 30px 15px 15px / 20px 20px 15px 15px";
          else sprinklesOverlay.style.borderRadius = "50px / 18px";
          tierDiv.appendChild(sprinklesOverlay);
        }

        if (topCherries.checked) {
          const cherriesOverlay = document.createElement("div");
          cherriesOverlay.className = "cherries-overlay";
          for (let c = 0; c < 3; c++) {
            const cherryNode = document.createElement("div");
            cherryNode.className = "cherry-node";
            cherriesOverlay.appendChild(cherryNode);
          }
          tierDiv.appendChild(cherriesOverlay);
        }

        if (topCandles.checked) {
          const candlesOverlay = document.createElement("div");
          candlesOverlay.className = "candles-overlay";
          for (let k = 0; k < 3; k++) {
            const candleNode = document.createElement("div");
            candleNode.className = "candle-node";
            const flameNode = document.createElement("div");
            flameNode.className = "candle-flame";
            candleNode.appendChild(flameNode);
            candlesOverlay.appendChild(candleNode);
          }
          tierDiv.appendChild(candlesOverlay);
        }
      }
      
      cakeVisualContainer.appendChild(tierDiv);
    }
  }

  // Configurator Wizard Step Management
  let currentWizardStep = 1;

  function showWizardStep(step) {
    currentWizardStep = step;
    
    configPanelStep1.style.display = step === 1 ? "block" : "none";
    configPanelStep2.style.display = step === 2 ? "block" : "none";
    configPanelStep3.style.display = step === 3 ? "block" : "none";

    indStep1.classList.toggle("active", step >= 1);
    indStep2.classList.toggle("active", step >= 2);
    indStep3.classList.toggle("active", step >= 3);

    indStep1.querySelector(".step-num").style.background = step >= 1 ? "var(--accent-gold)" : "#D1C7BD";
    indStep2.querySelector(".step-num").style.background = step >= 2 ? "var(--accent-gold)" : "#D1C7BD";
    indStep3.querySelector(".step-num").style.background = step >= 3 ? "var(--accent-gold)" : "#D1C7BD";

    let progressWidth = "0%";
    if (step === 2) progressWidth = "50%";
    if (step === 3) progressWidth = "100%";
    wizardProgressLine.style.width = progressWidth;

    prevStepBtn.style.visibility = step === 1 ? "hidden" : "visible";
    if (step === 3) {
      nextStepBtn.style.display = "none";
      addConfiguredToCartBtn.style.display = "block";
    } else {
      nextStepBtn.style.display = "block";
      addConfiguredToCartBtn.style.display = "none";
    }
  }

  prevStepBtn.addEventListener("click", () => {
    if (currentWizardStep > 1) {
      showWizardStep(currentWizardStep - 1);
    }
  });

  nextStepBtn.addEventListener("click", () => {
    if (currentWizardStep < 3) {
      showWizardStep(currentWizardStep + 1);
    }
  });

  // Open Configurator Modal for customisable items (cakes)
  window.openConfigurator = async function(productId) {
    try {
      const products = await getProducts();
      const product = products.find(p => String(p.id) === String(productId));
      if (!product) return;

      configCakeId.value = product.id;
      configCakeImg.src = product.image;
      configCakeTitle.textContent = product.name;
      configCakeBasePrice.textContent = `Base: ₹${product.price}`;
      
      // Reset Form Options
      cakeShape.value = "Round";
      cakeWeight.value = "1";
      cakeFlavor.value = "Chocolate Truffle";
      cakeEggless.checked = false;
      cakeMessage.value = "";
      topCherries.checked = false;
      topSprinkles.checked = false;
      topCandles.checked = false;
      
      showWizardStep(1);
      await calculateConfigPrice();
      updateVisualCakeStack();
      
      configuratorModal.classList.add("open");
      overlayBackdrop.classList.add("open");
    } catch (err) {
      console.error(err);
    }
  };

  // Live updates to cake configuration prices
  async function calculateConfigPrice() {
    try {
      const products = await getProducts();
      const product = products.find(p => String(p.id) === String(configCakeId.value));
      if (!product) return;

      let total = product.price;
      const weightOpt = cakeWeight.options[cakeWeight.selectedIndex];
      const flavorOpt = cakeFlavor.options[cakeFlavor.selectedIndex];
      const shapeOpt = cakeShape.options[cakeShape.selectedIndex];
      
      total += parseFloat(weightOpt.getAttribute("data-price") || 0);
      total += parseFloat(flavorOpt.getAttribute("data-price") || 0);
      total += parseFloat(shapeOpt.getAttribute("data-price") || 0);
      
      if (cakeEggless.checked) total += 100;

      configTotalPrice.textContent = `₹${total}`;
    } catch (err) {
      console.error(err);
    }
  }

  // Listeners for changes in cake configurator
  cakeShape.addEventListener("change", async () => {
    await calculateConfigPrice();
    updateVisualCakeStack();
  });
  cakeWeight.addEventListener("change", async () => {
    await calculateConfigPrice();
    updateVisualCakeStack();
  });
  cakeFlavor.addEventListener("change", async () => {
    await calculateConfigPrice();
    updateVisualCakeStack();
  });
  cakeEggless.addEventListener("change", async () => {
    await calculateConfigPrice();
    updateVisualCakeStack();
  });
  cakeMessage.addEventListener("input", updateVisualCakeStack);
  topCherries.addEventListener("change", updateVisualCakeStack);
  topSprinkles.addEventListener("change", updateVisualCakeStack);
  topCandles.addEventListener("change", updateVisualCakeStack);

  // Close Config Modal Action
  if (closeConfigModalBtn) {
    closeConfigModalBtn.addEventListener("click", () => {
      configuratorModal.classList.remove("open");
      overlayBackdrop.classList.remove("open");
    });
  }

  // Add customized configured cake to shopping cart
  if (addConfiguredToCartBtn) {
    addConfiguredToCartBtn.addEventListener("click", async () => {
      try {
        const products = await getProducts();
        const product = products.find(p => String(p.id) === String(configCakeId.value));
        if (!product) return;

        const weightVal = cakeWeight.value;
        const flavorVal = cakeFlavor.value;
        const shapeVal = cakeShape.value;
        const isEggless = cakeEggless.checked ? "Eggless (+₹100)" : "Standard";
        const messageText = cakeMessage.value.trim() || "No Message";
        
        let toppingsList = [];
        if (topCherries.checked) toppingsList.push("Cherries");
        if (topSprinkles.checked) toppingsList.push("Sprinkles");
        if (topCandles.checked) toppingsList.push("Candles");
        const toppingsString = toppingsList.length > 0 ? toppingsList.join(", ") : "None";

        // Compute final customized price
        let itemPrice = product.price;
        itemPrice += parseFloat(cakeWeight.options[cakeWeight.selectedIndex].getAttribute("data-price") || 0);
        itemPrice += parseFloat(cakeFlavor.options[cakeFlavor.selectedIndex].getAttribute("data-price") || 0);
        itemPrice += parseFloat(cakeShape.options[cakeShape.selectedIndex].getAttribute("data-price") || 0);
        if (cakeEggless.checked) itemPrice += 100;

        // Cart matching
        cart.push({
          id: "custom_" + Date.now(),
          name: product.name,
          category: product.category,
          image: product.image,
          price: itemPrice,
          qty: 1,
          customised: true,
          config: {
            weight: `${weightVal} kg`,
            flavor: flavorVal,
            shape: shapeVal,
            eggless: isEggless,
            message: messageText,
            toppings: toppingsString
          }
        });

        await updateCartUI();
        configuratorModal.classList.remove("open");
        overlayBackdrop.classList.remove("open");
        showToast(`Customised ${product.name} added to cart!`);
      } catch (err) {
        console.error(err);
      }
    });
  }

  // --- SHOPPING CART MANAGEMENT UTILS ---
  window.removeFromCart = async function(index) {
    const item = cart[index];
    cart.splice(index, 1);
    await updateCartUI();
    showToast(`Removed ${item.name} from cart.`, "error");
  };

  window.adjustQty = async function(index, amount) {
    cart[index].qty += amount;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    await updateCartUI();
  };

  // Calculate & Refresh Shopping Cart Sidebar UI
  async function updateCartUI() {
    try {
      cartItemsList.innerHTML = "";
      
      let subtotal = 0;
      let itemCount = 0;

      if (cart.length === 0) {
        cartItemsList.innerHTML = `
          <div class="cart-empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <p>Your shopping cart is empty.</p>
          </div>
        `;
        checkoutBtn.disabled = true;
        cartBadgeCount.style.display = "none";
      } else {
        checkoutBtn.disabled = false;
        
        cart.forEach((item, index) => {
          subtotal += item.price * item.qty;
          itemCount += item.qty;

          const cartItemDiv = document.createElement("div");
          cartItemDiv.className = "cart-item";

          let metaLabel = "";
          if (item.customised) {
            metaLabel = `<div class="cart-item-meta">${item.config.shape} • ${item.config.weight} • ${item.config.flavor} • ${item.config.eggless} <br> Toppings: ${item.config.toppings} <br> Message: "${item.config.message}"</div>`;
          } else {
            metaLabel = `<div class="cart-item-meta">${item.category}</div>`;
          }

          cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
              <h4 class="cart-item-title">${item.name}</h4>
              ${metaLabel}
              <span class="cart-item-price">₹${item.price} each</span>
            </div>
            <div class="cart-item-quantity">
              <button class="quantity-btn" onclick="adjustQty(${index}, -1)">-</button>
              <span class="quantity-value">${item.qty}</span>
              <button class="quantity-btn" onclick="adjustQty(${index}, 1)">+</button>
            </div>
            <button class="btn-remove-item" onclick="removeFromCart(${index})" aria-label="Remove item">
              <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          `;
          cartItemsList.appendChild(cartItemDiv);
        });

        cartBadgeCount.textContent = itemCount;
        cartBadgeCount.style.display = "flex";
      }

      const settings = await getSettings();
      const delivery = subtotal > 0 ? settings.deliveryFee : 0;
      let discount = 0;

      if (appliedPromo && subtotal > 0) {
        discount = (subtotal * appliedPromo.discount) / 100;
        discountRow.style.display = "flex";
        discountPercentage.textContent = appliedPromo.discount;
        cartDiscount.textContent = `-₹${discount.toFixed(2)}`;
      } else {
        discountRow.style.display = "none";
      }

      const grandTotal = subtotal - discount + delivery;

      cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
      cartDeliveryFee.textContent = `₹${delivery.toFixed(2)}`;
      cartTotal.textContent = `₹${grandTotal.toFixed(2)}`;
    } catch (err) {
      console.error("Failed to update cart UI:", err);
    }
  }

  // Sidebar Toggles Listeners
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener("click", () => {
      cartSidebar.classList.add("open");
      overlayBackdrop.classList.add("open");
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartSidebar.classList.remove("open");
      overlayBackdrop.classList.remove("open");
    });
  }

  if (overlayBackdrop) {
    overlayBackdrop.addEventListener("click", () => {
      cartSidebar.classList.remove("open");
      quickViewModal.classList.remove("open");
      configuratorModal.classList.remove("open");
      checkoutModal.classList.remove("open");
      spinWheelModal.classList.remove("open");
      invoiceModal.classList.remove("open");
      overlayBackdrop.classList.remove("open");
    });
  }

  // Verify Discount Codes
  applyPromoBtn.addEventListener("click", async () => {
    const code = promoCodeInput.value.trim().toUpperCase();
    if (!code) return;

    try {
      const promos = await getPromos();
      const matchingPromo = promos.find(p => p.code === code && p.active);

      if (matchingPromo) {
        appliedPromo = matchingPromo;
        promoStatusMessage.textContent = `Promo Code Applied! Enjoy ${matchingPromo.discount}% off.`;
        promoStatusMessage.className = "promo-status-message success";
        await updateCartUI();
      } else {
        appliedPromo = null;
        promoStatusMessage.textContent = "Invalid or expired promo code.";
        promoStatusMessage.className = "promo-status-message error";
        await updateCartUI();
      }
    } catch (err) {
      console.error(err);
    }
  });

  // Open Checkout Modal Form
  checkoutBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
    checkoutModal.classList.add("open");
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById("deliveryDate").min = tomorrow.toISOString().split("T")[0];
    document.getElementById("deliveryDate").value = tomorrow.toISOString().split("T")[0];
  });

  closeCheckoutModalBtn.addEventListener("click", () => {
    checkoutModal.classList.remove("open");
    overlayBackdrop.classList.remove("open");
  });

  let activeInvoiceWhatsAppUrl = "";

  // Submit Order via Invoice Generation
  submitOrderBtn.addEventListener("click", async () => {
    if (!checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();
      return;
    }

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const address = document.getElementById("custAddress").value.trim();
    const delivDate = document.getElementById("deliveryDate").value;
    const delivTime = document.getElementById("deliveryTime").value;
    const notes = document.getElementById("orderNotes").value.trim();

    try {
      const settings = await getSettings();
      const orderDateStr = new Date().toISOString().split("T")[0];

      // Compute prices
      let subtotal = 0;
      cart.forEach(item => {
        subtotal += item.price * item.qty;
      });

      let discount = 0;
      if (appliedPromo) {
        discount = (subtotal * appliedPromo.discount) / 100;
      }

      const baseAmount = subtotal - discount;
      const tax = baseAmount * 0.05;
      const finalTotal = baseAmount + settings.deliveryFee + tax;

      // Submit order to API backend
      const orderObject = {
        custName: name,
        custPhone: phone,
        custAddress: address,
        deliveryDate: delivDate,
        deliveryTime: delivTime,
        notes: notes,
        items: cart,
        subtotal: subtotal,
        discount: discount,
        deliveryFee: settings.deliveryFee,
        tax: tax,
        grandTotal: finalTotal
      };
      
      const orderResult = await createOrder(orderObject);
      const refId = orderResult.ref_id; // Retreived from database!

      // Build invoice HTML table
      invoiceItemsBody.innerHTML = "";
      cart.forEach(item => {
        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid var(--border-color)";
        
        let metaDetails = "";
        if (item.customised) {
          metaDetails = `<div style="font-size: 0.75rem; color: var(--text-light-cocoa); margin-top: 2px;">${item.config.shape} • ${item.config.weight} • ${item.config.flavor} • ${item.config.eggless} <br> Toppings: ${item.config.toppings} <br> Message: "${item.config.message}"</div>`;
        } else {
          metaDetails = `<div style="font-size: 0.75rem; color: var(--text-light-cocoa); margin-top: 2px;">${item.category}</div>`;
        }

        tr.innerHTML = `
          <td style="padding: 8px 0; text-align: left;">
            <strong>${item.name}</strong>
            ${metaDetails}
          </td>
          <td style="padding: 8px 0; text-align: right;">${item.qty}</td>
          <td style="padding: 8px 0; text-align: right;">₹${(item.price * item.qty).toFixed(2)}</td>
        `;
        invoiceItemsBody.appendChild(tr);
      });

      // Populate billing meta
      invoiceDate.textContent = `Date: ${orderDateStr}`;
      invCustomerName.textContent = name;
      invCustomerPhone.textContent = phone;
      invRefId.textContent = refId;
      invPreferredTime.textContent = delivTime;

      invSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
      if (discount > 0) {
        invDiscountRow.style.display = "flex";
        invDiscountValue.textContent = `-₹${discount.toFixed(2)}`;
      } else {
        invDiscountRow.style.display = "none";
      }
      invDeliveryFee.textContent = `₹${settings.deliveryFee.toFixed(2)}`;
      invTax.textContent = `₹${tax.toFixed(2)}`;
      invGrandTotal.textContent = `₹${finalTotal.toFixed(2)}`;

      // Build WhatsApp message
      let messageText = `*🍰 NEW CAKE ORDER - ANITA'S BAKERS 🍰*\n\n`;
      messageText += `*Reference ID:* ${refId}\n`;
      messageText += `*Customer Details:*\n`;
      messageText += `• *Name:* ${name}\n`;
      messageText += `• *Contact:* ${phone}\n`;
      messageText += `• *Delivery Address:* ${address}\n`;
      messageText += `• *Scheduled Time:* ${delivDate} (${delivTime})\n\n`;

      messageText += `*Order Items Summary:*\n`;
      cart.forEach((item, index) => {
        const itemCost = item.price * item.qty;
        messageText += `*${index + 1}. ${item.name}* (x${item.qty}) - ₹${itemCost}\n`;
        if (item.customised) {
          messageText += `   _Shape: ${item.config.shape}_\n`;
          messageText += `   _Flavor: ${item.config.flavor}_\n`;
          messageText += `   _Weight: ${item.config.weight}_\n`;
          messageText += `   _Type: ${item.config.eggless}_\n`;
          messageText += `   _Toppings: ${item.config.toppings}_\n`;
          messageText += `   _Text on Cake: "${item.config.message}"_\n`;
        }
      });

      messageText += `\n*Billing Summary:*`;
      messageText += `\n• *Subtotal:* ₹${subtotal.toFixed(2)}`;
      if (discount > 0) messageText += `\n• *Discount:* -₹${discount.toFixed(2)}`;
      messageText += `\n• *Delivery Charges:* ₹${settings.deliveryFee.toFixed(2)}`;
      messageText += `\n• *Taxes (5% GST):* ₹${tax.toFixed(2)}`;
      messageText += `\n• *Grand Total:* *₹${finalTotal.toFixed(2)}*`;

      if (notes) {
        messageText += `\n\n*Special Notes:* ${notes}`;
      }

      messageText += `\n\n_Thank you for ordering with Anita's Bakers! Please reply to confirm billing and payment details._`;

      const targetWhatsApp = settings.whatsApp.replace(/[^0-9]/g, "");
      const encodedText = encodeURIComponent(messageText);
      activeInvoiceWhatsAppUrl = `https://api.whatsapp.com/send?phone=${targetWhatsApp}&text=${encodedText}`;

      // Close checkout modal, show invoice modal
      checkoutModal.classList.remove("open");
      invoiceModal.classList.add("open");
    } catch (err) {
      console.error(err);
      showToast("Failed to place order. Try again.", "error");
    }
  });

  // Print Invoice Action
  printInvoiceBtn.addEventListener("click", () => {
    window.print();
  });

  // Open WhatsApp Checkout Action
  sendInvoiceWhatsAppBtn.addEventListener("click", async () => {
    cart = [];
    appliedPromo = null;
    promoCodeInput.value = "";
    promoStatusMessage.textContent = "";
    checkoutForm.reset();
    invoiceModal.classList.remove("open");
    overlayBackdrop.classList.remove("open");
    await updateCartUI();
    if (activeInvoiceWhatsAppUrl) {
      window.open(activeInvoiceWhatsAppUrl, "_blank");
    }
  });

  // Close Invoice modal
  closeInvoiceModalBtn.addEventListener("click", async () => {
    cart = [];
    appliedPromo = null;
    promoCodeInput.value = "";
    promoStatusMessage.textContent = "";
    checkoutForm.reset();
    invoiceModal.classList.remove("open");
    overlayBackdrop.classList.remove("open");
    await updateCartUI();
  });

  // --- CUSTOM INQUIRY FILE ENCODING ---
  inqImageFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("Design photo should be under 2MB.", "error");
      inqImageFile.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      inqImageBase64.value = event.target.result;
      inqPreviewImg.src = event.target.result;
      inqUploadPlaceholder.style.display = "none";
      inqPreviewContainer.style.display = "flex";
    };
    reader.readAsDataURL(file);
  });

  btnRemoveInqPreview.addEventListener("click", () => {
    inqImageFile.value = "";
    inqImageBase64.value = "";
    inqPreviewImg.src = "";
    inqUploadPlaceholder.style.display = "block";
    inqPreviewContainer.style.display = "none";
  });

  cakeInquiryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = inqName.value.trim();
    const phone = inqPhone.value.trim();
    const tiers = inqTiers.value;
    const shape = inqShape.value;
    const desc = inqDesc.value.trim();
    const imgBase64 = inqImageBase64.value;

    const newInq = {
      date: new Date().toISOString().split("T")[0],
      name,
      phone,
      tiers,
      shape,
      desc,
      image: imgBase64 || "https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=200&auto=format&fit=crop"
    };

    try {
      await submitInquiry(newInq);

      cakeInquiryForm.reset();
      inqImageBase64.value = "";
      inqPreviewImg.src = "";
      inqUploadPlaceholder.style.display = "block";
      inqPreviewContainer.style.display = "none";

      showToast("Inquiry submitted! We will quote you soon.", "success");
      alert("Thank you! Your Custom Design Consultation Inquiry has been received. Our bakers will contact you shortly.");
    } catch (err) {
      console.error(err);
      showToast("Failed to submit inquiry. Try again.", "error");
    }
  });

  // --- SPIN THE WHEEL GAME LOGIC ---
  let isSpinning = false;

  function addPromoCodeToDB(code, discount) {
    // Spin wheel promo codes are already pre-seeded in the database
  }

  spinWheelTrigger.addEventListener("click", () => {
    spinWheelModal.classList.add("open");
    overlayBackdrop.classList.add("open");
    
    if (sessionStorage.getItem("anitas_bakers_spun") === "true") {
      spinWheelBtn.disabled = true;
      spinWheelBtn.textContent = "Already Spun!";
    }
  });

  closeSpinWheelModalBtn.addEventListener("click", () => {
    spinWheelModal.classList.remove("open");
    overlayBackdrop.classList.remove("open");
  });

  spinWheelBtn.addEventListener("click", () => {
    if (isSpinning) return;
    isSpinning = true;

    // Define segments
    const segments = [
      { text: "10% Off", code: "ANITA10", discount: 10 },
      { text: "Oops! Try again next time.", code: null },
      { text: "15% Off", code: "WELCOME15", discount: 15 },
      { text: "Free Gift on order!", code: "FREEGIFT", discount: 0 },
      { text: "5% Off", code: "SPIN5", discount: 5 },
      { text: "Free Delivery!", code: "FREEDEL", discount: 0 },
      { text: "20% Off Super Discount!", code: "ANITA20", discount: 20 },
      { text: "No Luck today!", code: null }
    ];

    // Pick target segment index
    const targetIndex = Math.floor(Math.random() * segments.length);
    
    const degrees = 360 * 5 + (360 - (targetIndex * 45 + 22.5));
    
    const wheelCanvasWrap = document.querySelector(".wheel-canvas-wrap");
    if (wheelCanvasWrap) {
      wheelCanvasWrap.style.transform = `rotate(${degrees}deg)`;
    }

    spinWheelBtn.disabled = true;
    spinWheelBtn.textContent = "Spinning...";

    setTimeout(() => {
      isSpinning = false;
      const wonSegment = segments[targetIndex];
      
      if (wonSegment.code) {
        addPromoCodeToDB(wonSegment.code, wonSegment.discount);
        
        appliedPromo = { code: wonSegment.code, discount: wonSegment.discount };
        promoCodeInput.value = wonSegment.code;
        promoStatusMessage.textContent = `Promo Code ${wonSegment.code} (${wonSegment.discount}% Off) auto-applied from Spin Wheel!`;
        promoStatusMessage.className = "promo-status-message success";
        updateCartUI();
        
        navigator.clipboard.writeText(wonSegment.code).catch(err => console.log(err));
        
        winCodeDisplay.textContent = wonSegment.code;
        spinResultText.innerHTML = `You won <strong>${wonSegment.text}</strong> with code: <strong style="color: var(--accent-gold); font-size: 1.25rem; font-weight: 800; letter-spacing: 1px;">${wonSegment.code}</strong>`;
        spinResultArea.style.display = "block";
        showToast(`Congratulations! You won ${wonSegment.code}`);
      } else {
        spinResultText.innerHTML = `Ah! <strong>${wonSegment.text}</strong>`;
        spinResultArea.style.display = "block";
        showToast("Better luck next time!", "error");
      }
      
      spinWheelBtn.textContent = "Spun!";
      sessionStorage.setItem("anitas_bakers_spun", "true");
    }, 6000);
  });

  // --- ORDER TRACKER GAME LOGIC ---
  function updateTimelineUI(status) {
    const steps = ["Placed", "Baking", "Decorating", "Shipped", "Delivered"];
    const stepElements = [stepPlaced, stepBaking, stepDecorating, stepShipping, stepDelivered];
    
    const currentIndex = steps.indexOf(status);
    
    stepElements.forEach((el, index) => {
      if (el) {
        el.classList.remove("active", "completed");
        if (index < currentIndex) {
          el.classList.add("completed");
        } else if (index === currentIndex) {
          if (status === "Delivered") {
            el.classList.add("completed");
          } else {
            el.classList.add("active");
          }
        }
      }
    });

    let fillPercent = 0;
    if (currentIndex >= 0) {
      fillPercent = (currentIndex / (steps.length - 1)) * 100;
    }
    if (timelineProgressFill) {
      timelineProgressFill.style.width = `${fillPercent}%`;
    }
  }

  if (trackOrderBtn) {
    trackOrderBtn.addEventListener("click", async () => {
      const refId = orderTrackerInput.value.trim().toUpperCase();
      if (!refId) return;

      try {
        const order = await trackOrder(refId);

        trackerError.style.display = "none";
        trackerVisualArea.style.display = "block";
        trackerCustName.textContent = `Order Status for ${order.custName}`;
        
        let summary = "";
        if (order.items && Array.isArray(order.items)) {
          summary = order.items.map(item => `${item.name} (x${item.qty})`).join(", ");
        }
        trackerOrderItems.textContent = `Items: ${summary}`;
        updateTimelineUI(order.status);
      } catch (err) {
        trackerError.textContent = "Order Reference ID not found. Please check and try again.";
        trackerError.style.display = "block";
        trackerVisualArea.style.display = "none";
      }
    });
  }

  renderCategories().catch(err => console.error("Error rendering categories:", err));
  renderProducts().catch(err => console.error("Error rendering products:", err));
}
