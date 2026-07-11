"use client";
import { useEffect, useState } from "react";
import { buscarUsuario, depositar, sacar } from "../services/api";
import { user } from "@/types/User";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { eventBus } from "../utils/bus";

export default function banco() {
  const [usuario, setUsuario] = useState<user | null>(null);
  const [deposito, setDeposito] = useState<number>(0);
  const [saque, setSaque] = useState<number>(0);
  const [variant, setVariant] = useState<"deposito" | "saque">("deposito");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  async function carregarUsuario() {
    const dados = await buscarUsuario();
    setUsuario(dados);
  }
  useEffect(() => {
    carregarUsuario();
  }, []);
  async function Sacar() {
    setError(false);

    try {
      const dados = await sacar({ amount: saque });
      setUsuario(dados);
      eventBus.dispatchEvent(new Event("USER_UPDATED"));
    } catch (err) {
      setError(true);
    }
  }

  async function Depositar() {
    setError(false);

    try {
      const dados = await depositar({ amount: deposito });
      setUsuario(dados);

      eventBus.dispatchEvent(new Event("USER_UPDATED"));
    } catch {
      setError(true);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);
  const confirmarDepositar = async () => {
    await Depositar();
    await buscarUsuario();
  };

  const confirmarSacar = async () => {
    await Sacar();
    await buscarUsuario();
  };

  return (
    <section className="p-6 flex-1 bg-[#0E1015]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-1">
          <h2 className="text-white font-poppins font-bold text-2xl">
            Transações
          </h2>
          <p className="font-medium font-inter text-sm text-[#8A93A3]">
            Deposite ou saque dinheiro da sua conta
          </p>
        </div>
        <div className="grid grid-cols-1 max-w-2xl mx-auto justify-center py-10">
          <div className="border border-[#2A2E39] p-6 rounded-2xl flex flex-col  gap-8 bg-[#12141B]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setVariant("deposito")}
                className={`${variant === "deposito" ? "bg-[#EBCC15] text-[#0E1015]  border-[#EBCC15]" : "bg-[#1A1D25] border-[#2A2E39]  text-[#8A93A3]"} border tracking-widest hover:scale-95 text-sm  cursor-pointer transition ease duration-300 justify-center py-4 gap-4 font-inter uppercase px-6  rounded-xl font-bold flex items-center `}
              >
                <ArrowDownToLine size={20} absoluteStrokeWidth />
                Depositar
              </button>
              <button
                onClick={() => setVariant("saque")}
                className={`${variant === "saque" ? "bg-[#EBCC15] border-[#EBCC15] text-[#0E1015]" : "bg-[#1A1D25] border-[#2A2E39] text-[#8A93A3]"} border tracking-widest hover:scale-95 text-sm cursor-pointer transition ease duration-300 justify-center py-4 gap-4 font-inter uppercase px-6  rounded-xl font-bold flex items-center`}
              >
                <ArrowUpFromLine size={20} absoluteStrokeWidth />
                Sacar
              </button>
            </div>
            <div className="p-5 flex justify-between items-center bg-[#0E1015] rounded-xl border border-[#2A2E39]">
              <p className="text-[#8A93A3] tracking-widest font-poppins font-bold uppercase text-xs">
                Saldo disponível:
              </p>
              <p className="text-white font-poppins font-bold text-md">
                {usuario
                  ? `R$ ${usuario.saldo.toFixed(2).replace(".", ",")}`
                  : "R$ 0,00"}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A93A3] font-poppins">
                Valor do {variant === "deposito" ? "depósito" : "saque"}
              </span>

              <div className="flex h-14 overflow-hidden rounded-xl border border-[#2A2E39] bg-[#0E1015]">
                <div className="flex items-center justify-center px-4 border-r border-[#2A2E39]">
                  <span className="text-[#EBCC15] font-bold text-xl font-poppins">
                    R$
                  </span>
                </div>

                <input
                  type="number"
                  placeholder="0,00"
                  value={variant === "deposito" ? deposito : saque}
                  onChange={(e) => {
                    if (variant === "deposito") {
                      setDeposito(Number(e.target.value));
                    } else {
                      setSaque(Number(e.target.value));
                    }
                  }}
                  className="flex-1 bg-transparent px-5 text-lg font-bold text-white outline-none placeholder:text-[#8A93A3]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => {
                  if (variant === "deposito") {
                    setDeposito(50);
                  } else {
                    setSaque(50);
                  }
                }}
                className="h-12 rounded-xl border cursor-pointer border-[#2A2E39] bg-[#1A1D25] font-bold text-[#8A93A3] hover:border-[#EBCC15] hover:text-white transition"
              >
                R$ 50
              </button>

              <button
                onClick={() => {
                  if (variant === "deposito") {
                    setDeposito(100);
                  } else {
                    setSaque(100);
                  }
                }}
                className="h-12 rounded-xl border cursor-pointer border-[#2A2E39] bg-[#1A1D25] font-bold text-[#8A93A3] hover:border-[#EBCC15] hover:text-white transition"
              >
                R$ 100
              </button>

              <button
                onClick={() => {
                  if (variant === "deposito") {
                    setDeposito(250);
                  } else {
                    setSaque(250);
                  }
                }}
                className="h-12 rounded-xl border cursor-pointer border-[#2A2E39] bg-[#1A1D25] font-bold text-[#8A93A3] hover:border-[#EBCC15] hover:text-white transition"
              >
                R$ 250
              </button>

              <button
                onClick={() => {
                  if (variant === "deposito") {
                    setDeposito(500);
                  } else {
                    setSaque(500);
                  }
                }}
                className="h-12 rounded-xl cursor-pointer border border-[#2A2E39] bg-[#1A1D25] font-bold text-[#8A93A3] hover:border-[#EBCC15] hover:text-white transition"
              >
                R$ 500
              </button>
            </div>

            <button
              onClick={async () => {
                if (variant === "deposito") {
                  await confirmarDepositar();
                } else {
                  await confirmarSacar();
                }
              }}
              disabled={variant === "deposito" ? deposito < 50 : saque < 50}
              className="h-14 rounded-xl text-sm disabled:bg-[#8E8013] bg-[#EBCC15] cursor-pointer hover:bg-[#A99718] transition font-bold uppercase tracking-widest text-[#0E1015] flex items-center justify-center gap-3"
            >
              {variant === "deposito" ? (
                <ArrowUpFromLine size={18} />
              ) : (
                <ArrowDownToLine size={18} />
              )}
              Confirmar {variant === "deposito" ? "depósito" : "saque"}
            </button>

            <p className="text-center text-xs text-[#8A93A3] pt-3">
              {variant === "deposito" ? "Depósitos" : "Saques"} processados
              instantaneamente • Mínimo R$ 50,00
            </p>
            {error && (
              <p className="text-center text-xs text-[#E74C3C] pt-3">
                Erro ao processar{" "}
                {variant === "deposito" ? "depósito" : "saque"}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
