import path from "path";
import { promises as fs } from "fs";
import { UserDto } from "../../auth/type";
import { NextRequest } from "next/server";
import { keys, normalizeStr } from "@/utils/utils-string";

export const QUERY_KEY_USER_ROLE = "";

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "src", "data", "user_list.json");

  const searchParams = req.nextUrl.searchParams;

  const jsonData = await fs.readFile(filePath, "utf-8");
  const data: UserDto[] = JSON.parse(jsonData);

  const filterKey = Object.keys(data[0]).map(normalizeStr);

  const filterMap: { [x: string]: string[] }[] = filterKey
    .filter((key) => searchParams.get(key))
    .map((key) => {
      const dataKey = keys(data[0]).find((e) => normalizeStr(e) === key) || "";
      const filterData = searchParams.get(key)?.split(",") || [];

      return {
        [dataKey]: filterData,
      };
    });

  // 필터가 없을 경우 전체 데이터 출력
  // 필터가 4개 모두 들어올 경우 전체 데이터 출력
  if (!filterMap.length) {
    return Response.json(data);
  }

  const filteredData = data.filter((user) => {
    return filterMap.every((filter) => {
      const key = keys(filter)[0]; // 필터 조건의 키
      const filterValues = filter[key]; // 필터 값 배열

      return filterValues.some((value) => {
        const userData = user[key as keyof UserDto].toString();
        // 문자열 값들을 정규화하여 비교
        return normalizeStr(userData).includes(normalizeStr(value));
      });
    });
  });

  return Response.json(filteredData);
}
