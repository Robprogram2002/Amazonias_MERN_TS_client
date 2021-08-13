import { useState } from 'react';
import Center from '@components/Layout/Containers/Center';
import AdminSubmit from '@components/UI/Butons/AdminSubmit';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { ImageBanner } from 'types/others';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { IVendor } from 'types/Vendor';
import { addVendor, updateVendor } from '@api/products/vendors';
import styles from './CreateDepartmentForm.module.scss';
import InputField from '../Fields/InputField';
import ImageUpload from '../Fields/ImageUpload';
import ProductDetails from '../products/ProductDetails';

const schema = new Yup.ObjectSchema({
  name: Yup.string()
    .trim()
    .required('name is required')
    .min(4, 'name must be at least 4 characters')
    .max(70, 'too long name'),
  details: Yup.string()
    .trim()
    .required('description is required')
    .min(50, 'description must be at least 50 characters'),
  contact: Yup.object({
    person: Yup.string().required('this field is required'),
    email: Yup.string().email().required('this field is required'),
    phone: Yup.string().required('this field is required'),
  }),
  location: Yup.object({
    country: Yup.string().required('this field is required'),
    state: Yup.string().required('this field is required'),
    address: Yup.string().required('this field is required'),
    postalCode: Yup.string().required('this field is required'),
  }),
  socials: Yup.object({
    facebook: Yup.string(),
    website: Yup.string(),
    twetter: Yup.string(),
  }),
});

const CreateVendorForm = ({ vendor }: { vendor: IVendor | null }) => {
  const [images, setImages] = useState<ImageBanner[]>(
    vendor ? [vendor.image] : []
  );
  const [bannersError, setBannersError] = useState<string | null>(null);
  const router = useRouter();

  const { isLoading, mutate } = useMutation('add-vendor', addVendor, {
    onSuccess: ({ data, status }) => {
      if (status === 200) {
        toast.success(`Vendor ${data.name} was created succesfully`);
        setImages([]);
        setBannersError(null);
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const update = useMutation('update-vendor', updateVendor, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        router.push('/admin/vendors/list');
        toast.success(`Vendor was updated succesfully`);
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const initialValues = {
    name: vendor?.name || '',
    details: vendor?.description || '',
    contact: vendor?.contact || {
      person: '',
      email: '',
      phone: '',
    },
    location: vendor?.location || {
      country: '',
      state: '',
      postalCode: '',
      address: '',
    },
    socials: vendor?.socials || {
      facebook: '',
      twetter: '',
      website: '',
    },
  };

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
          onSubmit={async (values, actions) => {
            if (images.length !== 1) {
              setBannersError('Vendors must have one image');
              return actions.resetForm({
                values: {
                  ...values,
                },
              });
            }

            if (vendor) {
              update.mutate({
                ...values,
                slug: vendor.slug,
                image: images[0],
                description: values.details,
              });
            } else {
              mutate({
                ...values,
                slug: null,
                image: images[0],
                description: values.details,
              });
            }

            return actions.resetForm({
              values: {
                ...values,
              },
            });
          }}
        >
          {({ handleSubmit, isValid, errors, touched, values }) => (
            <Form role="form" autoComplete="Off" onSubmit={handleSubmit}>
              <div className={styles.Column}>
                <ImageUpload
                  label="Image Profile"
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

                <InputField
                  name="contact.person"
                  error={!!(errors.contact?.person && touched.contact?.person)}
                  label="Manager name"
                  placeholder="type here ..."
                  type="text"
                />

                {errors.contact?.person && touched.contact?.person ? null : (
                  <div style={{ height: '20px' }} />
                )}

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '47% 50%',
                    width: '100%',
                    marginBottom: '30px',
                    columnGap: '1.4rem',
                  }}
                >
                  <InputField
                    name="contact.email"
                    error={!!(errors.contact?.email && touched.contact?.email)}
                    label="Contact Email"
                    placeholder="type here ..."
                    type="text"
                  />

                  <InputField
                    name="contact.phone"
                    error={!!(errors.contact?.phone && touched.contact?.phone)}
                    label="Phone"
                    placeholder="type here ..."
                    type="text"
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '47% 50%',
                    width: '100%',
                    marginBottom: '30px',
                    columnGap: '1.4rem',
                  }}
                >
                  <InputField
                    name="location.country"
                    error={
                      !!(errors.location?.country && touched.location?.country)
                    }
                    label="Country"
                    placeholder="type here ..."
                    type="text"
                  />

                  <InputField
                    name="location.state"
                    error={
                      !!(errors.location?.state && touched.location?.state)
                    }
                    label="State"
                    placeholder="type here ..."
                    type="text"
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '68% 30%',
                    width: '100%',
                    marginBottom: '30px',
                    columnGap: '1.4rem',
                  }}
                >
                  <InputField
                    name="location.address"
                    error={
                      !!(errors.location?.address && touched.location?.address)
                    }
                    label="Address"
                    placeholder="type here ..."
                    type="text"
                  />

                  <InputField
                    name="location.postalCode"
                    error={
                      !!(
                        errors.location?.postalCode &&
                        touched.location?.postalCode
                      )
                    }
                    label="Postal Code"
                    placeholder="type here ..."
                    type="text"
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '25% 70%',
                    width: '100%',
                    marginBottom: '20px',
                    columnGap: '1.4rem',
                  }}
                >
                  <Center> Facebook :</Center>

                  <InputField
                    name="socials.facebook"
                    error={
                      !!(errors.socials?.facebook && touched.socials?.facebook)
                    }
                    label=""
                    placeholder="type here ..."
                    type="text"
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '25% 70%',
                    width: '100%',
                    marginBottom: '20px',
                    columnGap: '1.4rem',
                  }}
                >
                  <Center>Twetter :</Center>

                  <InputField
                    name="socials.twetter"
                    error={
                      !!(errors.socials?.twetter && touched.socials?.twetter)
                    }
                    label=""
                    placeholder="type here ..."
                    type="text"
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '25% 70%',
                    width: '100%',
                    marginBottom: '20px',
                    columnGap: '1.4rem',
                  }}
                >
                  <Center>Website :</Center>

                  <InputField
                    name="socials.website"
                    error={
                      !!(errors.socials?.website && touched.socials?.website)
                    }
                    label=""
                    placeholder="type here ..."
                    type="text"
                  />
                </div>

                <ProductDetails
                  title="Description (Profile Home)"
                  menuKey="details"
                />

                {errors.details && touched.details ? null : (
                  <div style={{ height: '30px' }} />
                )}

                <Center>
                  <AdminSubmit
                    update={vendor !== null}
                    loading={isLoading || update.isLoading}
                    disabled={
                      !(
                        isValid &&
                        values.name !== '' &&
                        values.details !== '' &&
                        values.contact !== initialValues.contact &&
                        values.location !== initialValues.location
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

export default CreateVendorForm;
