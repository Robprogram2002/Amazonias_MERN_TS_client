import {
  BellFilled,
  BulbFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useContext } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { authContext } from 'context/AuthContext';
import Avatar from 'antd/lib/avatar/avatar';
import { BsSearch } from 'react-icons/bs';
import styles from './AdminHeader.module.scss';

const index = ({
  toggle,
  collapse,
}: {
  toggle: () => void;
  collapse: boolean;
}) => {
  const { user } = useContext(authContext);
  console.log(user);
  return (
    <Header className={styles.Header}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className={styles.IconContainer}
          onClick={toggle}
          onKeyDown={toggle}
          role="menubar"
          tabIndex={0}
        >
          {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className={styles.SearchContainer}>
          <input type="text" placeholder="Search ..." />
          <div className={styles.SearchIcon}>
            <BsSearch />
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={styles.IconContainer}>
          <BulbFilled />
        </div>
        <div className={styles.IconContainer}>
          <BellFilled />
        </div>
        <div className={styles.ProfileContainer}>
          {user ? (
            <Avatar src={user.photoUrl} size={48} className={styles.Avatar} />
          ) : (
            <Avatar
              icon={<LoadingOutlined size={48} />}
              className={styles.Avatar}
            />
          )}
        </div>
      </div>
    </Header>
  );
};

export default index;
