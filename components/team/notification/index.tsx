import { useEffect } from 'react';
import useModalStore from '@/store/useModalStore';
import { toast } from 'react-toastify';
import CustomInputModal from '@/components/common/modal/CustomInputModal';
import Image from 'next/image';
import editIcon from '@/assets/image/icon/edit.svg';
import deleteIcon from '@/assets/image/icon/delete.svg';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import {
  useAddNotificationMutation,
  useDeleteNotificationMutation,
  useNotificationsQuery,
  useUpdateNotificationMutation,
} from '@/queries/group/notification';
import { useRouter } from 'next/router';
import { useGroupsQuery } from '@/queries/group/group';
import { useUserStore } from '@/store/authStore';
import { useUsersQuery } from '@/queries/user/user';

export default function Notification() {
  const openModal = useModalStore((state) => state.openModal);
  const router = useRouter();
  const { groupId } = router.query;

  const numericGroupId: number = groupId ? Number(groupId) : 0;
  const { data: groupResponse, isError } = useGroupsQuery(numericGroupId);
  const groupData = groupResponse?.data;

  const { data: notificationData, isLoading } =
    useNotificationsQuery(numericGroupId);
  const addNotificationMutation = useAddNotificationMutation(numericGroupId);
  const updateNotificationMutation =
    useUpdateNotificationMutation(numericGroupId);
  const deleteNotificationMutation =
    useDeleteNotificationMutation(numericGroupId);

  const { accessToken } = useUserStore();
  const { data: userData } = useUsersQuery(accessToken);

  const isAdmin =
    groupData && userData
      ? groupData.members.some(
          (member) =>
            member.userId === userData.data.id && member.role === 'ADMIN',
        )
      : false;

  const handleAddNotificationModal = () => {
    openModal((close) => (
      <CustomInputModal
        close={close}
        title={<div className="font-medium-24 mb-10">공지 등록하기</div>}
        buttonText={'등록하기'}
        inputType={'textarea'}
        onAction={async (noticeContent) => {
          try {
            await addNotificationMutation.mutateAsync(noticeContent);
            toast.success('공지 등록이 완료되었습니다!');
            close();
          } catch (error) {
            toast.error('공지 등록에 실패했습니다. 다시 시도해주세요.');
            console.error('공지 등록 중 오류:', error);
          }
        }}
        placeholder={'등록할 공지를 입력해주세요.'}
        label={'공지 내용'}
        className={'max-w-[400px] md:max-w-[350px]'}
        childrenClassName={'w-[350px] sm:w-[300px] md:w-[300px]'}
        bottomDescription={'팀에 속한 멤버들에게 공지를 할 수 있어요.'}
      />
    ));
  };

  const handleEditNotificationModal = () => {
    openModal((close) => (
      <CustomInputModal
        close={close}
        title={<div className="font-medium-24 mb-10">공지 수정하기</div>}
        buttonText={'수정하기'}
        inputType={'textarea'}
        initialData={notificationData?.data[0]?.content || ''}
        onAction={async (updatedNoticeContent) => {
          try {
            const noticeId = notificationData?.data[0]?._id;
            if (noticeId) {
              await updateNotificationMutation.mutateAsync({
                id: noticeId,
                content: updatedNoticeContent,
              });
              toast.success('공지 수정이 완료되었습니다!');
              close();
            }
          } catch (error) {
            toast.error('공지 수정에 실패했습니다. 다시 시도해주세요.');
            console.error('공지 수정 중 오류:', error);
          }
        }}
        placeholder={'수정할 공지 내용을 입력해주세요.'}
        label={'공지 내용'}
        className={'max-w-[400px] md:max-w-[350px]'}
        childrenClassName={'w-[350px] sm:w-[300px] md:-w-[300px]'}
        bottomDescription={'공지 내용을 수정할 수 있습니다.'}
      />
    ));
  };

  const handleDeleteNotificationModal = () => {
    openModal((close) => (
      <ConfirmModal
        title="공지를 삭제하시겠어요?"
        description={'공지 삭제시 복구가 불가합니다.\n정말 삭제하시겠어요?'}
        close={close}
        isAlert={true}
        confirmText="삭제하기"
        onConfirm={async () => {
          try {
            const noticeId = notificationData?.data[0]?._id;
            if (noticeId) {
              await deleteNotificationMutation.mutateAsync(noticeId);
              toast.success('공지 삭제가 완료되었습니다!');
              close();
            }
          } catch (error) {
            toast.error('공지 삭제에 실패했습니다. 다시 시도해주세요.');
            console.error('공지 삭제 중 오류:', error);
          }
        }}
        buttonType="danger"
      />
    ));
  };

  useEffect(() => {
    if (notificationData?.error) {
      toast.error('공지사항 불러오기에 실패했습니다.');
    }
  }, [notificationData]);

  if (isLoading) {
    return <span>공지를 불러오는 중입니다.</span>;
  }

  if (isError) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }
  if (!notificationData?.data[0] && !isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex items-center justify-between py-4 pb-4 pt-6">
        <b className="font-medium-16 text-text-primary">공지</b>
        {isAdmin && !notificationData?.data[0] && (
          <button
            className="font-regular-14 text-brand-primary"
            onClick={handleAddNotificationModal}
          >
            + 새로운 공지 등록하기
          </button>
        )}
        {isAdmin && notificationData?.data[0] && (
          <div className="flex items-center gap-2">
            <button onClick={handleEditNotificationModal}>
              <Image src={editIcon} alt="수정" width={16} height={16} />
            </button>
            <button onClick={handleDeleteNotificationModal}>
              <Image src={deleteIcon} alt="삭제" width={16} height={16} />
            </button>
          </div>
        )}
      </div>
      <div className="relative flex overflow-hidden rounded-2xl bg-bg-secondary p-4">
        {notificationData?.data[0] ? (
          <div className="w-full text-center">
            <p className="font-bold-16 inline-block w-full px-4 text-text-primary">
              {notificationData?.data[0]?.content}
            </p>
          </div>
        ) : isAdmin ? (
          <div className="w-full text-center">
            <p className="font-regular-14 text-text-secondary">
              아직 공지가 없어요. 새로운 공지를 등록해보세요!
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
