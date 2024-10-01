import { Children } from 'react';
import Modal from '.';
import Button from '@/components/common/button';
import alertImg from '@/assets/image/icon/alert.svg';

/*
 * @component
 * ConfirmModal - 컨펌용 모달
 *
 * @props
 * - title (optional): 제목 내용을 입력합니다.
 * - description (optional): 설명 내용을 입력합니다.
 * - close (required): 필수 요소로 모달을 닫을 때 필요합니다.
 * - onConfirm (required): 필수 요소로 모달 컨펌할 때 작동할 함수입니다.
 * - isAlert (optional): ! 경고 아이콘 표시여부입니다. 기본적으로 false로 미표시됩니다.
 * - cancelText (optional): 취소할 버튼의 text입니다. 기본 '닫기'입니다.
 * - confirmText (optional): 컨펌할 버튼의 text입니다. 기본 '확인'입니다.
 * - buttonType (optional): 기본 'solid'(초록색) 타입이며 'danger'(붉은색) 타입 선택 가능합니다.
 *
 * @usage
 * [커스텀 컨펌 모달 사용 예시]
 *
 * - 사용하려는 컴포넌트 당 한번만 선언 필요
 * const openModal = useModalStore((state) => state.openModal);
 *
 * - 사용하려는 모달 컴포넌트 설정
 *  const handleOpenConfirmModal = () => {
 *    openModal((close) => (
 *      <ConfirmModal
 *        title="삭제하시겠어요?"
 *        description={'삭제시 복구가 불가합니다.\n정말 삭제하시겠어요?'} // 생략 가능. 줄바꿈 필요시 꼭 {}안에 \n 포함
 *        close={close}
 *        isAlert={true} // true시 경고 icon 표시, 기본적으로 설정 안할시 미표시
 *        confirmText="삭제하기" // 닫는 버튼 기본 text는 닫기, 설정 필요시 cancelText추가
 *        onConfirm={() => toast('삭제되었습니다!')} // 컨펌 될시 작동할 함수 추가
 *        buttonType="danger" // 'solid' | 'danger' 두 종류 버튼 타입이 있고 solid가 기본입니다.
 *      />
 *    ));
 *  };
 *
 * - 버튼과 연동 필요
 * <button onClick={handleOpenConfirmModal}>컨펌 모달 테스트</button>
 */

interface ConfirmModalProps {
  close: () => void;
  title: string;
  description?: string;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
  isAlert?: boolean;
  buttonType?: 'solid' | 'danger';
}

export default function ConfirmModal({
  close,
  title,
  description,
  onConfirm,
  cancelText = '닫기',
  confirmText = '확인',
  isAlert = false,
  buttonType = 'solid',
}: ConfirmModalProps) {
  const buttons = [
    {
      children: cancelText,
      onClick: close,
      appearance:
        buttonType === 'danger'
          ? ('secondary-outlined' as const)
          : ('outlined' as const),
    },
    {
      children: confirmText,
      onClick: () => {
        onConfirm();
        close();
      },
      appearance:
        buttonType === 'danger' ? ('danger' as const) : ('solid' as const),
    },
  ];

  return (
    <Modal
      onClose={close}
      title={title}
      description={description}
      showCloseIcon={false}
      iconSrc={isAlert ? alertImg : null}
    >
      <div className="flex flex-col">
        <div className="flex-center mt-6 gap-2">
          {buttons.map((button, index) => (
            <Button key={index} {...button} fullWidth={true} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
