# 🚀 Dokumen Kebutuhan Produk (PRD) — ScriptFlow

**Nama Proyek:** ScriptFlow
**Jenis:** Web Application (SaaS)
**Deskripsi:** Aplikasi pembuat naskah video TikTok/Reels/Shorts berbasis AI dengan sistem *credit* prabayar masa aktif 30 hari. Dilengkapi *scraping* URL produk, 3 mode input (nama/URL/gambar), dan sistem pembayaran terintegrasi (Midtrans QRIS + Transfer Manual).

---

## 1. Aturan & Instruksi Pengembangan

| Aturan | Deskripsi |
|---|---|
| **Tech Stack Ketat** | Hanya gunakan teknologi yang tercantum di bagian "Tech Stack". |
| **App Router** | Wajib menggunakan Next.js App Router (`app/` directory), bukan Pages Router. |
| **TypeScript** | Seluruh logika ditulis dalam TypeScript (`.ts`, `.tsx`) dengan tipe data eksplisit. |
| **Pengerjaan Bertahap** | Kerjakan per fase secara berurutan, tidak sekaligus. |
| **Dark Mode** | Desain *dark mode* menggunakan Tailwind CSS dengan komponen yang bersih. |

---

## 2. Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Bahasa** | TypeScript |
| **Styling** | Tailwind CSS 4 + Lucide React (Icons) + Framer Motion |
| **Database** | PostgreSQL 16 |
| **ORM** | Drizzle ORM (`drizzle-orm`, `drizzle-kit`) |
| **Autentikasi** | Better Auth (`better-auth`) dengan Drizzle adapter |
| **AI** | Google Gemini API (`@google/genai`) + DeepSeek API (HTTP) |
| **Web Scraping** | Cheerio (`cheerio`) |
| **Pembayaran** | Midtrans Node.js SDK (`midtrans-client`) |
| **Penyimpanan** | Local filesystem (`public/uploads/proofs/`) untuk bukti transfer |
| **Tabel Admin** | TanStack React Table (`@tanstack/react-table`) |

---

## 3. Skema Database

```mermaid
erDiagram
    user {
        string id PK
        string name
        string email UK
        boolean emailVerified
        string image
        string role "user | admin"
        integer credits "Saldo kredit"
        timestamp subscriptionEndsAt "Batas 30 hari"
    }

    session {
        string id PK
        string userId FK
        string token UK
        timestamp expiresAt
    }

    account {
        string id PK
        string userId FK
        string accountId
        string providerId
        string password
    }

    verification {
        string id PK
        string identifier
        string value
        timestamp expiresAt
    }

    transaction {
        string id PK
        string userId FK
        integer amount "Nominal Rp"
        integer creditsAdded
        string method "midtrans_qris | manual_transfer"
        string status "pending | success | failed"
        string proofUrl "Bukti transfer"
        string midtransOrderId UK
        timestamp createdAt
    }

    generation_history {
        string id PK
        string userId FK
        string sourceType "name | url | image"
        string productName
        string content "Naskah AI (JSON)"
        integer inputTokens
        integer outputTokens
        timestamp createdAt
    }

    app_settings {
        string key PK
        string value "JSON"
    }

    user ||--o{ session : "memiliki"
    user ||--o{ account : "memiliki"
    user ||--o{ transaction : "melakukan"
    user ||--o{ generation_history : "menghasilkan"
```

---

## 4. Alur Kerja Aplikasi

### 4.1 Alur Registrasi & Autentikasi

```mermaid
flowchart TD
    A["👤 Pengguna Baru"] --> B["Register"]
    B --> C["Isi Nama, Email, Password"]
    C --> D["Email Verifikasi Terkirim"]
    D --> E["Klik Link Verifikasi"]
    E --> F["✅ Akun Aktif (3 Credit Gratis)"]
    F --> G["🔑 Login"]

    H["👤 Pengguna Lama"] --> G
    G --> I["Middleware Cek Session"]
    I -- "Valid" --> J["Dashboard"]
    I -- "Invalid" --> G
```

### 4.2 Alur Generator AI

```mermaid
flowchart TD
    A["🎬 Generator AI"] --> B{"Pilih Mode Input"}
    B -- "Nama Produk (1 Credit)" --> C["Input nama produk"]
    B -- "URL Produk (2 Credit)" --> D["Tempel URL → Auto-Scraping"]
    B -- "Upload Gambar (3 Credit)" --> E["Upload foto produk"]

    C & D & E --> F["Atur Opsi Naskah"]
    F --> G["Gaya Bahasa (16 pilihan)"]
    F --> H["Target Audiens"]
    F --> I["Durasi: 15s/30s/60s/90s"]
    F --> J["Toggle: B-Roll, Roleplay, Hook-Only"]

    G & H & I & J --> K{"Cek Credit ≥ Biaya?"}
    K -- "Tidak" --> L["💰 Arahkan ke Top Up"]
    K -- "Ya" --> M["🤖 Panggil AI"]

    M --> N{"Provider AI?"}
    N -- "Gemini" --> O["Google Gemini 3.5 Flash"]
    N -- "DeepSeek" --> P["DeepSeek V4 Flash"]

    O & P --> Q["Retry Logic (2x/model)"]
    Q --> R{"Berhasil?"}
    R -- "Ya" --> S["Credit Dipotong"]
    R -- "Tidak" --> T["Fallback Model Lain"]

    S --> U["💾 Simpan Riwayat"]
    U --> V["📋 Tampilkan Hasil:
    Version A (Hard-Selling)
    Version B (Storytelling)
    Caption"]

    T --> Q
```

### 4.3 Alur Pembayaran

```mermaid
flowchart TD
    A["💰 Top Up"] --> B["Pilih Paket Credit"]
    B --> C{"Metode Pembayaran"}

    C -- "Midtrans QRIS" --> D["POST /api/payment/create"]
    D --> E["Dapatkan Snap Token"]
    E --> F["Popup Midtrans Snap"]
    F --> G["User Scan QRIS"]
    G --> H["Midtrans Kirim Webhook"]
    H --> I["POST /api/webhooks/midtrans"]
    I --> J["Verifikasi Signature"]
    J --> K["✅ Update Status & Tambah Credit"]
    K --> L["Notifikasi ke User"]

    C -- "Transfer Manual" --> M["POST /api/payment/manual"]
    M --> N["Upload Bukti Transfer"]
    N --> O["Simpan ke public/uploads/"]
    O --> P["Status: Pending"]
    P --> Q["Admin Review"]
    Q --> R{"Admin Setuju?"}
    R -- "Ya" --> S["✅ Tambah Credit"]
    R -- "Tolak" --> T["❌ Status: Failed"]
```

### 4.4 Alur Admin

```mermaid
flowchart TD
    A["⚙️ Admin Login"] --> B["Middleware Cek Role"]
    B -- "Bukan Admin" --> C["Redirect ke /generator"]
    B -- "Admin" --> D["Admin Dashboard"]

    D --> E["📊 Overview: Stats & Grafik"]
    D --> F["💳 Transaksi: Approve/Reject"]
    D --> G["👥 Users: Tambah/Kurang Credit"]
    D --> H["📦 Packages: CRUD Paket"]
    D --> I["📋 Generations: Riwayat AI"]
    D --> J["⚡ Settings: Provider AI & API Key"]

    F --> K{"Transaksi Manual?"}
    K -- "Approve" --> L["Tambah Credit User"]
    K -- "Reject" --> M["Update Status → Failed"]

    G --> N{"Aksi"}
    N -- "Tambah Credit" --> O["POST /api/admin/users/credits"]
    N -- "Ubah Role" --> P["POST /api/admin/users/role"]
```

---

## 5. Fitur Inti

### A. Modul Generator AI (`/generator`)
1. **3 Mode Input:** Nama produk (1 credit), URL produk + auto-scraping (2 credit), upload gambar (3 credit).
2. **16 Gaya Bahasa:** Casual Gen-Z, Hard Selling, Storytelling, Educational, Savage, ASMR, Elegant, Mystery, POV, Brutal Review, Challenge, Tips & Trick, Breaking News, Pantun, Motivational, Rap.
3. **Opsi Durasi Dinamis:** 15s (40-50 kata), 30s (80-100 kata), 60s (150-180 kata), 90s (230-260 kata) — rentang kata, bukan batasan karakter kaku.
4. **Web Scraping:** Fetch URL target dengan Cheerio → ekstrak `<title>`, `<meta description>`, dan teks body.
5. **Dual-Model AI:** Gemini 3.5 Flash (teks + gambar) dan DeepSeek V4 Flash (teks). Otomatis fallback ke Gemini jika input gambar.
6. **Retry Logic:** 2 kali percobaan per model, fallback ke model alternatif jika gagal.
7. **Output:** Version A (Hard-Selling), Version B (Storytelling), Caption. Masing-masing dengan arahan B-Roll.

### B. Modul Pembayaran & Langganan
1. **Midtrans QRIS (Otomatis):** Snap token → popup pembayaran → webhook konfirmasi → credit otomatis bertambah.
2. **Transfer Manual:** Upload bukti → status pending → admin approve/reject.
3. **Paket 30 Hari:** Credit berlaku dalam masa aktif 30 hari sejak pembelian (`subscriptionEndsAt`).

### C. Modul Admin (`/admin`)
1. **Overview:** Statistik pengguna, pendapatan, transaksi pending, pendaftar baru.
2. **Transaksi:** Tabel seluruh transaksi + approve/reject untuk transfer manual.
3. **Users:** Tabel pengguna + tambah/kurang credit + ubah role.
4. **Packages:** CRUD paket top-up (disimpan di `app_settings`).
5. **Generations:** Riwayat generasi AI seluruh pengguna dengan token tracking.
6. **Settings:** Pilih provider AI (Gemini/DeepSeek), atur API key, dan konfigurasi Midtrans.

---

## 6. API Endpoints

| Endpoint | Method | Deskripsi |
|---|---|---|
| `/api/auth/[...all]` | * | Better Auth handler (login, register, session, verifikasi) |
| `/api/generate` | POST | Generate naskah AI (auth, cek credit, panggil AI, simpan) |
| `/api/scrape` | POST | Scrape metadata URL produk (Cheerio) |
| `/api/history` | GET, DELETE | Riwayat generasi user |
| `/api/payment/create` | POST | Buat transaksi Midtrans Snap |
| `/api/payment/manual` | POST | Upload bukti transfer manual |
| `/api/webhooks/midtrans` | POST | Webhook notifikasi Midtrans |
| `/api/admin/stats` | GET | Statistik dashboard admin |
| `/api/admin/users` | GET | Daftar semua user |
| `/api/admin/users/credits` | POST | Tambah/kurang credit user |
| `/api/admin/users/role` | POST | Ubah role user |
| `/api/admin/transactions` | GET | Daftar semua transaksi |
| `/api/admin/transactions/approve` | POST | Approve/reject transaksi manual |
| `/api/admin/packages` | GET, POST | CRUD paket top-up |
| `/api/admin/settings` | GET, POST | Pengaturan AI & Midtrans |
| `/api/admin/notifications` | GET | Notifikasi admin (pending count) |
| `/api/user/notifications` | GET | Notifikasi user (top-up sukses) |
| `/api/test-gemini` | GET | Tes konektivitas Gemini API |

---

## 7. Fase Implementasi

| Fase | Deskripsi | Status |
|---|---|---|
| **Fase 1** | Setup Proyek, Database, & Autentikasi | ✅ Selesai |
| **Fase 2** | Slicing UI/Frontend (Landing, Dashboard, Admin) | ✅ Selesai |
| **Fase 3** | Mesin AI, Scraping, & Context7 MCP | ✅ Selesai |
| **Fase 4** | Payment Gateway & Panel Admin | ✅ Selesai |
