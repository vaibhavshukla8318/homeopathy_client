import style from "../css/navbar.module.css";
import { Link } from 'react-router-dom';
import Home from '../image/home.png'
import About from '../image/about.png';
// import Services from '../image/services.png';
import Blog from '../image/blog.png';
import Contact from '../image/contact.png';
import Logo from '../image/logo.png'
import BeforeSignUpImage from '../image/beforeSignUp.png'
import AfterSignUpImage from '../image/afterSignUp.png'

import { useAuth } from "../../store/auth";

const Navbar = () => {

  const { user } = useAuth();
  console.log(user)

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
        <div className={style.displayNone}>
          <Link to='/' className={style.link}>
            <span>Home</span>
            <img src={Home} alt='home'/>
          </Link>
          <Link to='/about' className={style.link}>
            <span>About</span>
            <img src={About} alt='about'/>
          </Link>
          <a href='/blogs/' className={style.link}>
            <span>Blog</span>
            <img src={Blog} alt='blog'/>
          </a>
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





