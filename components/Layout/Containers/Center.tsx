import { FC } from 'react';
import styles from './Center.module.scss';

const Center: FC = ({ children }) => (
  <div className={styles.Center}>{children}</div>
);

export default Center;
