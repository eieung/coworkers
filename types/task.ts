import { User } from './user';

export interface TaskResponse {
  id: number;
  name: string;
  description: string;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  user: User;
  recurringId: number;
  deletedAt: string | null;
  displayIndex: number;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
  doneBy: {
    user: User;
  };
  commentCount: number;
  frequency: string;
}
