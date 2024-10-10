import React, { useEffect, useRef, useState } from 'react';
import secession from '@/assets/image/icon/secession.svg';
import Image from 'next/image';
import member123 from '@/assets/image/icon/member.svg';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/authStore';
import ChangePassword from '@/components/common/modal/ChangePassword';
import useModalStore from '@/store/useModalStore';
import DeleteAccount from '@/components/common/modal/DeleteAccount';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';

import axios from 'axios';
import { useUploadImageMutation } from '@/queries/image/upload-images';
import {
  useAuthQuery,
  useDeleteUserMutation,
  useEditUsersMutation,
} from '@/queries/user';

interface FormData {
  name: string;
}

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const DeleteAccountButton = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(user?.image || '');
  const [imageUrl, setImageURL] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');
  const { logout } = useAuthQuery();

  const openModal = useModalStore((state) => state.openModal);
  console.log(imageSrc);
  const uploadImageMutation = useUploadImageMutation();
  const editUserMutation = useEditUsersMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: user?.nickname || '',
    },
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.nickname || '');
      setImageSrc(user?.image ?? member123.src);
    }
  }, [user, setValue]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };

      uploadImageMutation.mutate(file, {
        onSuccess: (response) => {
          const uploadedImageUrl = response.data.url;
          setImageURL(uploadedImageUrl);
        },
      });

      reader.readAsDataURL(file);
    }
  };

  const handleOpenDeleteModal = () => {
    openModal((close) => (
      <DeleteAccount
        close={close}
        onAction={() => {
          deleteUserMutation.mutate(undefined, {
            onSuccess: () => {
              localStorage.removeItem('user-storage');
              logout();
              close();
              router.push('/');
            },
          });
        }}
      />
    ));
  };

  const handleOpenChangePasswordModal = () => {
    openModal((close) => <ChangePassword close={close} />);
  };

  const onSubmit = ({ name }: FormData) => {
    const userData = {
      ...(user?.nickname !== name && { nickname: name }),
      ...(imageUrl && { image: imageUrl }),
    };

    editUserMutation.mutate(
      { userData },
      {
        onSuccess: () => {
          if (user) {
            const updatedUser = {
              ...user,
              nickname: name,
              ...(imageUrl && { image: imageUrl }),
            };
            setUser(updatedUser);
          }
        },
      },
    );
  };

  return (
    <div className="m-auto max-w-[792px] px-4 py-6">
      <h1 className="font-bold-24 mb-6 text-text-primary">계정 설정</h1>

      {/* 이미지 업로드 */}
      {user && (
        <img
          src={imageSrc}
          alt="member"
          className="h-16 w-16 cursor-pointer rounded-full object-cover"
          onClick={handleFileClick}
        />
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        {/* 이름 입력 */}
        <div className="flex flex-col">
          <label className="mb-3 block text-text-primary">이름</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: '이름을 입력해주세요.' }}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full text-white"
                invalid={!!errors.name}
                validationMessage={errors.name?.message}
              />
            )}
          />
        </div>

        {/* 이메일 입력 */}
        <div className="flex flex-col">
          <label className="mb-3 block text-text-primary">이메일</label>

          <Input
            type="email"
            className="w-full cursor-default"
            value={user?.email || ''}
            readOnly
          />
        </div>

        {/* 비밀번호 변경 버튼 */}
        <div>
          <label className="mb-1 block text-text-primary">비밀번호</label>
          <div className="relative flex flex-col">
            <Input
              value="********"
              type="password"
              className="w-full cursor-default"
              placeholder="********"
              readOnly
            />
            <Button
              type="button"
              className="absolute right-4 top-1/2 h-10 -translate-y-1/2"
              onClick={handleOpenChangePasswordModal}
            >
              변경하기
            </Button>
          </div>
        </div>

        {/* 저장 버튼 */}
        <Button type="submit" className="mt-6 w-full">
          저장하기
        </Button>

        {/* 회원 탈퇴 버튼 */}
        <button
          type="button"
          className="mt-4 flex items-center rounded-md p-4 text-red-500"
          onClick={handleOpenDeleteModal}
        >
          <Image src={secession} alt="회원 탈퇴" width={24} height={24} />
          회원 탈퇴하기
        </button>
      </form>
    </div>
  );
};

export default DeleteAccountButton;
