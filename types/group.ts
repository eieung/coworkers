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

export interface Board {
  title: string;
  date: string | null;
  user: string | null;
  views: string | null;
}

export const board: Board = {
  title: '자유게시판에 질문을 올릴 수 있어요',
  date: '2024.08.01',
  user: '나무',
  views: '999+',
};

export const member: Member = {
  userId: 1,
  groupId: 'groupA',
  userName: '나무',
  userEmail: 'namu@gmail.com',
  userImage: null,
  role: 'ADMIN'
};

export interface TaskList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: TaskResponse[];
}
