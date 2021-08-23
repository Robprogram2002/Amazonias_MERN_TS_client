import { FC, useContext } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { checkOutContext } from '@context/CheckOutContext';
import styles from './CheckOutMenu.module.scss';

const CheckOutMenu: FC = ({ children }) => {
  const {
    state: { menuData },
  } = useContext(checkOutContext);

  return (
    <div className={styles.Container}>
      <div className={styles.Menu}>
        {menuData.map(({ completed, title, active }, index) => (
          <div className={`${styles.MenuItem} ${active ? styles.Active : ''}`}>
            <div className={styles.MenuIcon}>
              {completed ? <AiOutlineCheck /> : index + 1}
            </div>
            <span> {title} </span>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default CheckOutMenu;
