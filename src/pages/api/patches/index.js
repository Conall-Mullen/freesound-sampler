import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth].js";
import dbConnect from "../../../db/connect";
import Patches from "../../../db/models/Patches.js";
import User from "../../../db/models/User.js";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  const id = session?.user.userId;
  if (request.method === "GET") {
    const patches = await Patches.find();
    response.status(200).json(patches);
  }
  if (request.method === "POST") {
    try {
      const patchData = await request.body;

      const newPatch = await Patches.create(patchData);

      await User.findByIdAndUpdate(id, {
        $push: { patches: newPatch._id },
      });
      response.status(201).json({ status: "Patch created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
