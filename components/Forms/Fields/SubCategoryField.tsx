import { ErrorMessage, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import { fetchSubsByCategory } from '../../../api/products/subCategories';
import { ISubCategory } from '../../../types/SubCategory';
import styles from './InputField.module.scss';

const { Option } = Select;

interface SelectFieldProps {
  name: string;
  label: string;
}

const SubCategoryField = ({ name, label }: SelectFieldProps) => {
  const {
    values: { categoryId },
    setFieldValue,
  } = useFormikContext<{
    title: string;
    departmentId: string;
    categoryId: string;
    subs: string[];
  }>();

  const { isLoading, data, refetch } = useQuery(
    ['fetch-subs-by-category', categoryId],
    () => fetchSubsByCategory(categoryId),
    {
      enabled: categoryId !== '',
    }
  );

  useEffect(() => {
    if (categoryId !== '') {
      refetch();
    }
  }, [categoryId, setFieldValue, name]);

  const handleChange = (value: string[]) => {
    setFieldValue('subs', value, true);
  };

  return (
    <div>
      <label className={styles.Label} htmlFor={name}>
        {label}
      </label>

      <Select
        mode="multiple"
        placeholder="select subcategories"
        onChange={handleChange}
        optionLabelProp="label"
        loading={isLoading}
        className={styles.MultiSelect}
        disabled={categoryId === ''}
        size="large"
      >
        {data &&
          categoryId !== '' &&
          data.data.map((sub: ISubCategory) => (
            <Option value={sub._id} label={sub.name} key={sub._id}>
              {sub.name}
            </Option>
          ))}
      </Select>
      <ErrorMessage
        name={name}
        component="span"
        className={styles.ErrorMessege}
      />
    </div>
  );
};

export default SubCategoryField;
