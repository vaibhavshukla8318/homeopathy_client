import style from '../css/footer.module.css'
import DoctorImage1 from '../image/doctorImage.jpg'

const Footer = () => {
  return (
    <div className={style.doctorCardContainer}>
    <div className={style.doctorCard}>
      <div className={style.doctorImage}>
        <img src={DoctorImage1}/>
      </div>
      <div className={style.doctorDetails}>
          <h2>Dr. Sanjiv Shukla</h2>
          <ul>
              <li>BEMS, MDEH, PGDNYS</li>
              {/* <li>MDEH</li>
              <li>PGDNYS</li> */}
          </ul>
      </div>
    </div>
   </div>
  )
}

export default Footer