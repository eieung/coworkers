import React from 'react';
import secession from '@/assets/image/icon/secession.svg';
import Image from 'next/image';
import member123 from '@/assets/image/icon/member.svg';
import { Member } from '@/types/group';
import { member } from '@/types/group';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useUserStore } from '@/store/authStore';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { toast } from 'react-toastify';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import ChangePassword from '@/components/common/modal/ChangePassword'; // ChangePassword 컴포넌트 import
import { useValidation } from '@/hooks/useValidation';
import { publicAxiosInstance } from '@/services/axios';
/*export const usePasswordState = () => {
  const [password, setPassword] = useState(''); 
  return { password, setPassword };
}*/

const DeleteAccountButton = () => {
  //export default function SettingsPage() {
  // const SettingsPage = () => {
  const router = useRouter();
  const { password, confirmPassword } = useValidation(); // password관리 --> api경로&prop객체내용 들어감!
  const { user } = useUserStore();

  /*password.isValid &&
     confirmPassword.isValid &&
     password.value !== '' &&
     confirmPassword.value !== '';*/

  //const [password, setPassword] = useState('');
  // const [isPasswordValid, setIsPasswordValid] = useState(true);
  //const [password, setPassword] = useState(''); // password관리 --> 아직 api경로&prop객체는 안들어감!
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(member123); // 초기 이미지를 member로 설정 --> 이부분은 api경로가 필요없을꺼 같아서 안넣었습니다!
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [name, setName] = useState(user ? user.nickname : ''); // 이게 api경로로 가져온값입니다!!
  const [email, setEmail] = useState(user ? user.email : ''); // 이게 api경로로 가져온값입니다!!
  const [password123, setPassword] = useState(user ? user.password : ''); // 이게 api경로로 가져온값입니다!!
  const [confirmPassword123, setConfirmPassword] = useState(confirmPassword); // 이게 api경로로 가져온값입니다!!
  /* useEffect(() => {
      if (router.query.password) {
        setPassword(router.query.password as string); // 쿼리에서 password 값을 가져와 상태 업데이트
      }
    }, [router.query.password]); // password 쿼리 값이 변경될 때마다 실행
    */

  const handleNameChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);

    console.log('계정설정페이지 생성 요청되었습니다.');
  };

  const handleClick = () => {
    fileInputRef.current.click(); // 파일 선택 대화상자 열기
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // 이미지 미리보기
      };
      reader.readAsDataURL(file);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  return (
    <div className="m-auto max-w-[792px] px-4 py-6">
      <h1 className="font-bold-24 mb-6 text-text-primary">계정 설정</h1>

      <Image
        src={imageSrc} // 현재 이미지를 src로 설정
        alt="member"
        width={64}
        height={64}
        className="cursor-pointer"
        onClick={handleClick} // 클릭 가능하도록 스타일 추가
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef} // ref 연결
        style={{ display: 'none' }} // 숨기기
        onChange={handleChange} // 파일 변경 시 호출
      />
      <br />

      {/* 계정 정보 입력 */}
      <div className="space-y-6">
        <div>
          <label className="mb-3 block text-text-primary">이름</label>
          <input
            type="text"
            name="name"
            className="w-full rounded-lg bg-bg-secondary p-4 text-white"
            onChange={handleNameChange}
            value={user?.nickname}
          />
        </div>

        <div>
          <label className="mb-3 block text-text-primary">이메일</label>
          <input
            type="email"
            name="email"
            className="w-full rounded-lg bg-bg-secondary p-4 text-white placeholder:text-text-secondary"
            onChange={handleNameChange}
            value={user?.email}
          />
        </div>

        <div className="relative">
          <label className="mb-1 block text-text-primary">비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="w-full rounded-lg bg-bg-secondary p-4 pr-[120px] text-white placeholder:text-text-secondary"
            onChange={handleNameChange}
            value={user?.password}
          />
          <button
            className="absolute right-2 top-9 rounded-lg bg-brand-primary px-4 py-2 text-white"
            onClick={handleOpenChangePasswordModal}
          >
            변경하기
          </button>
          {/* 회원 탈퇴 버튼 */}
          <button
            className="mt-4 flex items-center rounded-md p-4 text-red-500"
            onClick={handleOpenModal}
          >
            {/* SVG 이미지 추가 */}
            <Image
              src={secession} // 추가한 SVG 이미지 경로
              alt="회원 탈퇴"
              width={24} // 이미지의 너비 설정
              height={24} // 이미지의 높이 설정
            />
            회원 탈퇴하기
          </button>

          {isModalOpen && <DeleteAccount close={handleCloseModal} />}
          {isChangePasswordModalOpen && (
            <ChangePassword close={handleCloseChangePasswordModal} /> // ChangePassword 모달 호출
          )}
        </div>
      </div>
    </div>
  );
};
//export default SettingsPage;

interface DeleteAccountProps {
  close: () => void;
}

const DeleteAccount = ({ close }: DeleteAccountProps) => {
  const { title, description, buttons } =
    ModalUserActions[ACTION_TYPE.DELETE_ACCOUNT];

  const handleDelete = async () => {
    //const response = await publicAxiosInstance.delete('/user/delete', { data: { name } }); // DELETE 메서드로 변경

    /*if (response.status === 200) {
      toast('탈퇴되었습니다!');
      close();
    } else {
      //toast.error('탈퇴 실패. 다시 시도해 주세요.');
      toast('탈퇴되었습니다!');
      close();
    }*/
    toast('탈퇴되었습니다!');
    close();
  };

  return (
    <ConfirmModal
      title={title}
      description={description}
      close={close}
      isAlert={true}
      confirmText={buttons[1].children}
      buttonType="danger"
      onConfirm={handleDelete}
    />
  );
};

export default DeleteAccountButton;
