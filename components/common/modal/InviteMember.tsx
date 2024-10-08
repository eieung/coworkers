import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Button from '@/components/common/button';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import clsx from 'clsx';
import {
  useInvitationQuery,
  useInviteMemberMutation,
} from '@/queries/group/invitation';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface InviteMemberProps {
  close: () => void;
  groupId: string;
}

interface FormData {
  email: string;
}

export default function InviteMember({ close, groupId }: InviteMemberProps) {
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

  const { data: invitationData, isLoading: isInvitationLoading } =
    useInvitationQuery(groupId);

  // loading 처리 시 이상함
  const { mutate: inviteMember } = useInviteMemberMutation(groupId);

  const handleInviteCodeCopyButtonClick = async (index: number) => {
    if (index === 0) {
      if (isInvitationLoading) {
        toast.info('초대 코드를 생성 중입니다...');
        return;
      }
      const invitationToken = invitationData?.data;
      if (invitationToken) {
        await navigator.clipboard.writeText(invitationToken);
        toast.success('초대 코드가 복사되었습니다!');
      } else {
        toast.error('초대 코드를 가져오는 데 실패했습니다.');
      }
      close();
    }
  };

  const onIviteSubmit = ({ email }: FormData) => {
    inviteMember(email, {
      onSuccess: () => {
        toast.success('멤버가 성공적으로 초대되었습니다!');
        close();
      },
      onError: (error: any) => {
        if (
          error.response?.data?.message === '이미 그룹에 소속된 유저입니다.'
        ) {
          toast.error('이미 그룹에 소속된 유저입니다.');
        } else if (
          error.response?.data?.message === '가입한 유저가 아닙니다.'
        ) {
          toast.error('가입한 유저가 아닙니다.');
        } else {
          toast.error('멤버 초대에 실패했습니다. 다시 시도해주세요.');
        }
      },
    });
  };

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={true}
      description={description}
      childrenClassName="w-[350px]"
    >
      <form onSubmit={handleSubmit(onIviteSubmit)}>
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
              onClick={() => handleInviteCodeCopyButtonClick(index)}
            />
          ))}
        </div>
      </form>
    </Modal>
  );
}
