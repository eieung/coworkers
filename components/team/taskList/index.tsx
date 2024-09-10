import Task from './Task';

export default function TaskList() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-4 pb-4 pt-6">
        <div className="flex gap-x-2">
          <b className="font-medium-16 text-text-primary">할 일 목록</b>
          <span className="font-regular-16 text-text-default">(4개)</span>
        </div>
        <button className="font-regular-14 text-brand-primary">
          + 새로운 목록 추가하기
        </button>
      </div>
      <Task />
      <Task />
      <Task />
      <Task />
    </div>
  );
}
