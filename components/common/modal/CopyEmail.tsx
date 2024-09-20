import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Button from '@/components/common/button';
import Image from 'next/image';
import clsx from 'clsx';
import defaultUserImg from '@/assets/image/icon/member.svg';

interface CopyEmailProps {
  close: () => void;
  userImage: string | null;
  userName: string;
  userEmail: string;
} // api 객체 원하시는 걸로 props 변경하시면 됩니다

export default function CopyEmail({
  close,
  userImage,
  userName,
  userEmail,
}: CopyEmailProps) {
  const { title, description, buttons } =
    ModalUserActions[ACTION_TYPE.COPY_EMAIL];

  const userImageContainer = userImage || defaultUserImg;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast('이메일이 클립보드에 복사되었습니다!');
      close();
    } catch (error) {
      toast.error('이메일 복사에 실패했습니다.');
    }
  };

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={true}
      description={description}
      className="max-w-[375px] sm:max-w-[344px]"
    >
      <div className="flex-center flex-col">
        <div
          className={clsx(
            'rounded-full border-[1.28px] border-solid border-bd-primary',
            'flex-center h-[52px] w-[52px] bg-bg-tertiary',
          )}
        >
          <Image
            className="rounded-full"
            src={userImageContainer}
            alt="유저 이미지"
            width={40}
            height={40}
          />
        </div>
        <h1 className="font-medium-14 mt-6">{userName}</h1>
        <span className="font-regular-12 mt-2 text-text-secondary">
          {userEmail}
        </span>
        <div className="mt-6 w-full">
          {buttons && (
            <Button
              {...buttons[0]}
              onClick={() => {
                copyToClipboard(userEmail);
              }}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
