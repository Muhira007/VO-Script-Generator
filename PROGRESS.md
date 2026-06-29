# 🚀 ScriptFlow — Laporan Proyek (Progress)

**Pembaruan Terakhir:** 29 Juni 2026

---

## 📋 Ringkasan Eksekutif

Aplikasi SaaS generator naskah video pendek berbasis AI dengan sistem *credit* prabayar, *scraping* URL produk, 3 mode input, dan sistem pembayaran terintegrasi (Midtrans QRIS + Transfer Manual).

| Metrik | Nilai |
|---|---|
| **Status** | ✅ MVP Selesai Sepenuhnya |
| **Framework** | Next.js 16.2.9 (App Router) |
| **Database** | PostgreSQL 16 + Drizzle ORM 0.45 |
| **Autentikasi** | Better Auth 1.6 (Email/Password + Verifikasi) |
| **AI Model** | Gemini `gemini-3.5-flash` + DeepSeek `deepseek-v4-flash` |
| **Total Halaman** | 13 route (3 public + 5 dashboard + 5 admin) |
| **Total API** | 17 endpoint |
| **Tabel DB** | 7 tabel (3 Better Auth + 4 custom) |

---

## 🏗️ Arsitektur Sistem

```mermaid
graph TB
    subgraph Frontend["🖥️ Frontend"]
        APP["Next.js 16 App Router"]
        TW["Tailwind CSS 4"]
        LUC["Lucide React Icons"]
        FM["Framer Motion"]
    end

    subgraph Middleware["🛡️ Middleware"]
        PROXY["proxy.ts"]
        PROXY --> AUTH_CHECK["Session Check"]
        PROXY --> ROLE_CHECK["Role Guard (admin)"]
    end

    subgraph Backend["⚡ Backend API"]
        GEN_API["/api/generate"]
        SCRAPE_API["/api/scrape"]
        PAY_API["/api/payment/*"]
        ADM_API["/api/admin/*"]
        AUTH_API["/api/auth/[...all]"]
    end

    subgraph AI["🤖 AI Engine"]
        GEMINI["Google Gemini
        gemini-3.5-flash"]
        DEEPSEEK["DeepSeek
        deepseek-v4-flash"]
        RETRY["Retry Logic
        2x/model + fallback"]
    end

    subgraph Data["💾 Data Layer"]
        DB[("PostgreSQL 16")]
        DRIZZLE["Drizzle ORM"]
        FS["public/uploads/proofs/"]
    end

    subgraph Ext["🔌 Eksternal"]
        MIDTRANS["Midtrans
        Snap + Core API"]
        CTX7["Context7 MCP
        Server"]
    end

    Frontend --> Middleware --> Backend
    GEN_API --> AI
    SCRAPE_API --> AI
    PAY_API --> MIDTRANS
    Backend --> Data
```

---

## 🔄 Alur Aplikasi Lengkap

```mermaid
flowchart TD
    subgraph Public["🌐 Area Publik"]
        LP["Landing Page /"]
        LOGIN["Login"]
        REG["Register"]
        LP --> LOGIN
        LP --> REG
    end

    subgraph UserArea["👤 Area User (Auth Required)"]
        DASH["Dashboard"]
        GEN["Generator AI"]
        TOPUP["Top Up Credit"]
        PROF["Profile"]
        SETTINGS["Settings"]

        DASH --> GEN
        DASH --> TOPUP
        DASH --> PROF
        DASH --> SETTINGS
    end

    subgraph GenFlow["🎬 Flow Generator"]
        direction TB
        INPUT["Pilih Mode Input"]
        INPUT --> N1["Nama Produk (1 Credit)"]
        INPUT --> N2["URL + Scraping (2 Credit)"]
        INPUT --> N3["Upload Gambar (3 Credit)"]

        N1 & N2 & N3 --> OPT["Gaya Bahasa (16) + Audiens"]
        OPT --> DUR["Durasi: 15s | 30s | 60s | 90s"]
        DUR --> TOGGLE["Toggle: B-Roll | Roleplay | Hook-Only"]
        TOGGLE --> CHECK{"Credit Cukup?"}
        CHECK -- "Ya" --> AI["🤖 AI Generate"]
        CHECK -- "Tidak" --> TOPUP
        AI --> DEDUCT["Potong Credit"]
        DEDUCT --> SAVE["Simpan Riwayat"]
        SAVE --> OUTPUT["Output: VerA + VerB + Caption"]
    end

    subgraph PayFlow["💰 Flow Pembayaran"]
        direction TB
        PKG["Pilih Paket"]
        PKG --> METHOD{"Metode"}
        METHOD -- "QRIS" --> SNAP["Midtrans Snap"]
        SNAP --> WEBHOOK["Webhook"]
        WEBHOOK --> CREDITS["✅ Credit Masuk"]
        METHOD -- "Manual" --> UP["Upload Bukti"]
        UP --> WAIT["Pending"]
        WAIT --> ADMIN_APPR["Admin Verifikasi"]
        ADMIN_APPR --> CREDITS
    end

    subgraph AdminArea["⚙️ Area Admin (Role Guard)"]
        ADM["Admin Dashboard"]
        ADM --> OV["Overview Stats"]
        ADM --> TX["Transaksi"]
        ADM --> USR["Users"]
        ADM --> PKG_MGMT["Packages"]
        ADM --> GEN_HIST["Riwayat AI"]
        ADM --> SYS_SET["System Settings"]
    end

    LOGIN --> DASH
    REG --> DASH
    GEN --> GenFlow
    TOPUP --> PayFlow
    ADMIN_APPR --> AdminArea
```

---

## ✅ Status Implementasi per Fase

### Fase 1: Setup Proyek & Autentikasi

| Tugas | Status | Detail |
|---|---|---|
| Next.js App Router + Tailwind | ✅ Selesai | v16.2.9, Tailwind CSS 4 |
| Drizzle ORM + PostgreSQL | ✅ Selesai | 7 tabel (user, session, account, verification, transaction, generation_history, app_settings) |
| Better Auth (Email/Password) | ✅ Selesai | Custom fields: `role`, `credits`, `subscriptionEndsAt` |
| Middleware Auth Guard | ✅ Selesai | `proxy.ts` — cek session + role-based redirect |
| Seed Data | ✅ Selesai | User + Admin account awal |

### Fase 2: Slicing UI (Frontend)

| Tugas | Status | Detail |
|---|---|---|
| Landing Page | ✅ Selesai | Navbar, Hero, Features, Pricing, Footer |
| Layout Dashboard | ✅ Selesai | Sidebar + DashboardNavbar, responsif, dark mode |
| Generator UI | ✅ Selesai | 3 tab input, 16 gaya bahasa, durasi, toggle mode |
| Halaman Top Up | ✅ Selesai | Pilih paket, modal Midtrans/manual |
| Halaman Profile & Settings | ✅ Selesai | Edit profil, notifikasi, tema |
| Admin Panel UI | ✅ Selesai | 6 halaman: Overview, TX, Users, Packages, Generations, Settings |
| Animasi | ✅ Selesai | Framer Motion pada landing page & transisi |

### Fase 3: Mesin AI & Scraping

| Tugas | Status | Detail |
|---|---|---|
| Integrasi Gemini API | ✅ Selesai | SDK `@google/genai`, fallback model chain |
| Integrasi DeepSeek API | ✅ Selesai | Direct HTTP, `deepseek-v4-flash` |
| Dual-Model System | ✅ Selesai | Gemini untuk teks+gambar, DeepSeek untuk teks |
| Retry Logic | ✅ Selesai | 2x attempt per model, auto-fallback |
| Web Scraping (Cheerio) | ✅ Selesai | Ekstrak title, meta description, body text |
| Durasi Fleksibel | ✅ Selesai | Rentang kata dinamis, bukan batasan karakter |
| 16 Gaya Bahasa | ✅ Selesai | Prompt engineering untuk tiap gaya |
| B-Roll & Roleplay Mode | ✅ Selesai | Arahan visual per bait narasi |
| Credit System | ✅ Selesai | Biaya: 1 (nama), 2 (URL), 3 (gambar) |
| Riwayat Generasi | ✅ Selesai | Tracking input/output tokens |
| Context7 MCP Server | ✅ Selesai | Terhubung via GitHub PAT |

### Fase 4: Pembayaran & Panel Admin

| Tugas | Status | Detail |
|---|---|---|
| Midtrans Snap Integration | ✅ Selesai | QRIS otomatis, Snap token, popup |
| Midtrans Webhook | ✅ Selesai | Verifikasi signature, update status |
| Transfer Manual | ✅ Selesai | Upload bukti, simpan lokal |
| Persetujuan Manual | ✅ Selesai | Admin approve/reject transaksi |
| Manajemen User | ✅ Selesai | Tambah/kurang credit, ubah role |
| CRUD Packages | ✅ Selesai | Disimpan di `app_settings` |
| System Settings | ✅ Selesai | Pilih provider AI, API key, Midtrans config |
| Notifikasi Admin | ✅ Selesai | Pending transaction count di navbar |
| Notifikasi User | ✅ Selesai | Top-up sukses di navbar |

---

## 🗄️ Skema Database

```mermaid
erDiagram
    user {
        string id PK
        string name
        string email UK
        boolean emailVerified
        string image
        string role
        integer credits
        timestamp subscriptionEndsAt
        timestamp createdAt
        timestamp updatedAt
    }

    session {
        string id PK
        string userId FK
        string token UK
        timestamp expiresAt
        timestamp createdAt
        timestamp updatedAt
    }

    account {
        string id PK
        string userId FK
        string accountId
        string providerId
        string password
        timestamp createdAt
        timestamp updatedAt
    }

    verification {
        string id PK
        string identifier
        string value
        timestamp expiresAt
        timestamp createdAt
        timestamp updatedAt
    }

    transaction {
        string id PK
        string userId FK
        integer amount
        integer creditsAdded
        string method
        string status
        string proofUrl
        string midtransOrderId UK
        timestamp createdAt
        timestamp updatedAt
    }

    generation_history {
        string id PK
        string userId FK
        string sourceType
        string productName
        string content
        integer inputTokens
        integer outputTokens
        timestamp createdAt
    }

    app_settings {
        string key PK
        string value
        timestamp createdAt
        timestamp updatedAt
    }

    user ||--o{ session : "has"
    user ||--o{ account : "has"
    user ||--o{ transaction : "makes"
    user ||--o{ generation_history : "generates"
```

---

## 🤖 Model AI

| Provider | Model | Tipe | Kapabilitas | Biaya Credit |
|---|---|---|---|---|
| **Google Gemini** | `gemini-3.5-flash` | Utama | Teks + Gambar | 1-3 |
| **DeepSeek** | `deepseek-v4-flash` | Utama | Teks saja | 1-2 |

**Catatan:**
- Input gambar otomatis menggunakan Gemini (DeepSeek tidak mendukung gambar).
- Retry logic: 2 attempt per model → fallback ke model lain jika gagal.
- Admin dapat mengganti provider default via `/admin/settings`.

---

## 📦 Paket Top-Up

| Nama | Harga | Credit | Populer |
|---|---|---|---|
| **Starter** | Rp 25.000 | 50 | |
| **Creator** | Rp 100.000 | 250 | ⭐ |
| **Agency** | Rp 250.000 | 1.000 | |

---

## 🚧 Catatan & Rencana Selanjutnya

1. **Penyimpanan Cloud:** Bukti transfer masih di `public/uploads/proofs/`. Disarankan migrasi ke Supabase Storage atau S3 untuk produksi.
2. **Email Service:** Verifikasi email saat ini log URL ke console (dev). Perlu integrasi SMTP (Resend, SendGrid) untuk produksi.
3. **Monitoring & Logging:** Belum ada sistem monitoring produksi (error tracking, analytics).
4. **Rate Limiting:** Belum ada pembatasan rate pada API routes.
5. **Testing:** Belum ada unit/integration test.
6. **CI/CD:** Pipeline deployment belum dikonfigurasi.
7. **Sistem Langganan 30 Hari:** Kolom `subscription_ends_at` sudah ada di database. Logika pengecekan masa aktif perlu diintegrasikan ke middleware/API.
