import Member from './member';
import Notification from './notification';
import TaskList from './taskList';
import TaskReport from './taskReport';
import TeamSetting from './TeamSetting';

export default function TeamContainer() {
  return (
    <>
      <TeamSetting />
      <Notification />
      <TaskList />
      <TaskReport />
      <Member />
    </>
  );
}
