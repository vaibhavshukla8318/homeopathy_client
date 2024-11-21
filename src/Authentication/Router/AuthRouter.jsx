import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthLayout from '../layout/Auth-layout';
import Register from '../Register';
import Login from '../Login';
import OtpVerification from '../OtpVerification';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import { LoadingAuth } from '../LoadingAndError';

const AuthRouter = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingAuth />;
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="verify-otp" element={<OtpVerification />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default AuthRouter;
