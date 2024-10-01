import Modal from '.';
import Button from '@/components/common/button';

interface DeleteAccountModalProps {
  close: () => void;
}

export default function DeleteAccountModal({ close }: DeleteAccountModalProps) {
  return (
    <Modal title="회원 탈퇴" onClose={close}>
      <div className="text-text-primary">
        정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={close} appearance="outlined">
          취소
        </Button>
        <Button
          appearance="danger"
          onClick={() => {
            // TODO: 탈퇴 처리 로직
            close();
          }}
        >
          회원 탈퇴하기
        </Button>
      </div>
    </Modal>
  );
}
