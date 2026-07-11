"use client";

import { buscarUsuario } from "@/app/services/api";
import { user } from "@/types/User";
import { useEffect, useState } from "react";

export function CargoSpan() {
  const [usuario, setUsuario] = useState<user | null>(null);
  useEffect(() => {
    async function carregarUsuario() {
      const dados = await buscarUsuario();
      setUsuario(dados);
    }

    carregarUsuario();
  }, []);
  return (
    <>
      {!usuario ? (
        <div className="h-5 bg-[#1A1D26] rounded animate-pulse w-12" />
      ) : (
        <span
          className={`w-max py-1 flex px-2 text-[10px] border  font-poppins font-extrabold uppercase rounded-lg ${
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
      )}
    </>
  );
}
