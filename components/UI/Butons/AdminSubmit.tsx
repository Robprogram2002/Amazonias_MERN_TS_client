import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './AdminSubmit.module.scss';

const MySwal = withReactContent(Swal);

interface AdminSubmitProps {
  loading: boolean;
  disabled: boolean;
  update: boolean;
}

const AdminSubmit = ({ disabled, loading, update }: AdminSubmitProps) => {
  const router = useRouter();

  return (
    <div className={update ? styles.UpdateContainer : ''}>
      <button className={styles.FillButton} type="submit" disabled={disabled}>
        {loading ? <LoadingOutlined /> : 'Submit'}
      </button>
      {update && (
        <button
          className={styles.CancelButton}
          type="button"
          onClick={() => {
            MySwal.fire({
              title: 'Are you sure?',
              text: 'All your changes will not be saved',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes continue!',
            }).then((result) => {
              if (result.isConfirmed) {
                router.back();
              }
            });
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default AdminSubmit;
