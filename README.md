# SaaS Template - Advanced Guide (2024)

<!-- ![image](https://github.com/mohsin-shaikh/saas-template/assets/12345/d76f776-dsdsd-dsdsd) -->

This is a repository for SaaS Template - Advanced Guide (2024)

<!-- [VIDEO TUTORIAL](https://youtu.be/demo) -->

> **Warning**
> This project is still in development and is not ready for production use.
>
> It uses new technologies which are subject to change and may break your application.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com)
- **Table package:** [TanStack/react-table](https://tanstack.com/table/v8)
- **Database:** Postgres
- **ORM:** [Prisma JS](https://www.prisma.io)
- **Validation:** [Zod](https://zod.dev)
- **Auth** [Next Auth v5 (Auth.JS)](https://authjs.dev)

### Features

- [x] Server-side pagination, sorting, and filtering (`useTable` hook)
- [x] Customizable columns (`dataTable` and `columns` props)
- [x] Dynamic debounced search inputs (`searchableColumns` prop)
- [x] Dynamic faceted filters (`filterableColumns` prop)
- [x] Optional notion like advanced filtering (`advancedFilter` prop)
- [x] Optional floating bar on row selection, rendered at the bottom (`floatingBarContent` prop)
- [x] Action to delete rows (`deleteRowsAction` prop)
- [x] 🔐 Next-auth v5 (Auth.js)
- [x] 🚀 Next.js 14 with server actions
- [x] 🔑 Credentials Provider
- [x] 🌐 OAuth Provider (Social login with Google & GitHub)
- [x] 🔒 Forgot password functionality
- [x] ✉️ Email verification
- [x] 📱 Two-factor verification
- [x] 👥 User roles (Admin & User)
- [x] 🔓 Login component (Opens in redirect or modal)
- [x] 📝 Register component
- [x] 🤔 Forgot password component
- [x] ✅ Verification component
- [x] ⚠️ Error component
- [x] 🔘 Login button
- [x] 🚪 Logout button
- [x] 🚧 Role Gate
- [x] 🔍 Exploring next.js middleware
- [x] 📈 Extending & Exploring next-auth session
- [x] 🔄 Exploring next-auth callbacks
- [x] 👤 useCurrentUser hook
- [x] 🛂 useRole hook
- [x] 🧑 currentUser utility
- [x] 👮 currentRole utility
- [x] 🖥️ Example with server component
- [x] 💻 Example with client component
- [x] 👑 Render content for admins using RoleGate component
- [x] 🛡️ Protect API Routes for admins only
- [x] 🔐 Protect Server Actions for admins only
- [x] 📧 Change email with new verification in the Settings page
- [x] 🔑 Change password with old password confirmation in the Settings page
- [x] 🔔 Enable/disable two-factor auth in the Settings page
- [x] 🔄 Change user role in Settings page (for development purposes only)

### Prerequisites

**Node version 18.7.x**

### Cloning the repository

```shell
git clone https://github.com/mohsin-shaikh/saas-template.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```sh
# POSTGRES
POSTGRES_USER=postgres
POSTGRES_PASSWORD=
POSTGRES_DB=saas_template

# Nest run locally
DB_HOST=localhost
# Nest run in docker, change host to database container name
# DB_HOST=postgres
DB_PORT=5432
DB_SCHEMA=public

# Prisma database connection
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}&sslmode=prefer
DIRECT_URL=${DATABASE_URL}

AUTH_SECRET="<Auth Secret>"

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RESEND_API_KEY="<Resend API Key>"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Setup Prisma

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
