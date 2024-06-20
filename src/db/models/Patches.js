import mongoose from "mongoose";

const { Schema } = mongoose;

const patchesSchema = new Schema({
  name: { type: String },
  audioSources: { type: Array },
  faderVolume: { type: Array },
});

const Patches =
  mongoose.models.Patches || mongoose.model("Patches", patchesSchema);

export default Patches;
