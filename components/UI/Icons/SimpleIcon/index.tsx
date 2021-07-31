import { ReactElement } from 'react';
import styles from './SimpleIcon.module.scss';

const SimpleIcon = ({
  icon,
  handler,
  outline,
}: {
  icon: ReactElement;
  handler: any;
  outline: boolean;
}) => (
  <div
    className={outline ? styles.IconOutlineContainer : styles.IconContainer}
    onClick={handler}
    onKeyDown={handler}
    role="button"
    tabIndex={0}
  >
    {icon}
  </div>
);

export default SimpleIcon;
