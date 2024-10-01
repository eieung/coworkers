import { TaskResponse } from '@/types/task';
export interface GroupResponse {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  members: Member[];
  taskLists: TaskList[];
}

export interface Member {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: 'ADMIN' | 'MEMBER';
}

export interface TaskList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: TaskResponse[];
}
