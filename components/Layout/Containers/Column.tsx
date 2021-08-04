import { FC } from 'react';
import styles from './Column.module.scss';

const Column: FC = ({ children }) => (
  <div className={styles.Column}>{children}</div>
);

export default Column;
