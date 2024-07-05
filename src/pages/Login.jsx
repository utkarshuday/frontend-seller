import { useEffect } from 'react';
import { useUser } from '../context/hooks';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.account) navigate('/create-seller');
  }, [user?.account, navigate]);

  return (
    <>
      <main className='flex flex-col items-center'>
        <div>
          <h1 className='text-3xl font-bold'>Welcome</h1>
        </div>
      </main>
    </>
  );
}

export default Login;
