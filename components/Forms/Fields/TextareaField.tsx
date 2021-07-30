import { ErrorMessage, Field } from 'formik';
import styles from './InputField.module.scss';

interface InputFieldProps {
  error: boolean;
  name: string;
  placeholder: string;
  label: string;
}

const TextareaField = ({
  error,
  name,
  placeholder,
  label,
}: InputFieldProps) => (
  <>
    <label className={styles.Label} htmlFor={name}>
      {label}
    </label>
    <div
      className={
        error ? styles.TextareaContainerError : styles.TextareaContainer
      }
    >
      <Field
        as="textarea"
        name={name}
        id={name}
        placeholder={placeholder}
        className={styles.Textarea}
        wrap="Soft"
      />
    </div>
    <ErrorMessage
      name={name}
      component="span"
      className={styles.ErrorMessege}
    />
  </>
);

export default TextareaField;
