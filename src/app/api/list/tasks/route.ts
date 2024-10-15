import path from "path";
import { promises as fs } from "fs";
import { TTaskItemDto } from "../tasks/type";
import { NextRequest } from "next/server";

export const QUERY_KEY_TASK_TYPE = "type";
export const QUERY_KEY_STATUS = "status";

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "src", "data", "task_list.json");

  const searchParams = req.nextUrl.searchParams;

  const typeFilter = searchParams.get(QUERY_KEY_TASK_TYPE)?.split(",") || [];
  const statusFilter = searchParams.get(QUERY_KEY_STATUS)?.split(",") || [];

  const jsonData = await fs.readFile(filePath, "utf-8");
  const data: TTaskItemDto[] = JSON.parse(jsonData);

  // 초기상태
  if (!typeFilter.length && !statusFilter.length) {
    return Response.json(data);
  }

  // 필터 조건 처리
  const res = data.filter(({ taskType, status }) => {
    const typeCondition = typeFilter.includes(taskType.toLowerCase());
    const statusCondition = statusFilter.includes(status.toLowerCase());

    return typeCondition && statusCondition;
  });

  // 필터링된 결과 반환
  return Response.json(res);
}
