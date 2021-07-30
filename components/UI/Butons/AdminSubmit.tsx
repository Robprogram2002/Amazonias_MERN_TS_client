import styles from './AdminSubmit.module.scss';

interface AdminSubmitProps {
  loading: boolean;
  disabled: boolean;
}

const AdminSubmit = ({ disabled, loading }: AdminSubmitProps) => (
  <button className={styles.FillButton} type="submit" disabled={disabled}>
    {loading ? 'Loading ...' : 'Submit'}
  </button>
);

export default AdminSubmit;
