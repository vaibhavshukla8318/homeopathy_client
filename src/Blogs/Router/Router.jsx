import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import BlogLayout from '../layout/Blog-layout';
import Blog from '../Blogs';
import BlogContent from '../pages/Content';
import { LoadingBlog } from '../LoadingAndError';

const BlogRouter = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // return <LoadingBlog />;
  }

  return (
    <Routes>
      <Route element={<BlogLayout />}>
        <Route path="/" element={<Blog />} />
        <Route path="/:id" element={<BlogContent />} />
      </Route>
    </Routes>
  );
};

export default BlogRouter;
