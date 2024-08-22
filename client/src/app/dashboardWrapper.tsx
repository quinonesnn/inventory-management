"use client"

import React, { useEffect } from 'react';
import Navbar from '@/app/(components)/Navbar';
import Sidebar from '@/app/(components)/Sidebar';
import StoreProvider, { useAppSelector } from './redux';


// This will require a Redux state
const DashboardLayout = ({children}: { children: React.ReactNode}) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector(
    (state) => state.global.isDarkMode
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });
  
  return (
    <div 
      className={`${isDarkMode ? "dark" : "light"}
      flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
        <Sidebar/>
        <main 
          className={`flex flex-col w-full h-full py-7 px-9 bg-gray-200 
            ${isSideBarCollapsed ? "md:pl-24" : "md:pl-72"}`
          }
        >
            <Navbar/>
            {children}
        </main>
    </div>
  )
}

// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers
// State needs to persist throughout the whole applicaiton.
// Providers need to be wrapped as deep as possible in the tree
const DashboardWrapper = ({children}: { children: React.ReactNode}) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper