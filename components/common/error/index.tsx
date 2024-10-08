import Image from 'next/image';
import errorIcon from '@/assets/image/icon/notFound.svg';

interface ErrorProps {
  errorMessage: string;
  onRetry?: () => void;
}

export default function Error({ errorMessage, onRetry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <Image src={errorIcon} alt="Error" width={50} height={50} />
      <h2 className="font-bold-20 text-red-500 mt-4">오류가 발생했습니다!</h2>
      <p className="text-text-secondary mt-2">{errorMessage}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          다시 로그인 하기
        </button>
      )}
    </div>
  );
}