export interface UserType {
  image: string;
  nickname: string;
  id: number;
}

export type Frequency = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface TaskType {
  doneBy: {
    user: UserType;
  };
  writer: UserType;
  displayIndex: number;
  commentCount: number;
  deletedAt: string | null;
  recurringId: number;
  frequency: Frequency;
  updatedAt: string;
  doneAt: string | null;
  date: string;
  description: string;
  name: string;
  id: number;
  user: UserType;
}

export interface TaskListType {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: TaskType[];
}

export interface CommentType {
  id: number;
  taskId: number;
  user: UserType;
  content: string;
  createdAt: string;
  updatedAt: string;
}
