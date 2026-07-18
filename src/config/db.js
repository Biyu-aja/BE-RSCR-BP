const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const mariadb = require('mariadb');

let connectionString = process.env.DATABASE_URL;

if (connectionString && connectionString.startsWith('mysql://')) {
  connectionString = connectionString.replace('mysql://', 'mariadb://');
}

const pool = mariadb.createPool(connectionString);
const adapter = new PrismaMariaDb(pool);

const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

module.exports = prisma;
