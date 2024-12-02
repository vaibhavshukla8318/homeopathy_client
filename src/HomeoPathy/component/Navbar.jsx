import { useState } from "react";
import style from "../css/navbar.module.css";
import { Link } from 'react-router-dom';
import Home from '../image/home.png'
import About from '../image/about.png';
// import Services from '../image/services.png';
import Blog from '../image/blog.png';
import Contact from '../image/contact.png';
import Logo from '../image/logo.png';
import SoftwareEngineer from '../image/software-engineer.png'
import BeforeSignUpImage from '../image/beforeSignUp.png'
import AfterSignUpImage from '../image/afterSignUp.png'
import { IoIosCreate } from "react-icons/io";

import { useAuth } from "../../store/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const { user } = useAuth();
  // console.log("this is a coming from main page", user?.username
  // )

  return (
    <div className={style.navbar}>
      <Link to="/" className={style.pageLinkDisplayBlock}>
        <p>
          <span>
            Aarogya Sanjeevani Clinic
            <img src={Logo} alt='logo'/>
          </span>
        </p>
      </Link>
      <div className={style.rightContainer}>
        <div className={`${style.displayNone} ${menuOpen ? style.visible : style.hidden}`}>
          <Link to='/' className={style.link}>
            <span>Home</span>
            <img src={Home} alt='home'/>
          </Link>
          <Link to='/about' className={style.link}>
            <span>About</span>
            <img src={About} alt='about'/>
          </Link>
          <Link to='/blogs/' className={style.link}>
            <span>Blog</span>
            <img src={Blog} alt='blog'/>
          </Link>
          <Link to='/contact' className={style.link}>
            <span>Contact</span>
            <img src={Contact} alt='contact'/>
          </Link>
          {
          user ? 
          <Link to='/admin/' className={style.link}>
            <button className="btn sign-in">Create Blog</button>
            <img src={SoftwareEngineer} alt='SoftwareEngineer'/>
          </Link>
          :
          <Link to='/auth/login/' className={`${style.link} ${style.createBlog}`}>
            <span style={{whiteSpace:"nowrap"}}>Create Blog</span>
            <IoIosCreate style={{height:"45px", width:"45px", color:"#fff"}}/>
          </Link>
          }
          <Link to='/auth/register/' className={style.link}>
            {!user ?
            <>
              <span><img src={BeforeSignUpImage} alt='contact'/></span>
              {/* <img src={BeforeSignUpImage} alt='contact'/> */}
            </>
            :
            <>
              <span><img src={AfterSignUpImage} alt='contact'/></span>
              {/* <img src={AfterSignUpImage} alt='contact'/> */}
            </>
            }
          </Link>
          
        </div>
        <div className={style.menuContainer}>
          <p className={style.username}>{user?.username}</p>
          <img className={style.menu} src={Blog} alt='menuIcon' onClick={handleMenuToggle} />
        </div>
      </div>
      <Link to="/" className={style.pageLinkDisplayNone}>
        <p>
          <span>
            Aarogya Sanjeevani Clinic
            <img src={Logo} alt='logo'/>
          </span>
        </p>
      </Link>
    </div>
  );
};

export default Navbar;
