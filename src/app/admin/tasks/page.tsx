import React from "react";

import { fetchUtils } from "@/utils/api";
import { TTaskItemDto } from "@/app/api/admin/tasks/type";
import { cell, filterItem, selectSearchItem } from "./constants";
import { createQueryString } from "@/utils/query-string";

import { API_ROUTE } from "@/app/api/route";
import { UserDto } from "@/app/api/auth/type";
import { ROUTE } from "@/constants/route";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import CreateTaskModal from "./components/modal/create-task";
import ListPageTemplate from "@/components/template/list-page";

interface Props {
  searchParams: Record<string, string>;
}

const TasksListPage = async ({ searchParams }: Props) => {
  const userCookie = cookies().get("user");

  // 비로그인 유저
  if (!userCookie) {
    redirect(ROUTE.HOME);
  }

  const user: UserDto = JSON.parse(userCookie.value);
  const disabled = user.userRole === "Viewer";

  const getTasks = await fetchUtils.get<TTaskItemDto[]>({
    url: `${API_ROUTE.ADMIN.TASKS}?${createQueryString(searchParams)}`,
    options: {
      headers: {
        // token 대신
        user: JSON.stringify(user),
      },
    },
  });

  return (
    <ListPageTemplate
      cell={cell}
      rows={getTasks}
      filterItem={filterItem}
      title="Tasks List"
      disabled={disabled}
      item={selectSearchItem}
      buttonEl={<CreateTaskModal />}
    />
  );
};

export default TasksListPage;
