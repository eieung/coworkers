import TeamContainer from '@/components/team';

export default function Team() {
  // groupId가 없더라도 훅은 항상 호출되어야 하므로 기본값 0 설정
  // React Hook 규칙때문에, React Hook은 반드시 컴포넌트의 최상위 레벨에서 호출되어야 하며, 조건부로 호출하면 안 됨
  // 근데 이걸 기본값을 설정해서라도 해야 하는 지? 다른 방법은 없는 지..!
  // TODO: 전체를 감싸는 컴포넌트 만들어서 해결하기

  return (
    <div className="py-6">
      <TeamContainer />
    </div>
  );
}
