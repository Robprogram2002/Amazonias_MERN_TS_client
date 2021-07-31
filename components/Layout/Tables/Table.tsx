import { FC } from 'react';
import styles from './Table.module.scss';

const Table: FC = ({ children }) => (
  <div className={styles.TableContainer}>
    <table className={styles.Table}>{children}</table>
  </div>
);

export default Table;
