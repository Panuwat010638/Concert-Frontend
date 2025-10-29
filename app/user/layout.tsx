'use client';

import Sidebar from '@/components/Sidebar';
import SidebarMobile from '@/components/SidebarMobile';
import { UserProvider } from '@/contexts/UserContext';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SidebarMobile mode="user"/>
      <div className="flex min-h-screen bg-gray-50 pt-10 sm:pt-20 lg:pt-0">
        <Sidebar mode="user" />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </UserProvider>
  );
}
