'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      setCurrentDate(date.toLocaleDateString('en-US', options));
    };

    if (isLoaded) {
      getCurrentDate();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 p-8 rounded-lg shadow-2xl animate-pulse">
        <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 p-8 rounded-lg shadow-2xl">
      <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
        Your Financial Report for <span className="font-extrabold">{currentDate}</span>
      </h1>
      <p className="text-3xl text-white flex items-center">
        Welcome back
        {user?.firstName && (
          <>
            <span className="ml-2 bg-white text-indigo-600 rounded-full px-4 py-1 font-semibold">
              {'}'}
            </span>
            <span className="text-indigo-600 rounded-full px-2 py-1 font-semibold">
              😊
            </span>
          </>
        )}
      </p>
    </div>
  );
};
