import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { authLogout } from '../../store/authSlice';  // Correct import

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(authLogout()); // Dispatch the correct logout action
    }).catch(error => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
