// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export default async function verifyToken() {
//   const token = (await cookies()).get("token")?.value;
//   if (!token) return false;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     return decoded;
//   } catch {
//     return false;
//   }
// }
