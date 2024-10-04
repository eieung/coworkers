import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Button from '@/components/common/button';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import clsx from 'clsx';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface InviteMemberProps {
  close: () => void;
}

interface FormData {
  email: string;
}

export default function InviteMember({ close }: InviteMemberProps) {
  const { title, description, buttons } =
    ModalUserActions[ACTION_TYPE.INVITE_MEMBER];

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  // 링크 버튼 클릭시 처리
  const handleButtonClick = (index: number) => {
    if (index === 0) {
      toast.success('링크가 복사되었습니다!');
      close();
    }
  };

  // 초대 버튼 클릭시 처리
  const onSubmit = ({ email }: FormData) => {
    toast.success(`${email} 링크가 복사되었습니다!`);
    close();
  };

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={true}
      description={description}
      childrenClassName="w-[350px]"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col">
          <Controller
            name="email"
            control={control}
            rules={{
              required: '이메일을 입력해주세요.',
              validate: {
                email: (value) =>
                  emailPattern.test(value) ||
                  '유효한 이메일 주소를 입력해주세요.',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="이메일"
                placeholder="이메일을 입력하세요"
                className={clsx('h-12 w-full')}
                invalid={!!errors.email}
                validationMessage={errors.email?.message}
                onBlur={(e) => {
                  field.onChange(e.target.value.trim());
                }}
              />
            )}
          />
        </div>
        <div className="flex-center mt-6 flex gap-2">
          {buttons?.map((button, index) => (
            <Button
              className="whitespace-nowrap"
              key={index}
              {...button}
              onClick={() => handleButtonClick(index)}
            />
          ))}
        </div>
      </form>
    </Modal>
  );
}
