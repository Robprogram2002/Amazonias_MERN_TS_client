import { useState } from 'react';
import Center from '@components/Layout/Containers/Center';
import AdminSubmit from '@components/UI/Butons/AdminSubmit';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { ImageBanner } from 'types/others';
import { addDepartment, updateDepartment } from 'api/products/departments';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { toast } from 'react-toastify';
import { IDepartment } from 'types/Department';
import { useRouter } from 'next/router';
import styles from './CreateDepartmentForm.module.scss';
import InputField from '../Fields/InputField';
import TextareaField from '../Fields/TextareaField';
import ImageUpload from '../Fields/ImageUpload';

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
});

const CreateDepartmentForm = ({
  department,
}: {
  department: IDepartment | null;
}) => {
  const [images, setImages] = useState<ImageBanner[]>(
    department ? department.banners : []
  );
  const [bannersError, setBannersError] = useState<string | null>(null);
  const router = useRouter();

  const { isLoading, mutate } = useMutation('addDepartment', addDepartment, {
    onSuccess: ({ data, status }) => {
      if (status === 200) {
        toast.success(`Department ${data.name} was created succesfully`);
        setImages([]);
        setBannersError(null);
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const update = useMutation('update-department', updateDepartment, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        router.push('/admin/departments/list');
        toast.success(`Department was updated succesfully`);
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
            name: department?.name || '',
            description: department?.description || '',
          }}
          validateOnBlur
          validateOnChange
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            if (images.length !== 4) {
              setBannersError('Departments must have 4 banner images');
              return actions.resetForm({
                values: {
                  ...values,
                },
              });
            }

            if (department) {
              update.mutate({
                ...values,
                slug: department.slug,
                banners: images,
              });
            } else {
              mutate({
                ...values,
                banners: images,
                slug: null,
              });
            }
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
                  <div style={{ height: '30px' }} />
                )}

                <Center>
                  <AdminSubmit
                    update={department !== null}
                    loading={isLoading || update.isLoading}
                    disabled={
                      !(
                        isValid &&
                        values.name !== '' &&
                        values.description !== ''
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

export default CreateDepartmentForm;
