import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
// import Footer from "../component/Footer"

const BlogLayout = () => {
  return (
    <>
     <Navbar />
     <>
      <Outlet />
     </>
     {/* <Footer /> */}
    </>
  )
}

export default BlogLayout