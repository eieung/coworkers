import { ButtonProps } from '@/components/common/button';

export interface InputField {
  name?: string;
  height?: string;
  type?: string;
  label?: string;
  placeholder?: string;
}

export interface Action {
  title: string;
  description?: string;
  buttons?: ButtonProps[];
  inputs?: InputField[];
}

export enum ACTION_TYPE {
  INVITE_MEMBER = 1,
  CREATE_TASK_LIST,
  CREATE_TASK,
  COPY_EMAIL,
  RESET_PASSWORD,
  DELETE_ACCOUNT,
  LOGOUT,
  CHANGE_PASSWORD,
  DATE_PICKER,
  PASSWORD_RESET,
  EDIT_TEAM,
}

const DEFAULT_BUTTON_FONT = 'font-medium-16';

export const ModalUserActions: Record<ACTION_TYPE, Action> = {
  [ACTION_TYPE.INVITE_MEMBER]: {
    title: '멤버 초대',
    description: '그룹에 참여할 수 있는 링크를 복사하고 초대합니다.',
    buttons: [
      {
        type: 'button',
        children: '초대 링크 복사하기',
        appearance: 'outlined',
        size: 'floating-large',
        disabled: false,
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
      {
        type: 'submit',
        children: '초대하기',
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
  },
  [ACTION_TYPE.CREATE_TASK_LIST]: {
    title: '할 일 목록',
    buttons: [
      {
        children: '만들기',
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
    inputs: [
      {
        name: 'title',
        height: 'h-12',
        type: 'text',
        placeholder: '목록 명을 입력해주세요.',
      },
    ],
  },
  [ACTION_TYPE.CREATE_TASK]: {
    title: '할 일 만들기',
    description:
      '할 일은 실제로 행동 가능한 작업 중심으로\n작성해주시면 좋습니다.',
    buttons: [
      {
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        children: '만들기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
    inputs: [
      {
        name: 'title',
        height: 'h-12',
        label: '할 일 제목',
        placeholder: '할 일 제목을 입력해주세요.',
      },
      {
        name: 'memo',
        height: 'h-[75px]',
        label: '할 일 메모',
        placeholder: '메모를 입력해주세요.',
      },
    ],
  },
  [ACTION_TYPE.COPY_EMAIL]: {
    title: '',
    buttons: [
      {
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        children: '이메일 복사하기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
  },
  [ACTION_TYPE.RESET_PASSWORD]: {
    title: '비밀번호 재설정',
    description: '비밀번호 재설정 링크를 보내드립니다.',
    inputs: [
      {
        placeholder: '이메일을 입력하세요.',
      },
    ],
    buttons: [
      {
        appearance: 'outlined',
        size: 'floating-large',
        disabled: false,
        children: '닫기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
      {
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        children: '링크 보내기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
  },
  [ACTION_TYPE.DELETE_ACCOUNT]: {
    title: '회원 탈퇴를 진행하시겠어요?',
    description:
      '그룹장으로 있는 그룹은 자동으로 삭제되고,\n모든 그룹에서 나가집니다.',
    buttons: [
      {
        appearance: 'outlined',
        size: 'floating-large',
        disabled: false,
        children: '닫기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
      {
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        children: '회원 탈퇴',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
  },
  [ACTION_TYPE.LOGOUT]: {
    title: '로그아웃 하시겠어요?',
    buttons: [
      {
        appearance: 'outlined',
        size: 'floating-large',
        disabled: false,
        children: '닫기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
      {
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        children: '로그아웃',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
  },
  [ACTION_TYPE.CHANGE_PASSWORD]: {
    title: '비밀번호 변경하기',
    inputs: [
      {
        name: 'password',
        height: 'h-12',
        label: '새 비밀번호',
        placeholder: '새 비밀번호를 입력해주세요.',
      },
      {
        name: 'passwordConfirmation',
        height: 'h-12',
        label: '새 비밀번호 확인',
        placeholder: '새 비밀번호를 다시 한 번 입력해주세요.',
      },
    ],
    buttons: [
      {
        appearance: 'outlined',
        size: 'floating-large',
        disabled: false,
        children: '닫기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
      {
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        children: '변경하기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
  },
  [ACTION_TYPE.DATE_PICKER]: {
    title: '할 일 만들기',
    description:
      '할 일은 실제로 행동 가능한 작업 중심으로\n작성해주시면 좋습니다.',
    buttons: [
      {
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        children: '만들기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
    inputs: [
      {
        name: 'title',
        height: 'h-12',
        label: '할 일 제목',
        placeholder: '할 일 제목을 입력해주세요.',
      },
      {
        name: 'date',
        height: 'h-12',
        label: '시작 날짜',
      },
      {
        name: 'time',
        height: 'h-12',
      },
      {
        name: 'repeat',
        height: 'h-11',
        label: '반복 설정',
      },
      {
        name: 'memo',
        height: 'h-[75px]',
        label: '할 일 메모',
        placeholder: '메모를 입력해주세요.',
      },
    ],
  },
  [ACTION_TYPE.PASSWORD_RESET]: {
    title: '비밀번호 재설정',
    description: '비밀번호 재설정 링크를 보내드립니다.',
    inputs: [
      {
        name: 'email',
        height: 'h-12',
        placeholder: '이메일을 입력하세요.',
      },
    ],
    buttons: [
      {
        appearance: 'outlined',
        size: 'floating-large',
        disabled: false,
        children: '닫기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
      {
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        children: '링크 보내기',
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
  },
  [ACTION_TYPE.EDIT_TEAM]: {
    title: '팀 수정하기',
    buttons: [
      {
        children: '수정하기',
        appearance: 'solid',
        size: 'floating-large',
        disabled: false,
        font: DEFAULT_BUTTON_FONT,
        fullWidth: true,
      },
    ],
    inputs: [
      {
        name: 'name',
        height: 'h-12',
        type: 'text',
        label: '팀 이름',
        placeholder: '팀 이름을 입력해주세요.',
      },
    ],
  },
};

export type ModalUserActionsType = typeof ModalUserActions;
