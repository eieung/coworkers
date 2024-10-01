import React from 'react';
import secession from '@/assets/image/icon/secession.svg';
import Image from 'next/image';
import member from '@/assets/image/icon/member.svg'

export default function SettingsPage() {
  return (
    <div className="m-auto max-w-[792px] px-4 py-6">
      <h1 className="font-bold-24 text-text-primary mb-6">계정 설정</h1>
      
      {/* 프로필 이미지 */}
      <div className="mb-6 flex items-center">
       <Image
        src={member} alt="member" width={64} height={64} />
      </div>

      {/* 계정 정보 입력 */}
      <div className="space-y-6">
        <div>
          <label className="block text-text-primary mb-3">이름</label>
          <input
            type="text"
            value="우지은"
            className="w-full bg-bg-secondary text-white p-4 rounded-lg"
            readOnly
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
            className="w-full placeholder:text-text-secondary text-white bg-bg-secondary p-4 rounded-lg pr-[120px]"  // 오른쪽에 버튼 공간을 확보
          />
          <button
            className="absolute right-2 top-9 bg-brand-primary text-white py-2 px-4 rounded-lg"
            onClick={() => alert('비밀번호 변경')}
          >
            변경하기
          </button>
           {/* 회원 탈퇴 버튼 */}
           <button className="mt-4 text-red-500 p-4 rounded-md flex items-center">
            {/* SVG 이미지 추가 */}
        <Image
          src={secession} // 추가한 SVG 이미지 경로
          alt="회원 탈퇴"
          width={24}  // 이미지의 너비 설정
          height={24}  // 이미지의 높이 설정
        />
        회원 탈퇴하기
      </button>
        </div>
      </div>

     
    </div>
  );
}