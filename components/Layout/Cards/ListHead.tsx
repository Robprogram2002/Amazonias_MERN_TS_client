import { FileAddFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';
import styles from './FormHead.module.scss';

const ListHead = ({
  width,
  title,
  redirect,
}: {
  width: string;
  title: string;
  redirect: string;
}) => {
  const router = useRouter();

  return (
    <div className={styles.Container}>
      <div style={{ width }} className={styles.Row}>
        <h1 className={styles.Title}>{title}</h1>
        <button
          type="button"
          className={styles.ListButton}
          onClick={() => router.push(redirect)}
        >
          <FileAddFilled /> <p>Create New</p>
        </button>
      </div>
    </div>
  );
};
export default ListHead;
