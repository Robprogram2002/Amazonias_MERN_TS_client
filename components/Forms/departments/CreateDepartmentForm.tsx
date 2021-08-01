import { useState } from 'react';
import Center from '@components/Layout/Containers/Center';
import AdminSubmit from '@components/UI/Butons/AdminSubmit';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { ImageBanner } from 'types/others';
import { addDepartment } from 'api/products/departments';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { toast } from 'react-toastify';
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

const initialValues = {
  name: '',
  description: '',
};

const CreateDepartmentForm = () => {
  const [images, setImages] = useState<ImageBanner[]>([]);
  const [bannersError, setBannersError] = useState<string | null>(null);
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
          initialValues={initialValues}
          validateOnBlur
          validateOnChange
          validationSchema={schema}
          onSubmit={async ({ description, name }, actions) => {
            if (images.length !== 4) {
              setBannersError('Departments must have 4 banner images');
              actions.resetForm({
                values: {
                  description,
                  name,
                },
              });
            } else {
              mutate({
                name,
                description,
                banners: images,
                slug: null,
              });
            }
            actions.resetForm();
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
                    update={false}
                    loading={isLoading}
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
