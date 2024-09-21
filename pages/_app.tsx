import Header from '@/components/common/header';
import ModalRenderer from '@/components/common/modal/ModalRender';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { toastContainerProps } from '@/constants/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const DynamicToastContainer = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  { ssr: false },
);

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludePage = router.pathname === '/';
  const mainClassName = excludePage
    ? ''
    : 'm-auto max-w-[1200px] px-4 md:px-6 lg:px-0';

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className={mainClassName}>
        <Component {...pageProps} />
      </main>
      <ModalRenderer />
      <DynamicToastContainer {...toastContainerProps} />
    </QueryClientProvider>
  );
}
