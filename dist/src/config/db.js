"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
let db;
if (!global.__db) {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });
    const adapter = new adapter_pg_1.PrismaPg(pool);
    global.__db = new client_1.PrismaClient({
        adapter,
    });
}
exports.db = db = global.__db;
