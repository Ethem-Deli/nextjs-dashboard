import { NextResponse } from "next/server";
import { hashPassword } from "@/app/lib/auth";
// import your database function
import { createUser } from "@/app/lib/db"; // example

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const hashedPassword = await hashPassword(password);

  // Save to database
  await createUser({ email, passwordHash: hashedPassword });

  return NextResponse.json({ message: "User created" });
}
