import { useRouter } from 'next/router';
import { useUserStore } from '@/store/authStore';
import { useUser } from '@/hooks/useUser';
import { useGroup } from '@/hooks/useGroup';
import TeamSetting from '@/components/team/TeamSetting';
import Notification from '@/components/team/notification';
import TaskList from '@/components/team/taskList';
import TaskReport from '@/components/team/taskReport';
import Member from '@/components/team/member';

export default function Team() {
  const router = useRouter();
  const { groupId } = router.query;

  // groupId가 없더라도 훅은 항상 호출되어야 하므로 기본값 0 설정
  // React Hook 규칙때문에, React Hook은 반드시 컴포넌트의 최상위 레벨에서 호출되어야 하며, 조건부로 호출하면 안 됨
  // 근데 이걸 기본값을 설정해서라도 해야 하는 지? 다른 방법은 없는 지..!
  // TODO: 전체를 감싸는 컴포넌트 만들어서 해결하기
  const numericGroupId = groupId ? parseInt(groupId as string) : 0;

  const { accessToken } = useUserStore();

  // 그룹 데이터를 가져오는 훅은 항상 호출
  const {
    data: groupData,
    isLoading: groupLoading,
    error: groupError,
  } = useGroup(numericGroupId);

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useUser(accessToken);

  const isAdmin =
    groupData && userData
      ? groupData.members.some(
          (member) => member.userId === userData.id && member.role === 'ADMIN',
        )
      : false;

  if (groupLoading || userLoading) return <div>로딩 중...</div>;

  if (groupError || userError)
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  if (!groupData) return <div>팀 소속 없는 경우 컴포넌트 넣으면 됨</div>;

  return (
    <div className="py-6">
      {numericGroupId && (
        <TeamSetting isAdmin={isAdmin} groupId={numericGroupId} />
      )}
      <Notification isAdmin={isAdmin} groupId={numericGroupId} />
      {numericGroupId && (
        <TaskList isAdmin={isAdmin} groupId={numericGroupId} />
      )}
      {numericGroupId && <TaskReport groupId={numericGroupId} />}
      {numericGroupId && <Member isAdmin={isAdmin} groupId={numericGroupId} />}
    </div>
  );
}
