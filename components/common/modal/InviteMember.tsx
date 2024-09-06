import React from 'react';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/Modal';
import { toast } from 'react-toastify';
import Button from '@/components/common/button';

interface InviteMemberProps {
  close: () => void;
}

export default function InviteMember({ close }: InviteMemberProps) {
  const { title, description, buttons } =
    ModalUserActions[ACTION_TYPE.INVITE_MEMBER];

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={true}
      description={description}
    >
      <div className={`mt-10 sm:mt-6`}>
        {buttons && (
          <Button
            {...buttons[0]}
            onClick={() => {
              toast('복사되었습니다!');
            }}
          >
            {buttons[0].children}
          </Button>
        )}
      </div>
    </Modal>
  );
}
