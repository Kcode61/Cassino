"use client";
import { useEffect, useState } from "react";
import { buscarUsuario, girarRoleta } from "../services/api";
import { RotateCw } from "lucide-react";
import { user } from "@/types/User";
import { eventBus } from "../utils/bus";
import { useRouter } from "next/navigation";

export default function cassino() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<user | null>(null);
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    async function carregarUsuario() {
      const dados = await buscarUsuario();
      setUsuario(dados);
    }

    carregarUsuario();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);
  async function handleSpin() {
    try {
      setLoading(true);

      let count = 0;

      const interval = setInterval(() => {
        setSlots([
          Math.floor(Math.random() * 7),
          Math.floor(Math.random() * 7),
          Math.floor(Math.random() * 7),
        ]);

        count++;

        if (count > 10) {
          clearInterval(interval);
        }
      }, 100);

      const data = await girarRoleta();

      setTimeout(async () => {
        setSlots(data);

        const atualizado = await buscarUsuario();
        setUsuario(atualizado);
        eventBus.dispatchEvent(new Event("USER_UPDATED"));
        setLoading(false);
      }, 1200);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <section className="p-6 flex-1 bg-[#0E1015]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-1">
          <h2 className="text-white font-poppins font-bold text-2xl">
            Cassino
          </h2>
          <p className="font-medium font-inter text-sm text-[#8A93A3]">
            JackPot ate 10x!
          </p>
        </div>

        <div className="py-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4 col-span-2">
            <div className="p-6 rounded-2xl bg-[#15171E] border border-[#1D2028] flex flex-col items-center">
              <h2 className="text-2xl font-spacemono mb-2 text-white uppercase font-bold">
                Slots <span className="text-yellow-400">Royal</span>
              </h2>

              <div className="flex mb-6 max-w-xs w-full items-center gap-3">
                <div className="flex-1 min-w-12 h-px bg-linear-to-l from-[#2A2E39] to-transparent" />
                <p className="text-[#717C8E] uppercase text-xs font-bold whitespace-nowrap">
                  Gire & Ganhe
                </p>
                <div className="flex-1 min-w-12 h-px bg-linear-to-r from-[#2A2E39] to-transparent" />
              </div>

              <div className="flex overflow-x-auto max-w-full gap-6 mb-6">
                {slots.map((value, index) => (
                  <div
                    key={index}
                    className="w-28 relative h-32 flex items-center justify-center rounded-sm
                bg-linear-to-b from-[#1B1E27] to-[#0E1015]
                border border-[#2A2E39]
                shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                  >
                    <div className="absolute inset-2 rounded border border-white/5"></div>
                    <h2 className="text-5xl font-ultra font-semibold text-yellow-400">
                      {value}
                    </h2>
                  </div>
                ))}
              </div>

              <div className="flex w-full items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-[#2A2E39]" />
                <p className="text-[#8A93A3] uppercase tracking-widest text-[10px] font-bold whitespace-nowrap">
                  Linha de pagamento
                </p>
                <div className="flex-1 h-px bg-[#2A2E39]" />
              </div>

              <div className="w-full flex items-center justify-between bg-[#0F1118] border border-[#1D2028] rounded-xl px-4 py-3">
                <p className="text-[#8A93A3] uppercase text-xs font-bold tracking-widest">
                  aposta
                </p>

                <div className="flex items-center gap-3 bg-[#0B0D12] border border-[#1D2028] rounded-lg px-3 py-2">
                  <p className="text-yellow-400 font-bold text-sm min-w-[70px] text-center">
                    R$ 50.00
                  </p>
                </div>

                <button
                  onClick={handleSpin}
                  disabled={loading || !usuario || usuario.saldo < 50}
                  className={`flex items-center gap-2 bg-[#1A1D25] hover:bg-[#222632]
              transition text-white text-sm font-poppins  font-bold px-6 py-2 rounded-lg border border-[#2A2E39] ${loading || !usuario || usuario.saldo < 50 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <RotateCw
                    className={loading ? "animate-spin" : ""}
                    size={20}
                    absoluteStrokeWidth
                  />
                  Girar
                </button>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-[#15171E] border border-[#1D2028] flex gap-4 flex-col">
            <h2 className="text-[#717C8E] uppercase text-sm font-bold">
              Estatísticas
            </h2>
            <div className="bg-[#0E1015] p-4 rounded-xl border border-[#1D2028] flex justify-between items-center">
              <p className="text-[10px] text-[#717C8E] uppercase font-medium font-inter">
                Rodadas
              </p>
              {usuario ? (
                <p className="text-sm text-white font-poppins uppercase font-bold font-inter">
                  {usuario.rodadas}
                </p>
              ) : (
                <div className="h-5 w-16 rounded bg-[#1A1D26] animate-pulse" />
              )}
            </div>
            <div className="bg-[#0E1015] p-4 rounded-xl border border-[#1D2028] flex justify-between items-center">
              <p className="text-[10px] text-[#717C8E] uppercase font-medium font-inter">
                Total ganho:
              </p>
              {usuario ? (
                <p className="text-sm text-white font-poppins uppercase font-bold font-inter">
                  R$ {usuario.ganhos.toFixed(2)}
                </p>
              ) : (
                <div className="h-5 w-24 rounded bg-[#1A1D26] animate-pulse" />
              )}
            </div>
            <div className="bg-[#0E1015] p-4 rounded-xl border border-[#1D2028] flex justify-between items-center">
              <p className="text-[10px] text-[#717C8E] uppercase font-medium font-inter">
                Total perdido:
              </p>
              {usuario ? (
                <p className="text-sm text-white font-poppins uppercase font-bold font-inter">
                  R$ {usuario.perdido.toFixed(2)}
                </p>
              ) : (
                <div className="h-5 w-24 rounded bg-[#1A1D26] animate-pulse" />
              )}
            </div>
            <div className="bg-[#0E1015] p-4 rounded-xl border border-[#1D2028] flex justify-between items-center">
              <p className="text-[10px] text-[#717C8E] uppercase font-medium font-inter">
                Valor da aposta:
              </p>
              {usuario ? (
                <p className="text-sm text-white font-poppins uppercase font-bold font-inter">
                  R$ 50
                </p>
              ) : (
                <div className="h-5 w-16 rounded bg-[#1A1D26] animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
