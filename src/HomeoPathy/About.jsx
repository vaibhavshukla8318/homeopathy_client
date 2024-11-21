/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import styles from './css/about.module.css'; // Importing CSS module

import Logo from './image/logo.png';
import Email from './image/email.png';
import Whatsapp from './image/whatsapp.png';
import Facebook from './image/facebook.png';
import Location from './image/location.png';
import Image1 from './image/image1.png';
import Image2 from './image/image2.png';
import Image3 from './image/image3.png';
import Image4 from './image/image4.png';
import Image5 from './image/image5.png';

// Slider Component
const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

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
    <div className={styles.slider}>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${image})`,
            display: index === currentIndex ? 'block' : 'none',
          }}
          className={styles.sliderImage}
        />
      ))}
      <button
        onClick={goToPreviousSlide}
        style={{
          height: '30px',
          width: '30px',
          position: 'absolute',
          top: '30%',
          left: '10px',
          transform: 'translateY(-50%)',
          zIndex: 999,
          cursor: 'pointer',
        }}
      >
        &lt;
      </button>
      <button
        onClick={goToNextSlide}
        style={{
          height: '30px',
          width: '30px',
          position: 'absolute',
          top: '30%',
          right: '10px',
          transform: 'translateY(-50%)',
          zIndex: 999,
          cursor: 'pointer',
        }}
      >
        &gt;
      </button>
    </div>
  );
};

// Example images for the Slider
const images = [Image1, Image2, Image3, Image4, Image5];

// About Component
const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <Slider images={images} />
      <section className={styles.firstSection}>
        <h2 className={styles.aboutTitle}>About Electrohomeopathy</h2>
        <p className={styles.aboutText}>
          <span className={styles.electrohomeopathy}>Electrohomeopathy</span> was devised by Count Cesare Mattei (1809–1896) in the latter part of the 19th Century. Mattei, a nobleman living in a castle in the vicinity of Bologna studied natural science, anatomy, physiology, pathology, chemistry, and botany. He ultimately focused on the supposed therapeutic power of electricity (Organic medicines and Electricities) in botanical extract.
        </p>
        <p className={styles.aboutText}>
          According to Mattei’s own ideas, every disease originates in the change of blood or of the lymphatic system or both. Remedies can therefore be mainly divided into two broad categories to be used in response to the dominant affected system. Mattei wrote that having obtained plant extracts, he was able to determine in the liquid vegetable electricity.
        </p>
        <p>
          <span className={styles.electrohomeopathy}>Electrohomeopathy</span> is a plant-oriented system of herbal medicine. The <span className={styles.electrohomeopathy}>Electrohomeopathy</span> remedies purify the lymph and blood system of the human body. With Electrohomeopathy, we can find and destroy the gravest disorders of the organism by purifying it, or we can help prevent disease by keeping the body pure and respecting the Will of the Creator.
        </p>
      </section>
      <section className={styles.secondSection}>
        <h2>Principles of Electrohomeopathy:</h2>
        <ul>
          <li>
            <span>OD Force Balance:</span>{' '}
            <span className={styles.electrohomeopathy}>Electrohomeopathy</span> operates on the principle that the body possesses a natural OD force or energy, which, when imbalanced, leads to disease. The remedies are believed to restore this balance, promoting the body's ability to heal itself.
          </li>
          <li>
            <span>Individualized Treatment:</span> Unlike homeopathy,{' '}
            <span className={styles.electrohomeopathy}>Electrohomeopathy</span> emphasizes individualized treatment based on the patient's unique symptoms, constitution, and overall health status.
          </li>
          <li>
            <span>Holistic Approach:</span>{' '}
            <span className={styles.electrohomeopathy}>Electrohomeopathy</span> considers the interconnectedness of body, mind, and spirit, aiming for harmony in physical, emotional, and spiritual well-being.
          </li>
        </ul>
      </section>
      <section className={styles.thirdSection}>
        <h2 className={styles.heading}>Benefits and Effectiveness:</h2>
        <ul className={styles.list}>
          <li>
            <span>Non-Invasive:</span>{' '}
            <span className={styles.electrohomeopathy}>Electrohomeopathy</span> offers non-invasive treatment options, suitable for individuals seeking gentle healing.
          </li>
          <li>
            <span>Safe for All Ages:</span>{' '}
            <span className={styles.electrohomeopathy}>Electrohomeopathy</span> is safe for people of all ages.
          </li>
          <li>
            <span>Complementary to Conventional Medicine:</span>{' '}
            Can be used alongside conventional treatments as a complementary therapy.
          </li>
          <li>
            <span>Treatment of Various Health Conditions:</span> Suitable for respiratory, digestive, skin, hormonal, and emotional conditions.
          </li>
          <li>
            <span>Promotion of Well-Being:</span> Promotes overall vitality and quality of life.
          </li>
        </ul>
      </section>
      <section className={styles.fourthSection}>
        <div className={styles.contactInfo}>
          <div>
            <h2>Contact Info:</h2>
            <p>
              <img src={Email} alt="email" />
              <a href="mailto:sanjivshukla000@gmail.com">sanjivshukla000@gmail.com</a>
            </p>
            <p>
              <img src={Whatsapp} alt="whatsapp" />
              <a href="https://wa.me/919889038280">+91 9889038280</a>
            </p>
            <p>
              <img src={Location} alt="location" />
              <a href="" className={styles.anchor}>
                Near IIIT Square, Jhalwa, Prayagraj, Uttar Pradesh
              </a>
            </p>
          </div>
          <div>
            <h2>Social Media:</h2>
            <a href="https://www.facebook.com/Dr.Sanjivshukla?mibextid=kFxxJD">
              <img src={Facebook} alt="facebook" />
            </a>
          </div>
          <div className={styles.sanjeevaniCircle}>
            <img src={Logo} alt="logo" />
          </div>
        </div>
        <div className={styles.copyRight}>
          Copyright © 2024 Dr. Sanjiv Shukla. All rights reserved.
        </div>
      </section>
    </div>
  );
};

export default About;
