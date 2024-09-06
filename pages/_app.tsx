import Header from '@/components/common/header';
import ModalRenderer from '@/components/common/modal/ModalRender';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { toastContainerProps } from '@/constants/Toast';

const DynamicToastContainer = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  { ssr: false },
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <ModalRenderer />
      <DynamicToastContainer {...toastContainerProps} />
    </>
  );
}
