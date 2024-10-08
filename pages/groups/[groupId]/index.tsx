import TeamContainer from '@/components/team';
import { useRouter } from 'next/router';

export default function Team() {
  const router = useRouter();
  const { groupId } = router.query;

  if (!groupId) return null;

  return (
    <div className="py-6">
      <TeamContainer />
    </div>
  );
}
