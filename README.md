# 🚀 VOGen.ai - VO & Script Generator SaaS

VOGen.ai adalah sebuah aplikasi *Software as a Service* (SaaS) revolusioner yang dirancang khusus untuk para konten kreator dan affiliator (Shopee/TikTok). Aplikasi ini secara otomatis mengekstrak detail produk dari link apa pun, lalu menggunakan kecerdasan buatan (AI) untuk meracik naskah video pendek (Shorts/Reels/TikTok) yang memicu konversi (*highly converting*) dan menghasilkan sulih suara (*Voiceover*) secara instan.

## 🌟 Fitur Unggulan

- **1-Klik Auto-Scraping:** Cukup tempelkan *link* produk (Shopee, TikTok, dll), biarkan sistem yang mengekstrak informasi, judul, dan detail produknya.
- **Generator Naskah Berbasis AI (Gemini & DeepSeek):** Meracik naskah dengan kerangka *Marketing 4.0* (Hooks anti-skip, Storytelling, Hard-Selling) tanpa batas jumlah karakter yang kaku.
- **Arahan Visual (B-Roll):** Tidak hanya teks naskah, AI juga memberikan saran pengambilan adegan video/kamera untuk setiap bait narasi.
- **Durasi Dinamis:** Pilih durasi target Anda (15s, 30s, 60s, 90s), dan AI akan menyesuaikan panjang naskahnya secara presisi.
- **Pembayaran Terintegrasi (Midtrans & Manual):** Top-up *credit* dengan mudah menggunakan QRIS (otomatis) atau transfer manual (menunggu persetujuan admin).
- **Masa Aktif Paket 30 Hari:** Model bisnis prabayar berlangganan yang adil dan *familiar* bagi pengguna Indonesia.

## 🛠️ Tech Stack Utama

- **Framework:** Next.js 16 (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS 4 + Lucide React
- **Database:** PostgreSQL (via Drizzle ORM)
- **Autentikasi:** Better Auth (Mendukung Email/Password & Verifikasi)
- **Kecerdasan Buatan (AI):** Google Gemini (`gemini-3.5-flash`) & DeepSeek (`deepseek-v4-flash`)
- **Pembayaran:** Midtrans Node.js SDK

## 🚀 Panduan Instalasi Lokal

1. **Kloning Repositori:**
   ```bash
   git clone https://github.com/Muhira007/VO-Script-Generator.git
   cd VO-Script-Generator
   ```

2. **Instalasi Dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Buat file `.env` di *root directory* dan isi dengan variabel berikut:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/namadatabase
   BETTER_AUTH_SECRET=rahasia_auth_anda
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

   GOOGLE_GEMINI_API_KEY=api_key_gemini_anda
   DEEPSEEK_API_KEY=api_key_deepseek_anda

   MIDTRANS_IS_PRODUCTION=false
   MIDTRANS_SERVER_KEY=server_key_midtrans_anda
   MIDTRANS_CLIENT_KEY=client_key_midtrans_anda
   ```

4. **Migrasi Database:**
   ```bash
   npm run db:push
   ```

5. **Jalankan Aplikasi (Development):**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

## 📜 Lisensi & Pengembang

Dikembangkan oleh **Muhira007** (Kang Demuh).
Proyek ini dibuat sebagai portofolio dan dasar implementasi *SaaS AI Content Generator*.
