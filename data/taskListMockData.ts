interface User {
  image: string;
  nickname: string;
  id: number;
}

interface Task {
  doneBy: {
    user: User;
  };
  writer: {
    user: User;
  };
  displayIndex: number;
  commentCount: number;
  description: string;
  doneTasks: number;
  totalTasks: number;
  name: string;
  id: number;
}

interface TaskList {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: Task[];
}

const taskListData: TaskList = {
  displayIndex: 1,
  groupId: 101,
  updatedAt: '2024-09-11T05:54:05.350Z',
  createdAt: '2024-09-10T08:12:10.123Z',
  name: '주간 팀 일정',
  id: 201,
  tasks: [
    {
      doneBy: {
        user: {
          image: 'https://example.com/user-doneby-image.png',
          nickname: '고용빈',
          id: 1001,
        },
      },
      writer: {
        user: {
          image: 'https://example.com/user-writer-image.png',
          nickname: '이대진',
          id: 1002,
        },
      },
      displayIndex: 1,
      commentCount: 5,
      description: '페이지 퍼블리싱 작업, 공통 컴포넌트 리팩토링',
      doneTasks: 3,
      totalTasks: 5,
      name: '페이지 퍼블리싱 작업 후, 공통 컴포넌트 리팩토링',
      id: 501,
    },
    {
      doneBy: {
        user: {
          image: 'https://example.com/user-doneby-image2.png',
          nickname: '서미영',
          id: 1003,
        },
      },
      writer: {
        user: {
          image: 'https://example.com/user-writer-image2.png',
          nickname: '홍준기',
          id: 1004,
        },
      },
      displayIndex: 2,
      commentCount: 8,
      description: '유저 기능 개발',
      doneTasks: 3,
      totalTasks: 4,
      name: '유저 기능 개발 및 OAuth 개발 (소셜 로그인)',
      id: 502,
    },
    {
      doneBy: {
        user: {
          image: 'https://example.com/user-doneby-image2.png',
          nickname: '서미영',
          id: 1003,
        },
      },
      writer: {
        user: {
          image: 'https://example.com/user-writer-image2.png',
          nickname: '홍준기',
          id: 1004,
        },
      },
      displayIndex: 3,
      commentCount: 8,
      description: '테스트 코드',
      doneTasks: 4,
      totalTasks: 4,
      name: '테스트 코드 작성',
      id: 502,
    },
    {
      doneBy: {
        user: {
          image: 'https://example.com/user-doneby-image.png',
          nickname: '고용빈',
          id: 1001,
        },
      },
      writer: {
        user: {
          image: 'https://example.com/user-writer-image.png',
          nickname: '이대진',
          id: 1002,
        },
      },
      displayIndex: 4,
      commentCount: 5,
      description: '페이지 퍼블리싱 작업, 공통 컴포넌트 리팩토링',
      doneTasks: 3,
      totalTasks: 5,
      name: '페이지 퍼블리싱 작업 후, 공통 컴포넌트 리팩토링',
      id: 501,
    },
    {
      doneBy: {
        user: {
          image: 'https://example.com/user-doneby-image2.png',
          nickname: '서미영',
          id: 1003,
        },
      },
      writer: {
        user: {
          image: 'https://example.com/user-writer-image2.png',
          nickname: '홍준기',
          id: 1004,
        },
      },
      displayIndex: 5,
      commentCount: 8,
      description: '유저 기능 개발',
      doneTasks: 3,
      totalTasks: 4,
      name: '유저 기능 개발 및 OAuth 개발 (소셜 로그인)',
      id: 502,
    },
    {
      doneBy: {
        user: {
          image: 'https://example.com/user-doneby-image2.png',
          nickname: '서미영',
          id: 1003,
        },
      },
      writer: {
        user: {
          image: 'https://example.com/user-writer-image2.png',
          nickname: '홍준기',
          id: 1004,
        },
      },
      displayIndex: 6,
      commentCount: 8,
      description: '테스트 코드',
      doneTasks: 4,
      totalTasks: 4,
      name: '테스트 코드 작성',
      id: 502,
    },
  ],
};

export default taskListData;
