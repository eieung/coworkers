import Modal from '.';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';

interface ChangePasswordModalProps {
  close: () => void;
}

export default function ChangePasswordModal({ close }: ChangePasswordModalProps) {
  return (
    <Modal title="비밀번호 변경" onClose={close}>
      <form className="flex flex-col gap-4">
        <Input type="password" label="현재 비밀번호" placeholder="현재 비밀번호를 입력하세요" />
        <Input type="password" label="새 비밀번호" placeholder="새 비밀번호를 입력하세요" />
        <Input type="password" label="새 비밀번호 확인" placeholder="새 비밀번호를 다시 입력하세요" />
        <Button type="submit" appearance="solid" className="w-full mt-4">
          변경하기
        </Button>
      </form>
    </Modal>
  );
}
