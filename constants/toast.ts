import { ToastContainerProps, ToastPosition } from 'react-toastify';

export const toastContainerProps: ToastContainerProps = {
  className: 'toast-container',
  autoClose: 3000,
  theme: 'dark',
  position: 'bottom-center' as ToastPosition,
  closeOnClick: true,
  draggable: true,
};
