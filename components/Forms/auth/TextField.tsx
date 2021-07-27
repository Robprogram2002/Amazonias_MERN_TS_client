import { ErrorMessage, Field } from 'formik';
import styles from './TextField.module.scss';

// formikProps.errors.email && formikProps.touched.email ? true : false;

interface TextFieldProps {
  error: boolean;
  type: string;
  name: string;
  placeholder: string;
}

const TextField = ({ error, type, name, placeholder }: TextFieldProps) => (
  <>
    <div className={error ? styles.FieldContainerError : styles.FieldContainer}>
      <div className={styles.InputRow}>
        {/* <Icon icon_name="far fa-envelope" /> */}
        <span>*</span>
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className={styles.Field}
        />
      </div>
    </div>
    <ErrorMessage
      name={name}
      component="span"
      className={styles.ErrorMessege}
    />
  </>
);

export default TextField;
