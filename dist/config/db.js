"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
let connectionString = process.env.DATABASE_URL;
let adapter;
if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not defined.');
}
if (connectionString.startsWith('mysql://') || connectionString.startsWith('mariadb://')) {
    // MySQL / MariaDB Setup
    // Using require here to dynamically load the driver only when needed
    const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
    const mariadb = require('mariadb');
    if (connectionString.startsWith('mysql://')) {
        connectionString = connectionString.replace('mysql://', 'mariadb://');
    }
    // Remove empty password colons (e.g. root:@localhost -> root@localhost)
    connectionString = connectionString.replace(':@', '@');
    const pool = mariadb.createPool(connectionString);
    adapter = new PrismaMariaDb(pool);
}
else if (connectionString.startsWith('postgresql://') || connectionString.startsWith('postgres://')) {
    // PostgreSQL / Supabase Setup
    const { PrismaPg } = require('@prisma/adapter-pg');
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString });
    adapter = new PrismaPg(pool);
}
else {
    throw new Error(`Unsupported database protocol in DATABASE_URL: "${connectionString}". Only MySQL/MariaDB and PostgreSQL are configured.`);
}
const prisma = globalThis.prisma || new client_1.PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}
exports.default = prisma;
