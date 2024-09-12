import Member from '@/components/team/member';
import TaskList from '@/components/team/taskList';
import TaskReport from '@/components/team/taskReport';
import TeamSetting from '@/components/team/TeamSetting';

export default function Team() {
  return (
    <div className="m-auto max-w-[1200px] px-4 py-6 md:px-6 lg:px-0">
      <TeamSetting />
      <TaskList />
      <TaskReport />
      <Member />
    </div>
  );
}
