# 🚀 ScriptFlow — AI Script & Voiceover Generator SaaS

**ScriptFlow** adalah platform *Software as a Service* (SaaS) yang dirancang untuk konten kreator, *marketer*, dan *affiliator* (Shopee, TikTok, dll) yang ingin meningkatkan produktivitas dan kualitas konten video pendek mereka.

## 📖 Tentang Produk

Di era video pendek yang bergerak cepat, naskah yang menarik (*hook* anti-skip) dan panduan visual yang jelas adalah kunci konversi. Namun, meriset produk dan menulis naskah dari nol memakan waktu.

**ScriptFlow** hadir sebagai solusi *all-in-one*. Cukup tempelkan tautan produk, unggah gambar, atau ketik nama produk — sistem akan mengekstrak informasi penting, lalu menggunakan AI (Gemini & DeepSeek) untuk meracik naskah video siap *shooting* lengkap dengan arahan B-Roll dan pilihan durasi presisi.

## 🏗️ Arsitektur Sistem

```mermaid
graph TB
    subgraph Client["🖥️ Client (Browser)"]
        LP["Landing Page /"]
        AUTH_P["Login / Register"]
        DASH["Dashboard"]
        GEN["Generator AI"]
        TOPUP["Top Up"]
        ADMIN_P["Admin Panel"]
    end

    subgraph NextJS["⚡ Next.js 16 Server"]
        MW["Middleware (proxy.ts)"]
        API["API Routes (17 endpoint)"]
        AUTH_S["Better Auth Handler"]
        SCRAPE["Cheerio Scraper"]
    end

    subgraph AI["🤖 AI Engine"]
        GEM["Google Gemini 3.5 Flash"]
        DS["DeepSeek V4 Flash"]
    end

    subgraph Data["💾 Data Layer"]
        PG[("PostgreSQL 16")]
        FS["Local Filesystem
        (public/uploads/)"]
    end

    subgraph Ext["🔌 External Services"]
        MID["Midtrans (QRIS)"]
        CTX["Context7 MCP"]
    end

    Client --> MW --> API
    API --> AUTH_S --> PG
    API --> SCRAPE --> GEM
    API --> SCRAPE --> DS
    API --> MID
    API --> FS
    API --> CTX
    AUTH_S --> PG
```

## 🔄 Alur Pengguna

```mermaid
flowchart TD
    LP["🏠 Landing Page"] --> AUTH{"Sudah punya akun?"}
    AUTH -- "Belum" --> REG["📝 Register"]
    AUTH -- "Sudah" --> LOGIN["🔑 Login"]
    REG --> VERIFY["📧 Verifikasi Email"]
    VERIFY --> DASH
    LOGIN --> DASH["📊 Dashboard"]

    DASH --> GEN["🎬 Generator AI"]
    DASH --> TOP["💰 Top Up Credit"]
    DASH --> PROF["👤 Profile"]

    GEN --> INPUT{"Pilih Input"}
    INPUT -- "Nama Produk" --> N1["1 Credit"]
    INPUT -- "URL Produk" --> N2["2 Credit"]
    INPUT -- "Upload Gambar" --> N3["3 Credit"]

    N1 & N2 & N3 --> OPTIONS["Atur Gaya Bahasa, Audiens, Durasi"]
    OPTIONS --> AI_CALL["🤖 AI Memproses"]
    AI_CALL --> RESULT["📋 Naskah + B-Roll + Caption"]
    RESULT --> SAVE[("💾 Simpan Riwayat")]

    TOP --> PKG["Pilih Paket"]
    PKG --> PAY{"Metode Bayar"}
    PAY -- "Midtrans QRIS" --> QR["Scan QRIS"]
    QR --> WEBHOOK["Webhook Konfirmasi"]
    WEBHOOK --> CREDIT["✅ Credit Bertambah"]
    PAY -- "Transfer Manual" --> UPLOAD["Upload Bukti"]
    UPLOAD --> ADMIN_APPR["Admin Setuju"]
    ADMIN_APPR --> CREDIT

    ADMIN_P["⚙️ Admin Panel"] --> ADM_DASH["Overview"]
    ADMIN_P --> ADM_TX["Transaksi"]
    ADMIN_P --> ADM_USR["Users"]
    ADMIN_P --> ADM_PKG["Packages"]
    ADMIN_P --> ADM_GEN["Riwayat Generate"]
    ADMIN_P --> ADM_SET["Settings AI & API"]
```

## 🌟 Fitur Unggulan

| Fitur | Deskripsi |
|---|---|
| **1-Klik Auto-Scraping** | Tempel *link* produk (Shopee, TikTok, dll), sistem otomatis mengekstrak judul, deskripsi, dan detail produk. |
| **Generator AI Dual-Model** | Naskah diracik oleh Google Gemini dan DeepSeek dengan kerangka *Marketing 4.0* — Hook anti-skip, Storytelling, Hard-Selling. |
| **3 Mode Input** | Nama produk (1 credit), URL produk (2 credit), atau upload gambar produk (3 credit). |
| **Arahan B-Roll Dinamis** | AI memberikan saran pengambilan adegan untuk setiap bait narasi, bukan hanya teks naskah. |
| **16 Gaya Bahasa** | Casual Gen-Z, Hard Selling, Storytelling, Educational, Savage, ASMR, Elegant, Mystery, POV, Brutal Review, Challenge, Tips, Breaking News, Pantun, Motivational, Rap. |
| **Durasi Fleksibel** | Pilih 15s / 30s / 60s / 90s — AI menyesuaikan panjang naskah secara presisi dengan rentang kata dinamis. |
| **Pembayaran Midtrans + Manual** | Top-up via QRIS (otomatis) atau transfer manual (persetujuan admin). |
| **Paket 30 Hari** | Model prabayar berlangganan — credit berlaku dalam masa aktif 30 hari. |

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Bahasa** | TypeScript |
| **Styling** | Tailwind CSS 4 + Lucide React + Framer Motion |
| **Database** | PostgreSQL 16 + Drizzle ORM |
| **Autentikasi** | Better Auth (Email/Password + Verifikasi Email) |
| **AI** | Google Gemini (`gemini-3.5-flash`) + DeepSeek (`deepseek-v4-flash`) |
| **Web Scraping** | Cheerio |
| **Pembayaran** | Midtrans Node.js SDK (Snap + Core API) |
| **Tabel Admin** | TanStack React Table |

## 📂 Struktur Proyek

```
scriptflow/
├── app/                          # Next.js App Router
│   ├── (auth)/                   #   /login, /register
│   ├── (dashboard)/              #   /dashboard, /generator, /topup, /profile, /settings
│   ├── (admin)/admin/            #   /admin (overview, users, transactions, packages, generations, settings)
│   ├── api/                      #   17 endpoint REST API
│   └── layout.tsx                #   Root layout
├── components/                   # UI Components
│   ├── admin/                    #   AdminSidebar, AdminNavbar, DataTable
│   ├── dashboard/                #   Sidebar, DashboardNavbar
│   └── ui/                       #   Button, Badge, Table, DropdownMenu (shadcn)
├── db/                           # Database
│   ├── schema.ts                 #   Skema Drizzle (7 tabel)
│   ├── index.ts                  #   Koneksi Pool PostgreSQL
│   └── seed.ts                   #   Data awal (user + admin)
├── lib/                          # Shared utilities
│   ├── auth.ts                   #   Better Auth server config
│   ├── auth-client.ts            #   Better Auth client
│   └── midtrans.ts               #   Midtrans Snap & Core API client
├── public/uploads/proofs/        # Bukti transfer manual
├── proxy.ts                      # Middleware (auth + role guard)
└── package.json
```

## 🚀 Instalasi Lokal

### 1. Kloning & Install
```bash
git clone https://github.com/Muhira007/scriptflow.git
cd scriptflow
npm install
```

### 2. Konfigurasi Environment
Buat file `.env` di root:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/scriptflow
BETTER_AUTH_SECRET=your_auth_secret
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_GEMINI_API_KEY=your_gemini_key
DEEPSEEK_API_KEY=your_deepseek_key

MIDTRANS_IS_PRODUCTION=false
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

### 3. Setup Database
```bash
npm run db:push    # Push schema ke PostgreSQL
npm run db:seed    # Seed user & admin awal
```

### 4. Jalankan
```bash
npm run dev        # http://localhost:3000
```

**Akun seed:**
- User: `user@generator.com` / `@Pasword123`
- Admin: `admin@generator.com` / `@Pasword123`

## 📜 Lisensi & Pengembang

Dikembangkan oleh **Muhira007** (Kang Demuh) — proyek portofolio SaaS AI Content Generator.
