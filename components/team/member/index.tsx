import MemberList from './MemberList';

export default function Member() {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <strong className="font-medium-16 text-text-primary">멤버</strong>
          <span className="font-regular-16 text-text-default">(6명)</span>
        </div>
        <button className="font-regular-14 text-brand-primary">
          + 새로운 멤버 초대하기
        </button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3">
        <MemberList />
        <MemberList />
        <MemberList />
        <MemberList />
        <MemberList />
        <MemberList />
      </div>
    </div>
  );
}
