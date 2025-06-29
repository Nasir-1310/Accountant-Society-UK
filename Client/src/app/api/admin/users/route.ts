import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const users = await User.find().select("-password"); // don’t send password
  return Response.json(users);
}
