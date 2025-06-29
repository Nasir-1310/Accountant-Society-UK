import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  const users = await User.find().select("-password"); // don’t send password
  return Response.json(users);
}
