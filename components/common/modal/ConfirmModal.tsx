import React from 'react';
import Modal from '.';
import Button from '@/components/common/button';
import alertImg from '@/assets/image/icon/alert.svg';

interface ConfirmModalProps {
  close: () => void;
  title: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isAlert?: boolean;
}

export default function ConfirmModal({
  close,
  title,
  description,
  onConfirm,
  cancelText = '닫기',
  confirmText = '확인',
  isAlert = false,
}: ConfirmModalProps) {
  return (
    <Modal
      onClose={close}
      title={title}
      description={description}
      showCloseIcon={false}
      isDatePicker={false}
      iconSrc={isAlert ? alertImg : null}
    >
      <div className="flex flex-col">
        <div className="flex-center mt-6 gap-2">
          <Button
            fullWidth={true}
            onClick={close}
            appearance="secondary-outlined"
          >
            {cancelText}
          </Button>
          <Button fullWidth={true} onClick={onConfirm} appearance="danger">
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
