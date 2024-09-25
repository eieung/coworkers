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
}
