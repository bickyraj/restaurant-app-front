import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileDropdown from './ProfileDropdown';
import Notification from './Notification';
import { eventEmitter } from '../services/api';

export default function Header() {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success');

    useEffect(() => {
      const handleNotification = (message: string, type: 'success' | 'error' | 'warning') => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);
      };

      eventEmitter.on('notification', handleNotification);

      return () => {
        eventEmitter.off('notification', handleNotification);
      };
    }, []);
    
    return (
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            {showNotification && (
              <Notification
                message={notificationMessage}
                type={notificationType}
                onClose={() => setShowNotification(false)}
              />
            )}
          <button className="px-4 border-r border-cool-gray-200 text-cool-gray-400 focus:outline-none focus:bg-cool-gray-100 focus:text-cool-gray-600 lg:hidden" aria-label="Open sidebar">
            {/* <!-- Heroicon name: menu-alt-1 --> */}
            <svg className="h-6 w-6 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          {/* <!-- Search bar --> */}
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search_field" className="sr-only">Search</label>
                <div className="relative w-full text-cool-gray-400 focus-within:text-cool-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                    </svg>
                  </div>
                  <input id="search_field" className="block w-full border-0 h-full pl-8 pr-3 py-2 rounded-md text-cool-gray-900 placeholder-cool-gray-500 outline-none focus:placeholder-cool-gray-400 sm:text-sm" placeholder="Search" type="search" />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 text-cool-gray-400 rounded-full hover:bg-cool-gray-100 hover:text-cool-gray-500 focus:outline-none focus:shadow-outline focus:text-cool-gray-500" aria-label="Notifications">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* <!-- Profile dropdown --> */}
              <ProfileDropdown label='Admin'/>
            </div>
          </div>
        </div>
    )
}