import { ErrorMessage, Field } from 'formik';
import styles from './InputField.module.scss';

interface SelectFieldProps {
  error: boolean;
  name: string;
  label: string;
  options: { id: string; name: string }[] | null;
  loading: boolean;
}

const SelectField = ({
  error,
  name,
  label,
  options,
  loading,
}: SelectFieldProps) => (
  <div>
    <label className={styles.Label} htmlFor={name}>
      {label}
    </label>
    <div className={error ? styles.FieldContainerError : styles.FieldContainer}>
      <Field as="select" name={name} id={name} className={styles.Field}>
        <option value="">
          {' '}
          {loading ? 'Loading departments ...' : 'select option'}{' '}
        </option>
        {options &&
          options.map((element) => (
            <option value={element.id} key={element.id}>
              {' '}
              {element.name}{' '}
            </option>
          ))}
      </Field>
    </div>
    <ErrorMessage
      name={name}
      component="span"
      className={styles.ErrorMessege}
    />
  </div>
);

export default SelectField;
