export type TTaskStatus = "Done" | "Delayed" | "In Progress" | "Created";
export type TTaskType = "택배요청" | "물품구매";

export type TTaskItemDto = {
  taskType: TTaskType;
  taskName: string;
  taskDescription: string;
  assignee: string;
  reporter: string;
  status: TTaskStatus;
  dueDate: string;
  createdAt: string;
  completedAt: string;
};
