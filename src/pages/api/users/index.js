import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth].js";
import dbConnect from "../../../db/connect";
import User from "../../../db/models/User.js";

export default async function handler(request, response) {
  console.log("\napi/user method", request.method);
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);

  if (request.method === "GET") {
    console.log("api/users get method");
    const users = await User.find();
    if (!users) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(users);
  }
  if (request.method === "POST") {
    try {
      const patchData = await request.body;
      console.log("patch data", patchData);

      await User.findByIdAndUpdate(id, {
        $push: { patches: patchData },
      });
      response.status(201).json({ status: "Patch created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
