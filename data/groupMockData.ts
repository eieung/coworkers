interface Member {
  role: 'ADMIN' | 'MEMBER';
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

interface TaskList {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: string[];
}

interface TeamData {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
  members: Member[];
  taskLists: TaskList[];
}

const groupMockData: TeamData = {
  teamId: 'part4-team5',
  updatedAt: '2024-09-11T05:52:41.612Z',
  createdAt: '2024-01-15T10:23:35.112Z',
  image: 'https://example.com/team-logo.png',
  name: '홍준기와 아이들',
  id: 101,
  members: [
    {
      role: 'ADMIN',
      userImage:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
      userEmail: 'yongbin.ko@codeit.com',
      userName: '고용빈',
      groupId: 1,
      userId: 1001,
    },
    {
      role: 'MEMBER',
      userImage:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
      userEmail: 'daejin.lee@codeit.com',
      userName: '이대진',
      groupId: 1,
      userId: 1002,
    },
    {
      role: 'MEMBER',
      userImage:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
      userEmail: 'miyoung.seo@codeit.com',
      userName: '서미영',
      groupId: 1,
      userId: 1003,
    },
    {
      role: 'MEMBER',
      userImage:
        'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
      userEmail: 'joonki.hong@codeit.com',
      userName: '홍준기',
      groupId: 1,
      userId: 1004,
    },
  ],
  taskLists: [
    {
      displayIndex: 1,
      groupId: 1,
      updatedAt: '2024-09-10T09:45:22.123Z',
      createdAt: '2024-01-16T08:12:10.654Z',
      name: 'Sprint Planning',
      id: 201,
      tasks: [
        'Review backlog',
        'Assign tasks to team members',
        'Set sprint goals',
      ],
    },
    {
      displayIndex: 2,
      groupId: 1,
      updatedAt: '2024-09-11T06:10:30.111Z',
      createdAt: '2024-01-17T11:23:15.321Z',
      name: 'Development',
      id: 202,
      tasks: [
        'Implement authentication feature',
        'Refactor user profile page',
        'Fix bug in payment processing',
      ],
    },
    {
      displayIndex: 3,
      groupId: 1,
      updatedAt: '2024-09-11T07:45:50.987Z',
      createdAt: '2024-02-01T12:55:30.654Z',
      name: 'Code Review',
      id: 203,
      tasks: [
        'Review pull request #135',
        'Merge feature branch',
        'Test on staging',
      ],
    },
  ],
};

export default groupMockData;
