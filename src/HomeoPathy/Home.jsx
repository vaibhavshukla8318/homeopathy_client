/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import style from './css/home.module.css';
import Logo from './image/logo.png';
import Email from './image/email.png';
import Whatsapp from './image/whatsapp.png';
import Facebook from './image/facebook.png';
import Location from './image/location.png';
import Image1 from './image/image1.png'
import Image2 from './image/image2.png'
import Image3 from './image/image3.png'
import Image4 from './image/image4.png'
import Image5 from './image/image5.png'

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

 



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={style.slider}>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${image})`,
            display: index === currentIndex ? 'block' : 'none',
          }}
          className={style.sliderImage}
        ></div>
      ))}
      <button
        onClick={goToPreviousSlide}
        style={{
          height:"30px",
          width:"30px",
          position: 'absolute',
          top: '40%',
          left: '10px',
          transform: 'translateY(-50%)',
          zIndex: 999,
          cursor:"pointer"
        }}
      >
        &lt;
      </button>
      <button
        onClick={goToNextSlide}
        style={{
          height:"30px",
          width:"30px",
          position: 'absolute',
          top: '40%',
          right: '10px',
          transform: 'translateY(-50%)',
          zIndex: 999,
          cursor:"pointer"

        }}
      >
        &gt;
      </button>
    </div>
  );
};


// Example usage:
const images = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5
  // Add more image URLs as needed
];

const Home = () => {
 

  return (
    <>
      <div className={style.homePage}>
        {/* <div className={style.doctorCardContainer}>
          <div className={style.doctorCard}>
            <div className={style.doctorImage}>
            </div>
            <div className={style.doctorDetails}>
                <h2>Dr. Sanjiv Shukla</h2>
                <ul>
                    <li>BEMS (Bachelor of Electro Homeopathic Medicine and Surgery)</li>
                    <li>MDEH (Master of Electro Homeopathy)</li>
                    <li>PGDNYS (Post Graduate Diploma in Naturopathy and Yoga Science)</li>
                </ul>
            </div>
          </div>
        </div> */}
        <Slider images={images} />
        <section className={style.section1}>
          <div>
            <h3>Welcome to <span style={{ color: "rgb(207, 63, 147)" }}>Aarogya Sanjeevani Clinic</span> – Empowering Health Through <span className={style.electrohomeopathy}>Electrohomeopathy</span></h3>
            <p>
              <span className={style.electrohomeopathy}>Electrohomeopathy</span> is a holistic system of medicine which is based on plant kingdom only. Developed in the late 19th century by Italian physician Count Cesare Mattei, <span className={style.electrohomeopathy}>Electrohomeopathy</span> aims to restore health by using preparations derived from plants which is named as Spagiric essence.
              <br/>
              Cause of disease in <span className={style.electrohomeopathy}>Electrohomeopathy</span> is <mark>"Vitiation of blood and lymph"</mark>. <span className={style.electrohomeopathy}>Electrohomeopathy</span> medicines remove the vitiation of these and restore the health.
            </p>
          </div>
        </section>
        
        <section className={style.section2}>
          <div className={style.contactInfo}>
            <div>
              <h2>Contact Info:</h2>
              <p>
                <img src={Email} alt='email'/> 
                <a href="mailto:sanjivshukla000@gmail.com">sanjivshukla000@gmail.com</a>
              </p>
              <p>        
                 <img src={Whatsapp} alt='whatsapp'/>
                <a href="https://wa.me/919889038280">+91 9889038280</a>
              </p>
              <p>        
                 <img src={Location} alt='location'/>
                <a href="" className={style.anchor}>Near IIIT Square, Jhalwa, Prayagraj, Uttar Pradesh</a>
              </p>
            </div>
            <div>
              <h2>Social Media:</h2>
              <a href='https://www.facebook.com/Dr.Sanjivshukla?mibextid=kFxxJD'><img src={Facebook} alt='fb'/></a>
            </div> 
            <div className={style.sanjeevaniCircle}>
              {/* <div className={style.sanjeevaniText}></div> */}
              <img src={Logo} alt='logo'/>
            </div>

          </div>
          <div className={style.copyRight}>
            Copyright © 2024 Dr. Sanjiv Shukla. All rights reserved.
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
