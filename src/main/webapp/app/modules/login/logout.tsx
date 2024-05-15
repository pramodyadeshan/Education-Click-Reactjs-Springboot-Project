import { useEffect } from 'react';
import { useAppDispatch } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';

const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      await dispatch(logout());

      window.location.href = '/';
    };

    handleLogout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;
