import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Investasi Kecil, Komisi Maksimal</h2>
          <p className="text-muted-foreground text-lg">
            Tanpa biaya bulanan tersembunyi. Bayar sesuai kebutuhan (Pay-As-You-Go).
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Package */}
          <div className="bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-colors">
            <h3 className="text-2xl font-bold mb-2">Paket Pemula</h3>
            <p className="text-muted-foreground mb-6">Cocok untuk mencoba kehebatan AI</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold">Rp 25.000</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span><strong>50 Kredit</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground font-medium">Masa Aktif 30 Hari</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Fitur URL Auto-Scraping</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Akses Format Hard-Selling</span>
              </li>
            </ul>
            
            <button className="w-full py-3 rounded-full font-medium border border-border hover:bg-muted transition-colors">
              Beli Paket Pemula
            </button>
          </div>

          {/* Pro Package */}
          <div className="bg-gradient-to-b from-primary/20 to-card border border-primary rounded-3xl p-8 relative shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
              Paling Laris
            </div>
            <h3 className="text-2xl font-bold mb-2">Paket Kreator</h3>
            <p className="text-muted-foreground mb-6">Bagi affiliator yang serius ingin gajian</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold">Rp 100.000</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span><strong>250 Kredit (Bonus 50)</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground font-medium">Masa Aktif 30 Hari</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Fitur URL Auto-Scraping</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Format Storytelling & B-Roll</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Prioritas Server Cepat</span>
              </li>
            </ul>
            
            <button className="w-full py-3 rounded-full font-medium bg-primary hover:bg-accent text-primary-foreground transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Beli Paket Kreator
            </button>
          </div>
          {/* Agency Package */}
          <div className="bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-colors flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Paket Agensi</h3>
            <p className="text-muted-foreground mb-6">Untuk ternak akun & banjir komisi</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold">Rp 250.000</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span><strong>1000 Kredit</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground font-medium">Masa Aktif 30 Hari</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Prioritas Utama API</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Grup Support Eksklusif</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Harga per-kredit Termurah</span>
              </li>
            </ul>
            
            <button className="w-full py-3 rounded-full font-medium border border-border hover:bg-muted transition-colors mt-auto">
              Beli Paket Agensi
            </button>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Kami menerima pembayaran melalui QRIS, GoPay, OVO, ShopeePay, dan Transfer Bank.</p>
        </div>
      </div>
    </section>
  );
}
