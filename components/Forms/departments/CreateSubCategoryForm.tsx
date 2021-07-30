import Center from '@components/Layout/Containers/Center';
import AdminSubmit from '@components/UI/Butons/AdminSubmit';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'react-query';
import { fetchCategories } from 'api/products/categories';
import onErrorHandler from 'api/authentication/onErrorHandler';
import styles from './CreateDepartmentForm.module.scss';
import InputField from '../Fields/InputField';
import SelectField from '../Fields/SelectField';

const schema = Yup.object({
  name: Yup.string()
    .trim()
    .required('name is required')
    .min(4, 'name must be at least 4 characters')
    .max(70, 'too long name'),
  categoryId: Yup.string().trim().required('is required select a department'),
});

const initialValues = {
  name: '',
  categoryId: '',
};

const CreateCategoryForm = () => {
  const mutate = useMutation('addCategory');
  const { data, isLoading } = useQuery('fetch-departments', fetchCategories, {
    onError: (err) => {
      onErrorHandler(err);
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
          onSubmit={async (values, actions) => {
            // loginRequest(values);
            console.log(values);
            actions.resetForm({ values });
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

                <SelectField
                  name="departmentId"
                  error={!!(errors.categoryId && touched.categoryId)}
                  label="Category"
                  loading={isLoading}
                  options={
                    data?.data.map((element: any) => ({
                      id: element._id,
                      name: element.name,
                    })) || null
                  }
                />

                <div style={{ height: '30px' }} />

                <Center>
                  <AdminSubmit
                    loading={mutate.isLoading}
                    disabled={
                      !(
                        isValid &&
                        values.name !== '' &&
                        values.categoryId !== ''
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

export default CreateCategoryForm;
