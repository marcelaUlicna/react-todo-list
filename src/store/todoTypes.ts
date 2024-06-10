export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdDate?: Date;
  completedDate?: Date;
}

export interface TaskItem extends Task {
  isNew: boolean;
}

export enum FilterItem {
  Completed,
  Active,
}

export enum Action {
  ShowActive,
  ShowCompleted,
  ShowAll,
  CompleteAll,
  DeleteCompleted,
}
