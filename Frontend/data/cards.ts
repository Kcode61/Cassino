import { DollarSign, Trophy, TrendingDown, TrendingUp } from "lucide-react";

export const cardStyles = {
  blue: {
    border: "border-[#56A5FA]/30",
    iconBg: "bg-[#1B2A3A]",
    text: "text-[#56A5FA]",
    iconColor: "#56A5FA",
  },
  green: {
    border: "border-[#2EE59D]/30",
    iconBg: "bg-[#1B2A22]",
    text: "text-[#2EE59D]",
    iconColor: "#2EE59D",
  },
  red: {
    border: "border-[#FF5C5C]/30",
    iconBg: "bg-[#2A1B1B]",
    text: "text-[#FF5C5C]",
    iconColor: "#FF5C5C",
  },
  yellow: {
    border: "border-[#EBCC15]/30",
    iconBg: "bg-[#2A261B]",
    text: "text-[#EBCC15]",
    iconColor: "#EBCC15",
  },
} as const;

export const cardConfig = [
  {
    title: "Saldo",
    key: "saldo",
    icon: DollarSign,
    variant: "yellow",
    prefix: "R$ ",
  },
  {
    title: "Vitórias",
    key: "vitorias",
    icon: Trophy,
    variant: "green",
  },
  {
    title: "Derrotas",
    key: "derrotas",
    icon: TrendingDown,
    variant: "red",
  },
  {
    title: "Total perdido",
    key: "perdido",
    icon: TrendingDown,
    variant: "red",
    prefix: "R$ ",
  },
  {
    title: "Ganhos",
    key: "ganhos",
    icon: TrendingUp,
    variant: "yellow",
    prefix: "R$ ",
  },
] as const;
