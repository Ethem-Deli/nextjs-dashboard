import { NextResponse } from "next/server";
import { verifyPassword } from "@/app/lib/auth";
// import your database/user model

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Find user in database
  const user = { passwordHash: "$2a$10$somethinghashed" };

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

  return NextResponse.json({ message: "Logged in successfully" });
}
