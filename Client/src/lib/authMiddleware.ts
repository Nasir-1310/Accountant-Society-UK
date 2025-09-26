//src/lib/authMiddleware.ts
import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function authenticateAdmin(req: NextRequest) {
  try {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return { success: false, error: "Authentication required", status: 401 };

    const decoded = verifyToken(token) as { userId: string; email: string; role: string } | null;
    if (!decoded) return { success: false, error: "Invalid token", status: 401 };
    if (decoded.role !== "admin") return { success: false, error: "Insufficient permissions", status: 403 };

    return { success: true, user: decoded };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Authentication failed", status: 401 };
  }
}
