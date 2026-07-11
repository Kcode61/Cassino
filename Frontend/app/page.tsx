"use client";
import { cardConfig, cardStyles } from "../data/cards";
import { Gamepad, Trophy } from "lucide-react";
import Link from "next/link";
import { CargoSpan } from "./components/CargoSpan";
import { buscarUsuario } from "./services/api";
import { useEffect, useState } from "react";
import { user } from "@/types/User";

export default function painel() {
  const horaAtual = new Date().getHours();

  let saudacao = "";

  if (horaAtual < 12) {
    saudacao = "Bom dia";
  } else if (horaAtual < 18) {
    saudacao = "Boa tarde";
  } else {
    saudacao = "Boa noite";
  }
  const [usuario, setUsuario] = useState<user | null>(null);
  useEffect(() => {
    async function carregarUsuario() {
      const dados = await buscarUsuario();
      setUsuario(dados);
    }

    carregarUsuario();
  }, []);
  return (
    <section className="flex-1 p-6 bg-[#0E1015]">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-xl px-6 py-4 bg-linear-to-r from-[#15171E] via-[#0E1015] to-[#1A1D25] border flex-col md:flex-row border-[#2A2E39] shadow-[0_0_0_1px_rgba(235,204,21,0.08)] flex justify-between md:items-center">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <h1 className=" font-spacemono text-2xl text-white font-bold ">
                {saudacao},{" "}
                {!usuario ? (
                  <div className="inline-block h-8 bg-[#EBCC15] rounded animate-pulse w-32" />
                ) : (
                  <span className="text-[#EBCC15]">{usuario.name}</span>
                )}
              </h1>
              <CargoSpan />
            </div>
            <p className="font-inter text-[13px] max-w-md font-medium text-[#8A93A3]">
              Bem-vindo ao Royale Cassino. Gire as slots, suba o ranking e
              acompanhe seus ganhos.
            </p>
          </div>
          <div className="flex md:flex-col flex-row justify-between mt-4 md:mt-0 gap-1">
            <h3 className="text-right text-[#8A93A3] text-[11px] font-inter">
              Saldo atual
            </h3>
            {!usuario ? (
              <div className="h-8 bg-[#1A1D25] rounded animate-pulse w-32 ml-auto" />
            ) : (
              <p className="font-poppins text-2xl font-extrabold text-[#EBCC15]">
                R$ {usuario.saldo.toFixed(2).replace(".", ",")}
              </p>
            )}
          </div>
        </div>
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {usuario &&
            cardConfig.map((config, index) => {
              const style =
                cardStyles[config.variant as keyof typeof cardStyles];
              const Icon = config.icon;
              const value = usuario[config.key as keyof typeof usuario];
              return (
                <div
                  key={index}
                  className={`p-5 rounded-xl border bg-[#15171E] flex flex-col gap-2 ${style.border}`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${style.iconBg}`}
                  >
                    <Icon size={18} color={style.iconColor} />
                  </div>

                  <span className="text-xs text-[#8A93A3] font-inter">
                    {config.title}
                  </span>

                  <h2
                    className={`font-poppins text-xl font-extrabold ${style.text}`}
                  >
                    {typeof value === "number"
                      ? value.toLocaleString("pt-BR")
                      : value}
                  </h2>
                </div>
              );
            })}
        </div>

        <div className="grid py-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group relative p-6 rounded-2xl border border-[#2A2E39] bg-linear-to-br from-[#12131A] to-[#0E1015] text-white flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.25)]">
            <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A1D25] border border-[#2A2E39] shadow-md">
              <Gamepad size={22} className="text-[#EBCC15]" />
            </div>

            <div className="relative z-10 mt-4">
              <h2 className="font-spacemono font-bold text-lg">Slots Royal</h2>

              <p className="mt-2 text-sm text-[#8A93A3] leading-relaxed">
                Jackpot de até 50x. Gire agora e teste sua sorte!
              </p>
            </div>

            <Link
              href="/cassino"
              className="flex justify-center cursor-pointer hover:scale-95 ease duration-300 mt-6 w-full py-2 rounded-xl font-medium bg-[#EBCC15] text-[#0E1015] hover:bg-[#F2D54A] transition"
            >
              Jogar agora
            </Link>
          </div>
          <div className="group relative p-6 rounded-2xl border border-[#2A2E39] bg-linear-to-br from-[#15171E] to-[#0E1015] text-white flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.25)]">
            <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A1D25] border border-[#2A2E39] shadow-md">
              <Trophy size={22} className="text-[#EBCC15]" />
            </div>

            <div className="relative z-10 mt-4">
              <h2 className="font-spacemono font-bold text-lg">Leaderboard</h2>

              <p className="mt-2 text-sm text-[#8A93A3] leading-relaxed">
                Veja sua posição entre os melhores jogadores.
              </p>
            </div>

            <Link
              href="/ranking"
              className="flex justify-center cursor-pointer text-[#0E1015] hover:scale-95 ease duration-300 mt-6 w-full py-2 rounded-xl font-medium bg-[#1A1D25] border border-[#2A2E39] hover:bg-[#222632] transition"
            >
              Ver ranking
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
