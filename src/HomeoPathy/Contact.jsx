
import style from './css/contact.module.css'
import email from './image/email.png'
import Whatsapp from './image/whatsapp.png';
import Location from './image/location.png';
import { useAuth } from '../store/auth';


const Contact = () => {

  const { user } = useAuth();
  console.log("this is coming from the contact page" , user)

  function Submit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    const formEle = document.querySelector("form");
    const formDatab = new FormData(formEle);
    fetch(
      // "https://script.google.com/macros/s/AKfycby5oxuFTDXRcunEV7Q3296z1GlMnyjq-R07uXRa6defXjPpwRhs03_VSsk5US8Lnkcd4g/exec",
      {
        method: "POST",
        body: formDatab
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
      })
      .catch((error) => {
        console.log(error);
      });
      window.alert("Form submitted successfully!"); // Show alert box
      formEle.querySelector('[name="Message"]').value = '';
        formEle.querySelector('[name="Name"]').value = '';
        formEle.querySelector('[name="Email"]').value = '';
        formEle.querySelector('[name="Subject"]').value = '';
        formEle.querySelector('[name="Number"]').value = '';
  }
  

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
                name="Name" value={user.username} placeholder='Your Name' required/>
                <input type='email' name="Email" value={user.email} placeholder='Your Email' required/>
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
