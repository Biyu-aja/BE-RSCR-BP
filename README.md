# BE-RSCR-BP

A robust, production-ready backend boilerplate built with **Express.js**, **TypeScript**, **Prisma ORM**, and **JWT Authentication**. It features an automated CRUD module generator powered by the [`rscr-cli`](https://www.npmjs.com/package/rscr-cli) command-line tool.

---

## Features

- **TypeScript Core**: Fully typed, clean code with TypeScript.
- **Express.js Framework**: Fast, unopinionated, minimalist web framework.
- **Prisma ORM**: Modern database access with built-in support for MySQL, PostgreSQL, and MariaDB.
- **JWT Authentication & Password Hashing**: Clean registration, login, and protected route handlers using `jsonwebtoken` and `bcrypt`.
- **Modular Structure**: Organized under `src/module/<module-name>` containing specific Repository, Service, Controller, and Route files.
- **Auto-Generating CRUD**: Rapid scaffolding of CRUD operations for any Prisma model using `rscr-cli`.

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

## Scaffolding CRUD with `rscr-cli`

You can automatically generate boilerplate repositories, services, controllers, and routes for any model defined in your `prisma/schema.prisma` file using the globally published [`rscr-cli`](https://www.npmjs.com/package/rscr-cli) tool.

### 1. Install CLI Globally

Install the package globally via npm or pnpm:

```bash
npm install -g rscr-cli
# or using pnpm
pnpm add -g rscr-cli
```

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
