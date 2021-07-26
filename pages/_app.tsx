/* eslint-disable react/jsx-props-no-spreading */
import Router from 'next/router';
import NProgress from 'nprogress';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '../context/AuthContext';

import '../styles/globals.css';
import 'nprogress/nprogress.css';

// Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <Component {...pageProps} />;
      </AuthProvider>
    </>
  );
}
export default MyApp;
