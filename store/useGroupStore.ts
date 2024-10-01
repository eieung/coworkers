import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type GroupStore = {
  selectedGroupId: number | null;
  setSelectedGroupId: (id: number | null) => void;
  initialGroupId: number | null;
  setInitialGroupId: (id: number | null) => void;
};

/**
 * @useGroupStore
 * 그룹 선택 및 초기 그룹 설정을 위한 Zustand 스토어
 * Zustand의 `persist` 미들웨어를 사용하여 상태를 로컬 스토리지에 저장
 * 그룹 ID는 페이지를 새로고침해도 유지됨.
 */

export const useGroupStore = create<GroupStore>()(
  persist(
    (set) => ({
      selectedGroupId: null,
      setSelectedGroupId: (id) => set({ selectedGroupId: id }),
      initialGroupId: null,
      setInitialGroupId: (id) => set({ initialGroupId: id }),
    }),
    {
      name: 'group-storage',
    },
  ),
);
