import { TaskResponse } from '@/types/task';
export interface GroupResponse {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  members: Member[];
  taskLists: TaskList[];
}

export interface Member {
  userId: number;
  groupId: string;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: 'ADMIN' | 'MEMBER';
}

export interface TaskList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: TaskResponse[];
}
