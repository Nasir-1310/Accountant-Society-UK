// src/lib/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// Compare plaintext password with hashed password
export async function comparePassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed);
}

// Hash password
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Sign JWT token
export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

// Verify JWT token
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
