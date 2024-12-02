import {useState} from 'react'
import style from './css/contact.module.css'
import email from './image/email.png'
import Whatsapp from './image/whatsapp.png';
import Location from './image/location.png';
import { useAuth } from '../store/auth';


const Contact = () => {
  const [formData, setFormData] = useState({
    name:'',
    email:''
  })

  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function Submit(e) {
    e.preventDefault();
    alert("you can't send messages yet")
  }

  alert("This Page is not completed so you can't send messages yet")
  

  return (
    <>
      <div className={style.contact}>
        <div className={style.contactImage}></div>
        <div className={style.contactDetails}>
          <div className={style.formContainer}>
            <h3>Share Your Health Issues Here👇</h3>
            <form className='form' onSubmit={(e) => Submit(e)}>
              <textarea placeholder='Enter  Message' name="Message" required></textarea>
              <div>
                <input type='text'
                name="Name" value={user ? user.username : formData.name} onChange={handleChange} placeholder='Your Name' required/>
                <input type='email' name="Email" value={user ? user.email : formData.email} onChange={handleChange} placeholder='Your Email' required/>
              </div>
              <input type='text' name="Subject" placeholder='Symptom'/>
              <div>
                <input type='number' name='Number' placeholder='Contact Number' required/>
                <input type="submit" value="Submit" className={style.submitButton} />
              </div>
            </form>
          </div>
          <div className={style.contactInfo}>
              <h3>Contact me via WhatsApp.</h3>
              <div>
                <img src={Whatsapp}/>
                <div>
                  <a href='https://wa.me/919889038280'>+91 9889038280 <small>whatsapp</small></a>
                  <p>Sun 12 PM to 4 PM</p>
                </div>
              </div>
              <div>
                <img src={email}/>
                <div>
                  <a href='mailto:sanjivshukla000@gmail.com'>sanjivshukla000@gmail.com</a>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
              <div>
                <img src={Location} style={{marginTop:"27px"}} alt='location'/>
                <div>
                  <a href='' className={style.anchor}>Near IIIT Square, Jhalwa, Prayagraj, Uttar Pradesh</a>
                </div>
              </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Contact
