import { useContext } from 'react';
import onErrorHandler from '@api/authentication/onErrorHandler';
import { checkOutContext, checkOutSections } from '@context/CheckOutContext';
import { addUserShippingAddress } from '@api/cart';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import InputField from '../Fields/InputField';
import TextareaField from '../Fields/TextareaField';
import styles from './ShippingAddressForm.module.scss';

const lenghtMessage = (integer: number) =>
  `field must be at least ${integer} characters long`;
const requiredMessage = 'this field is required';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const postalCodeRegExp = /^(\\d{5}(\\-\\d{4})?)?$/; // "^\\d{5}?$" for only 5 characters

const formSchema = new Yup.ObjectSchema({
  fname: Yup.string().required(requiredMessage).min(3, lenghtMessage(3)),
  lname: Yup.string().required(requiredMessage).min(3, lenghtMessage(3)),
  email: Yup.string()
    .required(requiredMessage)
    .email('Enter a valid email address'),
  phone: Yup.string()
    .required(requiredMessage)
    .matches(phoneRegExp, 'Enter a valid phone number'),
  country: Yup.string().required(requiredMessage),
  city: Yup.string().required(requiredMessage),
  zip: Yup.string().required(requiredMessage),
  // .matches(
  //   postalCodeRegExp,
  //   'Enter a valid postal code number'
  // ),
  address: Yup.string().required(requiredMessage).min(8, lenghtMessage(8)),
  secondAddress: Yup.string()
    .required(requiredMessage)
    .min(8, lenghtMessage(8)),
  description: Yup.string().required(requiredMessage).min(8, lenghtMessage(8)),
});

const AddressForm = () => {
  const { editMenuData } = useContext(checkOutContext);
  const router = useRouter();

  const addMutation = useMutation(
    'add-user-shippingAddress',
    addUserShippingAddress,
    {
      onSuccess: ({ data, status }) => {
        console.log(data);
        if (status === 200) {
          router.push(`/user/checkout/${checkOutSections[2].title}`);
          editMenuData(1);
        }
      },
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

  return (
    <Formik
      initialValues={{
        fname: '',
        lname: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        zip: '',
        address: '',
        secondAddress: '',
        description: '',
      }}
      validateOnBlur
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        addMutation.mutate(values);
        actions.resetForm({ values });
      }}
    >
      {({ handleSubmit, errors }) => (
        <Form
          role="form"
          autoComplete="Off"
          className={styles.Form}
          onSubmit={handleSubmit}
        >
          <div className={styles.FormRow}>
            <InputField
              name="fname"
              error={!!errors.fname}
              label="First Name"
              placeholder="Type here ..."
              type="text"
            />
            <InputField
              name="lname"
              error={!!errors.lname}
              label="Last Name"
              placeholder="Type here ..."
              type="text"
            />
          </div>
          <div className={styles.FormRow}>
            <InputField
              name="email"
              error={!!errors.email}
              label="Email (contact & confirmation)"
              placeholder="Type here ..."
              type="text"
            />
            <InputField
              name="phone"
              error={!!errors.phone}
              label="Phone Number"
              placeholder="Type here ..."
              type="text"
            />
          </div>
          <div className={styles.FormRow}>
            <InputField
              name="country"
              error={!!errors.country}
              label="Country"
              placeholder="Type here ..."
              type="text"
            />
            <div className={styles.FormRow} style={{ margin: '0' }}>
              <InputField
                name="city"
                error={!!errors.city}
                label="City"
                placeholder="Type here ..."
                type="text"
              />
              <InputField
                name="zip"
                error={!!errors.zip}
                label="Zip"
                placeholder="Type here ..."
                type="text"
              />
            </div>
          </div>
          <div className={styles.FormRow}>
            <InputField
              name="address"
              error={!!errors.address}
              label="Address 1"
              placeholder="Type here ..."
              type="text"
            />
            <InputField
              name="secondAddress"
              error={!!errors.secondAddress}
              label="Address 2"
              placeholder="Type here ..."
              type="text"
            />
          </div>
          <div className={styles.TextAreaContainer}>
            <TextareaField
              name="description"
              error={!!errors.description}
              label="Add a description"
              placeholder="Type here ..."
            />
          </div>
          <div className={`${styles.FormRow} ${styles.Boxes}`}>
            <Checkbox>Use this address for billing</Checkbox>
            <Checkbox>
              {' '}
              Please add me to your email list so I can receive special
              promotions, notifications and product updates{' '}
            </Checkbox>
          </div>

          <div className={styles.ButtonContainer}>
            <button className={styles.SubmitButton} type="submit">
              {addMutation.isLoading ? 'Loading ...' : 'Continue'}
              <HiArrowNarrowRight className={styles.Icon} />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddressForm;
