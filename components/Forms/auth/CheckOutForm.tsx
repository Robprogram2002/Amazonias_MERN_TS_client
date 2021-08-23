import { useState, useEffect, useContext } from 'react';
import {
  // CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { Form, Formik } from 'formik';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from 'react-query';
import { createSetUpIntent } from '@api/cart';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { checkOutContext, checkOutSections } from '@context/CheckOutContext';
import { useRouter } from 'next/router';
import AuthTextField from '../Fields/AuthTextField';
import styles from './CheckOutForm.module.scss';

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CardForm = () => {
  const {
    editMenuData,
    state: { addressData },
  } = useContext(checkOutContext);
  const [paymentError, setPaymentError] = useState<null | string>(null);
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const { data, mutate, isLoading, error } = useMutation(
    'create-setup-intent',
    createSetUpIntent
  );

  useEffect(() => {
    mutate(null);
  }, []);

  const handleChange = async (event: any) => {
    setDisabled(event.empty);
    setPaymentError(event.error ? event.error.message : '');
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Error : {JSON.stringify(error)} </h1>;
  }

  return (
    <div className={styles.Container}>
      <Formik
        initialValues={{
          email: '',
          name: '',
        }}
        validateOnBlur
        // validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
          }

          const result = await stripe.confirmCardSetup(
            data?.data.clientSecret!,
            {
              payment_method: {
                card: elements.getElement(CardNumberElement)!,
                billing_details: {
                  address: {
                    city: addressData?.city,
                    country: addressData?.country,
                    line1: addressData?.address,
                    line2: addressData?.secondAddress,
                    postal_code: addressData?.zip,
                    state: 'CDMX',
                  },
                  email: values.email,
                  name: values.name,
                  phone: addressData?.phone,
                },
              },
            }
          );

          if (result.error) {
            // Display result.error.message in your UI.
            setPaymentError(result.error.message || null);
            actions.resetForm({ values });
          } else {
            router.push(`/user/checkout/${checkOutSections[3].title}`);
            editMenuData(2);
          }

          // **********************************
          // const payload = await stripe!.confirmCardPayment(
          //   data?.data.clientSecret!,
          //   {
          //     receipt_email: values.email,
          //     payment_method: {
          //       card: elements!.getElement(CardNumberElement)!,
          //     },
          //   }
          // );
          // if (payload.error) {
          //   setPaymentError(`Payment failed ${payload.error.message}`);
          // } else {
          //   setPaymentError(null);
          // }
          // console.log(payload);
          // actions.resetForm({ values });
        }}
      >
        {({ handleSubmit, errors, touched, isSubmitting }) => (
          <Form
            role="form"
            autoComplete="Off"
            className={styles.Form}
            onSubmit={handleSubmit}
          >
            <h1>Add A Payment Method</h1>
            <div style={{ height: '25px' }} />
            <AuthTextField
              error={!!(errors.email && touched.email)}
              name="email"
              type="email"
              label="Email"
            />
            <div style={{ height: '25px' }} />
            <AuthTextField
              error={!!(errors.name && touched.name)}
              name="name"
              type="text"
              label="Card Name"
            />
            <div style={{ height: '25px' }} />

            <CardNumberElement
              className={styles.CardElemt}
              onChange={handleChange}
            />
            <div style={{ height: '20px' }} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '1.4rem',
              }}
            >
              <CardExpiryElement
                className={styles.CardElemt}
                onChange={handleChange}
              />
              <CardCvcElement className={styles.CardElemt} />
            </div>
            <div style={{ height: '25px' }} />
            <button
              type="submit"
              className={styles.SubmitButton}
              disabled={
                isSubmitting || disabled || !elements || !stripe || !data
              }
            >
              {isSubmitting ? 'Loading ...' : 'Save'}
              <HiArrowNarrowRight className={styles.Icon} />
            </button>
            {paymentError && (
              <div role="alert">
                <span>{paymentError}</span>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

const CheckOutForm = () => (
  <div>
    <Elements stripe={promise}>
      <CardForm />
    </Elements>
  </div>
);

export default CheckOutForm;
