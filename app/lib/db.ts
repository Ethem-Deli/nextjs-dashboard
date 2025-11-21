import postgres from "postgres";

export const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function createUser({ email, passwordHash }: { email: string; passwordHash: string }) {
  return sql`INSERT INTO users (email, password) VALUES (${email}, ${passwordHash})`;
}

export async function getUserByEmail(email: string) {
  return sql`SELECT * FROM users WHERE email = ${email}`;
}
