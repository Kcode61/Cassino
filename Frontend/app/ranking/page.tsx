"use client";
import { CargoSpan } from "../components/CargoSpan";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { user } from "@/types/User";
import { listarUsuarios } from "../services/api";
import { Loading } from "../components/Loading";
import { useRouter } from "next/navigation";
import { eventBus } from "../utils/bus";

export default function ranking() {
  const [usuarios, setUsuarios] = useState<user[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function carregarUsuarios() {
      const dados = await listarUsuarios();

      setUsuarios(dados);
      eventBus.dispatchEvent(new Event("USER_UPDATED"));
    }

    carregarUsuarios();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);
  const topUserId =
    usuarios.length > 0
      ? [...usuarios].sort((a, b) => b.saldo - a.saldo)[0].id
      : null;
  return (
    <section className="p-6 flex-1 bg-[#0E1015]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-1">
          <h2 className="text-white font-poppins font-bold text-2xl">
            Ranking
          </h2>
          <p className="font-medium font-inter text-sm text-[#8A93A3] ">
            Top jogadores por ganhos totais
          </p>
        </div>
        <div className="w-full py-5">
          {usuarios.length === 0 ? (
            <Loading />
          ) : (
            <>
              <div className="hidden md:block overflow-hidden rounded-3xl border border-[#2A2E39] bg-[#15171E] shadow-[0_0_20px_rgba(0,0,0,0.25)]">
                <div className="grid grid-cols-[80px_2fr_1fr_1fr_100px_120px] px-6 py-4 text-xs uppercase tracking-wider text-[#717C8E] font-semibold border-b border-[#2A2E39] bg-[#12141A]">
                  <span>#</span>
                  <span>Jogador</span>
                  <span>Cargo</span>
                  <span>Ganhos</span>
                  <span>V</span>
                </div>
                {usuarios.map((user, index) => {
                  const isTop = user.id === topUserId;

                  return (
                    <div
                      key={user.id}
                      className={`grid grid-cols-[80px_2fr_1fr_1fr_100px_120px] items-center px-6 py-5 ${
                        isTop
                          ? "bg-linear-to-r from-[#2A261B] via-[#1D1A12] to-[#15171E] border-l-4 border-[#EBCC15]"
                          : "bg-linear-to-r from-[#14161C] to-[#11131A]"
                      }`}
                    >
                      <div className="flex justify-center">
                        {isTop ? (
                          <Trophy size={18} className="text-[#EBCC15]" />
                        ) : (
                          <span className="text-[#8B9BB8] font-bold">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EBCC15] font-bold text-[#0E1015]">
                          {(user.name ? user.name : "User")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p
                            className={`font-semibold ${isTop ? "text-[#EBCC15]" : "text-white"}`}
                          >
                            {user.name}
                          </p>
                        </div>
                      </div>

                      <div>
                        <CargoSpan />
                      </div>

                      <div>
                        <span className="font-semibold text-[#EBCC15]">
                          R${user.ganhos.toFixed(2)}
                        </span>
                      </div>

                      <div className="text-[#8B9BB8]">
                        {user.vitorias === 0 ? 0 : user.vitorias}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="md:hidden flex flex-col gap-3">
                {usuarios.map((user, index) => {
                  const isTop = user.id === topUserId;

                  return (
                    <div
                      key={user.id}
                      className={`rounded-2xl border p-4 ${
                        isTop
                          ? "border-[#EBCC15] bg-[#2A261B]"
                          : "border-[#2A2E39] bg-[#15171E]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EBCC15] font-bold text-[#0E1015]">
                            {(user.name || "User").charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p
                              className={`font-semibold ${
                                isTop ? "text-[#EBCC15]" : "text-white"
                              }`}
                            >
                              {user.name}
                            </p>

                            <CargoSpan />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isTop ? (
                            <Trophy size={20} className="text-[#EBCC15]" />
                          ) : (
                            <span className="text-lg font-bold text-[#8B9BB8]">
                              #{index + 1}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl bg-[#0E1015] p-3">
                          <p className="text-[#8A93A3] text-xs">Ganhos</p>
                          <p className="font-bold text-[#EBCC15]">
                            R$ {user.ganhos.toFixed(2)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-[#0E1015] p-3">
                          <p className="text-[#8A93A3] text-xs">Vitórias</p>
                          <p className="font-bold text-white">
                            {user.vitorias}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
