import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Button from '@/components/common/button';
import clsx from 'clsx';

interface CopyEmailProps {
  close: () => void;
  userImage: string | null;
  userName: string;
  userEmail: string;
}

export default function CopyEmail({
  close,
  userImage,
  userName,
  userEmail,
}: CopyEmailProps) {
  const { title, description, buttons } =
    ModalUserActions[ACTION_TYPE.COPY_EMAIL];

  const DEFAULT_IMAGE_URL =
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/718/member.png';

  const userImageContainer = userImage || DEFAULT_IMAGE_URL;

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
      className="max-w-[375px] sm:max-w-full"
    >
      <div className="flex-center flex-col">
        <div className={clsx('flex-center')}>
          <img
            className="rounded-full"
            src={userImageContainer}
            alt="유저 이미지"
            width={52}
            height={52}
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
