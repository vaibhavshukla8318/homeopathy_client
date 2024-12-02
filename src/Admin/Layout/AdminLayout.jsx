import { Outlet } from "react-router-dom"
// import Navbar from "../components/Navbar"
// import Footer from "../component/Footer"

const AdminLayout = () => {
  return (
    <>
     {/* <Navbar /> */}
     <>
      <Outlet />
     </>
     {/* <Footer /> */}
    </>
  )
}

export default AdminLayout