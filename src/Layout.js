import React from 'react';
import Navbar from './components/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar  className="navbar" />
      <main>{children}</main>
    </div>
  );
};

export default Layout;