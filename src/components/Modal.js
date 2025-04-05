import React, { useEffect, useState } from 'react';

const getCurrentWeekRange = () => {
  const today = new Date();
  const firstDay = today.getDate(); // Sunday-based
  const lastDay = firstDay + 6;

  const startDate = new Date(today.setDate(firstDay));
  const endDate = new Date(today.setDate(lastDay));

  return {
    start: startDate.toDateString(),
    end: endDate.toDateString(),
  };
};

const ContactModal = ({ show, onClose, children }) => {
  const [weekInfo, setWeekInfo] = useState({});

  useEffect(() => {
    setWeekInfo(getCurrentWeekRange());
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <>
      <div className='h-screen flex justify-center items-center'>
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white dark:bg-neutral-800 shadow-2xl rounded-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl'>
            {/* Modal Header */}
            <div className='flex justify-between items-center py-3 px-4 border-b'>
              <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                {weekInfo.start} - {weekInfo.end}
              </h3>
              <button
                onClick={onClose}
                className='text-gray-800 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700 p-2 rounded-full'
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className='p-4'>
              <div className='text-gray-800 dark:text-neutral-400'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
