import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import closeImg from '@/assets/image/icon/x.svg';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  className?: string;
  showCloseIcon?: boolean;
  title?: string;
  description?: string;
  isDatePicker?: boolean;
  iconSrc?: string | null;
}

export default function Modal({
  children,
  onClose,
  className = '',
  showCloseIcon = true,
  title,
  description,
  isDatePicker = false,
  iconSrc = null,
}: ModalProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return ReactDOM.createPortal(
    <div
      className={clsx('fixed inset-0 z-50 flex items-center justify-center')}
    >
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div
        className={twMerge(
          'flex-center relative flex w-full max-w-[384px] flex-col rounded-lg bg-bg-secondary sm:max-w-[375px]',
          'font-medium-16 p-6 text-text-primary shadow-lg',
          className,
        )}
      >
        {showCloseIcon ? (
          <div className="flex w-full justify-end">
            <button className="flex justify-end" onClick={onClose}>
              <Image src={closeImg} alt="Close" width={24} height={24} />
            </button>
          </div>
        ) : (
          <div className="p-3"></div>
        )}
        {iconSrc && (
          <Image
            className="mb-2"
            src={iconSrc}
            alt="Close"
            width={24}
            height={24}
          />
        )}
        {title && <h2 className="mb-2 mt-2">{title}</h2>}
        {description && (
          <p className="font-medium-14 whitespace-pre-line text-center text-text-secondary">
            {description}
          </p>
        )}
        <div className={clsx(isDatePicker ? 'w-[352px]' : 'w-[280px]')}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
