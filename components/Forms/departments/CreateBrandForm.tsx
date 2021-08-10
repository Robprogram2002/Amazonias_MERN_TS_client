import Center from '@components/Layout/Containers/Center';
import AdminSubmit from '@components/UI/Butons/AdminSubmit';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { addBrand, updateBrand } from '@api/products/brands';
import { IBrand } from 'types/Brand';
import { ImageBanner } from 'types/others';
import { useState } from 'react';
import styles from './CreateDepartmentForm.module.scss';
import InputField from '../Fields/InputField';
import ImageUpload from '../Fields/ImageUpload';

const schema = new Yup.ObjectSchema({
  name: Yup.string()
    .trim()
    .required('name is required')
    .min(4, 'name must be at least 4 characters')
    .max(70, 'too long name'),
  //   logo: Yup.object({
  //     publicId: Yup.string().required('logo image is required'),
  //     url: Yup.string().required('logo image is required'),
  //   }),
});

const CreateBrandForm = ({ brand }: { brand: IBrand | null }) => {
  const [images, setImages] = useState<ImageBanner[]>(
    brand ? [brand.logo] : []
  );
  const [bannersError, setBannersError] = useState<string | null>(null);

  const router = useRouter();

  const { isLoading, mutate } = useMutation('add-brand', addBrand, {
    onSuccess: ({ data, status }) => {
      if (status === 200) {
        setImages([]);
        setBannersError(null);
        toast.success(`Brand ${data.name} was created succesfully`);
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const update = useMutation('update-brand', updateBrand, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        router.push('/admin/brands/list');
        toast.success(`Brand was updated succesfully`);
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
            name: brand?.name || '',
          }}
          validateOnBlur
          validateOnChange
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            if (images.length <= 0) {
              setBannersError('is required upload an image logo');
              return actions.resetForm({
                values,
              });
            }
            if (brand) {
              return update.mutate({
                ...values,
                slug: brand.slug,
                logo: images[0],
              });
            }
            mutate({
              ...values,
              slug: null,
              logo: images[0],
            });

            return actions.resetForm();
          }}
        >
          {({ handleSubmit, isValid, errors, touched, values }) => (
            <Form role="form" autoComplete="Off" onSubmit={handleSubmit}>
              <div className={styles.Column}>
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

                <ImageUpload
                  label="Image Logo"
                  handler={setImages}
                  images={images}
                />

                {bannersError && (
                  <span className={styles.ErrorMessege}> {bannersError} </span>
                )}

                <div style={{ height: '30px' }} />

                <Center>
                  <AdminSubmit
                    loading={isLoading}
                    update={brand !== null}
                    disabled={
                      !(isValid && values.name !== '' && images.length !== 0)
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

export default CreateBrandForm;
