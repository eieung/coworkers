import React from 'react';
import useModalStore from '@/store/useModalStore';

export default function ModalRenderer() {
  const modals = useModalStore((state) => state.modals);

  return (
    <>
      {modals.map((modal) => (
        <React.Fragment key={modal.id}>
          {modal.component(() => useModalStore.getState().closeModal(modal.id))}
        </React.Fragment>
      ))}
    </>
  );
}
