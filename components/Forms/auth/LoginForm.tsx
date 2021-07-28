import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Center from '../../Layout/Containers/Center';
import styles from './LoginForm.module.scss';
import TextField from './TextField';

const loginSchema = Yup.object({
  email: Yup.string()
    .required('Email is a required field')
    .email('Enter a valid email address'),
  password: Yup.string()
    .required()
    .min(8, 'password must be at least 8 characters long'),
});

const initialLoginValues = {
  email: '',
  password: '',
};

type LoginFormProps = {
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  loginRequest: (val: any) => void;
};

const LoginForm = ({ loading, loginRequest }: LoginFormProps) => (
  <Center>
    <div className={styles.FormContainer}>
      <h1 className={styles.FormTitle}> Login </h1>
      <Formik
        initialValues={initialLoginValues}
        validateOnBlur
        validationSchema={loginSchema}
        onSubmit={async (values, actions) => {
          loginRequest(values);
          actions.resetForm({ values });
        }}
      >
        {({ handleSubmit, errors, touched }) => {
          const emailError = !!(errors.email && touched.email);
          const passwordError = !!(errors.password && touched.password);
          const disabled = loading || emailError || passwordError;
          return (
            <Form
              role="form"
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
                    {loading ? 'Loading ...' : 'Submit'}
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
export default LoginForm;
