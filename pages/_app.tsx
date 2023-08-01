import MainLayout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { NextPage } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { RouteGuard } from '@/components/RouteGuard';
import { useEffect } from 'react'
import '@/styles/globals.css'
import '../public/css/editor.css'
import { setAccessToken } from '@/services/api';

type PageWithLayout = NextPage & {
  Layout?: React.FC;
};

type MyAppProps = {
  Component: PageWithLayout;
} & AppProps;

const App: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const Layout = Component.Layout || MainLayout;

  useEffect(() => {
    const accessToken: any = localStorage.getItem('access_token');
    setAccessToken(accessToken);
  }, []);
  
  return (
    <AuthProvider>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </AuthProvider>
  )
  //   return <Component {...pageProps} />
}
export default App;