import { useState, useEffect, useRef } from 'react';
import './css/Blog.css';
import { FaGreaterThan } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';
import { Loading } from '../HomeoPathy/LoadingAndError';

const Blog = () => {
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const searchContainerRef = useRef(null);

  const {blog, API} = useAuth();
  // console.log("This blog is coming from the blog page", blog)

  const handleClickOutside = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setMenu(false);
      setVisible(false);
    }
  };

  useEffect(() => {
    setLoading(false);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
   
  }, []);

  return (
    <div className="blog-container">
      <div className="topContainer">
        <div className={`searchContainer ${menu ? "active" : ""}`} ref={searchContainerRef}>
          <div className="categories">
            <span>Categories</span>
            <MdCategory className="icon" />
          </div>
          <div className="bookmarks">
            <span>Bookmarks</span>
            <FaRegBookmark className="icon" />
          </div>
          <div className="search">
            <input
              type="search"
              placeholder="Search"
              className={visible ? 'visible' : 'hidden'}
            />
            <IoSearch
              className="searchIcon"
              onClick={() => setVisible((prev) => !prev)}
            />
          </div>
        </div>
        <span className="searchContainerButton" onClick={() => setMenu((prev) => !prev)}>
          <FaGreaterThan />
        </span>
      </div>
      <div className="mainContainer"> 
        <div className="blogPostContent">
          <img src="https://wallpapercave.com/wp/wp7348236.jpg" alt="Blog Thumbnail" />
          <div className="contentDetails">
            <h1>Blog Post Title</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
        </div>
       {!loading ?(
         <div className="blog-post-container">
         {blog?.map((post, index) => (
           <Link to={`/blogs/${post._id}`} className="blogPost" key={index}
           >
              <img
               src={
                 post.image
                   ? post.image.startsWith('http://') || post.image.startsWith('https://')
                     ? post.image
                     : `${API}${post.image}`
                   : 'fallback.jpg'
               }
               alt="book cover"
             />
             <div className="blogPostDetails">
               <h2>{post.title}</h2>
             </div>
           </Link>
         ))}
       </div>
       ) :
       <p>please wait...</p>
       }
      </div>      
    </div>
  );
};

export default Blog;