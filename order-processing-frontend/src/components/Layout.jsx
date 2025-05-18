import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fbfbfe]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
