import dbConnect from "@/db/connect";
import User from "@/db/models/User.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const users = await User.find();
    if (!users) {
      console.log("not found");
      return response.status(404).json({ status: "Not Found" });
    }
    console.log(users);
    return response.status(200).json(users);
  }
}
