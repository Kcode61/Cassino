<div align="center">

# 🎰 Royal Cassino

Um cassino virtual desenvolvido para estudos, utilizando **Next.js** no frontend e **Spring Boot** no backend, com autenticação JWT, sistema de cargos e gerenciamento de saldo.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?logo=springboot)
![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql)

</div>

---

# 📸 Preview

> Em breve...

<!-- Coloque screenshots aqui -->

---

# ✨ Funcionalidades

- 🔐 Sistema completo de Login e Registro
- 🔑 Autenticação utilizando JWT
- 👤 Perfil do usuário
- 💰 Depósito e saque de saldo
- 🎰 Sistema de cassino (slot machine)
- 🏆 Ranking dos jogadores
- 👑 Sistema de cargos (User, VIP e Admin)
- 🛡️ Rotas protegidas com Spring Security
- 📱 Interface moderna e responsiva

---

# 🛠 Tecnologias

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

## Backend

- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- PostgreSQL
- Maven

---

# 📂 Estrutura do Projeto

```text
CassinoProject
│
├── Frontend
│   ├── app
│   ├── components
│   ├── services
│   └── ...
│
├── Backend
│   ├── controllers
│   ├── services
│   ├── domain
│   ├── infra
│   └── ...
│
└── README.md
```

---

# 🔒 Segurança

O projeto utiliza:

- JWT para autenticação
- Spring Security
- Rotas protegidas
- Sistema de permissões por cargo
- Senhas criptografadas com BCrypt

---

# 🚀 Como executar

## Backend

```bash
cd Backend

./mvnw spring-boot:run
```

ou

```bash
mvn spring-boot:run
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

# 📌 Variáveis de ambiente

Backend

```properties
DB_USER=

DB_PASSWORD=

JWT_SECRET=
```

Frontend

```env
NEXT_PUBLIC_API_URL=
```

---

# 🎯 Objetivo

Este projeto foi desenvolvido com o objetivo de praticar o desenvolvimento Full Stack utilizando Java Spring Boot e Next.js, implementando autenticação segura, arquitetura REST, integração entre frontend e backend e gerenciamento de usuários.

---

# 📚 Aprendizados

Durante o desenvolvimento deste projeto foram estudados conceitos como:

- APIs REST
- JWT
- Spring Security
- Autenticação
- Controle de acesso
- PostgreSQL
- JPA/Hibernate
- Arquitetura em camadas
- React
- Next.js
- Tailwind CSS
- Consumo de APIs

---

<div align="center">

Feito por **Kauan Moura**

</div>
