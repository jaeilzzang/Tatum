import path from "path";
import { promises as fs } from "fs";
import { TTaskItemDto } from "./type";
import { NextRequest } from "next/server";
import { keys, normalizeStr } from "@/utils/utils-string";

export const QUERY_KEY_TASK_TYPE = "tasktype";
export const QUERY_KEY_STATUS = "status";

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "src", "data", "task_list.json");

  const searchParams = req.nextUrl.searchParams;

  const jsonData = await fs.readFile(filePath, "utf-8");
  const data: TTaskItemDto[] = JSON.parse(jsonData);

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

  if (!filterMap.length) {
    return Response.json(data);
  }

  // 필터 조건 처리
  const filteredData = data.filter((user) => {
    return filterMap.every((filter) => {
      const key = keys(filter)[0]; // 필터 조건의 키
      const filterValues = filter[key]; // 필터 값 배열

      return filterValues.some((value) => {
        const userData = user[key as keyof TTaskItemDto].toString();
        // 문자열 값들을 정규화하여 비교
        return normalizeStr(userData).includes(normalizeStr(value));
      });
    });
  });

  // 필터링된 결과 반환
  return Response.json(filteredData);
}
