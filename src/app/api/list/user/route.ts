import path from "path";
import { promises as fs } from "fs";
import { UserDto } from "../../auth/type";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "src", "data", "user_list.json");

  const checkFilter = req.nextUrl.searchParams.get("checked")?.split(",");

  const jsonData = await fs.readFile(filePath, "utf-8");
  const data: UserDto[] = JSON.parse(jsonData);

  if (checkFilter?.length) {
    const filterData = data.filter((e) => {
      return checkFilter.includes(e.userRole.toLowerCase());
    });

    return Response.json(filterData);
  }

  return Response.json(data);
}
