import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import clsx from 'clsx';
import addImg from '@/assets/image/icon/image-no-line.svg';
import eidtImg from '@/assets/image/icon/btn_edit.svg';
import closeImg from '@/assets/image/icon/x.svg';
import Image from 'next/image';
import FileInput from '@/components/common/FileInput';
import { useState, useEffect } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const DEFAULT_IMAGE_URL =
  'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/537/image2.svg';

interface FormData {
  nameValue: string;
}

interface TeamFormProps {
  close: () => void;
  name?: string;
  image?: string | null;
  isEditMode?: boolean;
}

export default function TeamForm({
  close,
  name,
  image,
  isEditMode = false,
}: TeamFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      nameValue: isEditMode ? name : '',
    },
  });

  const [fileValue, setFileValue] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(image || addImg.src);

  useEffect(() => {
    if (fileValue) {
      const newPreview = URL.createObjectURL(fileValue);
      setPreview(newPreview);
      return () => URL.revokeObjectURL(newPreview);
    } else {
      setPreview(image || addImg.src);
    }
  }, [fileValue, image]);

  const onSubmit = ({ nameValue }: FormData) => {
    const trimmedNameValue = nameValue.trim();
    const updatedImage = fileValue ? fileValue : image || DEFAULT_IMAGE_URL;

    const updatedData = {
      name: trimmedNameValue,
      image: updatedImage,
    };

    // 서버에 데이터 전송 로직 추가 필요

    toast(
      isEditMode
        ? `${trimmedNameValue} 수정되었습니다!`
        : `${trimmedNameValue} 생성되었습니다!`,
    );

    close();
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('이미지 크기는 5MB 이하로 설정해주세요.');
        return;
      }

      // 서버에 이미지 업로드 로직 필요. 업로드 된 이미지 주소를 setFileValue에 할당

      setFileValue(file);
    } else {
      setFileValue(null);
    }
  };

  const { inputs, buttons } = ModalUserActions[ACTION_TYPE.EDITE_TEAM];

  return (
    <Modal
      onClose={close}
      title={isEditMode ? '팀 수정하기' : '팀 생성하기'}
      showCloseIcon={true}
      className="max-w-[430px] p-[16px_16px_45px] sm:max-w-[430px]"
      childrenClassName="w-[355px]"
      titleClassName="font-regular-20"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <label className="font-medium-16 mb-3 inline-block text-text-primary">
          팀 프로필
        </label>
        <FileInput
          name="profileImage"
          value={fileValue}
          onChange={handleFileChange}
        >
          {({ handleClearClick }) => (
            <div className="relative flex h-[130px] w-[130px] items-center justify-center rounded-xl border-4 border-bd-primary hover:border-text-primary hover:shadow-xl">
              <img
                className="h-full w-full rounded-xl object-cover"
                src={preview}
                alt="팀 프로필 이미지"
              />
              {fileValue && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearClick();
                  }}
                  className="absolute right-0 top-0 h-6 w-6 rounded-full bg-bg-primary p-1 text-white"
                >
                  <img
                    className="h-full w-full rounded-xl object-cover"
                    src={closeImg.src}
                    alt="이미지 삭제"
                  />
                </button>
              )}
              <Image
                className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
                src={eidtImg.src}
                alt="연필 이미지"
                width={30}
                height={30}
              />
            </div>
          )}
        </FileInput>
        <div className="mt-6 flex flex-col">
          {inputs?.[0] && (
            <Controller
              name="nameValue"
              control={control}
              rules={{ required: inputs[0].placeholder }}
              render={({ field }) => (
                <Input
                  {...inputs[0]}
                  {...field}
                  className={clsx('w-full border')}
                  invalid={!!errors.nameValue}
                  validationMessage={errors.nameValue?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          )}
        </div>
        {buttons && (
          <Button
            className="mt-10"
            type="submit"
            {...buttons[0]}
            disabled={!isValid}
          >
            {isEditMode ? '수정하기' : '생성하기'}
          </Button>
        )}
        <p className="font-regular-16 mt-6 text-text-primary">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </form>
    </Modal>
  );
}
