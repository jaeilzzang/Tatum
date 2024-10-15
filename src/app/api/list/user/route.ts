import path from "path";
import { promises as fs } from "fs";
import { UserDto } from "../../auth/type";
import { NextRequest } from "next/server";

export const QUERY_KEY_USER_ROLE = "role";

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "src", "data", "user_list.json");

  const searchParams = req.nextUrl.searchParams.get(QUERY_KEY_USER_ROLE);
  const filter = searchParams?.split(",") || [];

  const jsonData = await fs.readFile(filePath, "utf-8");
  const data: UserDto[] = JSON.parse(jsonData);

  // 필터가 없을 경우 전체 데이터 출력
  // 필터가 4개 모두 들어올 경우 전체 데이터 출력
  if (!filter.length || filter.length === 4) {
    return Response.json(data);
  }

  // 그 외 필터 리스트 필터 적용
  const filterData = data.filter((e) =>
    filter.includes(e.userRole.toLowerCase())
  );

  return Response.json(filterData);
}
