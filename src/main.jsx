import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import MobileView from './HomeoPathy/MobileView';
import './App.css'
import { AuthProvider } from './store/auth'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// eslint-disable-next-line react-refresh/only-export-components
const Root = () => {

  return(
    <AuthProvider>
      <StrictMode>
         <App />
         <ToastContainer
         position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition: Bounce
         /> 
        <MobileView/>
      </StrictMode>
    </AuthProvider>  
  )
}


createRoot(document.getElementById('root')).render(
  <Root />
)
