import { ErrorMessage, Field } from 'formik';
import styles from './InputField.module.scss';

interface InputFieldProps {
  error: boolean;
  type: string;
  name: string;
  placeholder: string;
  label: string;
}

const InputField = ({
  error,
  type,
  name,
  placeholder,
  label,
}: InputFieldProps) => (
  <>
    <label className={styles.Label} htmlFor={name}>
      {label}
    </label>
    <div className={error ? styles.FieldContainerError : styles.FieldContainer}>
      <Field
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={styles.Field}
      />
    </div>
    <ErrorMessage
      name={name}
      component="span"
      className={styles.ErrorMessege}
    />
  </>
);

export default InputField;
