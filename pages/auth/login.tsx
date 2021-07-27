import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import LoginContainer from '../../components/Layout/Containers/LoginContainer';
import LoginCard from '../../components/Layout/Cards/LoginCard';
import LoginForm from '../../components/Forms/auth/LoginForm';
import RegisterForm from '../../components/Forms/auth/RegisterForm';
import { authContext } from '../../context/AuthContext';

const LoginPage = () => {
  const { authenticated } = useContext(authContext);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  if (authenticated) {
    router.back();
  }

  return (
    <LoginContainer isLogin={isLogin}>
      {isLogin ? (
        <>
          <LoginCard isLogin={isLogin} setIsLogin={setIsLogin} />
          <LoginForm setIsLogin={setIsLogin} />
        </>
      ) : (
        <>
          <RegisterForm setIsLogin={setIsLogin} />
          <LoginCard isLogin={isLogin} setIsLogin={setIsLogin} />
        </>
      )}
    </LoginContainer>
  );
};

export default LoginPage;
