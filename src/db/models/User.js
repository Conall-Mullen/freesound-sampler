import mongoose from "mongoose";
import "./Patches";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  patches: { type: [Schema.Types.ObjectId], ref: "Patches" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
