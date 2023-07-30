import React from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Sidebar from './Sidebar';
import Header from './Header';
import Link from 'next/link';
import Image from 'next/image';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isCurrentPath = (path: string) => router.pathname === path;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <div className="lg:hidden">
        <div className="fixed inset-0 flex z-40">
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-cool-gray-600 opacity-75"></div>
          </div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-teal-600">
            <div className="absolute top-0 right-0 -mr-14 p-1">
              <button className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-cool-gray-600" aria-label="Close sidebar">
                <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center px-4">
              <img className="h-8 w-auto" src={"https://tailwindui.com/img/logos/v1/easywire-logo-on-brand.svg"} alt='easywire log' />
            </div>
            <div className="mt-5 overflow-y-auto">
              <nav className="px-2 space-y-1">
                <Link href="/" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-teal-700 focus:outline-none focus:bg-teal-500 transition ease-in-out duration-150">
                  {/* <!-- Heroicon name: home --> */}
                  <svg className="mr-4 h-6 w-6 text-teal-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>

                <Link href="/" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500 transition ease-in-out duration-150">
                  {/* <!-- Heroicon name: clock --> */}
                  <svg className="mr-4 h-6 w-6 text-teal-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  History
                </Link>

                <Link href="/" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500 transition ease-in-out duration-150">
                  {/* <!-- Heroicon name: scale --> */}
                  <svg className="mr-4 h-6 w-6 text-teal-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  Balances
                </Link>

                <Link href="/" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500 transition ease-in-out duration-150">
                  {/* <!-- Heroicon name: credit-card --> */}
                  <svg className="mr-4 h-6 w-6 text-teal-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Cards
                </Link>

                <Link href="/" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500 transition ease-in-out duration-150">
                  {/* <!-- Heroicon name: user-group --> */}
                  <svg className="mr-4 h-6 w-6 text-teal-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Recipients
                </Link>

                <Link href="/" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500 transition ease-in-out duration-150">
                  {/* <!-- Heroicon name: document-report --> */}
                  <svg className="mr-4 h-6 w-6 text-teal-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Reports
                </Link>
              </nav>
            </div>
            <hr className="h-px mt-6 bg-teal-700 border-none" />
            <div className="mt-6 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                <Link href="/" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500 transition ease-in-out duration-150">
                  {/* <!-- Heroicon name: cog --> */}
                  <svg className="mr-4 h-6 w-6 text-teal-200 group-hover:text-teal-200 group-focus:text-teal-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>

                <Link href="/" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500 transition ease-in-out duration-150">
                  {/* <!-- Heroicon name: question-mark-circle --> */}
                  <svg className="mr-4 h-6 w-6 text-teal-300 group-hover:text-teal-200 group-focus:text-teal-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Help
                </Link>

                <Link href="/" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500 transition ease-in-out duration-150">
                  {/* <!-- Heroicon name: shield-check --> */}
                  <svg className="mr-4 h-6 w-6 text-teal-300 group-hover:text-teal-200 group-focus:text-teal-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Privacy
                </Link>
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 w-14">
            {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
          </div>
        </div>
      </div>
      {/* sidebar */}
      <Sidebar/>
      <div className="flex-1 overflow-auto focus:outline-none">
        {/* header */}
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
          <Header/>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
