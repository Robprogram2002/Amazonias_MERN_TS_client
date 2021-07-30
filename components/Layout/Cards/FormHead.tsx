import styles from './FormHead.module.scss';

const FormHead = ({ width, title }: { width: string; title: string }) => (
  <div className={styles.Container}>
    <div style={{ width }} className={styles.Row}>
      <h1 className={styles.Title}>{title}</h1>
      <button type="button" className={styles.HeadButton}>
        Clear
      </button>
    </div>
  </div>
);

export default FormHead;
