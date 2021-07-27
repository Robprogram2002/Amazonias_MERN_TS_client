import LoginIcon from '../../UI/Icons/LoginIcon';
import RegisterIcon from '../../UI/Icons/RegisterIcon';
import Center from '../Containers/Center';

import styles from './LoginCard.module.scss';

interface LoginCardProps {
  isLogin: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLogin: (val: boolean) => void;
}

const LoginCard = ({ isLogin, setIsLogin }: LoginCardProps) => {
  const onClicHandler = () => {
    if (isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  return (
    <div className={styles.Container}>
      <div>
        <h2 className={styles.LoginHeading}>
          {isLogin
            ? 'Welcome Again! New products are waiting for you'
            : 'Thousands of products at the best price and quality'}
        </h2>
      </div>
      <div className={styles.ImageContainer}>
        <Center>{isLogin ? <LoginIcon /> : <RegisterIcon />}</Center>
      </div>

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <span
        className={styles.Paragraph}
        onClick={onClicHandler}
        onKeyDown={onClicHandler}
      >
        {isLogin
          ? 'Are you still not have an account ? Register now !'
          : 'Are you already have an account ? Login now !'}
      </span>
    </div>
  );
};

export default LoginCard;
