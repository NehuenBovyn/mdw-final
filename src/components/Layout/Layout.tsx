import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Notify } from '../../components/Notification/Notification';
import Sidebar from './SideBar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Notify({
          message: 'Sesión cerrada correctamente',
          type: 'success',
        });
        navigate('/login');
      })
      .catch(error => {
        Notify({
          message: error.message,
          type: 'error',
        });
      });
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-grow">
        <header className="flex justify-between items-center bg-secondary text-white p-4">
          <button className="text-xl text-primary" onClick={toggleSidebar}>
            ☰
          </button>
          <button
            className="text-sm text-primary px-3 py-1 rounded flex items-center"
            onClick={handleLogout}
          >
            Cerrar sesión <span className="material-icons ml-2">logout</span>
          </button>
        </header>
        <main className="flex-grow p-4 bg-gray-100">
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
