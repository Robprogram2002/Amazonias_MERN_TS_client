import Column from '@components/Layout/Containers/Column';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { fetchDepartments } from 'api/products/departments';
import { useQuery } from 'react-query';
import { useFormikContext } from 'formik';
import { fetchtBrands } from '@api/products/brands';
import { fetchtVendors } from '@api/products/vendors';
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
    vendor: string;
  }>();

  const departments = useQuery('fetch-departments', fetchDepartments, {
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  const brands = useQuery('fetch-brands', fetchtBrands, {
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  const vendors = useQuery('fetch-vendors', fetchtVendors, {
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '47% 50%',
            width: '100%',
            columnGap: '1.4rem',
          }}
        >
          <SelectField
            name="brand"
            error={!!(errors.brand && touched.brand)}
            label="Brand"
            loading={brands.isLoading}
            options={
              brands.data?.map((element) => ({
                id: element.name,
                name: element.name,
              })) || null
            }
          />

          <SelectField
            name="vendor"
            error={!!(errors.vendor && touched.vendor)}
            label="Vendor"
            loading={vendors.isLoading}
            options={
              vendors.data?.map((element) => ({
                id: element._id,
                name: element.name,
              })) || null
            }
          />
        </div>

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
