// --- ANITA'S BAKERS SHARED REST API DATABASE LAYER & HELPERS ---

// Auto-detect API URL (local vs production)
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost/anitas-bakers-api'
  : 'https://your-production-url.com';

const DB_THEME_KEY = "anitas_bakers_theme";

// ----- Helper: Admin JWT token management -----
function getAdminToken() {
  return sessionStorage.getItem('admin_jwt_token');
}
function setAdminToken(token) {
  sessionStorage.setItem('admin_jwt_token', token);
}
function removeAdminToken() {
  sessionStorage.removeItem('admin_jwt_token');
}

// ----- Helper: Generic Fetch with Auth -----
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  };
  const token = getAdminToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  try {
    const res = await fetch(url, config);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'API Error');
    return json;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

// ----- Products -----
async function getProducts(category = null) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  const res = await apiFetch(`/api/products${query}`);
  return res.data;
}
async function addProduct(product) {
  return await apiFetch('/api/products', { method: 'POST', body: JSON.stringify(product) });
}
async function updateProduct(id, data) {
  return await apiFetch(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}
async function deleteProduct(id) {
  return await apiFetch(`/api/products/${id}`, { method: 'DELETE' });
}

// ----- Orders -----
async function getOrders() {
  const res = await apiFetch('/api/orders');
  return res.data;
}
async function createOrder(orderData) {
  const res = await apiFetch('/api/orders', { method: 'POST', body: JSON.stringify(orderData) });
  return res.data;
}
async function trackOrder(refId) {
  const res = await apiFetch(`/api/orders/track/${refId}`);
  return res.data;
}
async function updateOrderStatus(id, status) {
  return await apiFetch(`/api/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
}

// ----- Promos -----
async function getPromos() {
  const res = await apiFetch('/api/promos');
  return res.data;
}
async function getAllPromos() {
  const res = await apiFetch('/api/promos/all');
  return res.data;
}
async function addPromo(promo) {
  return await apiFetch('/api/promos', { method: 'POST', body: JSON.stringify(promo) });
}
async function updatePromo(id, data) {
  return await apiFetch(`/api/promos/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}
async function deletePromo(id) {
  return await apiFetch(`/api/promos/${id}`, { method: 'DELETE' });
}

// ----- Reviews -----
async function getReviews() {
  const res = await apiFetch('/api/reviews');
  return res.data;
}
async function submitReview(review) {
  return await apiFetch('/api/reviews', { method: 'POST', body: JSON.stringify(review) });
}
async function getAllReviews() {
  const res = await apiFetch('/api/reviews/all');
  return res.data;
}
async function approveReview(id, approved) {
  return await apiFetch(`/api/reviews/${id}/approve`, { method: 'PUT', body: JSON.stringify({ approved }) });
}

// ----- Inquiries -----
async function getInquiries() {
  const res = await apiFetch('/api/inquiries');
  return res.data;
}
async function submitInquiry(inquiry) {
  return await apiFetch('/api/inquiries', { method: 'POST', body: JSON.stringify(inquiry) });
}
async function updateInquiryStatus(id, status) {
  return await apiFetch(`/api/inquiries/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
}

// ----- Settings -----
async function getSettings() {
  const res = await apiFetch('/api/settings');
  return res.data;
}
async function updateSettings(settings) {
  return await apiFetch('/api/settings', { method: 'PUT', body: JSON.stringify(settings) });
}

// ----- Auth -----
async function adminLogin(passcode) {
  const res = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ passcode }) });
  if (res.success && res.data.token) {
    setAdminToken(res.data.token);
  }
  return res;
}

// --- Category Image Placeholders Helper ---
const CATEGORY_PLACEHOLDERS = {
  Cakes: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=60&w=400&auto=format&fit=crop",
  Pastries: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=60&w=400&auto=format&fit=crop",
  Cookies: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=60&w=400&auto=format&fit=crop",
  Breads: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=60&w=400&auto=format&fit=crop",
  Special: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=60&w=400&auto=format&fit=crop"
};

// --- THEME TOGGLE (DARK MODE) IMPLEMENTATION ---
function initTheme() {
  const savedTheme = localStorage.getItem(DB_THEME_KEY) || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    const sunIcon = document.getElementById("themeSunIcon");
    const moonIcon = document.getElementById("themeMoonIcon");
    
    if (savedTheme === "dark") {
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "block";
    } else {
      if (sunIcon) sunIcon.style.display = "block";
      if (moonIcon) moonIcon.style.display = "none";
    }

    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem(DB_THEME_KEY, newTheme);
      
      if (newTheme === "dark") {
        if (sunIcon) sunIcon.style.display = "none";
        if (moonIcon) moonIcon.style.display = "block";
      } else {
        if (sunIcon) sunIcon.style.display = "block";
        if (moonIcon) moonIcon.style.display = "none";
      }
    });
  }
}
initTheme();

// --- DYNAMIC PROMOTIONAL ANNOUNCEMENT BAR ---
async function initAnnouncementBar() {
  try {
    const settings = await getSettings();
    const bar = document.getElementById("announcementBar");
    const content = document.getElementById("announcementContent");
    const header = document.getElementById("mainHeader");

    if (bar && content) {
      if (settings && settings.showAnnouncement && settings.announcementText) {
        content.textContent = settings.announcementText;
        bar.style.display = "block";
        document.body.style.paddingTop = "120px";
        if (header) header.style.top = "36px";
      } else {
        bar.style.display = "none";
        document.body.style.paddingTop = "80px";
        if (header) header.style.top = "0";
      }
    }
  } catch (err) {
    console.error("Error loading settings for announcement bar:", err);
  }
}
initAnnouncementBar();

// ----- Leads -----
async function getLeads() {
  const res = await apiFetch('/api/leads');
  return res.data;
}
async function createLead(lead) {
  return await apiFetch('/api/leads', { method: 'POST', body: JSON.stringify(lead) });
}
async function updateLeadStatus(id, status) {
  return await apiFetch(`/api/leads/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
}
async function deleteLead(id) {
  return await apiFetch(`/api/leads/${id}`, { method: 'DELETE' });
}
