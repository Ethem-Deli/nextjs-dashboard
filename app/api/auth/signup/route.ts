import { NextResponse } from "next/server";
import { hashPassword } from "@/app/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const hashedPassword = await hashPassword(password);

  // Save email and hashedPassword to your database
  // ...

  return NextResponse.json({ message: "User created" });
}
