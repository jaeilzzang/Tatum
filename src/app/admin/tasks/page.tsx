import React from "react";

import { fetchUtils } from "@/utils/api";
import ListPageTemplate from "@/components/template/list-page";
import { TTaskItemDto } from "@/app/api/list/tasks/type";
import { cell, filterItem, selectSearchItem } from "./constants";
import { createQueryString } from "@/utils/query-string";

interface Props {
  params: {};
  searchParams: Record<string, string>;
}

const TasksListPage = async ({ searchParams }: Props) => {
  const getTasks = await fetchUtils.get<TTaskItemDto[]>({
    url: `list/tasks?${createQueryString(searchParams)}`,
  });

  return (
    <ListPageTemplate
      buttonName="Create Task"
      cell={cell}
      rows={getTasks}
      item={selectSearchItem}
      filterItem={filterItem}
      title="User List"
    />
  );
};

export default TasksListPage;
