import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HomeopathyLayout from '../layout/Homeopathy-layout';
import Home from '../Home';
import About from '../About';
import Contact from '../Contact';
import { Loading } from '../LoadingAndError'; // Homeopathy-specific loader

const HomeopathyRouter = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route element={<HomeopathyLayout />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default HomeopathyRouter;
