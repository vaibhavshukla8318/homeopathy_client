import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AdminLayout from '../Layout/AdminLayout';
import Admin from '../Admin';

const AdminRouter = () => {

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
