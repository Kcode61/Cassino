"use client";
import { cardConfig, cardStyles } from "@/data/cards";
import { Mail } from "lucide-react";
import { CargoSpan } from "../components/CargoSpan";
import { buscarUsuario } from "../services/api";
import { useEffect, useState } from "react";
import { user } from "@/types/User";
import { Loading } from "../components/Loading";
import { useRouter } from "next/navigation";
export default function perfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<user | null>(null);
  console.log("Perfil renderizou");

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
  return (
    <section className="p-6 flex-1 bg-[#0E1015]">
      <div className="max-w-7xl mx-auto">
        {!usuario ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <h2 className="text-white font-poppins font-bold text-2xl">
                Perfil
              </h2>
              <p className="font-medium font-inter text-sm text-[#8A93A3] ">
                Gerencie sua conta
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 py-5 gap-4">
              <div className="p-4 border-[#2A2E39] rounded-xl border bg-[#15171E] shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 border-4 border-[#EBCC15]/40 h-20 rounded-full flex items-center justify-center bg-linear-to-br from-[#EBCC15] to-[#B8860B]">
                    <h2 className="text-[#0E1015] font-bold uppercase font-poppins text-2xl">
                      {usuario.name.charAt(0)}
                    </h2>
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    {usuario.name}
                  </h3>
                  <CargoSpan />
                </div>
                <div className="w-full h-[0.5px] bg-[#2A2E39] mt-4 mb-4"></div>
                <div className="flex gap-2 items-center text-[#8A93A3]">
                  <Mail size={16} />
                  <span className="text-xs font-medium font-inter">
                    {usuario.email}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {cardConfig.map((config, index) => {
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

                <div className="p-4 rounded-xl border border-[#2A2E39] bg-[#15171E] flex flex-col gap-2 shadow-[0_0_20px_rgba(0,0,0,0.15)]">
                  <h2 className="text-white font-poppins text-md font-bold">
                    Status da Conta
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3">
                    <div className="flex  gap-2 items-center">
                      <p className="text-xs font-inter font-medium text-[#8A93A3]">
                        Cargo:
                      </p>
                      <CargoSpan />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
