"use client";
import { buscarUsuarioAtual } from "@/app/services/api";
import { eventBus } from "@/app/utils/bus";
import { user } from "@/types/User";
import {
  Crown,
  Gamepad2,
  LayoutDashboard,
  LogOut,
  PiggyBank,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
export function Sidebar() {
  const router = useRouter();
  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }
  const [usuario, setUsuario] = useState<user | null>(null);
  useEffect(() => {
    async function carregarUsuario() {
      try {
        const dados = await buscarUsuarioAtual();
        setUsuario(dados);
      } catch {
        setUsuario(null);
      }
    }

    carregarUsuario();

    const atualizar = () => {
      carregarUsuario();
    };

    eventBus.addEventListener("USER_UPDATED", atualizar);

    return () => {
      eventBus.removeEventListener("USER_UPDATED", atualizar);
    };
  }, []);
  const pathname = usePathname();
  return (
    <div className="w-64 hidden md:flex flex-col h-full border-r border-[#1D2028] py-5 bg-[#0E1015]">
      <div className="px-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#EBCC15] to-[#B8860B] flex items-center justify-center text-[#0E1015]">
            <Crown size={20} />
          </div>

          <div>
            <h1 className="font-black text-xl text-white">Royal</h1>
            <span className="text-xs text-[#EBCC15] uppercase tracking-widest">
              Cassino
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-px mb-4 mt-4 rounded-full bg-[#1D2028]" />
      <div className="px-4">
        <div className="w-full p-4 rounded-xl bg-[#15171E] border border-[#2A2E39] flex gap-4 items-center">
          {!usuario ? (
            <>
              <div className="w-8 h-8 rounded-full bg-[#1A1D25] animate-pulse" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 bg-[#1A1D25] rounded animate-pulse w-24" />
                <div className="h-3 bg-[#1A1D25] rounded animate-pulse w-16" />
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-linear-to-br from-[#EBCC15] to-[#B8860B]">
                <h2 className="font-bold text-xs text-[#0E1015]">
                  {(usuario.name?.charAt(0) || "U").toUpperCase()}
                </h2>
              </div>
              <div className="flex flex-col gap-px">
                <h3 className="font-bold text-white text-sm">{usuario.name}</h3>
                <span
                  className={`w-max py-0.5 flex px-1.5 font-poppins text-[10px] border font-extrabold uppercase rounded ${
                    usuario.cargo === "User"
                      ? "bg-[#12242E] border-[#0F404E] text-[#19C8EE]"
                      : usuario.cargo === "ADMIN"
                        ? "bg-[#E74C3C]/20 border-[#E74C3C]/30 text-[#E74C3C]"
                        : usuario.cargo === "VIP"
                          ? "bg-[#2ECC71]/20 border-[#2ECC71]/30 text-[#2ECC71]"
                          : "bg-[#12242E] border-[#0F404E] text-[#19C8EE]"
                  }`}
                >
                  {usuario.cargo === "ADMIN"
                    ? "Admin"
                    : usuario.cargo === "VIP"
                      ? "VIP"
                      : "User"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-full h-px mb-4 mt-4 rounded-full bg-[#1D2028]" />
      <div className="px-4 flex-1">
        <nav>
          <ul className="space-y-2">
            <Link
              href="/"
              className={`text-sm flex gap-3 text-[#8A93A3] hover:text-white transition ease duration-300 items-center p-2.5 px-3 hover:bg-[#15171E] focus:bg-[#1A1D25] rounded-xl focus:text-[#EBCC15] font-bold ${pathname === "/painel" ? "bg-[#1A1D25] text-[#EBCC15]" : ""}`}
            >
              <LayoutDashboard size={17} />
              Painel
            </Link>
            <Link
              href="/cassino"
              className={`text-sm flex gap-3 text-[#8A93A3] hover:text-white transition ease duration-300 items-center p-2.5 px-3 hover:bg-[#15171E] focus:bg-[#1A1D25] rounded-xl focus:text-[#EBCC15] font-bold ${pathname === "/cassino" ? "bg-[#1A1D25] text-[#EBCC15]" : ""}`}
            >
              <Gamepad2 size={17} />
              Cassino
            </Link>
            <Link
              href="/ranking"
              className={`text-sm flex gap-3 text-[#8A93A3] hover:text-white transition ease duration-300 items-center p-2.5 px-3 hover:bg-[#15171E] focus:bg-[#1A1D25] rounded-xl focus:text-[#EBCC15] font-bold ${pathname === "/ranking" ? "bg-[#1A1D25] text-[#EBCC15]" : ""}`}
            >
              <Trophy size={17} />
              Ranking
            </Link>
            <Link
              href="/banco"
              className={`text-sm flex gap-3 text-[#8A93A3] hover:text-white transition ease duration-300 items-center p-2.5 px-3 hover:bg-[#15171E] focus:bg-[#1A1D25] rounded-xl focus:text-[#EBCC15] font-bold ${pathname === "/banco" ? "bg-[#1A1D25] text-[#EBCC15]" : ""}`}
            >
              <PiggyBank size={17} />
              Banco
            </Link>
            <Link
              href="/perfil"
              className={`text-sm flex gap-3 text-[#8A93A3] hover:text-white transition ease duration-300 items-center p-2.5 px-3 hover:bg-[#15171E] focus:bg-[#1A1D25] rounded-xl focus:text-[#EBCC15] font-bold ${pathname === "/perfil" ? "bg-[#1A1D25] text-[#EBCC15]" : ""}`}
            >
              <User size={17} />
              Perfil
            </Link>
          </ul>
        </nav>
      </div>
      <div className="w-full h-px mb-4 mt-4 rounded-full bg-[#1D2028]" />
      <div className="px-4 flex flex-col gap-4">
        <div className="w-full p-4 rounded-xl bg-[#15171E] border border-[#2A2E39] flex gap-1 flex-col">
          <h3 className="font-bold text-[#737B8C] text-[10px] uppercase">
            Saldo
          </h3>
          {!usuario ? (
            <div className="h-6 bg-[#1A1D25] rounded animate-pulse w-32" />
          ) : (
            <h2 className="font-bold text-[#EBCC15] text-lg">
              R${(usuario.saldo ?? 0).toFixed(2).replace(".", ",")}
            </h2>
          )}
        </div>
        {usuario && (
          <button
            onClick={logout}
            className="text-sm flex gap-3 text-[#8A93A3] hover:text-white transition cursor-pointer ease duration-300 items-center p-2.5 px-3 hover:bg-[#15171E] rounded-xl font-bold"
          >
            <LogOut size={17} />
            Sair
          </button>
        )}
      </div>
    </div>
  );
}
