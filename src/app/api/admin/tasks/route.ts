import path from "path";
import { promises as fs } from "fs";
import { TTaskItemDto } from "./type";
import { NextRequest } from "next/server";
import { keys, normalizeStr } from "@/utils/utils-string";
import { UserDto } from "../../auth/type";

export const QUERY_KEY_TASK_TYPE = "tasktype";
export const QUERY_KEY_STATUS = "status";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const userJson = req.headers.get("user");

  if (!userJson) {
    return new Response(null, {
      status: 400,
      statusText: "not found user",
    });
  }

  const filePath = path.join(process.cwd(), "src", "data", "task_list.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const data: TTaskItemDto[] = JSON.parse(jsonData);

  const user: UserDto = JSON.parse(userJson);
  const rbac = data.filter((e) => {
    if (user.userRole === "RegularUser") {
      // create 한 사람만 접근 가능
      // reporter가 createdUser? 인지 잘 모르겠음
      return normalizeStr(e.reporter) === normalizeStr(user.userName);
    } else if (user.userRole === "Viewer") {
      return normalizeStr(e.assignee) === normalizeStr(user.userName);
    }
    return e;
  });

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
    return Response.json(rbac);
  }

  // 필터 조건 처리
  const filteredData = rbac.filter((user) => {
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
