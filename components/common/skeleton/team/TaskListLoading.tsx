import Loader from '@/components/common/Loader';

export default function TaskListLoading() {
  return (
    <div className="mt-3 flex flex-col">
      <div className="items-left flex">
        <strong className="font-medium-16 text-text-primary">할 일 목록</strong>
      </div>
      <Loader className="m-auto flex h-[285px] items-center" />
    </div>
  );
}
