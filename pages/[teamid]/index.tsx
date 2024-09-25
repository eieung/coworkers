import Member from '@/components/team/member';
import Notification from '@/components/team/notification';
import TaskList from '@/components/team/taskList';
import TaskReport from '@/components/team/taskReport';
import TeamSetting from '@/components/team/TeamSetting';
import { getGroup } from '@/libs/group';
import { GroupResponse } from '@/types/group';
import { useEffect, useState } from 'react';

export default function Team() {
  const [groupData, setGroupData] = useState<GroupResponse | null>(null);
  const groupId = 913;

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const data = await getGroup(groupId);
        setGroupData(data);
      } catch (error) {
        console.error('데이터 연동 실패:', error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  if (!groupData) return <div>팀 소속 없는 경우 컴포넌트 넣으면 됨</div>;

  return (
    <div className="py-6">
      <TeamSetting groupData={groupData} />
      {/* <Notification isAdmin={currentUser.role === 'admin'} /> */}
      <TaskList />
      <TaskReport />
      <Member />
    </div>
  );
}
