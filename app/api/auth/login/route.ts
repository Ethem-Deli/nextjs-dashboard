import { NextResponse } from "next/server";
import postgres from "postgres";
import { verifyPassword } from "@/app/lib/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Query user by email from your database
  const [user] = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

  return NextResponse.json({ message: "Logged in successfully" });
}
