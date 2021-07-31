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
import SimpleIcon from '@components/UI/Icons/SimpleIcon';
import SearchInput from '@components/Forms/Fields/SearchInput';
import styles from './AdminHeader.module.scss';

const index = ({
  toggle,
  collapse,
}: {
  toggle: () => void;
  collapse: boolean;
}) => {
  const { user } = useContext(authContext);
  return (
    <Header className={styles.Header}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SimpleIcon
          icon={collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          handler={toggle}
          outline={false}
        />

        <SearchInput
          width="500px"
          placeholder="Search ..."
          withIcon
          onChangeHandler={() => {}}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SimpleIcon icon={<BulbFilled />} handler={() => {}} outline={false} />

        <SimpleIcon icon={<BellFilled />} handler={() => {}} outline={false} />

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
