// --- ANITA'S BAKERS ADMINISTRATIVE DASHBOARD LOGIC ---

if (document.getElementById("adminLockScreen")) {
  
  // Login DOM Elements
  const adminLockScreen = document.getElementById("adminLockScreen");
  const lockScreenForm = document.getElementById("lockScreenForm");
  const adminPasscodeInput = document.getElementById("adminPasscodeInput");
  const lockScreenError = document.getElementById("lockScreenError");
  
  // Dashboard Tabs Switches
  const navItems = document.querySelectorAll(".admin-nav-item");
  const sections = document.querySelectorAll(".admin-section");
  const adminLogoutBtn = document.getElementById("adminLogoutBtn");

  // Admin Orders DOM Elements
  const adminOrdersTableBody = document.getElementById("adminOrdersTableBody");
  const orderSearchInput = document.getElementById("orderSearchInput");
  const adminInvoiceModal = document.getElementById("adminInvoiceModal");
  const closeAdminInvModalBtn = document.getElementById("closeAdminInvModalBtn");
  const adminPrintInvoiceArea = document.getElementById("adminPrintInvoiceArea");
  const adminPrintInvBtn = document.getElementById("adminPrintInvBtn");
  const liveVisitorsCount = document.getElementById("liveVisitorsCount");
  
  // Stats Counters
  const statTotalProducts = document.getElementById("statTotalProducts");
  const statOutOfStock = document.getElementById("statOutOfStock");
  const statTotalInquiries = document.getElementById("statTotalInquiries");
  const statTotalReviews = document.getElementById("statTotalReviews");
  
  // Settings Form
  const bakerySettingsForm = document.getElementById("bakerySettingsForm");
  const setWhatsApp = document.getElementById("setWhatsApp");
  const setDeliveryFee = document.getElementById("setDeliveryFee");
  const setAddress = document.getElementById("setAddress");
  const setHours = document.getElementById("setHours");
  const setEnableAnnounce = document.getElementById("setEnableAnnounce");
  const setAnnounceText = document.getElementById("setAnnounceText");
  const setPasscode = document.getElementById("setPasscode");
  
  // Products Section DOMs
  const adminProductsTableBody = document.getElementById("adminProductsTableBody");
  const productSearchInput = document.getElementById("productSearchInput");
  const openAddProductModalBtn = document.getElementById("openAddProductModalBtn");
  const productModal = document.getElementById("productModal");
  const productModalTitle = document.getElementById("productModalTitle");
  const closeProductModalBtn = document.getElementById("closeProductModalBtn");
  const productForm = document.getElementById("productForm");
  const saveProductBtn = document.getElementById("saveProductBtn");
  const editProductId = document.getElementById("editProductId");
  const prodName = document.getElementById("prodName");
  const prodCategory = document.getElementById("prodCategory");
  const prodPrice = document.getElementById("prodPrice");
  const prodDesc = document.getElementById("prodDesc");
  const prodImageFile = document.getElementById("prodImageFile");
  const prodImageBase64 = document.getElementById("prodImageBase64");
  const prodIsCustomisable = document.getElementById("prodIsCustomisable");
  const prodInStock = document.getElementById("prodInStock");
  const uploadPlaceholder = document.getElementById("uploadPlaceholder");
  const uploadPreviewContainer = document.getElementById("uploadPreviewContainer");
  const uploadPreviewImg = document.getElementById("uploadPreviewImg");
  const btnRemovePreview = document.getElementById("btnRemovePreview");
  
  // Inquiries Section DOMs
  const adminInquiriesTableBody = document.getElementById("adminInquiriesTableBody");
  const inquiryImageModal = document.getElementById("inquiryImageModal");
  const closeInqImageModalBtn = document.getElementById("closeInqImageModalBtn");
  const inqLargeImg = document.getElementById("inqLargeImg");

  // Reviews Mod Section DOMs
  const adminReviewsTableBody = document.getElementById("adminReviewsTableBody");

  // Promos Section DOMs
  const adminPromosTableBody = document.getElementById("adminPromosTableBody");
  const openAddPromoModalBtn = document.getElementById("openAddPromoModalBtn");
  const promoModal = document.getElementById("promoModal");
  const promoModalTitle = document.getElementById("promoModalTitle");
  const closePromoModalBtn = document.getElementById("closePromoModalBtn");
  const promoForm = document.getElementById("promoForm");
  const savePromoBtn = document.getElementById("savePromoBtn");
  const editPromoId = document.getElementById("editPromoId");
  const promoCode = document.getElementById("promoCode");
  const promoDiscount = document.getElementById("promoDiscount");
  const promoActive = document.getElementById("promoActive");

  // Admin Overlay Backdrop
  const adminOverlay = document.getElementById("adminOverlay");
  
  // Toast Alert Notification
  const adminToast = document.getElementById("adminToast");
  const adminToastMessage = document.getElementById("adminToastMessage");

  function showAdminToast(message, type = "success") {
    if (adminToastMessage && adminToast) {
      adminToastMessage.textContent = message;
      adminToast.className = `toast-container ${type} show`;
      setTimeout(() => {
        adminToast.classList.remove("show");
      }, 2800);
    }
  }

  // --- Session Control ---
  function checkAuth() {
    if (getAdminToken()) {
      adminLockScreen.style.display = "none";
      loadAdminDashboard().catch(err => console.error(err));
    } else {
      adminLockScreen.style.display = "flex";
    }
  }

  // Passcode verification login
  lockScreenForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const enteredCode = adminPasscodeInput.value.trim();

    try {
      const res = await adminLogin(enteredCode);
      if (res.success && res.data.token) {
        lockScreenError.style.display = "none";
        adminPasscodeInput.value = "";
        adminLockScreen.style.transform = "scale(1.1)";
        adminLockScreen.style.opacity = "0";
        setTimeout(async () => {
          adminLockScreen.style.display = "none";
          adminLockScreen.style.transform = "none";
          adminLockScreen.style.opacity = "1";
          await loadAdminDashboard();
        }, 400);
        showAdminToast("Dashboard unlocked successfully.");
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      lockScreenError.style.display = "block";
      adminPasscodeInput.value = "";
      adminPasscodeInput.focus();
    }
  });

  // Logout admin dashboard
  adminLogoutBtn.addEventListener("click", () => {
    removeAdminToken();
    checkAuth();
    showAdminToast("Session closed.", "error");
  });

  // --- Sidebar Tab switcher ---
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(n => n.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      item.classList.add("active");
      const targetSection = document.getElementById(item.getAttribute("data-target"));
      if (targetSection) targetSection.classList.add("active");
    });
  });

  // --- Load Admin Operations ---
  async function loadAdminDashboard() {
    try {
      await refreshStatsCounters();
      await populateSettingsForm();
      await renderAdminProducts();
      await renderAdminInquiries();
      await renderAdminReviews();
      await renderAdminPromos();
      await renderAdminOrders();
      await renderAdminLeads();
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      showAdminToast("Failed to load dashboard data. Please log in again.", "error");
      removeAdminToken();
      checkAuth();
    }
  }

  // Stat Indicators Refresh
  async function refreshStatsCounters() {
    try {
      const products = await getProducts();
      const inquiries = await getInquiries();
      const reviews = await getAllReviews();

      if (statTotalProducts) statTotalProducts.textContent = products.length;
      if (statOutOfStock) statOutOfStock.textContent = products.filter(p => !p.inStock).length;
      if (statTotalInquiries) statTotalInquiries.textContent = inquiries.length;
      if (statTotalReviews) statTotalReviews.textContent = reviews.length;
    } catch (err) {
      console.error(err);
    }
  }

  // settings configurations values mapping
  async function populateSettingsForm() {
    try {
      const settings = await getSettings();
      if (setWhatsApp) setWhatsApp.value = settings.whatsApp;
      if (setDeliveryFee) setDeliveryFee.value = settings.deliveryFee;
      if (setAddress) setAddress.value = settings.address;
      if (setHours) setHours.value = settings.hours;
      if (setEnableAnnounce) setEnableAnnounce.checked = settings.showAnnouncement !== false;
      if (setAnnounceText) setAnnounceText.value = settings.announcementText || "";
      
      // Website Content Fields
      const setThemeColor = document.getElementById("setThemeColor");
      const setHeroTitle = document.getElementById("setHeroTitle");
      const setHeroSubtitle = document.getElementById("setHeroSubtitle");
      const setHeroDesc = document.getElementById("setHeroDesc");
      const setAboutTitle = document.getElementById("setAboutTitle");
      const setAboutDesc = document.getElementById("setAboutDesc");
      const setFooterAbout = document.getElementById("setFooterAbout");
      const setFacebookUrl = document.getElementById("setFacebookUrl");
      const setInstagramUrl = document.getElementById("setInstagramUrl");

      if (setThemeColor) setThemeColor.value = settings.themeColor || "#C5A059";
      if (setHeroTitle) setHeroTitle.value = settings.heroTitle || "";
      if (setHeroSubtitle) setHeroSubtitle.value = settings.heroSubtitle || "";
      if (setHeroDesc) setHeroDesc.value = settings.heroDesc || "";
      if (setAboutTitle) setAboutTitle.value = settings.aboutTitle || "";
      if (setAboutDesc) setAboutDesc.value = settings.aboutDesc || "";
      if (setFooterAbout) setFooterAbout.value = settings.footerAbout || "";
      if (setFacebookUrl) setFacebookUrl.value = settings.facebookUrl || "";
      if (setInstagramUrl) setInstagramUrl.value = settings.instagramUrl || "";

      if (setPasscode) setPasscode.value = "";
    } catch (err) {
      console.error(err);
    }
  }

  // Update Bakery Settings
  bakerySettingsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const settings = await getSettings();
      
      settings.whatsApp = setWhatsApp.value.trim().replace(/[^0-9]/g, "");
      settings.deliveryFee = parseFloat(setDeliveryFee.value);
      settings.address = setAddress.value.trim();
      settings.hours = setHours.value.trim();
      settings.showAnnouncement = setEnableAnnounce.checked;
      settings.announcementText = setAnnounceText.value.trim();

      // Website Content Fields
      settings.themeColor = document.getElementById("setThemeColor")?.value || "";
      settings.heroTitle = document.getElementById("setHeroTitle")?.value.trim() || "";
      settings.heroSubtitle = document.getElementById("setHeroSubtitle")?.value.trim() || "";
      settings.heroDesc = document.getElementById("setHeroDesc")?.value.trim() || "";
      settings.aboutTitle = document.getElementById("setAboutTitle")?.value.trim() || "";
      settings.aboutDesc = document.getElementById("setAboutDesc")?.value.trim() || "";
      settings.footerAbout = document.getElementById("setFooterAbout")?.value.trim() || "";
      settings.facebookUrl = document.getElementById("setFacebookUrl")?.value.trim() || "";
      settings.instagramUrl = document.getElementById("setInstagramUrl")?.value.trim() || "";

      if (setPasscode.value.trim()) {
        settings.passcode = setPasscode.value.trim();
        setPasscode.value = "";
      }

      await updateSettings(settings);
      await refreshStatsCounters();
      showAdminToast("Bakery configuration settings saved!");
    } catch (err) {
      console.error(err);
      showAdminToast("Failed to save configuration settings.", "error");
    }
  });

  // --- PRODUCT MANAGEMENT LISTS ---
  const apiDeleteProduct = deleteProduct;

  async function renderAdminProducts(filterText = "") {
    try {
      const products = await getProducts();
      adminProductsTableBody.innerHTML = "";
      
      const searchString = filterText.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchString) || 
        p.category.toLowerCase().includes(searchString)
      );

      if (filtered.length === 0) {
        adminProductsTableBody.innerHTML = `<tr><td colspan="7" class="text-center">No products found.</td></tr>`;
        return;
      }

      filtered.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="${p.image}" alt="${p.name}" class="table-img"></td>
          <td style="font-weight:600;">${p.name}</td>
          <td>${p.category}</td>
          <td style="font-weight:700; color:var(--accent-gold);">₹${p.price}</td>
          <td>
            <button class="badge-status ${p.inStock ? 'active' : 'inactive'}" style="border:none; cursor:pointer;" onclick="toggleProductStock('${p.id}')">
              ${p.inStock ? 'In Stock' : 'Out of Stock'}
            </button>
          </td>
          <td>${p.isCustomisable ? 'Yes' : 'No'}</td>
          <td>
            <div class="table-actions">
              <button class="btn-action edit" onclick="openEditProductModal('${p.id}')" title="Edit Product">
                <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="btn-action delete" onclick="deleteProduct('${p.id}')" title="Delete Product">
                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        `;
        adminProductsTableBody.appendChild(tr);
      });
    } catch (err) {
      console.error(err);
    }
  }

  productSearchInput.addEventListener("input", (e) => {
    renderAdminProducts(e.target.value).catch(err => console.error(err));
  });

  window.toggleProductStock = async function(productId) {
    try {
      const products = await getProducts();
      const product = products.find(p => String(p.id) === String(productId));
      if (product) {
        product.inStock = !product.inStock;
        await updateProduct(productId, product);
        await renderAdminProducts(productSearchInput.value);
        await refreshStatsCounters();
        showAdminToast(`Stock updated for ${product.name}`);
      }
    } catch (err) {
      console.error(err);
      showAdminToast("Failed to update stock status.", "error");
    }
  };

  prodImageFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showAdminToast("File size too large. Upload images under 2MB.", "error");
      prodImageFile.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      prodImageBase64.value = event.target.result;
      uploadPreviewImg.src = event.target.result;
      uploadPlaceholder.style.display = "none";
      uploadPreviewContainer.style.display = "flex";
    };
    reader.readAsDataURL(file);
  });

  btnRemovePreview.addEventListener("click", () => {
    prodImageFile.value = "";
    prodImageBase64.value = "";
    uploadPreviewImg.src = "";
    uploadPlaceholder.style.display = "block";
    uploadPreviewContainer.style.display = "none";
  });

  openAddProductModalBtn.addEventListener("click", () => {
    productForm.reset();
    editProductId.value = "";
    productModalTitle.textContent = "Add New Product";
    
    prodImageBase64.value = "";
    uploadPlaceholder.style.display = "block";
    uploadPreviewContainer.style.display = "none";
    
    productModal.classList.add("open");
    adminOverlay.classList.add("open");
  });

  window.openEditProductModal = async function(productId) {
    try {
      const products = await getProducts();
      const product = products.find(p => String(p.id) === String(productId));
      if (!product) return;

      editProductId.value = product.id;
      prodName.value = product.name;
      prodCategory.value = product.category;
      prodPrice.value = product.price;
      prodDesc.value = product.desc;
      
      prodImageBase64.value = product.image;
      uploadPreviewImg.src = product.image;
      uploadPlaceholder.style.display = "none";
      uploadPreviewContainer.style.display = "flex";
      
      prodIsCustomisable.checked = product.isCustomisable;
      prodInStock.checked = product.inStock;

      productModalTitle.textContent = "Edit Product Details";
      productModal.classList.add("open");
      adminOverlay.classList.add("open");
    } catch (err) {
      console.error(err);
    }
  };

  closeProductModalBtn.addEventListener("click", () => {
    productModal.classList.remove("open");
    adminOverlay.classList.remove("open");
  });

  saveProductBtn.addEventListener("click", async () => {
    if (!productForm.checkValidity()) {
      productForm.reportValidity();
      return;
    }

    const id = editProductId.value;
    const name = prodName.value.trim();
    const category = prodCategory.value;
    const price = parseFloat(prodPrice.value);
    const desc = prodDesc.value.trim();
    const isCustom = prodIsCustomisable.checked;
    const inStock = prodInStock.checked;

    let imageStr = prodImageBase64.value;
    if (!imageStr) {
      imageStr = CATEGORY_PLACEHOLDERS[category] || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop";
    }

    const productData = {
      name, category, price, desc, image: imageStr, isCustomisable: isCustom, inStock
    };

    try {
      if (id) {
        await updateProduct(id, productData);
        showAdminToast("Product details updated successfully!");
      } else {
        await addProduct(productData);
        showAdminToast("New product catalogued successfully!");
      }

      productModal.classList.remove("open");
      adminOverlay.classList.remove("open");
      await renderAdminProducts(productSearchInput.value);
      await refreshStatsCounters();
    } catch (err) {
      console.error(err);
      showAdminToast("Failed to save product details.", "error");
    }
  });

  window.deleteProduct = async function(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await apiDeleteProduct(productId);
        await renderAdminProducts(productSearchInput.value);
        await refreshStatsCounters();
        showAdminToast("Product deleted.", "error");
      } catch (err) {
        console.error(err);
        showAdminToast("Failed to delete product.", "error");
      }
    }
  };

  // --- CUSTOM INQUIRIES MANAGEMENT ---
  const apiUpdateInquiryStatus = updateInquiryStatus;

  async function renderAdminInquiries() {
    try {
      const inquiries = await getInquiries();
      adminInquiriesTableBody.innerHTML = "";

      if (inquiries.length === 0) {
        adminInquiriesTableBody.innerHTML = `<tr><td colspan="8" class="text-center">No custom order inquiries submitted.</td></tr>`;
        return;
      }

      inquiries.forEach(inq => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>
            <strong>${inq.name}</strong><br>
            <span style="font-size:0.75rem; color:var(--text-light-cocoa);">${inq.date}</span>
          </td>
          <td>${inq.phone}</td>
          <td>${inq.tiers} • ${inq.shape}</td>
          <td style="max-width:220px; font-size:0.85rem; line-height:1.4;">${inq.description || inq.desc || ""}</td>
          <td>
            <img src="${inq.image_url || inq.image}" alt="Reference" class="inquiry-img-preview" onclick="openLargeInquiryImage('${inq.image_url || inq.image}')">
          </td>
          <td>
            <select class="form-control" style="padding:4px 8px; font-size:0.8rem; font-weight:600; width:110px;" onchange="updateInquiryStatus('${inq.id}', this.value)">
              <option value="Pending" ${inq.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Quoted" ${inq.status === 'Quoted' ? 'selected' : ''}>Quoted</option>
              <option value="Approved" ${inq.status === 'Approved' ? 'selected' : ''}>Approved</option>
            </select>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-action delete" onclick="deleteInquiry('${inq.id}')">
                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        `;
        adminInquiriesTableBody.appendChild(tr);
      });
    } catch (err) {
      console.error(err);
    }
  }

  window.updateInquiryStatus = async function(inquiryId, newStatus) {
    try {
      await apiUpdateInquiryStatus(inquiryId, newStatus);
      await renderAdminInquiries();
      showAdminToast(`Inquiry status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      showAdminToast("Failed to update inquiry status.", "error");
    }
  };

  window.openLargeInquiryImage = function(imgSrc) {
    inqLargeImg.src = imgSrc;
    inquiryImageModal.classList.add("open");
    adminOverlay.classList.add("open");
  };

  closeInqImageModalBtn.addEventListener("click", () => {
    inquiryImageModal.classList.remove("open");
    adminOverlay.classList.remove("open");
  });

  window.deleteInquiry = function(inquiryId) {
    showAdminToast("Inquiries cannot be deleted directly from the database.", "error");
  };

  // --- REVIEWS MODERATION PANEL ---
  async function renderAdminReviews() {
    try {
      const reviews = await getAllReviews();
      adminReviewsTableBody.innerHTML = "";

      if (reviews.length === 0) {
        adminReviewsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">No customer reviews submitted.</td></tr>`;
        return;
      }

      reviews.forEach(rev => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td style="font-weight:600;">${rev.author}</td>
          <td>${rev.type || 'Bakery Guest'}</td>
          <td style="font-weight:700; color:var(--accent-gold);">${rev.stars} ★</td>
          <td style="max-width:260px; font-size:0.85rem; line-height:1.4;">${rev.text}</td>
          <td>
            <button class="badge-status ${rev.approved ? 'active' : 'inactive'}" style="border:none; cursor:pointer;" onclick="toggleReviewApproval('${rev.id}')">
              ${rev.approved ? 'Approved' : 'Hidden'}
            </button>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-action delete" onclick="deleteReview('${rev.id}')" title="Delete Review">
                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        `;
        adminReviewsTableBody.appendChild(tr);
      });
    } catch (err) {
      console.error(err);
    }
  }

  window.toggleReviewApproval = async function(reviewId) {
    try {
      const reviews = await getAllReviews();
      const rev = reviews.find(r => String(r.id) === String(reviewId));
      if (rev) {
        const nextApproved = !rev.approved;
        await approveReview(reviewId, nextApproved);
        await renderAdminReviews();
        showAdminToast(`Review approval set to: ${nextApproved}`);
      }
    } catch (err) {
      console.error(err);
      showAdminToast("Failed to toggle review approval.", "error");
    }
  };

  window.deleteReview = function(reviewId) {
    showAdminToast("Reviews can be approved/hidden but not deleted from the database.", "error");
  };

  // --- PROMO CODE MANAGEMENT ---
  // --- PROMO CODE MANAGEMENT ---
  const apiDeletePromo = deletePromo;

  async function renderAdminPromos() {
    try {
      const promos = await getAllPromos();
      adminPromosTableBody.innerHTML = "";

      if (promos.length === 0) {
        adminPromosTableBody.innerHTML = `<tr><td colspan="5" class="text-center">No promo codes configured.</td></tr>`;
        return;
      }

      promos.forEach(pr => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td style="font-family:monospace; font-weight:700; font-size:1.1rem; color:var(--accent-gold);">${pr.code}</td>
          <td style="font-weight:700;">${pr.discount}%</td>
          <td>
            <button class="badge-status ${pr.active ? 'active' : 'inactive'}" style="border:none; cursor:pointer;" onclick="togglePromoActive('${pr.id}')">
              ${pr.active ? 'Active' : 'Disabled'}
            </button>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-action edit" onclick="openEditPromoModal('${pr.id}')" title="Edit Coupon">
                <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="btn-action delete" onclick="deletePromo('${pr.id}')" title="Delete Coupon">
                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        `;
        adminPromosTableBody.appendChild(tr);
      });
    } catch (err) {
      console.error(err);
    }
  }

  window.togglePromoActive = async function(promoId) {
    try {
      const promos = await getAllPromos();
      const pr = promos.find(p => String(p.id) === String(promoId));
      if (pr) {
        pr.active = !pr.active;
        await updatePromo(promoId, pr);
        await renderAdminPromos();
        showAdminToast(`Coupon ${pr.code} active status changed!`);
      }
    } catch (err) {
      console.error(err);
      showAdminToast("Failed to toggle promo active status.", "error");
    }
  };

  openAddPromoModalBtn.addEventListener("click", () => {
    promoForm.reset();
    editPromoId.value = "";
    promoModalTitle.textContent = "Create Promo Code";
    
    promoModal.classList.add("open");
    adminOverlay.classList.add("open");
  });

  window.openEditPromoModal = async function(promoId) {
    try {
      const promos = await getAllPromos();
      const pr = promos.find(p => String(p.id) === String(promoId));
      if (!pr) return;

      editPromoId.value = pr.id;
      promoCode.value = pr.code;
      promoDiscount.value = pr.discount;
      promoActive.checked = pr.active;

      promoModalTitle.textContent = "Edit Promo Code Details";
      promoModal.classList.add("open");
      adminOverlay.classList.add("open");
    } catch (err) {
      console.error(err);
    }
  };

  closePromoModalBtn.addEventListener("click", () => {
    promoModal.classList.remove("open");
    adminOverlay.classList.remove("open");
  });

  savePromoBtn.addEventListener("click", async () => {
    if (!promoForm.checkValidity()) {
      promoForm.reportValidity();
      return;
    }

    const id = editPromoId.value;
    const code = promoCode.value.trim().toUpperCase();
    const discount = parseInt(promoDiscount.value);
    const active = promoActive.checked;

    const promoData = { code, discount, active };

    try {
      if (id) {
        await updatePromo(id, promoData);
        showAdminToast(`Promo Code ${code} updated successfully!`);
      } else {
        const promos = await getAllPromos();
        if (promos.some(p => p.code === code)) {
          showAdminToast(`Promo Code ${code} already exists!`, "error");
          return;
        }
        await addPromo(promoData);
        showAdminToast(`Promo Code ${code} created!`);
      }

      promoModal.classList.remove("open");
      adminOverlay.classList.remove("open");
      await renderAdminPromos();
    } catch (err) {
      console.error(err);
      showAdminToast("Failed to save promo code.", "error");
    }
  });

  window.deletePromo = async function(promoId) {
    if (confirm("Are you sure you want to delete this discount promo code?")) {
      try {
        await apiDeletePromo(promoId);
        await renderAdminPromos();
        showAdminToast("Promo Code deleted.", "error");
      } catch (err) {
        console.error(err);
        showAdminToast("Failed to delete promo code.", "error");
      }
    }
  };

  // --- ORDERS FULFILLMENT MANAGEMENT ---
  const apiUpdateOrderStatus = updateOrderStatus;

  async function renderAdminOrders(filterText = "") {
    try {
      const orders = await getOrders();
      adminOrdersTableBody.innerHTML = "";

      const searchString = filterText.toLowerCase();
      
      // Calculate itemsSummary dynamically for searching
      orders.forEach(o => {
        o.itemsSummary = Array.isArray(o.items) ? o.items.map(item => `${item.name} (x${item.qty})`).join(", ") : "";
      });

      const filtered = orders.filter(o => 
        o.refId.toLowerCase().includes(searchString) || 
        o.custName.toLowerCase().includes(searchString) ||
        o.itemsSummary.toLowerCase().includes(searchString)
      );

      if (filtered.length === 0) {
        adminOrdersTableBody.innerHTML = `<tr><td colspan="8" class="text-center">No orders matching pipeline filter.</td></tr>`;
        return;
      }

      // Sort by status precedence or date desc
      const statusPrecedence = { Placed: 0, Baking: 1, Decorating: 2, Shipped: 3, Delivered: 4 };
      filtered.sort((a, b) => {
        if (a.status !== b.status) {
          return statusPrecedence[a.status] - statusPrecedence[b.status];
        }
        return new Date(b.date) - new Date(a.date);
      });

      filtered.forEach(o => {
        const tr = document.createElement("tr");
        
        let itemsHTML = "";
        if (Array.isArray(o.items)) {
          o.items.forEach(item => {
            itemsHTML += `<div style="font-size: 0.85rem; margin-bottom: 2px;">
              • <strong>${item.name}</strong> (x${item.qty})
            </div>`;
            if (item.customised) {
              itemsHTML += `<div style="font-size: 0.72rem; color: var(--text-light-cocoa); padding-left: 8px; margin-bottom: 4px;">
                ${item.config.shape} • ${item.config.weight} • ${item.config.flavor} • ${item.config.eggless} <br>
                Toppings: ${item.config.toppings} <br>
                Message: "${item.config.message}"
              </div>`;
            }
          });
        }
        if (o.notes) {
          itemsHTML += `<div style="font-size: 0.78rem; color: var(--danger-red); margin-top: 4px;"><em>Notes: ${o.notes}</em></div>`;
        }

        // Action button based on status
        let actionBtnHTML = "";
        if (o.status === "Placed") {
          actionBtnHTML = `<button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem; width: 100%;" onclick="updateOrderStatus(${o.id}, 'Baking')">Accept & Bake</button>`;
        } else if (o.status === "Baking") {
          actionBtnHTML = `<button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem; background: var(--accent-pink-dark); border-color: var(--accent-pink-dark); width: 100%;" onclick="updateOrderStatus(${o.id}, 'Decorating')">Decorate</button>`;
        } else if (o.status === "Decorating") {
          actionBtnHTML = `<button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem; background: var(--success-green); border-color: var(--success-green); width: 100%;" onclick="updateOrderStatus(${o.id}, 'Shipped')">Ship Order</button>`;
        } else if (o.status === "Shipped") {
          actionBtnHTML = `<button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem; background: var(--text-cocoa); border-color: var(--text-cocoa); width: 100%;" onclick="updateOrderStatus(${o.id}, 'Delivered')">Mark Delivered</button>`;
        } else {
          actionBtnHTML = `<span style="color: var(--success-green); font-weight: 700; font-size: 0.85rem;">Completed ✓</span>`;
        }

        tr.innerHTML = `
          <td style="font-family: monospace; font-weight: 700; color: var(--accent-gold);">${o.refId}</td>
          <td>
            <strong>${o.custName}</strong><br>
            <span style="font-size: 0.8rem; color: var(--text-light-cocoa);">${o.custPhone}</span>
          </td>
          <td style="max-width: 250px;">${itemsHTML}</td>
          <td style="font-weight: 700;">₹${o.total.toFixed(2)}</td>
          <td style="font-size: 0.85rem; line-height: 1.4;">
            <strong>Date:</strong> ${o.deliveryDate}<br>
            <strong>Slot:</strong> ${o.deliveryTime}<br>
            <span style="color: var(--text-light-cocoa); font-size: 0.78rem;">${o.custAddress}</span>
          </td>
          <td>
            <span class="badge-status ${o.status === 'Delivered' ? 'active' : 'inactive'}">
              ${o.status}
            </span>
          </td>
          <td>${actionBtnHTML}</td>
          <td>
            <div class="table-actions">
              <button class="btn-action edit" onclick="printAdminOrderSlip('${o.refId}')" title="Print Fulfillment Slip">
                <svg viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              </button>
              <button class="btn-action delete" onclick="deleteAdminOrder('${o.refId}')" title="Cancel/Delete Order">
                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        `;
        adminOrdersTableBody.appendChild(tr);
      });
    } catch (err) {
      console.error(err);
    }
  }

  // Update Order Status in pipeline (accepting integer orderId)
  window.updateOrderStatus = async function(orderId, newStatus) {
    try {
      await apiUpdateOrderStatus(orderId, newStatus);
      await renderAdminOrders(orderSearchInput.value);
      showAdminToast(`Order status updated to: ${newStatus}`);
    } catch (err) {
      console.error(err);
      showAdminToast("Failed to update order status.", "error");
    }
  };

  // Delete/Cancel Order in pipeline
  window.deleteAdminOrder = function(refId) {
    showAdminToast("Orders cannot be deleted directly from database for audit integrity.", "error");
  };

  // Open & Render Admin printable invoice modal
  window.printAdminOrderSlip = async function(refId) {
    try {
      const orders = await getOrders();
      const order = orders.find(o => o.refId === refId);
      if (!order) return;

      // Compile items rows
      let itemsRowsHTML = "";
      order.items.forEach(item => {
        let metaDetails = "";
        if (item.customised) {
          metaDetails = `<div style="font-size: 0.75rem; color: var(--text-light-cocoa); margin-top: 2px;">${item.config.shape} • ${item.config.weight} • ${item.config.flavor} • ${item.config.eggless} <br> Toppings: ${item.config.toppings} <br> Message: "${item.config.message}"</div>`;
        } else {
          metaDetails = `<div style="font-size: 0.75rem; color: var(--text-light-cocoa); margin-top: 2px;">${item.category}</div>`;
        }
        
        itemsRowsHTML += `
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 8px 0; text-align: left;">
              <strong>${item.name}</strong>
              ${metaDetails}
            </td>
            <td style="padding: 8px 0; text-align: right;">${item.qty}</td>
            <td style="padding: 8px 0; text-align: right;">₹${(item.price * item.qty).toFixed(2)}</td>
          </tr>
        `;
      });

      const settings = await getSettings();
      const discountRowHTML = order.discount > 0 
        ? `<div class="flex-between" style="color: var(--success-green);"><span>Discount Applied</span><span>-₹${order.discount.toFixed(2)}</span></div>`
        : "";

      adminPrintInvoiceArea.innerHTML = `
        <div class="invoice-header-branding text-center">
          <h1 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 4px;">Anita's Bakers</h1>
          <p style="font-size: 0.85rem; color: var(--text-light-cocoa); margin-bottom: 16px;">123 Cake Studio Lane, Sweet Valley • +91 98765 43210</p>
          <div style="border-top: 2px dashed var(--border-color); border-bottom: 2px dashed var(--border-color); padding: 8px 0; margin-bottom: 20px;">
            <h4 style="text-transform: uppercase; letter-spacing: 1px;">Fulfillment Packaging Slip</h4>
            <span style="font-size: 0.8rem; color: var(--text-light-cocoa);">Date Placed: ${order.date}</span>
          </div>
        </div>
        
        <div class="invoice-metadata-grid" style="font-size: 0.9rem; margin-bottom: 20px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 8px;">
          <div>
            <strong>Deliver To:</strong>
            <p style="color: var(--text-light-cocoa); margin-top: 2px; font-weight:600;">${order.custName}</p>
            <p style="color: var(--text-light-cocoa);">${order.custPhone}</p>
            <p style="color: var(--text-light-cocoa); font-size: 0.8rem; margin-top:4px;">${order.custAddress}</p>
          </div>
          <div style="text-align: right;">
            <strong>Order Ref ID:</strong>
            <p style="font-family: monospace; font-size: 1rem; color: var(--accent-gold); font-weight: 700; margin-top: 2px;">${order.refId}</p>
            <strong>Delivery Slot:</strong>
            <p style="color: var(--text-light-cocoa); font-size: 0.85rem;">${order.deliveryDate}<br>${order.deliveryTime}</p>
          </div>
        </div>
        
        <table class="invoice-items-table" style="width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-bottom: 20px;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <th style="padding: 8px 0; text-align: left; background: none; font-size: 0.85rem; border-bottom: 1px solid var(--border-color); text-transform:none;">Item Description</th>
              <th style="padding: 8px 0; text-align: right; background: none; font-size: 0.85rem; width: 60px; border-bottom: 1px solid var(--border-color); text-transform:none;">Qty</th>
              <th style="padding: 8px 0; text-align: right; background: none; font-size: 0.85rem; width: 80px; border-bottom: 1px solid var(--border-color); text-transform:none;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRowsHTML}
          </tbody>
        </table>
        
        <div class="invoice-summary-box" style="border-top: 1px dashed var(--border-color); padding-top: 12px; font-size: 0.9rem; display: flex; flex-direction: column; gap: 6px;">
          <div class="flex-between">
            <span>Subtotal</span>
            <span>₹${order.subtotal.toFixed(2)}</span>
          </div>
          ${discountRowHTML}
          <div class="flex-between">
            <span>Delivery Charges</span>
            <span>₹${order.deliveryFee.toFixed(2)}</span>
          </div>
          <div class="flex-between">
            <span>Taxes (5% GST)</span>
            <span>₹${order.tax.toFixed(2)}</span>
          </div>
          <div class="flex-between total" style="border-top: 2px solid var(--text-cocoa); padding-top: 8px; margin-top: 4px; font-size: 1.15rem; font-weight: 800;">
            <span>Grand Total</span>
            <span>₹${order.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div class="invoice-footer text-center" style="margin-top: 30px; border-top: 1px solid var(--border-color); padding-top: 16px; font-size: 0.8rem; color: var(--text-light-cocoa);">
          <p>Fulfillment status: <strong>${order.status}</strong></p>
          ${order.notes ? `<p style="margin-top: 8px; color: var(--danger-red);"><strong>Special Instructions:</strong> "${order.notes}"</p>` : ''}
        </div>
      `;

      adminInvoiceModal.classList.add("open");
      adminOverlay.classList.add("open");
    } catch (err) {
      console.error(err);
    }
  };

  // Close Admin Invoice modal
  closeAdminInvModalBtn.addEventListener("click", () => {
    adminInvoiceModal.classList.remove("open");
    adminOverlay.classList.remove("open");
  });

  // Print Admin Slip
  adminPrintInvBtn.addEventListener("click", () => {
    window.print();
  });

  // Hook search order input
  orderSearchInput.addEventListener("input", (e) => {
    renderAdminOrders(e.target.value);
  });

  // Live Visitors Simulator
  function startVisitorsSimulator() {
    if (!liveVisitorsCount) return;
    
    let currentVisitors = Math.floor(3 + Math.random() * 5);
    liveVisitorsCount.textContent = currentVisitors;

    setInterval(() => {
      const change = Math.floor(Math.random() * 3) - 1;
      currentVisitors = Math.max(2, Math.min(10, currentVisitors + change));
      liveVisitorsCount.textContent = currentVisitors;

      // Random activity notifications
      if (Math.random() > 0.6) {
        const productNames = [
          "Belgian Chocolate Truffle",
          "Red Velvet Cream Cheese",
          "Fresh Strawberry Gateau",
          "Blueberry Cheesecake Slice",
          "Artisan Sourdough Loaf"
        ];
        const randomProduct = productNames[Math.floor(Math.random() * productNames.length)];
        const simulatedActions = [
          `A visitor added ${randomProduct} to their cart.`,
          `A visitor is configuring a custom cake.`,
          `A shopper is checking out via WhatsApp.`,
          `A customer just viewed ${randomProduct}.`
        ];
        const randomAction = simulatedActions[Math.floor(Math.random() * simulatedActions.length)];
        showAdminToast(randomAction, "success");
      }
    }, 7000);
  }
  
  startVisitorsSimulator();

  // HTML escape helper
  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Render Website Leads List
  const adminLeadsTableBody = document.getElementById("adminLeadsTableBody");
  async function renderAdminLeads() {
    if (!adminLeadsTableBody) return;
    try {
      const leads = await getLeads();
      adminLeadsTableBody.innerHTML = "";

      if (!leads || leads.length === 0) {
        adminLeadsTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 20px;">No website visitors recorded yet.</td></tr>`;
        return;
      }

      leads.forEach(lead => {
        const tr = document.createElement("tr");
        
        let cleanPhone = lead.phone.replace(/\D/g, "");
        if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;

        const dateStr = new Date(lead.createdAt).toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });

        const statusClass = lead.status === 'Contacted' ? 'badge-status-completed' : 'badge-status-placed';
        
        tr.innerHTML = `
          <td>${dateStr}</td>
          <td><strong>${escapeHTML(lead.name)}</strong></td>
          <td>${escapeHTML(lead.phone)}</td>
          <td><span class="category-badge">${escapeHTML(lead.interest)}</span></td>
          <td><span class="badge ${statusClass}">${lead.status}</span></td>
          <td>
            <div class="actions-wrapper">
              <a href="https://wa.me/${cleanPhone}" target="_blank" class="btn btn-secondary btn-icon" title="Chat on WhatsApp" style="background: #25D366; color: white; border: none; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 4px; padding: 0;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              ${lead.status === 'Pending' ? `
                <button class="btn btn-primary btn-icon btn-mark-contacted" data-id="${lead.id}" title="Mark as Contacted" style="width: 32px; height: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </button>
              ` : ''}
              <button class="btn btn-secondary btn-icon btn-delete-lead" data-id="${lead.id}" title="Delete Lead" style="width: 32px; height: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          </td>
        `;

        // Event Listeners
        const markBtn = tr.querySelector(".btn-mark-contacted");
        if (markBtn) {
          markBtn.addEventListener("click", async () => {
            try {
              await updateLeadStatus(lead.id, "Contacted");
              showAdminToast("Lead status updated to Contacted.");
              await renderAdminLeads();
            } catch (err) {
              showAdminToast("Failed to update status.", "error");
            }
          });
        }

        const deleteBtn = tr.querySelector(".btn-delete-lead");
        if (deleteBtn) {
          deleteBtn.addEventListener("click", async () => {
            if (confirm("Are you sure you want to delete this lead?")) {
              try {
                await deleteLead(lead.id);
                showAdminToast("Lead deleted successfully.");
                await renderAdminLeads();
              } catch (err) {
                showAdminToast("Failed to delete lead.", "error");
              }
            }
          });
        }

        adminLeadsTableBody.appendChild(tr);
      });
    } catch (err) {
      console.error("Failed to render admin leads:", err);
    }
  }

  checkAuth();
}
