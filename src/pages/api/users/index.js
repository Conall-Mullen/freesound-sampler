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
}
