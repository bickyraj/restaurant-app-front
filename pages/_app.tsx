import MainLayout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { NextPage } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { RouteGuard } from '@/components/RouteGuard';
import '@/styles/globals.css'
import '../public/css/editor.css'

type PageWithLayout = NextPage & {
  Layout?: React.FC;
};

type MyAppProps = {
  Component: PageWithLayout;
} & AppProps;

const App: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const Layout = Component.Layout || MainLayout;

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