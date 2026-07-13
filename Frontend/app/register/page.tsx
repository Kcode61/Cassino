"use client";
import { Lock, Mail, User, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginResponse, registrarResponse } from "../services/api";
import { useEffect, useState } from "react";

export default function register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [Error, setError] = useState(false);
  const router = useRouter();

  async function fazerRegistro() {
    setError(false);

    try {
      await registrarResponse(email, senha, nome);

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
    <section className="p-6 max-h-screen overflow-y-auto flex-1 bg-[#0E1015]">
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
                Criar conta
              </h2>
              <p className="text-[#717C8E] mb-6 text-sm">
                Cadastre-se e comece a jogar
              </p>

              <div className="flex gap-4 items-center py-5">
                <div className="w-full h-px  bg-[#2A2E39]  "></div>
                <p className="text-[#717C8E] text-sm">OU</p>
                <div className="w-full h-px  bg-[#2A2E39]  "></div>
              </div>
              <div className="flex mb-4 flex-col gap-2 w-full max-w-md">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7E8696]">
                  Nome
                </label>

                <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-[#2A2E39] bg-[#11131A] transition-colors focus-within:border-[#EBCC15]">
                  <User size={18} className="text-[#6B7280]" />

                  <input
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    required
                    placeholder="Seu nome"
                    className="flex-1 text-sm bg-transparent outline-none text-white placeholder:text-[#6B7280]"
                  />
                </div>
              </div>

              <div className="flex mb-4 flex-col gap-2 w-full max-w-md">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7E8696]">
                  E-mail
                </label>

                <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-[#2A2E39] bg-[#11131A] transition-colors focus-within:border-[#EBCC15]">
                  <Mail size={18} className="text-[#6B7280]" />

                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    onChange={(e) => setSenha(e.target.value)}
                    type="password"
                    required
                    placeholder="••••••••••"
                    className="flex-1 bg-transparent outline-none text-white placeholder:text-[#6B7280]"
                  />
                </div>
              </div>

              <button
                onClick={fazerRegistro}
                className="py-3 uppercase hover:scale-95 transition ease duration-300 px-4 gap-4 bg-[#EBCC15] cursor-pointer hover:bg-[#F2D54A] text-sm text-[#0E1015] font-inter w-full flex items-center justify-center rounded-xl font-semibold border border-[#F2D54A]"
              >
                Entrar
              </button>
              {Error && (
                <p className="text-red-500 text-sm mt-2">
                  Erro ao criar conta!
                </p>
              )}
            </div>
            <a
              href="/login"
              className="font-inter text-sm font-medium text-[#6B7280] "
            >
              Ja possui uma conta?{" "}
              <span className="text-[#EBCC15] font-bold">Logue aqui</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
