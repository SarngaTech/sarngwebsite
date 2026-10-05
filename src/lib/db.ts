import "server-only";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma client for Neon PostgreSQL.
 * Uses the engine-free query compiler with the `pg` driver adapter and Neon's pooled connection string.
 * A single instance is reused across hot reloads and warm serverless invocations.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const dbConfigured = () => Boolean(process.env.DATABASE_URL);

function createClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 20_000,
  });
  return new PrismaClient({ adapter, log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"] });
}

export function db(): PrismaClient {
  if (!globalForPrisma.prisma) globalForPrisma.prisma = createClient();
  return globalForPrisma.prisma;
}
