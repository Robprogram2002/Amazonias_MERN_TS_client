import Column from '@components/Layout/Containers/Column';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { fetchDepartments } from 'api/products/departments';
import { useQuery } from 'react-query';
import { useFormikContext } from 'formik';
import CategoryField from '../Fields/CategoryField';
import InputField from '../Fields/InputField';
import SelectField from '../Fields/SelectField';
import SubCategoryField from '../Fields/SubCategoryField';

const ProductGeneral = ({ menuKey }: { menuKey: string }) => {
  const { errors, touched } = useFormikContext<{
    title: string;
    categoryId: string;
    departmentId: string;
    brand: string;
  }>();

  const departments = useQuery('fetch-departments', fetchDepartments, {
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  if (menuKey === 'general') {
    return (
      <Column>
        <InputField
          name="title"
          error={!!(errors.title && touched.title)}
          label="Title"
          placeholder="Type here ..."
          type="text"
        />

        <div style={{ height: '30px' }} />

        <SelectField
          name="brand"
          error={!!(errors.brand && touched.brand)}
          label="Brand"
          loading={false}
          options={[
            { id: 'new', name: 'new' },
            { id: 'used', name: 'used' },
            { id: 'repared', name: 'repared' },
            { id: 'refurbished', name: 'refurbished' },
          ]}
        />

        <div style={{ height: '30px' }} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '47% 50%',
            width: '100%',
            columnGap: '1.4rem',
          }}
        >
          <SelectField
            name="departmentId"
            error={!!(errors.departmentId && touched.departmentId)}
            label="Department"
            loading={departments.isLoading}
            options={
              departments.data?.data.map((element: any) => ({
                id: element._id,
                name: element.name,
              })) || null
            }
          />

          <CategoryField
            name="categoryId"
            error={!!(errors.categoryId && touched.categoryId)}
            label="Category"
          />
        </div>

        <div style={{ height: '30px' }} />

        <SubCategoryField name="subs" label="Subcategories" />
      </Column>
    );
  }

  return <div style={{ display: 'none' }} />;
};

export default ProductGeneral;
