import styles from './FormHead.module.scss';

const FormHead = ({
  width,
  title,
  update,
}: {
  width: string;
  title: string;
  update: boolean;
}) => (
  <div className={styles.Container}>
    <div style={{ width }} className={styles.Row}>
      <h1 className={styles.Title}>{title}</h1>
      {!update && (
        <button type="button" className={styles.HeadButton}>
          Clear
        </button>
      )}
    </div>
  </div>
);

export default FormHead;
