import React, { ReactNode, useEffect, useState } from 'react';
import Notification from '../Notification';
import { eventEmitter } from '@/services/api';
type LoginLayoutProps = {
  children?: ReactNode;
};

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success');

  useEffect(() => {
    const handleNotification = (message: string, type: 'success' | 'error' | 'warning') => {
      setNotificationType(type);
      setNotificationMessage(message);
      setShowNotification(true);
    };

    eventEmitter.on('notification', handleNotification);

    return () => {
      eventEmitter.off('notification', handleNotification);
    };
  }, []);
  return (
    <>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="min-h-screen bg-white flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              {/* <img className="h-12 w-auto" src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg" alt="Workflow" /> */}
              <div className="mt-8">
                <div className="mt-6">
                  <h1 style={{
                    fontSize: "32px",
                    color: "#08b29c",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    marginBottom: "32px",
                    textAlign: "center",
                  }}>My Restaurant</h1>
              <h2 className="mt-6 mb-6 text-3xl leading-9 font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
        </div>
      </div>
    </>
  );
}

export default LoginLayout;  
