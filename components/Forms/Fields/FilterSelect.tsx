import styles from './InputField.module.scss';

interface FilterSelectProps {
  options: { id: string; name: string }[] | null;
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  handler: (event: any) => void;
  placeholder: string;
}

const FilterSelect = ({
  options,
  loading,
  handler,
  placeholder,
}: FilterSelectProps) => (
  <>
    <div className={styles.FieldContainer}>
      <select className={styles.Field} onChange={handler}>
        {placeholder !== '' && (
          <option value=""> {loading ? 'Loading ...' : placeholder} </option>
        )}
        {options &&
          options.map((element) => (
            <option value={element.id}> {element.name} </option>
          ))}
      </select>
    </div>
  </>
);

export default FilterSelect;
