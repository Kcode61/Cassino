"use client";
import { buscarUsuarioAtual } from "@/app/services/api";
import { eventBus } from "@/app/utils/bus";
import { user } from "@/types/User";
import {
  Crown,
  Gamepad2,
  LayoutDashboard,
  LogOut,
  Menu,
  PiggyBank,
  Trophy,
  User,
  X,
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const menuLinks = [
    {
      href: "/",
      icon: <LayoutDashboard size={17} />,
      label: "Painel",
      active: pathname === "/painel",
    },
    {
      href: "/cassino",
      icon: <Gamepad2 size={17} />,
      label: "Cassino",
      active: pathname === "/cassino",
    },
    {
      href: "/ranking",
      icon: <Trophy size={17} />,
      label: "Ranking",
      active: pathname === "/ranking",
    },
    {
      href: "/banco",
      icon: <PiggyBank size={17} />,
      label: "Banco",
      active: pathname === "/banco",
    },
    {
      href: "/perfil",
      icon: <User size={17} />,
      label: "Perfil",
      active: pathname === "/perfil",
    },
  ];

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

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          className="w-14 h-14 rounded-full bg-[#15171E] border border-[#2A2E39] text-white shadow-lg shadow-black/20 flex items-center justify-center"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="hidden md:flex w-64 flex-col h-full border-r border-[#1D2028] py-5 bg-[#0E1015]">
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
                  <h3 className="font-bold text-white text-sm">
                    {usuario.name}
                  </h3>
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
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm flex gap-3 text-[#8A93A3] hover:text-white transition ease duration-300 items-center p-2.5 px-3 hover:bg-[#15171E] focus:bg-[#1A1D25] rounded-xl focus:text-[#EBCC15] font-bold ${
                    link.active ? "bg-[#1A1D25] text-[#EBCC15]" : ""
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
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

      <div
        className={`fixed inset-0 z-40 transition duration-300 md:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-black/60" onClick={closeMobile} />
        <div
          className={`absolute right-0 top-0 bottom-0 w-[280px] bg-[#0E1015] shadow-2xl border-l border-[#1D2028] p-5 overflow-y-auto transition duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-6">
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
            <button
              type="button"
              onClick={closeMobile}
              className="p-2 rounded-md bg-[#15171E] text-white"
              aria-label="Fechar menu mobile"
            >
              <X size={20} />
            </button>
          </div>

          <div className="w-full p-4 rounded-xl bg-[#15171E] border border-[#2A2E39] flex gap-4 items-center mb-4">
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
                  <h3 className="font-bold text-white text-sm">
                    {usuario.name}
                  </h3>
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

          <nav className="mb-4">
            <ul className="space-y-2">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`text-sm flex gap-3 text-[#8A93A3] hover:text-white transition ease duration-300 items-center p-2.5 px-3 hover:bg-[#15171E] focus:bg-[#1A1D25] rounded-xl focus:text-[#EBCC15] font-bold ${
                    link.active ? "bg-[#1A1D25] text-[#EBCC15]" : ""
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </ul>
          </nav>

          <div className="w-full h-px mb-4 mt-4 rounded-full bg-[#1D2028]" />
          <div className="flex flex-col gap-4">
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
                onClick={() => {
                  logout();
                  closeMobile();
                }}
                className="text-sm flex gap-3 text-[#8A93A3] hover:text-white transition cursor-pointer ease duration-300 items-center p-2.5 px-3 hover:bg-[#15171E] rounded-xl font-bold"
              >
                <LogOut size={17} />
                Sair
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
