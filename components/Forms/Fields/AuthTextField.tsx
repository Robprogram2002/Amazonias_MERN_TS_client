import { ErrorMessage, Field } from 'formik';
import styles from './AuthTextField.module.scss';

interface AuthTextFieldProps {
  error: boolean;
  name: string;
  label: string;
  type: string;
}

const AuthTextField = ({ error, name, label, type }: AuthTextFieldProps) => (
  <div>
    <div
      className={
        error
          ? `${styles.FieldContainer} ${styles.Error}`
          : styles.FieldContainer
      }
    >
      <Field
        type={type}
        name={name}
        id={name}
        placeholder={label}
        className={styles.Field}
      />
    </div>
    <ErrorMessage name={name} component="span" className={styles.Message} />
  </div>
);

export default AuthTextField;
