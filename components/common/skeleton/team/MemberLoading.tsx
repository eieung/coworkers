import Loader from '@/components/common/Loader';

export default function MemberLoading() {
  return (
    <div className="mt-12 flex flex-col">
      <div className="items-left flex">
        <strong className="font-medium-16 text-text-primary">멤버</strong>
      </div>
      <Loader className="m-auto flex h-[213px] items-center" />
    </div>
  );
}
