import { create } from 'zustand';

type Modal = {
  id: string;
  component: (close: () => void) => JSX.Element;
};

type ModalState = {
  modals: Modal[];
  openModal: (component: (close: () => void) => JSX.Element) => void;
  closeModal: () => void;
  updateModal: (component: (close: () => void) => JSX.Element) => void; // ID 없이 수정
  isEmpty: () => boolean;
  initializePopStateListener: () => void;
  removePopStateListener: () => void;
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

    get().initializePopStateListener();
    window.history.pushState({ modalOpen: true }, '');
  },

  closeModal: () => {
    set((state) => {
      const newModals = state.modals.slice(0, -1);
      return { modals: newModals };
    });
  },

  updateModal: (component) => {
    set((state) => {
      const lastModalIndex = state.modals.length - 1;
      if (lastModalIndex < 0) return state;

      const lastModal = state.modals[lastModalIndex];
      return {
        modals: [
          ...state.modals.slice(0, lastModalIndex),
          { ...lastModal, component: (close) => component(close) },
        ],
      };
    });
  },

  isEmpty: () => get().modals.length === 0,

  initializePopStateListener: () => {
    const handlePopState = () => {
      if (!get().isEmpty()) {
        get().closeModal();
      }
    };

    window.addEventListener('popstate', handlePopState);
    set({
      removePopStateListener: () => {
        window.removeEventListener('popstate', handlePopState);
      },
    });
  },

  removePopStateListener: () => {},
}));

export default useModalStore;
