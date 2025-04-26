export interface ITodo {
  title: string;
  description?: string;
  completed: boolean;
  dueDate: Date;
  priority: "low" | "medium" | "high";
}
