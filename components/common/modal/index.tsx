import { useEffect, useState, useCallback, memo, useRef } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import closeImg from '@/assets/image/icon/x.svg';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import useClickOutside from '@/hooks/useClickOutside';

/*
 * @component
 * Modal - 여러 Modal을 생성하기 위한 기본 Modal 컴포넌트
 *
 * @props
 * - title (optional): 제목 내용을 입력합니다.
 * - description (optional): 설명 내용을 입력합니다.
 * - children (optional): 제목과 설명 외 따로 넣을 내용이 있을 때 이용합니다. 예) input 등등
 * - onClose (required): 필수 요소로 모달을 닫을 때 필요합니다.
 * - className (optional): 커스텀 스타일 때 사용합니다. 모달 스타일;
 * - showCloseIcon (optional): X 닫기 버튼 표시 여부입니다. 기본적으로 true로 보이게 되어 있습니다.
 * - childrenClassName (optional): children을 스타일링 할 수 있는 옵션입니다.
 * - titleClassName (optional): title을 스타일링 할 수 있는 옵션입니다.
 * - iconSrc (optional): 경고 등 이미지 아이콘을 넣기 위한 옵션입니다. 기본 null입니다.
 * - closeButtonClassName (optional): X 닫기 버튼 스타일 변경
 * - isCustom (optional): 현재 기본 형식과 다른 커스텀 모달로 만들 때 사용합니다.
 * - isCloseOnOutsideClick (optional): 기본적으로 모달 바깥 클릭 시 닫히게 되어있으나 false로 설정시 닫히지 않게 설정 가능합니다.
 * - backgroundOpacity (optional): 모달의 바깥 영역 투명도를 'opacity-0' | 'opacity-50' | 'opacity-100' 중에 설정합니다.
 *
 * @usage
 *
 * 이미 만들어 놓은 각 모달별 컴포넌트가 있어서 기본 모달 컴포넌트를 직접적으로 사용할 일은 거의 없습니다.
 * 사용 예시 파일 ModalVariants를 참고해주세요.
 *
 * ConfirmModal은 삭제하거나 컨펌이 필요할 경우 원하시는 내용으로 이용가능합니다.
 * 커스텀 컨펌 모달 사용 예시는 ConfirmModal를 참고해주세요.
 *
 *
 * [모달 별 사용할 컴포넌트 종류]
 *
 * modal 폴더 내에서 각 컴포넌트에 원하시는 prop을 설정하시면 됩니다.
 * - ChangePassword : 비밀번호 변경하기
 * - CopyEmail : 이메일 복사
 * - CreateTask : 할 일 만들기 모달로 할 일 제목, 할 일 메모 옵션만 있습니다.
 * - CreateTaskList : 할 일 목록 모달로 목록만 생성
 * - DeleteAccount : 계정 탈퇴
 * - InviteMember : 멤버 초대
 * - Logout : 로그아웃
 * - DatePicker : 할 일 만들기 데이터 피커 기능용
 * - PasswordReset : 비밀번호 재설정
 * - TeamForm: 팀 생성하기 / 수정하기 (isEditMode이 true일 때 수정하기 무옵션일 경우 생성하기 기본)
 * - CustomInputModal: 인풋이 있는 커스텀 모달
 *
 * [모달 사용 예시]
 *
 * - 사용하려는 컴포넌트 당 한번만 선언 필요
 * const openModal = useModalStore((state) => state.openModal);
 *
 * - 사용하려는 모달 컴포넌트 설정
 * const handleOpenInviteModal = () => {
 * openModal((close) => <InviteMember close={close} />);   };
 * 각 컴포넌트 별로 전달할 props는 modal 폴더안의 해당 컴포넌트에서 각자 추가하시면 됩니다.
 *
 * - 버튼과 연동 필요
 * <button onClick={handleOpenInviteModal}>회원 초대하기</button>
 */

interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  className?: string;
  showCloseIcon?: boolean;
  title?: React.ReactNode;
  description?: string;
  iconSrc?: string | null;
  childrenClassName?: string;
  titleClassName?: string;
  closeButtonClassName?: string;
  isCustom?: boolean;
  isCloseOnOutsideClick?: boolean;
  backgroundOpacity?: 'opacity-0' | 'opacity-50' | 'opacity-100';
}

const CloseButton = memo(({ onClose }: { onClose: () => void }) => (
  <button className="flex justify-end" onClick={onClose}>
    <Image src={closeImg} alt="Close" width={24} height={24} />
  </button>
));

function Modal({
  children,
  onClose,
  className = '',
  showCloseIcon = true,
  title,
  description,
  iconSrc = null,
  childrenClassName,
  titleClassName,
  isCustom = false,
  closeButtonClassName,
  isCloseOnOutsideClick = true,
  backgroundOpacity = 'opacity-50',
}: ModalProps) {
  const [isClient, setIsClient] = useState(false);

  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => {
    if (isCloseOnOutsideClick) {
      onClose();
    }
  });

  useEffect(() => {
    setIsClient(true);
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleEsc]);

  if (!isClient) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={clsx('fixed inset-0 z-50 flex items-center justify-center')}
    >
      <div
        className={twMerge(
          `fixed inset-0 bg-black transition-opacity duration-300`,
          backgroundOpacity,
        )}
      />
      {!isCustom ? (
        <div
          className={twMerge(
            'flex-center relative w-full max-w-[384px] flex-col rounded-xl bg-bg-secondary sm:max-w-[375px]',
            'font-medium-16 p-[16px_16px_32px] text-text-primary shadow-lg',
            className,
          )}
          ref={modalRef}
        >
          {showCloseIcon ? (
            <div
              className={twMerge(
                'flex w-full justify-end',
                closeButtonClassName,
              )}
            >
              <CloseButton onClose={onClose} />
            </div>
          ) : (
            <div className="flex h-6 w-full"></div>
          )}
          {iconSrc && (
            <Image
              className="mb-2"
              src={iconSrc}
              alt="Icon"
              width={24}
              height={24}
            />
          )}
          {title && (
            <h2
              className={clsx(
                'mb-2 mt-2 whitespace-pre-line text-center',
                titleClassName,
              )}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="font-medium-14 whitespace-pre-line text-center text-text-secondary">
              {description}
            </p>
          )}
          <div
            className={clsx(
              'max-h-[80vh] overflow-auto',
              'scrollbar:w-2 scrollbar:rounded-full scrollbar:bg-bg-primary scrollbar-thumb:rounded-full scrollbar-thumb:bg-bg-tertiary',
            )}
          >
            <div className={twMerge('w-[280px] px-2', childrenClassName)}>
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={twMerge('fixed bg-bg-secondary shadow-lg', className)}
          ref={modalRef}
        >
          {showCloseIcon && (
            <div className={twMerge('flex w-full px-2', closeButtonClassName)}>
              <CloseButton onClose={onClose} />
            </div>
          )}
          <div
            className={clsx(
              'max-h-[80vh] overflow-auto',
              'scrollbar:w-2 scrollbar:rounded-full scrollbar:bg-bg-primary scrollbar-thumb:rounded-full scrollbar-thumb:bg-bg-tertiary',
            )}
          >
            <div className={twMerge('px-2', childrenClassName)}>{children}</div>
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}

export default memo(Modal);
