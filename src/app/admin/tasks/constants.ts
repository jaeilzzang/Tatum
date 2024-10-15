import {
  QUERY_KEY_STATUS,
  QUERY_KEY_TASK_TYPE,
} from "@/app/api/list/tasks/route";
import type { TTaskItemDto } from "@/app/api/list/tasks/type";
import type { TFilterItem } from "@/components/filter";
import type { TSelectItem } from "@/components/select";
import type { TCell } from "@/components/table";

export const selectSearchItem: TSelectItem[] = [
  { label: "Task Name", value: "taskName" },
  { label: "Reporter", value: "reporter" },
  { label: "Description", value: "description" },
  { label: "담당자(Assignee)", value: "assignee" },
];

export const filterItem: TFilterItem[] = [
  {
    title: "Task Type",
    queryKey: QUERY_KEY_TASK_TYPE,
    filter: {
      type: "checkbox",
      list: [
        { id: "택배요청", name: "택배요청" },
        { id: "물품구매", name: "물품구매" },
      ],
    },
  },
  {
    title: "상태",
    queryKey: QUERY_KEY_STATUS,
    filter: {
      type: "checkbox",
      list: [
        { id: "created", name: "Created" },
        { id: "in progress", name: "In Progress" },
        { id: "delayed", name: "Delayed" },
        { id: "done", name: "Done" },
      ],
    },
  },
];

export const cell: TCell<keyof TTaskItemDto>[] = [
  {
    key: "taskName",
    label: "Task Name",
  },
  {
    key: "taskType",
    label: "Task Type",
  },
  {
    key: "createdAt",
    label: "Created At",
  },
  {
    key: "dueDate",
    label: "Due Date",
  },
  {
    key: "reporter",
    label: "Reporter",
  },
  {
    key: "taskDescription",
    label: "Description",
  },
  {
    key: "assignee",
    label: "담당자(Assignee)",
  },
  {
    key: "status",
    label: "상태(Status)",
  },
];
