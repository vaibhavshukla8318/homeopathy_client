import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"
import Footer from "../component/Footer"

const HomeopathyLayout = () => {
  return (
    <>
     <Navbar />
     <>
      <Outlet />
     </>
     <Footer />
    </>
  )
}

export default HomeopathyLayout