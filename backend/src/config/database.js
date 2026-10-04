const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const mariadb = require('mariadb');

// Configura a pool de conexões ao MySQL usando a DATABASE_URL do .env
const pool = mariadb.createPool(process.env.DATABASE_URL);
const adapter = new PrismaMariaDb(pool);

// Instancia o PrismaClient com o adaptador do MySQL
const prisma = new PrismaClient({ adapter });

module.exports = prisma;