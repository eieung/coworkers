export interface Group {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
}

export interface Membership {
  group: Group;
  role: 'ADMIN' | 'MEMBER';
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}


export interface User {
  id: number;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  teamId: string;
  email: string;
  memberships: Membership[];
}