# 🍰 Anita's Bakers — Handcrafted Cakes & Pastries

A full-stack bakery management web application with a beautiful storefront and a powerful admin dashboard.

## 📁 Project Structure

```
├── frontend/          → Customer-facing storefront & Admin Panel (HTML, CSS, JS)
└── backend/           → REST API Backend (PHP & MySQL)
```

## 🚀 Setup & Installation (Local Development)

### 1. Prerequisites
* Install [XAMPP](https://www.apachefriends.org/) (with Apache & MySQL).

### 2. Move Project Files
Ensure these folders are placed in your XAMPP root:
* Place `frontend/` files inside `C:\xampp\htdocs\anitas-bakers\`
* Place `backend/` files inside `C:\xampp\htdocs\anitas-bakers-api\`

### 3. Database Setup
1. Open XAMPP Control Panel and start **Apache** and **MySQL**.
2. Open **phpMyAdmin** (`http://localhost/phpmyadmin`).
3. Create a new database named `anitas_bakers_db`.
4. Import the schema or seed data to set up the tables.
5. The API database configuration is located in `backend/config/database.php`.

### 4. Running the Web Application
* **Storefront:** Access `http://localhost/anitas-bakers/index.html`
* **Admin Dashboard:** Access `http://localhost/anitas-bakers/admin.html`
