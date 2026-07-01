# 🍰 Anita's Bakers - InfinityFree Deployment Guide
# (होस्टिंग सेटअप गाईड)

---

## 📋 काय आहे हा प्रोजेक्ट?

हा **Anita's Bakers** नावाचा एक बेकरी वेबसाईट प्रोजेक्ट आहे ज्यामध्ये:
- **Frontend** = वेबसाईट (HTML, CSS, JavaScript) — ग्राहकांना मेनू दाखवतो
- **Backend** = सर्व्हर कोड (PHP) — डेटाबेस कनेक्शन, बिल जनरेशन, ॲडमिन पॅनेल
- **Database** = MySQL — सर्व प्रॉडक्ट्स, ऑर्डर्स, रिव्ह्यूज इ. सेव्ह ठेवतो

**सर्व काही एकाच InfinityFree अकाउंटवर होस्ट होईल.**

---

## 🔧 पूर्व-तयारी (Prerequisites)

तुम्हाला खालील गोष्टी लागतील:
1. **InfinityFree अकाउंट** — [https://www.infinityfree.com](https://www.infinityfree.com) वर मोफत साइन अप करा.
2. **या प्रोजेक्टचे फाईल्स** — `Anitas-Bakers` हे पूर्ण फोल्डर (किंवा GitHub वरून clone करा).

---

## 🚀 स्टेप-बाय-स्टेप सेटअप

---

### STEP 1: InfinityFree वर नवीन होस्टिंग अकाउंट बनवा

1. [https://www.infinityfree.com](https://www.infinityfree.com) वर जा.
2. **Sign Up** वर क्लिक करा आणि Email ID ने नवीन अकाउंट बनवा.
3. लॉगिन झाल्यानंतर **"Create Account"** बटणावर क्लिक करा.
4. एक **Free Subdomain** निवडा — उदाहरणार्थ: `anitasbakers.infinityfreeapp.com`
5. अकाउंट तयार होईपर्यंत २-३ मिनिटे वाट पहा. Dashboard वर स्टेटस **"Active"** दिसेल.

> **📝 महत्त्वाचे:** अकाउंट तयार झाल्यावर तुम्हाला खालील माहिती मिळेल — ती कुठे तरी लिहून ठेवा:
> - **cPanel URL** (उदा. `cpanel.infinityfree.com`)
> - **FTP Hostname** (उदा. `ftpupload.net`)
> - **FTP Username** (उदा. `if0_3829103`)
> - **FTP Password** (तुम्ही सेट केलेला पासवर्ड)
> - **MySQL Hostname** (उदा. `sql123.infinityfree.com` — हे cPanel मध्ये MySQL Databases सेक्शन मध्ये मिळेल)

---

### STEP 2: डेटाबेस (MySQL) तयार करा

1. InfinityFree च्या **Control Panel** मध्ये लॉगिन करा.
2. **"MySQL Databases"** वर क्लिक करा.
3. **New Database Name** मध्ये एक नाव टाइप करा (उदा. `bakers`).
   - InfinityFree एक prefix जोडेल, जसे: `if0_3829103_bakers`
4. **"Create Database"** बटणावर क्लिक करा.
5. डेटाबेस तयार झाल्यावर तुम्हाला खालील माहिती मिळेल — **हे लिहून ठेवा!**:
   - **Database Name** (उदा. `if0_3829103_bakers`)
   - **Database Username** (उदा. `if0_3829103`)
   - **Database Password** (cPanel/FTP सारखाच)
   - **Database Host** (उदा. `sql123.infinityfree.com`)

---

### STEP 3: डेटाबेस टेबल्स तयार करा (Schema Import)

1. Control Panel मधील **"phpMyAdmin"** वर क्लिक करा.
2. डाव्या बाजूला तुमचा नवीन डेटाबेस (उदा. `if0_3829103_bakers`) निवडा.
3. वरच्या मेनूमध्ये **"Import"** टॅबवर क्लिक करा.
4. **"Choose File"** बटणावर क्लिक करा.
5. प्रोजेक्ट फोल्डरमधील **`schema.sql`** फाईल निवडा.

> ⚠️ **महत्त्वाचे:** `schema.sql` फाईलमध्ये पहिल्या 2 ओळी बदला किंवा हटवा:
> ```sql
> -- या दोन ओळी काढून टाका (DELETE करा):
> CREATE DATABASE IF NOT EXISTS anitas_bakers_db;
> USE anitas_bakers_db;
> ```
> कारण: InfinityFree वर तुम्ही फक्त त्यांनी तयार केलेल्या डेटाबेसचाच वापर करू शकता.
> `schema.sql` मध्ये `CREATE TABLE` पासून पुढचे सर्व ओळी तशाच ठेवा.

6. **"Import"** बटणावर क्लिक करा.
7. "Import has been successfully finished" असा मेसेज दिसला तर सर्व टेबल्स तयार झाले!

---

### STEP 4: Backend कॉन्फिग फाईल अपडेट करा

प्रोजेक्ट फोल्डरमधील `backend/config/database.php` फाईल उघडा आणि खालील ओळी बदला:

**बदलण्यापूर्वी (जुने - Local XAMPP साठी):**
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'anitas_bakers_db');
define('DB_USER', 'root');
define('DB_PASS', '');
```

**बदलल्यानंतर (नवीन - InfinityFree साठी):**
```php
define('DB_HOST', 'तुमचा_MySQL_Hostname');     // उदा. 'sql123.infinityfree.com'
define('DB_NAME', 'तुमचा_Database_Name');       // उदा. 'if0_3829103_bakers'
define('DB_USER', 'तुमचा_Database_Username');   // उदा. 'if0_3829103'
define('DB_PASS', 'तुमचा_Database_Password');   // cPanel/FTP Password
```

> 📝 वरील `तुमचा_...` जागी STEP 2 मध्ये मिळालेली खरी माहिती टाका.

---

### STEP 5: Frontend API URL अपडेट करा

प्रोजेक्ट फोल्डरमधील `frontend/js/database.js` फाईल उघडा.

**Line 4-6** शोधा:
```javascript
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost/anitas-bakers-api'
  : 'https://your-production-url.com';
```

**हे बदलून लिहा:**
```javascript
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost/anitas-bakers-api'
  : 'https://anitasbakers.infinityfreeapp.com/backend';
```

> 📝 `anitasbakers.infinityfreeapp.com` ऐवजी तुम्ही STEP 1 मध्ये निवडलेला subdomain लिहा.

---

### STEP 6: फाईल्स अपलोड करा (FTP द्वारे)

InfinityFree चा ऑनलाईन **File Manager** वापरा किंवा **FileZilla** (FTP Client) वापरा.

#### पर्याय A: InfinityFree File Manager वापरा (सोपा)
1. Control Panel मध्ये **"Online File Manager"** वर क्लिक करा.
2. `htdocs` फोल्डरमध्ये जा (हे तुमच्या वेबसाईटचे मुख्य फोल्डर आहे).
3. `htdocs` मधील सर्व जुन्या फाईल्स (जसे `index2.html` वगैरे) Delete करा.

#### पर्याय B: FileZilla वापरा (वेगवान)
1. [FileZilla Download](https://filezilla-project.org) वरून FileZilla डाउनलोड करा.
2. कनेक्ट करा:
   - **Host:** `ftpupload.net` (किंवा तुमचा FTP Hostname)
   - **Username:** तुमचा FTP Username
   - **Password:** तुमचा FTP Password
   - **Port:** `21`
3. कनेक्ट झाल्यावर उजव्या बाजूला `htdocs` फोल्डरमध्ये जा.

---

### 📁 अपलोड करताना फोल्डर स्ट्रक्चर (IMPORTANT!)

`htdocs` फोल्डरचा आतला भाग खालीलप्रमाणे दिसला पाहिजे:

```
htdocs/
├── index.html              ← (frontend/index.html वरून)
├── admin.html              ← (frontend/admin.html वरून)
├── css/                    ← (frontend/css/ फोल्डर)
│   ├── admin.css
│   └── storefront.css
├── js/                     ← (frontend/js/ फोल्डर)
│   ├── admin.js
│   ├── database.js
│   └── storefront.js
├── images/                 ← (frontend/images/ फोल्डर)
│   └── ...
└── backend/                ← (backend/ फोल्डर — हे संपूर्ण फोल्डर तसेच अपलोड करा)
    ├── index.php
    ├── .htaccess
    ├── seed.php
    ├── config/
    │   └── database.php    ← (STEP 4 मध्ये अपडेट केलेली फाईल)
    ├── api/
    │   ├── auth/
    │   ├── orders/
    │   ├── products/
    │   ├── promos/
    │   ├── reviews/
    │   ├── inquiries/
    │   ├── leads/
    │   └── settings/
    ├── helpers/
    └── middleware/
```

**म्हणजेच:**
- `frontend/` फोल्डरमधील **सर्व फाईल्स** (HTML, CSS, JS, Images) थेट `htdocs/` मध्ये टाका (frontend फोल्डर नको, त्यातली content टाका).
- `backend/` फोल्डर **तसेच** (backend/ नावासहित) `htdocs/` मध्ये टाका.

---

### STEP 7: टेस्ट करा! 🎉

1. तुमच्या ब्राउझरमध्ये `https://anitasbakers.infinityfreeapp.com` उघडा.
   - ✅ बेकरीची वेबसाईट दिसली पाहिजे (मेनू, प्रॉडक्ट्स इ.)

2. Admin Panel टेस्ट करा: `https://anitasbakers.infinityfreeapp.com/admin.html`
   - ✅ पासकोड: `1234`
   - ✅ लॉगिन केल्यावर Dashboard दिसला पाहिजे.

3. बिल जनरेशन टेस्ट करा:
   - Admin Panel मध्ये "Direct Bill" बटणावर क्लिक करा.
   - ग्राहकाचे नाव, फोन नंबर आणि आयटम्स टाका.
   - "Generate Bill" वर क्लिक करा — बिल तयार झाला पाहिजे!

---

## ⚠️ Troubleshooting (समस्या आल्यास)

### ❌ "Database connection failed" एरर आल्यास:
- `backend/config/database.php` मधील डेटाबेस credentials पुन्हा चेक करा.
- InfinityFree वर MySQL Hostname, Username, Password बरोबर आहे का बघा.

### ❌ "404 Not Found" एरर आल्यास:
- फाईल्स `htdocs` मध्ये बरोबर अपलोड झाल्या आहेत का चेक करा.
- `index.html` फाईल `htdocs/` च्या आतच आहे ना बघा (कोणत्या subfolder मध्ये नको).

### ❌ API Calls काम करत नसल्यास:
- `frontend/js/database.js` मधील API URL बरोबर आहे का चेक करा.
- `backend/.htaccess` फाईल अपलोड झाली आहे का बघा.

### ❌ वेबसाईट उघडत नसल्यास:
- InfinityFree वर अकाउंट "Active" आहे ना बघा.
- नवीन अकाउंटला activate होण्यासाठी ७२ तासांपर्यंत वेळ लागू शकतो.

---

## 📞 मदत लागल्यास

जर कोणतीही समस्या आली, तर खालील माहिती मला (कोड बनवणाऱ्याला) पाठवा:
1. कोणत्या STEP वर अडकले ते सांगा.
2. ब्राउझरमध्ये दिसणारा error message चा screenshot पाठवा.
3. `backend/config/database.php` मधील credentials (password लपवून) पाठवा.

---

## 🔄 भविष्यात कोडमध्ये बदल (Updates) कसे अपलोड करायचे?

जेव्हा कोडमध्ये काही बदल केले जातील:
1. बदललेल्या फाईल्स पुन्हा **File Manager / FileZilla** द्वारे `htdocs` मध्ये अपलोड करा (Overwrite/Replace करा).
2. किंवा **GitHub Actions** सेट केले असल्यास, फक्त `git push` करा — आपोआप अपडेट होईल!

---

**शुभेच्छा! 🍰✨**
