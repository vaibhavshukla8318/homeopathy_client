import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the individual routers
import HomeopathyRouter from '../HomeoPathy/Router/Router';
import BlogRouter from '../Blogs/Router/Router';
import AuthRouter from '../Authentication/Router/AuthRouter';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homeopathy Routes */}
        <Route path="/*" element={<HomeopathyRouter />} />

        {/* Blog Routes */}
        <Route path="/blogs/*" element={<BlogRouter />} />

        {/* Authentication Routes */}
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
