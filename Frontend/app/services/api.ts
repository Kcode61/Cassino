import { AtualizarDTO, SaldoDTO } from "@/types/User";

export async function girarRoleta() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cassino/spin/me`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao girar a roleta");
  }

  return await response.json();
}

export async function buscarSaldo() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/balance`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar saldo");
  }

  return await response.json();
}

export async function loginResponse(email: string, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Erro ao fazer login: ${response.status}`);
  }

  const token = await response.text();

  return token;
}

export async function registrarResponse(
  email: string,
  password: string,
  name: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Erro ao fazer registro: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : { success: true };
}

export async function buscarUsuario() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export async function buscarUsuarioAtual() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export async function listarUsuarios() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar usuários: ${response.status}`);
  }

  return await response.json();
}

export async function depositar(dadosDoUsuario: SaldoDTO) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/balance/deposit`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dadosDoUsuario),
    },
  );

  return await response.json();
}

export async function sacar(dadosDoUsuario: SaldoDTO) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/balance/withdraw`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dadosDoUsuario),
    },
  );

  return await response.json();
}

export async function atualizar(dadosDoUsuario: AtualizarDTO) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dadosDoUsuario),
    },
  );

  return await response.json();
}
