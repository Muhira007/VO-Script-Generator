import { Link2, Bot, Volume2, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <Link2 className="w-6 h-6 text-primary" />,
    title: "1-Klik Auto-Scraping",
    description: "Nggak perlu ketik ulang kelebihan produk. Cukup tempel link Shopee/TikTok, sistem kami yang akan mengekstrak detail produknya."
  },
  {
    icon: <Bot className="w-6 h-6 text-primary" />,
    title: "Copywriting Anti-Skip",
    description: "Dibekali formula Hook 3-detik pertama yang menghentikan scroll penonton, dirancang khusus agar video Anda masuk FYP."
  },
  {
    icon: <Volume2 className="w-6 h-6 text-primary" />,
    title: "Multi-Angle Promosi",
    description: "Dapatkan naskah versi Hard-Selling untuk closing cepat, atau versi Storytelling untuk edukasi soft-selling yang mengalir."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    title: "Panduan Visual B-Roll",
    description: "Bukan sekadar teks bacaan! AI juga memberikan arahan visual (kamera/adegan) mana yang harus direkam agar video makin relevan."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Senjata Rahasia Top Affiliator</h2>
          <p className="text-muted-foreground text-lg">
            Bukan sekadar AI biasa. Ini adalah mesin konversi yang dirancang khusus untuk kreator konten pendek. 
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
