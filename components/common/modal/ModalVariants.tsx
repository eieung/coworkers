import React from 'react';
import InviteMember from './InviteMember';
import useModalStore from '@/store/useModalStore';
import CreateTaskList from './CreateTaskList';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { toast } from 'react-toastify';
import DeleteAccount from '@/components/common/modal/DeleteAccount';
import Logout from '@/components/common/modal/Logout';
import CopyEmail from '@/components/common/modal/CopyEmail';
import CreateTask from '@/components/common/modal/CreateTask';
import ChangePassword from '@/components/common/modal/ChangePassword';
import DatePicker from '@/components/common/modal/DatePicker';
import PasswordReset from '@/components/common/modal/PasswordReset';

export default function ModalVariants() {
  /*  모달 기본 설정 */
  const openModal = useModalStore((state) => state.openModal);

  /* 모달 사용 예시 */

  // 회원 초대하기
  const handleOpenInviteModal = () => {
    openModal((close) => <InviteMember close={close} />); // 각 컴포넌트 별로 전달할 props은 modal 폴더안의 해당 컴포넌트에서 각자 추가하시면 됩니다.
  };

  // 할일 목록 만들기
  const handleOpenCreateListModal = () => {
    openModal((close) => <CreateTaskList close={close} />);
  };

  // 할일 만들기
  const handleOpenCreateTaskModal = () => {
    openModal((close) => <CreateTask close={close} />);
  };

  // 회원 탈퇴하기
  const handleOpenDeleteModal = () => {
    openModal((close) => <DeleteAccount close={close} />);
  };

  // 로그아웃
  const handleOpenLogoutModal = () => {
    openModal((close) => <Logout close={close} />);
  };

  // 이메일 복사하기
  const handleOpenCopyEmailModal = () => {
    openModal((close) => (
      <CopyEmail
        close={close}
        userImage={null}
        userName={'우지은'}
        userEmail="jieunn@codeit.com"
      />
    ));
  }; // 해당 props는 예시라서 CopyEmail 컴포넌트에서 원하시는 걸로 바꾸시면 됩니다

  // 비밀번호 변경하기
  const handleOpenChangePasswordModal = () => {
    openModal((close) => <ChangePassword close={close} />);
  };

  // 비밀번호 변경하기
  const handleOpenPasswordResetModal = () => {
    openModal((close) => <PasswordReset close={close} />);
  };

  // 데이트 피커 예시
  const handleDatePickerModal = () => {
    openModal((close) => <DatePicker close={close} />);
  };

  /* 커스텀 컨펌 모달 사용 예시  */
  const handleOpenConfirmModal = () => {
    openModal((close) => (
      <ConfirmModal
        title="삭제하시겠어요?"
        description={'삭제시 복구가 불가합니다.\n정말 삭제하시겠어요?'} // 생략 가능. 줄바꿈 필요시 꼭 {}안에 \n 포함
        close={close}
        isAlert={true} // true시 경고 icon 표시, 기본적으로 설정 안할시 미표시
        confirmText="삭제하기" // 닫는 버튼 기본 text는 닫기, 설정 필요시 cancelText추가
        onConfirm={() => toast('삭제되었습니다!')} // 컨펌 될시 작동할 함수 추가
        buttonType="danger" // 'solid' | 'danger' 두 종류 버튼 타입이 있고 solid가 기본입니다.
      />
    ));
  };

  return (
    // 버튼과 모달 연동 설정 예시
    <div className="flex-center mt-40 flex flex-col gap-4 text-white">
      <button onClick={handleOpenInviteModal}>회원 초대하기</button>
      <button onClick={handleOpenCreateListModal}>할일 목록 만들기</button>
      <button onClick={handleOpenCreateTaskModal}>할일 만들기</button>
      <button onClick={handleOpenDeleteModal}>회원 탈퇴하기</button>
      <button onClick={handleOpenLogoutModal}>로그아웃</button>
      <button onClick={handleOpenCopyEmailModal}>이메일 복사하기</button>
      <button onClick={handleOpenChangePasswordModal}>비밀번호 변경하기</button>
      <button onClick={handleOpenPasswordResetModal}>비밀번호 재설정</button>
      <button onClick={handleDatePickerModal}>데이트 피커</button>
      <button onClick={handleOpenConfirmModal}>컨펌 모달 예시</button>
    </div>
  );
}
