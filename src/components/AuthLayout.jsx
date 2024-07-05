import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../context/hooks';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { user } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user?.account) return navigate('/');
    if (user?.data?.accountCreated) return navigate('/admin/add-product');
    if (user?.account && !user?.data?.accountCreated)
      return navigate('/create-seller');
  }, [user, navigate]);

  return <div>{user.account && <Outlet />}</div>;
}
