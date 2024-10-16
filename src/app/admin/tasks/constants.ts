import {
  QUERY_KEY_STATUS,
  QUERY_KEY_TASK_TYPE,
} from "@/app/api/admin/tasks/route";
import type {
  TTaskItemDto,
  TTaskStatus,
  TTaskType,
} from "@/app/api/admin/tasks/type";
import type { TFilterItem } from "@/components/filter";
import type { TCell } from "@/components/table";
import type { GenericItemType } from "@/types";

type GenericTasksType = GenericItemType<keyof TTaskItemDto, string>[];

export const selectSearchItem: GenericTasksType = [
  { label: "Task Name", value: "taskname" },
  { label: "Reporter", value: "reporter" },
  { label: "Description", value: "taskdescription" },
  { label: "담당자(Assignee)", value: "assignee" },
];

export const filterTaskType: GenericItemType<TTaskType>[] = [
  { label: "택배요청", value: "택배요청" },
  { label: "물품구매", value: "물품구매" },
];

export const filterTaskStatus: GenericItemType<TTaskStatus>[] = [
  { value: "created", label: "Created" },
  { value: "in progress", label: "In Progress" },
  { value: "delayed", label: "Delayed" },
  { value: "done", label: "Done" },
];

export const filterItem: TFilterItem[] = [
  {
    title: "Task Type",
    queryKey: QUERY_KEY_TASK_TYPE,
    filter: {
      type: "checkbox",
      list: filterTaskType,
    },
  },
  {
    title: "상태",
    queryKey: QUERY_KEY_STATUS,
    filter: {
      type: "checkbox",
      list: filterTaskStatus,
    },
  },
];

export const cell: TCell<keyof TTaskItemDto>[] = [
  {
    value: "taskName",
    label: "Task Name",
  },
  {
    value: "taskType",
    label: "Task Type",
  },
  {
    value: "createdAt",
    label: "Created At",
  },
  {
    value: "dueDate",
    label: "Due Date",
  },
  {
    value: "reporter",
    label: "Reporter",
  },
  {
    value: "taskDescription",
    label: "Description",
  },
  {
    value: "assignee",
    label: "담당자(Assignee)",
  },
  {
    value: "status",
    label: "상태(Status)",
  },
];
