# BE-RSCR-BP

A robust, production-ready backend boilerplate built with **Express.js**, **TypeScript**, **Prisma ORM**, and **JWT Authentication**. It features an automated CRUD module generator powered by the [`rscr-cli`](https://www.npmjs.com/package/rscr-cli) command-line tool (v1.4.0).

---

## Features

- **TypeScript Core**: Fully typed, clean code with TypeScript.
- **Express.js Framework**: Fast, unopinionated, minimalist web framework.
- **Prisma ORM**: Modern database access with out-of-the-box support for multiple databases (PostgreSQL, MySQL, SQLite, MongoDB, CockroachDB, MariaDB, and Microsoft SQL Server).
- **JWT Authentication & Password Hashing**: Pre-configured middleware and helper utilities (`jsonwebtoken` & `bcrypt`) to protect routes and hash credentials.
- **Modular Structure**: Organized under `src/module/<module-name>` containing specific Repository, Service, Controller, and Route files.
- **Auto-Generating CRUD**: Rapid scaffolding of clean, function-based CRUD operations for any Prisma model using `rscr-cli` (v1.4.0).

---

## Project Structure

```text
src/
├── config/
│   └── db.ts            # Prisma Client initialization & adapter config
├── middlewares/
│   └── auth.ts          # JWT Authentication middleware
├── module/              # Main application modules
│   └── user/            # Generated module example
│       ├── user.controller.ts
│       ├── user.repository.ts
│       ├── user.route.ts
│       └── user.service.ts
├── utils/
│   └── auth.ts          # Auth helper utilities (hashing, signing)
└── index.ts             # Application entry point & route registration
```

---

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

### 1. Clone & Install Dependencies

```bash
pnpm install
```

### 2. Environment Configuration

Copy the example environment file and configure your database connection:

```bash
cp .env.example .env
```

Open `.env` and set your `DATABASE_URL`:

```env
DATABASE_URL="mysql://root:password@localhost:3306/db_name"
```

### 3. Run Database Migrations

Generate client and run Prisma migrations to initialize the database schema:

```bash
pnpm db:migrate
```

### 4. Start Development Server

Run the application in development mode with hot-reloading:

```bash
pnpm dev
```

The server will be running on `http://localhost:3000`.

---

## Scaffolding CRUD with `rscr-cli` (v1.4.0)

You can automatically generate boilerplate repositories, services, controllers, and routes for any model defined in your `prisma/schema.prisma` file using the globally published [`rscr-cli`](https://www.npmjs.com/package/rscr-cli) tool.

> [!NOTE]
> This boilerplate is configured and tested to work seamlessly with **`rscr-cli` version 1.4.0**.

### Supported Databases

Since the CRUD scaffolding is driven by Prisma ORM, all major databases supported by Prisma are fully supported:
- **PostgreSQL**
- **MySQL**
- **SQLite**
- **MongoDB**
- **CockroachDB**
- **MariaDB**
- **Microsoft SQL Server**

### 1. Install CLI Globally

Install the specific version (`1.4.0`) globally via npm or pnpm:

```bash
npm install -g rscr-cli@1.4.0
# or using pnpm
pnpm add -g rscr-cli@1.4.0
```

> [!TIP]
> If you prefer not to install the CLI globally, you can run the generator command on-demand using `npx` or `pnpm dlx`:
> ```bash
> npx rscr-cli@1.4.0 g product
> # or using pnpm dlx
> pnpm dlx rscr-cli@1.4.0 g product
> ```

### 2. Generate a Module

Add a new model to your `prisma/schema.prisma` (e.g. `Product`):

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Float
  description String?
  createdAt   DateTime @default(now())
}
```

Then run the generator command:

```bash
rscr g product
```

Or generate all models in your schema at once:

```bash
rscr g -a
```

### What happens under the hood?

1. **Schema Parsing**: `rscr-cli` automatically reads your local `prisma/schema.prisma` file to identify the primary key (ID field name and type).
2. **Boilerplate Creation**: It generates four files inside `src/module/product/`:
   - `product.repository.ts`: Handles direct database access using Prisma.
   - `product.service.ts`: Coordinates business logic operations.
   - `product.controller.ts`: Manages Express HTTP requests/responses (with automatic ID casting, e.g. `Number(id)` if the ID is type `Int`).
   - `product.route.ts`: Sets up standard REST endpoints (`GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`).
3. **Auto-registration**: It imports and registers the newly created router automatically in `src/index.ts`:
   ```typescript
   app.use('/products', productRouter);
   ```

---

## API Endpoints

### Global / Health Check
- `GET /` - Root endpoint
- `GET /health` - Health check status

### Generated Modules (e.g. Products / Users)
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch product by ID
- `POST /products` - Create new product
- `PUT /products/:id` - Update product by ID
- `DELETE /products/:id` - Delete product by ID
