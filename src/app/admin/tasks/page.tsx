import React from "react";

import { fetchUtils } from "@/utils/api";
import ListPageTemplate from "@/components/template/list-page";
import { TTaskItemDto } from "@/app/api/admin/tasks/type";
import { cell, filterItem, selectSearchItem } from "./constants";
import { createQueryString } from "@/utils/query-string";

import { SelectRoot } from "@/components/select/provider";
import { API_ROUTE } from "@/app/api/route";

interface Props {
  searchParams: Record<string, string>;
}

const TasksListPage = async ({ searchParams }: Props) => {
  const getTasks = await fetchUtils.get<TTaskItemDto[]>({
    url: `${API_ROUTE.ADMIN.TASKS}?${createQueryString(searchParams)}`,
  });

  return (
    <SelectRoot item={selectSearchItem}>
      <ListPageTemplate
        buttonName="Create Task"
        cell={cell}
        rows={getTasks}
        filterItem={filterItem}
        title="Tasks List"
      />
    </SelectRoot>
  );
};

export default TasksListPage;
