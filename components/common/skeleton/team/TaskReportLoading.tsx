import Loader from '@/components/common/Loader';

export default function TaskReportLoading() {
  return (
    <div className="mt-4 flex flex-col">
      <div className="items-left flex">
        <strong className="font-medium-16 text-text-primary">리포트</strong>
      </div>
      <Loader className="m-auto flex h-[285px] items-center" />
    </div>
  );
}
