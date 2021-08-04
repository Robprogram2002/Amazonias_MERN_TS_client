import { fetchCategoriesByDepartment } from 'api/products/categories';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { ICategory } from 'types/Category';
import styles from './InputField.module.scss';

interface SelectFieldProps {
  error: boolean;
  name: string;
  label: string;
}

const CategoryField = ({ error, name, label }: SelectFieldProps) => {
  const {
    values: { departmentId },
    setFieldValue,
  } = useFormikContext<{
    title: string;
    departmentId: string;
    categoryId: string;
    currency: string;
    sku: string;
    condition: string;
    state: string;
    brand: string;
    availability: string;
    basePrice: number;
    stock: number;
    features: never[];
  }>();

  const { isLoading, data, refetch } = useQuery(
    ['fetch-categories-by-department', departmentId],
    () => fetchCategoriesByDepartment(departmentId),
    {
      enabled: departmentId !== '',
    }
  );

  useEffect(() => {
    if (departmentId !== '') {
      refetch();
    }
  }, [departmentId, setFieldValue, name]);

  return (
    <div>
      <label className={styles.Label} htmlFor={name}>
        {label}
      </label>
      <div
        className={error ? styles.FieldContainerError : styles.FieldContainer}
      >
        <Field as="select" name={name} id={name} className={styles.Field}>
          <option value="">
            {isLoading ? 'Loading categories ...' : 'select option'}
          </option>
          {data &&
            data.data.map((element: ICategory) => (
              <option value={element._id}> {element.name} </option>
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
};

export default CategoryField;
