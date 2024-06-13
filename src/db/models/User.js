import mongoose from "mongoose";
const { Schema } = mongoose;
const patcheSchema = new Schema({
  name: { type: String, required: false },
  audioSources: { type: Array, required: false },
});
const userSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  patches: [patcheSchema],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
