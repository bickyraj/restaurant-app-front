import React, { FC, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  const getNotificationClasses = () => {
    let classes = '';
    if (type === 'success') {
      classes = 'bg-green-100';
    } else if (type === 'error') {
      classes = 'bg-red-100';
    } else if (type === 'warning') {
      classes = 'bg-yellow-100';
    }

    return `notification`;
  };

  const errorSvg = () => {
    switch (type) {
      case 'success':
        return (
          <>
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </>
        );
      case 'error':
        return (
          <>
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className={getNotificationClasses()}>
      <div className="fixed top-0 right-7 mr-100 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 z-10">
        <div className="relative bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            {errorSvg()}
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{message}</h3>
              {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                </div> */}
            </div>
          </div>
          <div className="absolute right-1 top-0 mt-1 flex">
            <button type="button" onClick={onClose} className="rounded-md text-gray-700 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Close panel</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
