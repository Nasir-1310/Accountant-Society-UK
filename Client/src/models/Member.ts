// models/Member.ts
import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export default mongoose.models.Member || mongoose.model("Member", memberSchema);
