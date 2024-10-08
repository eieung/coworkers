import React from 'react';
import secession from '@/assets/image/icon/secession.svg';
import Image from 'next/image';
import member from '@/assets/image/icon/member.svg'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { toast } from 'react-toastify';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import ChangePassword from '@/components/common/modal/ChangePassword'; // ChangePassword 컴포넌트 import


//export default function SettingsPage() {
  const DeleteAccountButton = () => {
 // const SettingsPage = () => {
    const fileInputRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(member); // 초기 이미지를 member로 설정
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false); // 비밀번호 변경 모달 열림 상태
  
  
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
      <h1 className="font-bold-24 text-text-primary mb-6">계정 설정</h1>
      
      <Image
        src={imageSrc} // 현재 이미지를 src로 설정
        alt="member"
        width={64}
        height={64}
        className="cursor-pointer" 
        onClick={handleClick}// 클릭 가능하도록 스타일 추가
      />
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} // ref 연결
        style={{ display: 'none' }} // 숨기기
        onChange={handleChange} // 파일 변경 시 호출
      />

      {/* 계정 정보 입력 */}
      <div className="space-y-6">
        <div>
          <label className="block text-text-primary mb-3">이름</label>
          <input
            type="text"
            placeholder="우지은"
            className="w-full bg-bg-secondary text-white p-4 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-text-primary mb-3">이메일</label>
          <input
            type="email"
            placeholder="codeit@codeit.com"
            className="w-full placeholder:text-text-secondary text-white bg-bg-secondary p-4 rounded-lg"
          />
        </div>

        <div className="relative">
          <label className="block text-text-primary mb-1">비밀번호</label>
          <input
            type="password"
            placeholder="********"
            className="w-full placeholder:text-text-secondary text-white bg-bg-secondary p-4 rounded-lg pr-[120px]" />
            <button
            className="absolute right-2 top-9 bg-brand-primary text-white py-2 px-4 rounded-lg"
            onClick={handleOpenChangePasswordModal}>
            변경하기
          </button>
           {/* 회원 탈퇴 버튼 */}
           <button className="mt-4 text-red-500 p-4 rounded-md flex items-center" onClick={handleOpenModal}>
            {/* SVG 이미지 추가 */}
        <Image
          src={secession} // 추가한 SVG 이미지 경로
          alt="회원 탈퇴"
          width={24}  // 이미지의 너비 설정
          height={24}  // 이미지의 높이 설정
        />
        회원 탈퇴하기
      </button>
      
      {isModalOpen && (
         <DeleteAccount close={handleCloseModal} />
      )}
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
  const { title, description, buttons } = ModalUserActions[ACTION_TYPE.DELETE_ACCOUNT];

  return (
    <ConfirmModal
      title={title}
      description={description}
      close={close}
      isAlert={true}
      confirmText={buttons[1].children}
      buttonType="danger"
      onConfirm={() => {
        toast('탈퇴되었습니다!');
        close();
      }}
    />
  );
};

export default DeleteAccountButton;