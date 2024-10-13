import path from "path";
import { promises as fs } from "fs";
import { UserDto } from "../../auth/type";

export async function GET(req: Request) {
  const filePath = path.join(process.cwd(), "src", "data", "user_list.json");

  const jsonData = await fs.readFile(filePath, "utf-8");
  const data: UserDto[] = JSON.parse(jsonData);

  return Response.json(data);
}
