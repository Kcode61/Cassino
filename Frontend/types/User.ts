export type user = {
  name: string;
  cargo: "User" | "VIP" | "ADMIN";
  saldo: number;
  senha: string;
  email: string;
  id: number;
  ganhos: number;
  rodadas: number;
  vitorias: number;
  derrotas: number;
  perdido: number;
};

export type SaldoDTO = {
  amount: number;
};
export type AtualizarDTO = {
  name: string;
  email: string;
};
