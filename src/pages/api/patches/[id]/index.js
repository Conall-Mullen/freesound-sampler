import dbConnect from "../../../../db/connect";
import Patches from "../../../../db/models/Patches";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const patches = await Patches.findById(id);
    response.status(200).json(patches);
  }
  if (request.method === "PUT") {
    try {
      const newPatchData = await request.body;
      await Patches.findByIdAndUpdate(id, {
        $set: newPatchData,
      });
      response.status(200).json({ status: `Patch ${id} updated!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
