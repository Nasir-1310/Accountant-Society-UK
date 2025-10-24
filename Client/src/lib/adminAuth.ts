// src/lib/adminAuth.ts
import { verifyToken } from "@/lib/auth";

/**
 * Verify admin authentication from request
 * @param request - Next.js Request object
 * @returns boolean - true if authenticated, false otherwise
 */
export async function verifyAdminAuth(request: Request): Promise<boolean> {
  try {
    const token = request.headers.get("cookie")?.split("token=")[1];
    
    if (!token) {
      return false;
    }

    const decoded = verifyToken(token);
    
    if (!decoded || typeof decoded === "string" || !("email" in decoded)) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Admin auth verification error:", error);
    return false;
  }
}

/**
 * Get admin email from request
 * @param request - Next.js Request object
 * @returns string | null - admin email or null if not authenticated
 */
export async function getAdminEmail(request: Request): Promise<string | null> {
  try {
    const token = request.headers.get("cookie")?.split("token=")[1];
    
    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    
    if (!decoded || typeof decoded === "string" || !("email" in decoded)) {
      return null;
    }

    return (decoded as { email: string }).email;
  } catch (error) {
    console.error("Get admin email error:", error);
    return null;
  }
}