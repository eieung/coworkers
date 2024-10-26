# **코드잇 스프린트 7기 심화프로젝트**

## Coworkers
![image](https://github.com/user-attachments/assets/6b697813-f0ee-46d2-af07-f30813b0194e)

팀을 생성하고 팀원을 구성하여 공통의 할 일을 만들어서 업무의 효율을 높이는 프로젝트입니다. <br />또한 누구나 자유롭게 의견을 나눌 수 있는 자유게시판 기능도 제공합니다.

### 🗓️ 개발 기간
2024.09.02 ~ 2024.10.10

### 👨‍👩‍👧‍👦 팀원 구성
| 홍준기   | 고용빈   | 서미영  | 이대진   |
|---------|---------|---------|---------|
| [@Oh_hong](https://github.com/Oh-hong)   | [@yongb2n](https://github.com/yongb2n)   | [@myong39](https://github.com/myong39)   | [@LDJ](https://github.com/daejin5602)   |

### 🌎 배포 링크
## [Coworkers](https://coworkers-gamma.vercel.app/)

<br>
<br>
<br>
<br>
<br>

## 🧑‍💻👩‍💻 개발 환경
-----
### 🔨 기술 스택
<img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" alt="TypeScript" height="30"> <img src="https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge" alt="Tailwind CSS" height="30"> <img src="https://img.shields.io/badge/-Next.js-000000?logo=next.js&logoColor=white&style=for-the-badge" alt="Next.js" height="30">


### 💬 협업 툴
![Discord](https://img.shields.io/badge/-Discord-5865F2?logo=discord&logoColor=white&style=for-the-badge)  공지 사항, 오늘의 할 일, 회의, 소통 목적으로 사용




<br>
<br>
<br>
<br>
<br>


## 🪜 프로젝트 구조
-----
```
.
├── README.md
├── assets
│   └── image
├── components
│   ├── auth
│   ├── boards
│   ├── common
│   ├── tasks
│   └── team
├── constants
│   ├── baseUrl.ts
│   ├── modal.ts
│   └── toast.ts
├── hooks
│   ├── useClickOutside.ts
│   ├── useMypage.ts
│   ├── useNotificationAPI.ts
│   └── useValidation.ts
├── models
│   └── Notification.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── pages
│   ├── 404
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── addboard
│   ├── api
│   ├── auth
│   ├── boards
│   ├── get-started-team
│   ├── groups
│   ├── history
│   ├── index.tsx
│   ├── login.tsx
│   ├── mypage
│   ├── reset-password.tsx
│   └── signup.tsx
├── postcss.config.mjs
├── public
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
├── pull_request_template.md
├── queries
│   ├── article
│   ├── config.ts
│   ├── group
│   ├── history
│   ├── image
│   ├── task-list
│   ├── tasks
│   └── user
├── services
│   ├── article
│   ├── axios.ts
│   ├── database
│   ├── history
│   ├── postMypage.ts
│   ├── schemas
│   ├── socialLogin
│   └── task
├── store
│   ├── authStore.tsx
│   ├── useGroupStore.ts
│   └── useModalStore.ts
├── styles
│   ├── animation.css
│   └── globals.css
├── tailwind.config.ts
├── tsconfig.json
├── types
│   ├── group.ts
│   ├── task.ts
│   ├── taskList.ts
│   ├── user.ts
│   └── wow.js.d.ts
└── utils
    ├── auth.ts
    └── common.ts

```
<br>
<br>
<br>
<br>
<br>

## 🗒️ 페이지별 기능 및 설명
-----
### 로그인 & 회원가입
로그인|회원가입
|----|----|
|<img width="200" height="300" alt="스크린샷 2024-10-26 오후 5 51 30" src="https://github.com/user-attachments/assets/3024533c-108a-4aae-b8d0-0cfde49ff5ff">|<img width="200" height="300" alt="스크린샷 2024-10-26 오후 5 52 55" src="https://github.com/user-attachments/assets/f851943c-f65b-4421-bb8b-ac169431db80">|
- Zustand를 사용해 유저 정보를 저장했습니다.
- useValidation.ts 훅을 이용해 로그인 및 회원가입 유효성 검사를 수행하였고, 이를 사용자에게 즉각 나타내도록 하였습니다. 또한, 사용자가 입력한 데이터를 보냈을 때 서버에서 반환되는 에러메세지(중복된 이메일, 비밀번호 불일치 등)도 같이 표현하도록 설계했습니다.

### 그룹 페이지
관리자|멤버
----|----
<img width="450" alt="스크린샷 2024-10-26 오후 6 24 18" src="https://github.com/user-attachments/assets/6eba9dfd-f8ce-4656-bb0d-cefcc54733d3">|<img width="450" alt="스크린샷 2024-10-26 오후 6 25 07" src="https://github.com/user-attachments/assets/9357108b-8cb6-4291-b5a1-5df13c28957a">
공지 수정,삭제 가능</br>톱니바퀴 버튼을 통해 팀 삭제 및 팀 이름 수정 가능|공지 확인만 가능</br>톱니바퀴 버튼을 통해 팀 탈퇴 가능
- 모든 일정에 대한 상황을 그룹 페이지에서 확인 가능합니다.
- 그룹에 존재하는 팀원 리스트를 볼 수 있으며, 관리자인 경우 멤버 추방 및 초대가 가능합니다.
- 그룹 페이지에서 일정을 추가할 수 있습니다.

### 리스트 페이지 및 상세 정보
리스트 페이지 및 상세 정보|할 일 생성하기
----|----
![2024-10-266 58 05-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/fb253b62-e01c-4c41-bb97-f91355fac13a)|![2024-10-267 32 33-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/4da4d713-419d-493e-be9c-9840285b3ee8)
• 기본적으로 할 일들이 나와있고, 체크박스 클리을 통해 일정 완료 여부를 조정할 수 있습니다.<br>• 드래그앤 드롭 기능을 통하여 완료된 일들을 아래로 배치할 수 있게 구현했습니다.|• 할 일 추가 버튼을 클릭시, '할 일 만들기' 모달이 등장합니다.<br>• 데이터를 입력할 수 있고, 반복 주기를 설정할 수 있습니다.(한 번, 매일, 특정 요일 반복, 특정 날짜 월 반복)





