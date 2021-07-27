import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Center from '../../Layout/Containers/Center';
import styles from './LoginForm.module.scss';
import TextField from './TextField';
import { registerRequest } from '../../../api/authentication/index';
import onErrorHandler from '../../../api/authentication/onErrorHandler';

export const registerSchema = Yup.object({
  username: Yup.string()
    .required('The user name is required')
    .min(3, 'The user name must have aleats 3 characters'),
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email address is requierd'),
  password: Yup.string()
    .required()
    .min(8, 'password must be at least 8 characters long'),
  confirmPassword: Yup.string().required('The confirm password is required'),
});

export const initialSingUpValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm = ({
  setIsLogin,
}: {
  // eslint-disable-next-line no-unused-vars
  setIsLogin: (val: boolean) => void;
}) => {
  const mutation = useMutation(registerRequest, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        setIsLogin(true);
        toast.success(
          'Account register succesfully. We have send you an email to verify your address'
        );
      }
    },
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  return (
    <Center>
      <div className={styles.FormContainer}>
        <h1 className={styles.FormTitle}> Register </h1>
        <Formik
          initialValues={initialSingUpValues}
          validateOnBlur
          validationSchema={registerSchema}
          onSubmit={(values, actions) => {
            if (values.password !== values.confirmPassword) {
              actions.resetForm({
                values,
                errors: { confirmPassword: 'The passwords must match' },
                touched: {
                  confirmPassword: true,
                  email: true,
                  username: true,
                  password: true,
                },
              });
            } else {
              mutation.mutate(values);
              actions.resetForm({ values, errors: {} });
            }
          }}
        >
          {({ errors, touched, handleSubmit, isValid, isSubmitting }) => {
            const emailError = !!(errors.email && touched.email);
            const passwordError = !!(errors.password && touched.password);
            const usernameError = !!(errors.username && touched.username);
            const confirmPasswordError = !!(
              errors.confirmPassword && touched.confirmPassword
            );
            const disabled = mutation.isLoading || !isValid;
            return (
              <Form
                autoComplete="Off"
                className={styles.Form}
                onSubmit={handleSubmit}
              >
                <div className={styles.Column}>
                  <TextField
                    error={usernameError}
                    name="username"
                    type="text"
                    placeholder="Your username ..."
                  />
                  <TextField
                    error={emailError}
                    name="email"
                    type="email"
                    placeholder="Your email ..."
                  />
                  <TextField
                    error={passwordError}
                    name="password"
                    type="password"
                    placeholder="Your password ..."
                  />
                  <TextField
                    error={confirmPasswordError}
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password ..."
                  />
                </div>

                <Center>
                  <button
                    type="submit"
                    className={styles.FillButton}
                    disabled={disabled}
                  >
                    {mutation.isLoading || isSubmitting
                      ? 'Loading ...'
                      : 'Submit'}
                  </button>
                </Center>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Center>
  );
};
export default RegisterForm;
