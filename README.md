# SaaS Template - Advanced Guide (2024)

![image](https://github.com/mohsin-shaikh/saas-template/blob/main/public/saas-template.png?raw=true)

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

- Authentication
  - 🔐 Next-auth v5 (Auth.js)
  - 🚀 Next.js 14 with server actions
  - 🔑 Credentials Provider
  - 🌐 OAuth Provider (Social login with Google & GitHub)
  - 🔒 Forgot password functionality
  - ✉️ Email verification
  - 📱 Two-factor verification
  - 👥 User roles (Admin & User)
  - 🔓 Login component (Opens in redirect or modal)
  - 📝 Register component
  - 🤔 Forgot password component
  - ✅ Verification component
  - ⚠️ Error component
  - 🔘 Login button
  - 🚪 Logout button
  - 🚧 Role Gate
  - 🔍 Exploring next.js middleware
  - 📈 Extending & Exploring next-auth session
  - 🔄 Exploring next-auth callbacks
  - 👤 useCurrentUser hook
  - 🛂 useRole hook
  - 🧑 currentUser utility
  - 👮 currentRole utility
  - 🖥️ Example with server component
  - 💻 Example with client component
  - 👑 Render content for admins using the RoleGate component
  - 🛡️ Protect API Routes for admins only
  - 🔐 Protect Server Actions for admins only
  - 📧 Change email with new verification in the Settings page
  - 🔑 Change password with old password confirmation in the Settings page
  - 🔔 Enable/disable two-factor auth in the Settings page
  - 🔄 Change user role in Settings page (for development purposes only)
- Data Table Server Side Renderings
  - Server-side pagination, sorting, and filtering (`useTable` hook)
  - Customizable columns (`dataTable` and `columns` props)
  - Dynamic debounced search inputs (`searchableColumns` prop)
  - Dynamic faceted filters (`filterableColumns` prop)
  - Optional notion like advanced filtering (`advancedFilter` prop)
  - Optional floating bar on row selection, rendered at the bottom (`floatingBarContent` prop)
  - Action to delete rows (`deleteRowsAction` prop)

### Prerequisites

**Node version 18.7.x**

### Cloning the repository

```sh
git clone https://github.com/mohsin-shaikh/saas-template.git
```

### Install packages

```sh
npm install
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

```sh
npx prisma generate
npx prisma db push
```

### Start the app

```sh
npm run dev
```

### Bugs / Issues

- [ ] Use uniformed icons
- [ ] Table selection should reset on-page changes in the data table
- [ ] Consolidate Server Action in a common folder
- [ ] Settings pages are not up to the mark
