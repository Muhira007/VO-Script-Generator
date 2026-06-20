"use client";

import { useState, useEffect } from "react";
import { User, Mail, Loader2, CheckCircle2, Link as LinkIcon } from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const { data, error } = await authClient.updateUser({
        name,
        image: image || undefined,
      });

      if (error) {
        setMessage({ type: "error", text: error.message || "Gagal memperbarui profil" });
      } else {
        setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
        // Memaksa update session local agar tampilan navbar juga ikut terupdate
        await authClient.getSession();
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Terjadi kesalahan" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-50" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-8 animate-fade-in-up w-full pb-8 max-w-[900px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profil Saya</h1>
        <p className="text-muted-foreground">Perbarui informasi personal dan foto profil Anda.</p>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-sm">
        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : null}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center overflow-hidden">
                {image ? (
                  <img src={image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-primary" />
                )}
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium" htmlFor="image">URL Foto Profil</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground">Masukkan link gambar (URL) untuk foto profil Anda. Biarkan kosong jika tidak ada.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Email (Disabled/Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Alamat Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none cursor-not-allowed opacity-70"
                />
              </div>
              <p className="text-xs text-muted-foreground">Email terikat pada akun dan tidak dapat diubah.</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button 
              type="submit" 
              disabled={isLoading || isPending}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
