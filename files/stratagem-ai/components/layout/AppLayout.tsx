import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ChatPanel } from './ChatPanel';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header chatOpen={chatOpen} onToggleChat={() => setChatOpen((prev) => !prev)} />
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto">{children}</main>
          {chatOpen ? <ChatPanel /> : null}
        </div>
      </div>
    </div>
  );
};
