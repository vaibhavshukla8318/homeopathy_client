import style from "../css/navbar.module.css";
import { Link } from 'react-router-dom';
import Home from '../../HomeoPathy/image/home.png'
import About from '../../HomeoPathy/image/about.png';
// import Services from '../image/services.png';
import Blog from '../../HomeoPathy/image/blog.png';
import Contact from '../../HomeoPathy/image/contact.png';
import Logo from '../../HomeoPathy/image/logo.png'
import BeforeSignUpImage from '../../HomeoPathy/image/beforeSignUp.png'
import AfterSignUpImage from '../../HomeoPathy/image/afterSignUp.png'

import { useAuth } from "../../store/auth";

const Navbar = () => {

  const { user, theme } = useAuth();

  return (
    <div className={style.blogNavbar} style={{backgroundColor: theme.primary}}>
      <Link to="/blogs/" className={style.pageLinkDisplayBlock}>
        <p>
          <span>
            Aarogya Sanjeevani Blog
            <img src={Logo} alt='logo'/>
          </span>
        </p>
      </Link>
      <div className={style.rightContainer}>
        <div className={style.displayNone}>
          <a href='/' className={style.link}>
            <span>Home</span>
            <img src={Home} alt='home'/>
          </a>
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
          <Link to='/auth/register/' className={style.link}>
            {!user ?
            <>
              <span><img src={BeforeSignUpImage} alt='contact'/></span>
              <img src={BeforeSignUpImage} alt='contact'/>
            </>
            :
            <>
              <span><img src={AfterSignUpImage} alt='contact'/></span>
              <img src={AfterSignUpImage} alt='contact'/>
            </>
            }
          </Link>
        </div>
        {/* <img src={Blog} alt='menuIcon' onClick={handleMenuClick} /> */}
      </div>
      {/* <Link to="/" className={style.pageLinkDisplayNone}>
        <p>
          <span>
            Aarogya Sanjeevani Blog
            <img src={Logo} alt='logo'/>
          </span>
        </p>
      </Link> */}
    </div>
  );
};

export default Navbar;





