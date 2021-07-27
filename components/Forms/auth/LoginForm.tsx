import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { authFunctContext } from '../../../context/AuthContext';
import Center from '../../Layout/Containers/Center';
import styles from './LoginForm.module.scss';
import TextField from './TextField';
import { loginRequest } from '../../../api/authentication/index';
import onErrorHandler from '../../../api/authentication/onErrorHandler';

const loginSchema = Yup.object({
  email: Yup.string().required('Email is a required field').email(),
  password: Yup.string().required('Passsword is a required field').min(8),
});

const initialLoginValues = {
  email: '',
  password: '',
};

// eslint-disable-next-line no-unused-vars
const LoginForm = ({ setIsLogin }: { setIsLogin: (val: boolean) => void }) => {
  const { login } = useContext(authFunctContext);
  const router = useRouter();
  const mutation = useMutation(loginRequest, {
    onSuccess: ({ status, data }) => {
      if (status === 200) {
        login(data.user);
        router.push(data.user.role === 'customer' ? '/' : '/admin/dashboard');
      }
    },
    onError: (err) => {
      onErrorHandler(err);
    },
  });
  return (
    <Center>
      <div className={styles.FormContainer}>
        <h1 className={styles.FormTitle}> Login </h1>
        <Formik
          initialValues={initialLoginValues}
          validateOnBlur
          validationSchema={loginSchema}
          onSubmit={async (values, actions) => {
            mutation.mutate(values);
            actions.resetForm({ values });
          }}
        >
          {({ handleSubmit, errors, touched }) => {
            const emailError = !!(errors.email && touched.email);
            const passwordError = !!(errors.password && touched.password);
            const disabled = mutation.isLoading || emailError || passwordError;
            return (
              <Form
                autoComplete="Off"
                className={styles.Form}
                onSubmit={handleSubmit}
              >
                <div className={styles.Column}>
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

                  <Center>
                    <button
                      className={styles.FillButton}
                      type="submit"
                      disabled={disabled}
                    >
                      {mutation.isLoading ? 'Loading ...' : 'Submit'}
                    </button>
                  </Center>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Center>
  );
};
export default LoginForm;
