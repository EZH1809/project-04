import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { fetchUserInfo } from '../../redux/user/operations';
import RestrictedRoute from '../../components/RestricktedRoute';
import PrivateRoute from '../../components/PrivateRoute';
import HomePage from '../../pages/HomePage/HomePage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import TrackerPage from '../../pages/TrackerPage/TrackerPage';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
import { Setting } from 'components/Setting/Setting.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signin"
          element={
            <RestrictedRoute redirectTo="/tracker" component={<SignInPage />} />
          }
        />
        <Route path="setting" element={<Setting />} />
        <Route
          path="/tracker"
          element={
            <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
          }
        />
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/tracker" element={<TrackerPage />}></Route>
      </Routes>
    </>
  );

  // );
}
