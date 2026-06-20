"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

    const { data, error } = await signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message || "Gagal mendaftar");
      setIsLoading(false);
    } else {
      setIsSuccess(true);
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl animate-fade-in-up text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Cek Terminal Anda!</h2>
        <p className="text-muted-foreground mb-6">
          Karena sistem sedang berjalan di Localhost, kami telah mencetak link verifikasi email ke <b>Console Terminal</b> tempat Anda menjalankan server.
        </p>
        <p className="text-sm bg-muted/50 p-4 rounded-xl mb-6 border border-border">
          Silakan buka terminal / command prompt Anda, klik link verifikasi tersebut, lalu klik tombol di bawah untuk login.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all"
        >
          Ke Halaman Login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Buat Akun Baru</h1>
        <p className="text-muted-foreground">Daftar sekarang dan mulai hasilkan video viral.</p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm text-center">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="password">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
              minLength={8}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:opacity-90 text-primary-foreground py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-6"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
          {!isLoading && <ArrowRight className="w-5 h-5" />}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground font-medium hover:text-primary transition-colors">
          Sign In
        </Link>
      </div>
    </div>
  );
}
