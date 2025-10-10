
// =================================================================
// 3. CREATE: src/app/api/admin/logout/route.ts
// =================================================================
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully"
  });

  // Clear the cookie
  response.cookies.delete('adminToken');
  return response;
}
