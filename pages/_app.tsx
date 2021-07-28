/* eslint-disable react/jsx-props-no-spreading */
import Router from 'next/router';
import NProgress from 'nprogress';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';
import AuthProvider from '../context/AuthContext';

import '../styles/globals.css';
import 'nprogress/nprogress.css';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

// Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Create a client
const queryClient = new QueryClient();

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer role="alert" />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>
          <Component {...pageProps} />;
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
