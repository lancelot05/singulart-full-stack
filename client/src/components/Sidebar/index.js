import React from 'react';
import './Sidebar.css';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import AuthButton from '../AuthButton';
import Logout from '../Logout';

const Sidebar = ({ open, toggle }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className={`SidebarContainer ${open ? '' : 'hidden'}`}>
      <div className="Icon" onClick={toggle}>
        <CloseIcon color="secondary" fontSize="large" />
      </div>
      <div className="SidebarWrapper">
        <div className="SidebarMenu">
          {isAuthenticated && (
            <>
              <a href="/upload" className="SidebarLink" onClick={toggle}>
                Upload
              </a>
              <a href="/favorites" className="SidebarLink" onClick={toggle}>
                Favorites
              </a>
            </>
          )}
          <a href="/gallery" className="SidebarLink" onClick={toggle}>
            Artworks
          </a>

          <a href="/" className="SidebarLink" onClick={toggle}>
            Artists
          </a>
          <a href="/" className="SidebarLink" onClick={toggle}>
            About
          </a>
          <a href="/" className="SidebarLink" onClick={toggle}>
            Contact
          </a>
          {isAuthenticated ? (
            <div className="SidebarLink">
              <Logout />
            </div>
          ) : (
            <div className="SidebarLink">
              <AuthButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
