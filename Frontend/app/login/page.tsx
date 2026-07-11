"use client";
import { Lock, Mail, Zap } from "lucide-react";
import { loginResponse } from "../services/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [Error, setError] = useState(false);
  const router = useRouter();
  async function fazerLogin() {
    setError(false);

    try {
      const token = await loginResponse(email, senha);

      localStorage.setItem("token", token);

      router.push("/cassino");
    } catch {
      setError(true);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/cassino");
    }
  }, []);
  return (
    <section className="p-6 flex-1 bg-[#0E1015]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6 py-10">
          <div className="w-14 h-14 bg-linear-to-br from-[#EBCC15] to-[#B8860B] rounded-2xl flex items-center justify-center text-[#0E1015] shadow-[0_0_20px_rgba(235,204,21,0.25)]">
            <Zap absoluteStrokeWidth size={30} fill="currentColor" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <h2 className="font-inter text-white text-xl font-bold uppercase">
              Royal cassino
            </h2>
            <div className="flex max-w-xl w-full items-center gap-3">
              <div className="flex-1 min-w-12 h-px bg-linear-to-l from-[#2A2E39] to-transparent" />
              <p className="text-[#717C8E]  text-xs font-bold whitespace-nowrap">
                Gire as slots, suba no ranking
              </p>
              <div className="flex-1 min-w-12 h-px bg-linear-to-r from-[#2A2E39] to-transparent" />
            </div>

            <div className="p-6 mb-2 mt-6 w-125 rounded-2xl flex flex-col bg-[#15171E] border border-[#2A2E39] shadow-[0_0_20px_rgba(0,0,0,0.2)]">
              <h2 className="font-poppins mb-1 font-semibold text-lg text-white">
                Bem-vindo de volta
              </h2>
              <p className="text-[#717C8E] mb-6 text-sm">
                Faça login na sua conta
              </p>
              <button className="py-3 px-4 gap-4 bg-[#11131A] cursor-pointer hover:bg-[#1A1D25] text-sm text-white font-inter w-full flex items-center justify-center rounded-xl font-semibold border border-[#2A2D35]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
                Continuar com Google
              </button>

              <div className="flex gap-4 items-center py-5">
                <div className="w-full h-px  bg-[#2A2E39]  "></div>
                <p className="text-[#717C8E] text-sm">OU</p>
                <div className="w-full h-px  bg-[#2A2E39]  "></div>
              </div>

              <div className="flex mb-4 flex-col gap-2 w-full max-w-md">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7E8696]">
                  E-mail
                </label>

                <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-[#2A2E39] bg-[#11131A] transition-colors focus-within:border-[#EBCC15]">
                  <Mail size={18} className="text-[#6B7280]" />

                  <input
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                    className="flex-1 bg-transparent text-sm outline-none text-white placeholder:text-[#6B7280]"
                  />
                </div>
              </div>
              <div className="flex mb-4 flex-col gap-2 w-full max-w-md">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7E8696]">
                  senha
                </label>

                <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-[#2A2E39] bg-[#11131A] transition-colors focus-within:border-[#EBCC15]">
                  <Lock size={18} className="text-[#6B7280]" />

                  <input
                    type="password"
                    required
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="••••••••••"
                    className="flex-1 bg-transparent outline-none text-white placeholder:text-[#6B7280]"
                  />
                </div>
              </div>

              <button
                onClick={fazerLogin}
                className="py-3 uppercase hover:scale-95 transition ease duration-300 px-4 gap-4 bg-[#EBCC15] cursor-pointer hover:bg-[#F2D54A] text-sm text-[#0E1015] font-inter w-full flex items-center justify-center rounded-xl font-semibold border border-[#F2D54A]"
              >
                Entrar
              </button>
              {Error && (
                <p className="text-red-500 text-sm mt-2">
                  Login ou Senha inválidos!
                </p>
              )}
            </div>
            <a
              href="/register"
              className="font-inter text-sm font-medium text-[#6B7280] "
            >
              Não tem uma conta?{" "}
              <span className="text-[#EBCC15] font-bold">Criar conta</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
