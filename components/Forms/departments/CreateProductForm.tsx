import { useState } from 'react';
import Center from '@components/Layout/Containers/Center';
import AdminSubmit from '@components/UI/Butons/AdminSubmit';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'react-query';
import { fetchDepartments } from 'api/products/departments';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { addCategory, updateCategory } from 'api/products/categories';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ImageBanner } from 'types/others';
import styles from './CreateDepartmentForm.module.scss';
import InputField from '../Fields/InputField';
import TextareaField from '../Fields/TextareaField';
import ImageUpload from '../Fields/ImageUpload';
import SelectField from '../Fields/SelectField';

const schema = Yup.object({
  name: Yup.string()
    .trim()
    .required('name is required')
    .min(4, 'name must be at least 4 characters')
    .max(70, 'too long name'),
  description: Yup.string()
    .trim()
    .required('description is required')
    .min(50, 'description must be at least 50 characters'),
  departmentId: Yup.string().trim().required('is required select a department'),
});

const CreateProductForm = ({
  type,
  product,
}: {
  type: string;
  product: any;
}) => {
  const [images, setImages] = useState<ImageBanner[]>([]);
  const [bannersError, setBannersError] = useState<string | null>(null);
  const router = useRouter();
  console.log(type);

  const { isLoading, mutate } = useMutation('addCategory', addCategory, {
    onSuccess: ({ data, status }) => {
      if (status === 200) {
        toast.success(`Category ${data.name} was created succesfully`);
        setImages([]);
        setBannersError(null);
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const departments = useQuery('fetch-departments', fetchDepartments, {
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  const update = useMutation('updateSubCategory', updateCategory, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        router.push('/admin/categories/list');
        toast.success(`Category was updated succesfully`);
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: 'auto',
      }}
    >
      <div className={styles.Container}>
        <Formik
          initialValues={{
            name: product?.name || '',
            description: product?.description || '',
            departmentId: product?.departmentId || '',
          }}
          validateOnBlur
          validateOnChange
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            if (images.length !== 4) {
              setBannersError('Departments must have 4 banner images');
              return actions.resetForm({
                values,
              });
            }
            if (product) {
              return update.mutate({
                ...values,
                slug: product.slug,
                banners: images,
              });
            }
            mutate({
              ...values,
              banners: images,
              slug: null,
            });
            return actions.resetForm();
          }}
        >
          {({ handleSubmit, isValid, errors, touched, values }) => (
            <Form role="form" autoComplete="Off" onSubmit={handleSubmit}>
              <div className={styles.Column}>
                <ImageUpload
                  label="Image Banners  (Four required)"
                  handler={setImages}
                  images={images}
                />

                {bannersError && (
                  <span className={styles.ErrorMessege}> {bannersError} </span>
                )}

                <InputField
                  name="name"
                  error={!!(errors.name && touched.name)}
                  label="Name"
                  placeholder="Type here ..."
                  type="text"
                />

                {errors.name && touched.name ? null : (
                  <div style={{ height: '20px' }} />
                )}

                <TextareaField
                  name="description"
                  error={!!(errors.description && touched.description)}
                  label="Description"
                  placeholder="Type here ..."
                />

                {errors.description && touched.description ? null : (
                  <div style={{ height: '20px' }} />
                )}

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

                <div style={{ height: '30px' }} />

                <Center>
                  <AdminSubmit
                    update={product !== null}
                    loading={isLoading}
                    disabled={
                      !(
                        isValid &&
                        values.name !== '' &&
                        values.description !== '' &&
                        values.departmentId !== ''
                      )
                    }
                  />
                </Center>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProductForm;
