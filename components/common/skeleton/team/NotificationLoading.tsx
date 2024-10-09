import Loader from '@/components/common/Loader';

export default function NotificationLoading() {
  return (
    <div className="mt-6 flex flex-col">
      <div className="items-left flex">
        <strong className="font-medium-16 text-text-primary">공지</strong>
      </div>
      <Loader className="m-auto flex h-[115px] items-center" />
    </div>
  );
}
