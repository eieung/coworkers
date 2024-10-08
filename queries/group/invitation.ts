import { authAxiosInstance } from '@/services/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

/**
 * 그룹 초대 링크용 토큰을 생성하는 함수
 * @param groupId - 초대할 그룹의 ID
 */
export const getInvitation = (groupId: string) => {
  return authAxiosInstance.get(`groups/${groupId}/invitation`);
};
/**
 * @useInvitationQuery
 * 그룹 초대 링크용 토큰을 가져오는 훅
 * 그룹 ID를 받아서 해당 그룹의 초대 토큰을 반환
 */
export const useInvitationQuery = (groupId: string) => {
  return useQuery({
    queryKey: ['invitation', groupId],
    queryFn: () => getInvitation(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

/**
 * 그룹에 초대 토큰 없이 유저를 추가하는 함수
 * @param groupId - 초대할 그룹의 ID
 */
const inviteMember = (groupId: string, userEmail: string) => {
  return authAxiosInstance.post(`groups/${groupId}/member`, {
    userEmail: userEmail,
  });
};

/**
 * @useInviteMemberMutation
 * 그룹에 유저를 초대하는 mutation 훅
 * 서버에 유저 초대 요청을 POST로 전송하고,
 * 성공 시 그룹 및 사용자 데이터를 무효화하고 다시 가져옴
 */
export const useInviteMemberMutation = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => inviteMember(groupId, email),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups', groupId] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

/**
 * 초대 토큰으로 그룹에 유저를 참여시키는 함수
 * @param data - 유저 이메일과 초대 토큰을 포함한 데이터 객체
 * @returns 서버 응답 데이터 (그룹 참여 성공 여부)
 */
const acceptInvitation = (data: { userEmail: string; token: string }) => {
  return authAxiosInstance.post(`groups/accept-invitation`, {
    userEmail: data.userEmail,
    token: data.token,
  });
};

/**
 * @useJoinTeamMutation
 * 그룹 초대 토큰을 사용하여 유저를 그룹에 참여시키는 mutation 훅
 * - 서버에 초대 수락 요청을 POST로 전송함.
 * - 성공 시 그룹 및 사용자 데이터를 무효화하고 새로운 그룹 페이지로 이동.
 *
 * @param groupId - 참여할 그룹의 ID
 * @returns `useMutation` 훅 - 그룹 참여 요청을 처리하는 mutation
 */

export const useJoinTeamMutation = (groupId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { userEmail: string; token: string }) =>
      acceptInvitation(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['groups', groupId] });
      await queryClient.invalidateQueries({ queryKey: ['user'] });

      const joinGroupId = data.data.groupId;
      router.push(`/groups/${joinGroupId}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
