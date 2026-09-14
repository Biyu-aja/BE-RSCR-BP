# BE-RSCR-BP

<p align="left">
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-7.0%2B-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white" alt="Express.js" /></a>
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-6.19.0-2D3748?logo=prisma&logoColor=white" alt="Prisma ORM" /></a>
  <a href="https://www.npmjs.com/package/rscr-cli"><img src="https://img.shields.io/badge/rscr--cli-1.5.0%2B%20(RSCR%20%26%20SCR)-CB3837?logo=npm&logoColor=white" alt="rscr-cli" /></a>
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-10.29.2-F69220?logo=pnpm&logoColor=white" alt="pnpm" /></a>
</p>

> **A database-first REST API boilerplate built with Express.js 5.2, TypeScript 7.0+, and Prisma ORM 6.19. Scaffolds strongly-typed 4-Layer (`RSCR`) and 3-Layer (`SCR`) modules automatically via [`rscr-cli`](https://www.npmjs.com/package/rscr-cli) (v1.5.0+). Out-of-the-box support for PostgreSQL, MySQL, SQLite, MongoDB, CockroachDB, MariaDB, and Microsoft SQL Server.**

---

## 📌 Tech Stack & Versions

| Component | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^7.0.2` | Strongly-typed JavaScript superset for safety and auto-completion |
| **Web Framework** | [Express.js](https://expressjs.com/) | `^5.2.1` | Fast, unopinionated web framework (Express 5) |
| **ORM** | [Prisma ORM](https://www.prisma.io/) | `^6.19.0` | Next-generation Node.js and TypeScript ORM |
| **Scaffolding Tool** | [`rscr-cli`](https://www.npmjs.com/package/rscr-cli) | `v1.5.0+` | Automated CLI generator for RSCR (4-Layer) & SCR (3-Layer) modules |
| **Authentication** | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | `^9.0.3` / `^6.0.0` | JWT token generation/verification & secure password hashing |
| **Dev Execution** | [tsx](https://github.com/privatenumber/tsx) | `^4.23.1` | Ultra-fast TypeScript execution and hot-reloading watcher |
| **Config Loader** | [dotenv](https://github.com/motdotla/dotenv) | `^17.4.2` | Zero-dependency environment variable manager |
| **Package Manager** | [pnpm](https://pnpm.io/) | `10.29.2` | Fast, disk space-efficient package manager |

---

## 🚀 Key Features

- **Database-First Schema Design**: Model your data in `prisma/schema.prisma` and generate type-safe CRUD APIs instantly.
- **Dual Architecture Flavors**:
  - **4-Layer Pattern (`RSCR`)**: `Repository -> Service -> Controller -> Route` for enterprise separation of concerns.
  - **3-Layer Pattern (`SCR`)**: `Service -> Controller -> Route` for lightweight, rapid development.
- **Automated CLI Scaffolding**: Built-in support for [`rscr-cli`](https://www.npmjs.com/package/rscr-cli) (v1.5.0+) with smart primary key detection (`Int`, `String`, `UUID`) and automatic router registration in `src/index.ts`.
- **Multi-Database Support**: Powered by Prisma ORM — works out-of-the-box with:
  - **PostgreSQL** (`postgresql://...`)
  - **MySQL** (`mysql://...`)
  - **SQLite** (`file:./dev.db`)
  - **MongoDB** (`mongodb://...`)
  - **CockroachDB** (`postgresql://...`)
  - **MariaDB** (`mysql://...`)
  - **Microsoft SQL Server** (`sqlserver://...`)
- **Pre-configured Authentication**: JWT authentication middleware (`authMiddleware`) and password hashing helpers (`hashPassword`, `comparePassword`).
- **REST Client Test Suites**: Ready-to-run `.rest` files generated per module for instant API testing in VS Code / JetBrains HTTP Client.

---

## 🏗️ Architecture Styles

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        RSCR Pattern (4 Layers)                         │
│                                                                        │
│  HTTP Request  ──►  [ Route ]  ──►  [ Controller ]                     │
│                                            │                           │
│                                            ▼                           │
│  Database     ◄──  [ Repository ] ◄── [ Service ]                      │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                         SCR Pattern (3 Layers)                         │
│                                                                        │
│  HTTP Request  ──►  [ Route ]  ──►  [ Controller ]                     │
│                                            │                           │
│                                            ▼                           │
│  Database     ◄─────────────────────  [ Service ]                      │
└────────────────────────────────────────────────────────────────────────┘
```

| Layer | RSCR Mode (4 Layers) | SCR Mode (3 Layers) | Responsibility |
| :--- | :--- | :--- | :--- |
| **Route** | `*.route.ts` | `*.route.ts` | Endpoint definitions, HTTP method mapping, middleware binding |
| **Controller** | `*.controller.ts` | `*.controller.ts` | Request extraction, parameter type casting, HTTP status responses |
| **Service** | `*.service.ts` | `*.service.ts` | Business logic, data transformation, multi-repository coordination |
| **Repository** | `*.repository.ts` | *(Inlined in Service)* | Direct Prisma Client database queries and persistence logic |

---

## 📂 Project Structure

```text
BE-RSCR-BP/
├── prisma/
│   └── schema.prisma        # Prisma schema definitions & datasource config
├── src/
│   ├── config/
│   │   └── db.ts            # Prisma Client singleton initialization
│   ├── middlewares/
│   │   └── auth.ts          # JWT Authentication middleware
│   ├── module/              # Application feature modules
│   │   └── user/            # Sample generated user module
│   │       ├── user.controller.ts
│   │       ├── user.repository.ts # (Present in RSCR mode)
│   │       ├── user.route.ts
│   │       ├── user.service.ts
│   │       └── user.rest    # Ready-to-run REST test requests
│   ├── utils/
│   │   └── auth.ts          # Authentication utilities (hash & token helpers)
│   └── index.ts             # Application entry point & router registrations
├── .env.example             # Template environment variables
├── package.json             # Scripts & dependencies
├── tsconfig.json            # TypeScript compiler configuration
└── test.rest                # Health check & global endpoint tests
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **pnpm**: `v10.x` (`npm install -g pnpm`)

### 1. Installation

```bash
pnpm install
```

### 2. Environment Configuration

Copy the example environment file and configure your database connection:

```bash
cp .env.example .env
```

Open `.env` and set your credentials:

```env
DATABASE_URL="mysql://root:password@localhost:3306/db_name"
PORT=3000
JWT_SECRET="your-super-secret-jwt-key"
```

### 3. Run Database Migrations

Generate Prisma Client and apply migrations to your database:

```bash
pnpm db:migrate
```

### 4. Start Development Server

Launch the development server with live reload powered by `tsx`:

```bash
pnpm dev
```

The server will be running on `http://localhost:3000`.

---

## 🛠️ Scaffolding CRUD with `rscr-cli` (v1.5.0+)

Scaffold fully-typed CRUD modules directly from your Prisma models using [`rscr-cli`](https://www.npmjs.com/package/rscr-cli).

> [!NOTE]
> This boilerplate is configured and tested to work seamlessly with **`rscr-cli` version 1.5.0+**, supporting both **RSCR** (4-layer) and **SCR** (3-layer) patterns.

### 1. Install or Run the CLI

Install globally:

```bash
npm install -g rscr-cli@latest
# or with pnpm
pnpm add -g rscr-cli@latest
```

> [!TIP]
> You can also run the CLI on-demand without installing globally:
> ```bash
> npx rscr-cli@latest g <model_name>
> # or using pnpm dlx
> pnpm dlx rscr-cli@latest g <model_name>
> ```

---

### 2. Define a Model in `prisma/schema.prisma`

Add a model to your `prisma/schema.prisma` (e.g. `Product`):

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Float
  description String?
  createdAt   DateTime @default(now())
}
```

---

### 3. Generate Module Files

#### 🔹 Mode A: 4-Layer Pattern (`RSCR` - Default)
Generates `repository`, `service`, `controller`, `route`, and `.rest`:

```bash
# Generate single model
rscr g product

# Generate all models in schema
rscr g all
# or
rscr g -a
```

#### 🔹 Mode B: 3-Layer Pattern (`SCR`)
Generates `service` (with direct DB queries), `controller`, `route`, and `.rest`:

```bash
# Using the dedicated scr command
scr g product
scr g all

# Or using rscr with the --scr flag
rscr g product --scr
rscr g all --scr

# Or using -t / --type option
rscr g product -t scr
```

---

### 4. What happens under the hood?

1. **Schema Parsing**: `rscr-cli` reads `prisma/schema.prisma` to detect model fields, data types, and primary key types (`Int`, `String`, `UUID`).
2. **Code Generation**: Generates strongly-typed files in `src/module/<model>/`:
   - **RSCR (4 Layers)**:
     - `<model>.repository.ts`: Direct Prisma database operations.
     - `<model>.service.ts`: Business logic & repository coordination.
     - `<model>.controller.ts`: Express HTTP request/response handler with automated param casting (e.g., `Number(id)`).
     - `<model>.route.ts`: Express routes (`GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`).
     - `<model>.rest`: Ready-to-run REST test requests.
   - **SCR (3 Layers)**:
     - `<model>.service.ts`: Direct Prisma DB access combined with business logic.
     - `<model>.controller.ts`: HTTP request/response handler.
     - `<model>.route.ts`: Express routes.
     - `<model>.rest`: Ready-to-run REST test requests.
3. **Auto-registration**: Automatically imports and registers router in `src/index.ts`:
   ```typescript
   app.use('/products', productRouter);
   ```

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `pnpm dev` | `tsx watch src/index.ts` | Starts hot-reloading dev server |
| `pnpm build` | `tsc` | Compiles TypeScript source to `dist/` |
| `pnpm start` | `tsc && node dist/index.js` | Builds and runs production server |
| `pnpm db:migrate` | `prisma migrate dev` | Creates and applies new database migrations |
| `pnpm db:studio` | `prisma studio` | Opens Prisma Studio GUI to inspect/edit database |
| `pnpm prisma:generate` | `prisma generate` | Generates Prisma Client types from `schema.prisma` |

---

## 📡 API Endpoints

### Global / Health Check
- `GET /` — API welcome message
- `GET /health` — Service health status check

### Generated Resource Endpoints (e.g., `/users` or `/products`)
- `GET /<resource>` — Fetch list of records
- `GET /<resource>/:id` — Fetch record by ID
- `POST /<resource>` — Create a new record
- `PUT /<resource>/:id` — Update record by ID
- `DELETE /<resource>/:id` — Delete record by ID
