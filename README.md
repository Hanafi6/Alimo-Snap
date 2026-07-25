# 🚀 Alimo Snap – E-Commerce & Admin Management System

**Alimo Snap** is a modern, high-performance, full-stack E-Commerce platform and Admin Dashboard built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. It features a robust multi-provider authentication system, granular Role-Based Access Control (RBAC), and a streamlined product management workflow powered by Prisma ORM.

---

## ✨ Key Features

### 🔐 Advanced Authentication & Security
- **Multi-Provider Sign-In:** Credentials (Email/Password), Google OAuth, GitHub OAuth, and Anonymous login via **Better Auth**.
- **Email Verification:** OTP-based verification flow powered by **Resend**.
- **Account Linking:** Safe automatic linking for multi-provider login accounts.
- **Password Reset:** Secure OTP-based reset flow.

### 🛡️ Role-Based Access Control (RBAC)
- Fine-grained authorization logic supporting roles: `Admin`, `Head`, `Sales`, and `Agent`.
- Complete route protection and navigation guards via **Next.js Middleware**.

### 🛍️ Product Management & Dashboard
- Full CRUD operations for managing products and catalog inventory.
- High-performance API Endpoints built with **Prisma ORM** and **PostgreSQL**.

### 🎨 Modern UI & UX
- Responsive, clean interface styled with **Tailwind CSS** and **Shadcn UI**.
- Dark/Light theme support.
- Fully typed forms validated with **React Hook Form** and **Zod**.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) (Neon DB), [Prisma](https://www.prisma.io/)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **Email Service:** [Resend](https://resend.com/)
- **Form Handling:** React Hook Form & Zod

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm/pnpm/yarn installed.

### 1. Clone the repository
```bash
git clone [https://github.com/Hanafi6/Alimo-Snap](https://github.com/Hanafi6/Alimo-Snap)
cd alimo-snap

npm install

npx prisma db push

npm run dev

Open http://localhost:3000 with your browser to see the result.

