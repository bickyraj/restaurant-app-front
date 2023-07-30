import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/contexts/AuthContext';
import { NextResponse, NextRequest } from 'next/server'

export { RouteGuard };

const RouteGuard = ({ children }: any) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { isLoggedIn, userToken } = useAuthContext();

  useEffect(() => {
    // on initial load - run auth check 
    authCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  function authCheck() {
    // redirect to login page if accessing a private page and not logged in 
    const storedToken = localStorage.getItem('access_token');

    if (!storedToken && router.pathname !== "/login") {
      setAuthorized(false);
      router.push('/login', undefined, { shallow: true });
    } else {
      setAuthorized(true);
    }
  }

  return (authorized && children);
}