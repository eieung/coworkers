import Member from '@/components/team/member';
import Notification from '@/components/team/notification';
import TaskList from '@/components/team/taskList';
import TaskReport from '@/components/team/taskReport';
import TeamSetting from '@/components/team/TeamSetting';
import notificationData from '@/data/notificationData';

export default function Team() {
  const currentUser = notificationData.users[1];

  return (
    <div className="m-auto max-w-[1200px] px-4 py-6 md:px-6 lg:px-0">
      <TeamSetting />
      <Notification isAdmin={currentUser.role === 'admin'} />
      <TaskList />
      <TaskReport />
      <Member />
    </div>
  );
}
