import path from "path";
import { promises as fs } from "fs";
import { UserDto } from "../type";

export async function POST(req: Request) {
  const filePath = path.join(process.cwd(), "src", "data", "user_list.json");

  const body = await req.json();

  const jsonData = await fs.readFile(filePath, "utf-8");
  const data: UserDto[] = JSON.parse(jsonData);

  const invalidUser = data.find((e) => e.userEmail === body.userEmail);

  if (!invalidUser) {
    return new Response(null, {
      status: 400,
      statusText: "not found user",
    });
  }

  return Response.json(data);
}
