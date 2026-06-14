# 🚂 Railway Deployment Guide

## 📋 Prerequisites

- GitHub account (dengan repo di-push)
- Railway account (https://railway.app) - sign up dengan GitHub
- Backend dan Frontend di folder terpisah di GitHub

---

## 🔧 Step-by-Step Deployment Railway

### **Step 1: Persiapkan Repository**

Pastikan repo struktur sudah benar:
```
fullstack-nodejs/
├── backend/
│   ├── .env.example
│   ├── Procfile
│   ├── railway.json
│   ├── package.json
│   └── ...
├── frontend/
│   ├── .env.example
│   ├── railway.json
│   ├── package.json
│   └── ...
└── .gitignore
```

**Push ke GitHub:**
```bash
git init
git add .
git commit -m "Ready for Railway deployment"
git branch -M main
git remote add origin https://github.com/username/fullstack-nodejs.git
git push -u origin main
```

---

### **Step 2: Deploy Backend ke Railway**

#### 2.1 Buat Project di Railway
1. Login ke [railway.app](https://railway.app)
2. Klik **"New Project"**
3. Pilih **"Deploy from GitHub repo"**
4. Connect GitHub account dan pilih repository

#### 2.2 Setup Backend Service

1. Setelah project dibuat, klik **"Add Service"** → **"GitHub Repo"**
2. Pilih repository lagi
3. Di **Root Directory**, masukkan: `backend`
4. Klik **"Deploy"**

#### 2.3 Setup Database (MySQL)

1. Di project Railway, klik **"Add Service"** → **"Database"** → **"MySQL"**
2. Railway akan generate database credentials otomatis
3. Salin credentials dari Railway dashboard

#### 2.4 Set Environment Variables Backend

1. Buka service backend di Railway
2. Pergi ke tab **"Variables"**
3. Tambahkan variables:

```env
NODE_ENV=production
PORT=3000

# Database (dari MySQL service yang baru dibuat)
DB_HOST=${{ MySQL.RAILWAY_PUBLIC_DOMAIN }}
DB_USER=${{ MySQL.MYSQL_USER }}
DB_PASSWORD=${{ MySQL.MYSQL_PASSWORD }}
DB_NAME=${{ MySQL.MYSQL_DB }}

# Frontend URL (akan di-set setelah frontend di-deploy)
FRONTEND_URL=https://your-frontend-domain.railway.app
```

**Note:** Railway menggunakan `${{ SERVICE.VARIABLE }}` untuk reference antar service.

#### 2.5 Deploy Backend

Railway akan auto-deploy ketika ada push ke GitHub. Tunggu sampai selesai.

---

### **Step 3: Deploy Frontend ke Railway**

#### 3.1 Setup Frontend Service

1. Di project Railway, klik **"Add Service"** → **"GitHub Repo"**
2. Pilih repository yang sama
3. Di **Root Directory**, masukkan: `frontend`
4. Klik **"Deploy"**

#### 3.2 Set Environment Variables Frontend

1. Buka service frontend di Railway
2. Pergi ke tab **"Variables"**
3. Tambahkan:

```env
REACT_APP_API_URL=${{ backend.RAILWAY_PUBLIC_URL }}
```

#### 3.3 Configure Frontend Build & Start

Railway akan otomatis mendeteksi `package.json`, tapi pastikan:

- Build command: `npm run build`
- Start command: `npm start` atau serve the build folder

Untuk serve static build folder, update `package.json` frontend:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "serve": "npx serve -s build -l 3000"
}
```

---

### **Step 4: Custom Domain (Optional)**

#### Backend
1. Di Railway backend service → **Settings** → **Domains**
2. Klik **"Add Custom Domain"**
3. Masukkan: `api.yourdomain.com`
4. Update DNS records di domain registrar

#### Frontend
1. Di Railway frontend service → **Settings** → **Domains**
2. Klik **"Add Custom Domain"**
3. Masukkan: `yourdomain.com`
4. Update DNS records

---

### **Step 5: Verifikasi Deployment**

#### Test Backend
```bash
# Ganti dengan URL Railway backend Anda
curl https://backend-service.railway.app/users
```

#### Test Frontend
1. Buka https://frontend-service.railway.app di browser
2. Cek network tab di DevTools
3. Pastikan API calls berhasil

---

## 🔄 Update Code & Re-deploy

Railway **auto-deploy** setiap kali push ke GitHub:

```bash
# Edit file
# Commit dan push
git add .
git commit -m "Update feature"
git push origin main
```

Railway akan otomatis rebuild dan deploy.

---

## 📊 Monitor & Logs

1. Login ke Railway dashboard
2. Klik service (backend atau frontend)
3. Tab **"Logs"** untuk melihat output aplikasi
4. Tab **"Metrics"** untuk melihat CPU, Memory usage

---

## 🐛 Troubleshooting

### **Backend Error: "Cannot find module 'dotenv'"**
- Pastikan `npm install` menjalankan dependencies
- Check `package.json` sudah include dotenv

### **Frontend blank page atau error**
- Check console di browser DevTools
- Verify `REACT_APP_API_URL` environment variable
- Check backend API response di network tab

### **Database connection failed**
- Verify credentials di Railway Variables
- Cek MySQL service status di Railway
- Test connection string manually

### **Port already in use**
- Railway akan assign PORT otomatis
- Jangan hardcode port, gunakan `process.env.PORT`

### **Redeploy dari scratch**
```bash
# Di Railway dashboard
1. Service → Settings → Redeploy
2. Atau: Push empty commit
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## 💾 Backup Database

Railway menyediakan MySQL backup otomatis. Untuk manual backup:

1. Download MySQL client (MySQL Workbench atau heidi)
2. Connect ke Railway MySQL dengan public domain
3. Export database

---

## 🚀 Environment-Specific Configs

### Development (Local)
```env
NODE_ENV=development
DB_HOST=localhost
FRONTEND_URL=http://localhost:3000
```

### Production (Railway)
```env
NODE_ENV=production
DB_HOST=${{ MySQL.RAILWAY_PUBLIC_DOMAIN }}
FRONTEND_URL=https://your-domain.railway.app
```

---

## 📝 Tips

- ✅ Selalu test di local dulu sebelum push
- ✅ Monitor logs di Railway dashboard
- ✅ Backup database secara berkala
- ✅ Update dependencies untuk security patches
- ✅ Set up monitoring/alerts di Railway
- ✅ Dokumentasi perubahan environment variables

---

## 🆘 Additional Resources

- [Railway Docs](https://docs.railway.app)
- [Railway Database Documentation](https://docs.railway.app/databases/mysql)
- [Environment Variables Reference](https://docs.railway.app/guides/variables)

