import { loginRequest } from '@api/authentication';
import onErrorHandler from '@api/authentication/onErrorHandler';
import { authContext } from '@context/AuthContext';
import { checkOutContext, checkOutSections } from '@context/CheckOutContext';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { RiArrowDropDownLine, RiArrowDropRightLine } from 'react-icons/ri';
import { useMutation } from 'react-query';
import AuthTextField from '../Fields/AuthTextField';
import styles from './ConfirmAuthForm.module.scss';
import { initialLoginValues, loginSchema } from './LoginForm';

const LoginForm = () => {
  const { editMenuData } = useContext(checkOutContext);
  const router = useRouter();

  const { mutate, isLoading } = useMutation(loginRequest, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        router.push(`/user/checkout/${checkOutSections[1].title}`);
        editMenuData(0);
      }
    },
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  return (
    <div className={styles.OptionContent}>
      <h2>Sign In</h2>
      <p>Please, sign in to continue</p>
      <Formik
        initialValues={initialLoginValues}
        validateOnBlur
        validationSchema={loginSchema}
        onSubmit={async (values, actions) => {
          mutate(values);
          actions.resetForm({ values });
        }}
      >
        {({ handleSubmit, errors, touched }) => {
          const emailError = !!(errors.email && touched.email);
          const passwordError = !!(errors.password && touched.password);
          return (
            <Form
              role="form"
              autoComplete="Off"
              className={styles.Form}
              onSubmit={handleSubmit}
            >
              <AuthTextField
                error={emailError}
                name="email"
                type="email"
                label="Email"
              />
              <div style={{ height: '25px' }} />
              <AuthTextField
                error={passwordError}
                name="password"
                type="password"
                label="Password"
              />
              <div style={{ height: '25px' }} />
              <button className={styles.SubmitButton} type="submit">
                {isLoading ? 'Loading ...' : 'Submit'}
                <HiArrowNarrowRight className={styles.Icon} />
              </button>
              <div style={{ height: '20px' }} />
              <span className={styles.TextLink}>
                {' '}
                Did you forget your password?
              </span>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const GuestForm = () => (
  <div className={styles.OptionContent}>
    <h2>Guest</h2>
    <p>
      Like a guest you can make how many buys you want but you will need to
      provide all your shipping information every time and your order history
      will not be saved
    </p>

    <button className={styles.SubmitButton} type="button">
      Continue
      <HiArrowNarrowRight className={styles.Icon} />
    </button>
    <div style={{ height: '20px' }} />
    <span className={styles.TextLink} style={{ textDecoration: 'underline' }}>
      {' '}
      know more about guest user conditions{' '}
    </span>
  </div>
);

const NewForm = () => (
  <div className={styles.OptionContent}>
    <h2>Create account</h2>
    <p>
      Get all the benefits of register users like order history, personal
      recomendations, useful notifications and more. All your current cart
      information will not be lost
    </p>
    <button className={styles.SubmitButton} type="button">
      Continue
      <HiArrowNarrowRight className={styles.Icon} />
    </button>
    <div style={{ height: '20px' }} />
    <span className={styles.TextLink} style={{ textDecoration: 'underline' }}>
      {' '}
      know more about register user benefits{' '}
    </span>
  </div>
);

const options = [
  { key: 'login', title: 'Sign In', component: <LoginForm /> },
  { key: 'guest', title: 'Continue as guest', component: <GuestForm /> },
  {
    key: 'new',
    title: 'First timer ? Create an account',
    component: <NewForm />,
  },
];

const RowOption: FC<{ title: string; active: boolean; toggle: () => void }> = ({
  title,
  children,
  active,
  toggle,
}) => (
  <div className={styles.OptionContainer}>
    <div
      className={styles.Option}
      onKeyDown={toggle}
      onClick={toggle}
      role="menuitem"
      tabIndex={0}
    >
      {active ? (
        <RiArrowDropDownLine size={30} />
      ) : (
        <RiArrowDropRightLine size={30} />
      )}
      <h3> {title} </h3>
    </div>
    {active && children}
  </div>
);

const ConfirmAuthForm = () => {
  const { authenticated } = useContext(authContext);
  const [activeKey, setActiveKey] = useState('login');

  const toggleKey = (prop: string) => {
    setActiveKey(prop);
  };

  return (
    <div className={styles.AuthContainer}>
      <div className={styles.AuthForm}>
        <div className={styles.AuthHead}>
          <h1>Confirm Authentication</h1>
        </div>
        <div className={styles.Content}>
          {authenticated ? (
            <LoginForm />
          ) : (
            options.map(({ title, key, component }) => (
              <RowOption
                title={title}
                active={activeKey === key}
                toggle={() => toggleKey(key)}
              >
                {component}
              </RowOption>
            ))
          )}
          <div style={{ height: '20px' }} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmAuthForm;
