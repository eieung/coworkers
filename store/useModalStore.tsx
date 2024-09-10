import { create } from 'zustand';

type Modal = {
  id: string;
  component: (close: () => void) => JSX.Element;
};

type ModalState = {
  modals: Modal[];
  openModal: (component: (close: () => void) => JSX.Element) => void;
  closeModal: (id: string) => void;
  isEmpty: () => boolean;
};

const useModalStore = create<ModalState>((set, get) => ({
  modals: [],
  openModal: (component) => {
    const id = crypto.randomUUID();
    const close = () => {
      set((state) => ({
        modals: state.modals.filter((modal) => modal.id !== id),
      }));
    };
    set((state) => ({
      modals: [...state.modals, { id, component: (close) => component(close) }],
    }));
  },
  closeModal: (id: string) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    })),
  isEmpty: () => get().modals.length === 0,
}));

export default useModalStore;
