import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import LoginContainer from '../../components/Layout/Containers/LoginContainer';
import LoginCard from '../../components/Layout/Cards/LoginCard';
import LoginForm from '../../components/Forms/auth/LoginForm';
import RegisterForm from '../../components/Forms/auth/RegisterForm';
import { authContext, authFunctContext } from '../../context/AuthContext';
import { loginRequest, registerRequest } from '../../api/authentication/index';
import onErrorHandler from '../../api/authentication/onErrorHandler';

const LoginPage = () => {
  const { authenticated } = useContext(authContext);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { login } = useContext(authFunctContext);

  const loginMutation = useMutation(loginRequest, {
    onSuccess: ({ status, data }) => {
      if (status === 200) {
        login(data.user);
        router.push(data.user.role === 'customer' ? '/' : '/admin/dashboard');
      }
    },
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  const registerMutation = useMutation(registerRequest, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        setIsLogin(true);
        toast.success(
          'Account register succesfully. We have send you an email to verify your address'
        );
      }
    },
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  if (authenticated) {
    router.back();
  }

  return (
    <LoginContainer isLogin={isLogin}>
      {isLogin ? (
        <>
          <LoginCard isLogin={isLogin} setIsLogin={setIsLogin} />
          <LoginForm
            loading={loginMutation.isLoading}
            loginRequest={loginMutation.mutate}
          />
        </>
      ) : (
        <>
          <RegisterForm
            loading={registerMutation.isLoading}
            registerRequest={registerMutation.mutate}
          />
          <LoginCard isLogin={isLogin} setIsLogin={setIsLogin} />
        </>
      )}
    </LoginContainer>
  );
};

export default LoginPage;
