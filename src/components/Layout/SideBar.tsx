import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonRedirect from '../ButtonRedirect/ButtonRedirect';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 bg-secondary text-white transform sidebar-menu ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform w-64`}
    >
      <button className="text-primary text-xl p-4" onClick={toggleSidebar}>
        <span className="material-icons">menu_open</span>
      </button>
      <div className="p-4 ">MDW - FINAL</div>
      <ul className="gap-1 flex flex-col">
        <li>
          <ButtonRedirect
            label="Home"
            onClick={() => navigate('/home')}
            colorType="type1"
          />
        </li>
        <li>
          <ButtonRedirect
            label="Mis departamentos"
            onClick={() => navigate('/my-aparments')}
            colorType="type1"
          />
        </li>
        <li>
          <ButtonRedirect
            label="Mi Perfil"
            onClick={() => navigate('/profile')}
            colorType="type1"
          />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
