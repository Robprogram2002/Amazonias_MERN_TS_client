import { FC } from 'react';
import styles from './LoginContainer.module.scss';

const LoginContainer: FC<{ isLogin: boolean }> = ({ children, isLogin }) => (
  <div className={styles.Center}>
    <div className={styles.Card}>
      <div className={isLogin ? styles.LeftDouble : styles.RigthDouble}>
        {children}
      </div>
    </div>
  </div>
);

export default LoginContainer;
