// import React from 'react';
import './css/Home.css';
import { useAuth } from '../store/auth';

const Blog = () => {
  const { logout } = useAuth();

  return (
    <div className=" blog-container ">
        <h1>Welcome to Blogging Website</h1>
        <p>Explore blogs, share your thoughts, and enjoy reading!</p>
        <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Blog;
