import { NavBar } from 'components';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
