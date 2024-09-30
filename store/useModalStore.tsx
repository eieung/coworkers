import { create } from 'zustand';

type Modal = {
  id: string;
  component: (close: () => void) => JSX.Element;
};

type ModalState = {
  modals: Modal[];
  openModal: (component: (close: () => void) => JSX.Element) => void;
  closeModal: () => void;
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
      modals: [{ id, component: (close) => component(close) }, ...state.modals],
    }));

    get().initializePopStateListener();
    window.history.pushState({ modalOpen: true }, '');
  },

  closeModal: () => {
    set((state) => {
      const newModals = [...state.modals];
      newModals.shift();
      return { modals: newModals };
    });

    if (get().isEmpty()) {
      get().removePopStateListener();
    }

    if (window.history.state?.modalOpen) {
      window.history.back();
    }
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
