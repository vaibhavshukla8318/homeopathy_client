import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AdminLayout from '../Layout/AdminLayout';
import Admin from '../Admin';
import { LoadingAdmin } from '../Loading'; 

const AdminRouter = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // return <LoadingAdmin />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
