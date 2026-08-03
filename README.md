# 📝 Aplikasi Sticky Note

Aplikasi notes sederhana Sticky note dengan autentikasi berbasis email. Backend menggunakan Express dengan penyimpanan JSON, frontend menggunakan React + Vite + Tailwind CSS.

---

## 🚀 Teknologi

### Backend
- Node.js + Express
- ES Module (import/export)
- Penyimpanan data: JSON (file-based)
- Autentikasi: token berbasis email (Bearer token)
- CORS, dotenv, nodemon

### Frontend
- React 18
- Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v6
- Fetch API (tanpa Axios)

---

## 📁 Struktur Project

```
├── backend/
│ ├── data/
│ │ ├── users.json # auto-generated
│ │ └── notes.json # auto-generated
│ ├── src/
│ │ ├── lib/
│ │ │ └── fileHelper.js # baca/tulis JSON + auto create dir file
│ │ ├── models/
│ │ │ ├── UserModel.js
│ │ │ └── NoteModel.js
│ │ ├── controllers/
│ │ │ ├── authController.js
│ │ │ └── noteController.js
│ │ ├── middleware/
│ │ │ └── auth.js
│ │ ├── routes/
│ │  ├── authRoutes.js
│ │  ├── noteRoutes.js
│ │  └── index.js
│ ├── index.js # entry point 
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ │ └── api.js # fetch helper
│ │ ├── context/
│ │ │ └── AuthContext.jsx
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ └── Notes.jsx
│ │ ├── components/
│ │ │ ├── NoteCard.jsx
│ │ │ └── NoteForm.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── vite.config.js
│ ├── .env
│ └── package.json
│
├── package.json # root workspace (optional)
└── README.md
```


---

## ⚙️ Instalasi & Menjalankan

### 1. Clone repository & masuk ke folder project

```bash
git clone <url>
cd my-app
```

### 2. install dependancy di backend dan frontend
```bash
npm -w backend i
npm -w frontend i 
```

### 3. jalankan server frontend dan backend
```bash
npm run dev
```

## 🔐 Endpoint API (Backend)

Semua response mengikuti format:
```json
{
  "success": true/false,
  "message": "string",
  "results": {} // opsional
}
```

## Jalankan dengan docker compose

```bash
docker compose up --build

```


## ✨ Fitur

    Autentikasi – Register/Login dengan email & password.

    Token – Disimpan di localStorage, dikirim via header Authorization: Bearer Token JWT

    CRUD Notes – Setiap user hanya bisa mengakses notes miliknya sendiri.

    Responsive UI – Tailwind CSS, card layout, form inline edit.

    Modal Notifikasi – Setiap aksi (login, register, CRUD) menampilkan modal dengan pesan dari backend.

    Auto-generated data folder – Folder data/ dan file JSON dibuat otomatis saat pertama kali dijalankan.

