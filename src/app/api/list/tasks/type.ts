export type TTaskStatus = "Done" | "Delayed" | "In Progress" | "Created";

export interface TTaskItemDto {
  taskType: string;
  taskName: string;
  taskDescription: string;
  assignee: string;
  reporter: string;
  status: TTaskStatus;
  dueDate: string;
  createdAt: string;
  completedAt: string;
}
