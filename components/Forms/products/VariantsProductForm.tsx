import onErrorHandler from '@api/authentication/onErrorHandler';
import { addProductVariants } from '@api/products/products';
import Center from '@components/Layout/Containers/Center';
import AdminSubmit from '@components/UI/Butons/AdminSubmit';
import { convertToRaw, EditorState } from 'draft-js';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ProductDescription from './ProductDescription';
import ProductDetails from './ProductDetails';
import ProductFeatures from './ProductFeatures';
import ProductGeneral from './ProductGenral';
import styles from './ProductForm.module.scss';
import ProductOptions from './ProductOptions';
import ProductVariants from './ProductVariants';

const schema = Yup.object({
  title: Yup.string()
    .trim()
    .required('name is required')
    .min(4, 'name must be at least 4 characters')
    .max(70, 'too long name'),
  departmentId: Yup.string().trim().required('is required select a department'),
  categoryId: Yup.string().trim().required('is required select a department'),
  brand: Yup.string().trim().required('is required select a currency'),
  vendor: Yup.string().trim().required('this field is required'),
  features: Yup.array(Yup.string()).required(),
  subs: Yup.array(Yup.string()).required(),
  specifications: Yup.array(
    new Yup.ObjectSchema({
      name: Yup.string().required(),
      value: Yup.string().required(),
    })
  ).required(),
  details: Yup.string().required(),
  variants: Yup.array(
    new Yup.ObjectSchema({
      name: Yup.string().trim().required(),
      options: Yup.array(Yup.string()),
    })
  ),
  productVariants: Yup.array(
    new Yup.ObjectSchema({
      availability: Yup.string()
        .trim()
        .required('is required select a currency'),
      basePrice: Yup.number().min(0).required('product price is required'),
      stock: Yup.number().min(0).required('product stock is required'),
      currency: Yup.string().trim().required('is required select a currency'),
      sku: Yup.string().trim().required('is required select a currency'),
      condition: Yup.string().trim().required('is required select a currency'),
      state: Yup.string().trim().required('is required select a currency'),
      images: Yup.array(
        new Yup.ObjectSchema({
          publicId: Yup.string().required(),
          url: Yup.string().required(),
        })
      ),
    })
  ),
});

const initialValues = {
  title: '',
  departmentId: '',
  categoryId: '',
  brand: '',
  vendor: '',
  features: [''],
  subs: [''],
  specifications: [{ name: '', value: '' }],
  details: '',
  variants: [{ name: '', options: [] }],
  productVariants: [],
};

const menuKeys = [
  'general',
  'features',
  'description',
  'details',
  'options',
  'variants',
];

const VariantsProductForm = () => {
  const [editorDesc, setEditorDesc] = useState(EditorState.createEmpty());
  const [menuKey, setMenuKey] = useState('general');

  const { isLoading, mutate } = useMutation(
    'add-product-with-variants',
    addProductVariants,
    {
      onSuccess: ({ data, status }) => {
        if (status === 200) {
          toast.success(`Product ${data.title} was created succesfully`);
          setEditorDesc(EditorState.createEmpty());
        }
      },
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validateOnChange
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        if (editorDesc === EditorState.createEmpty()) {
          toast.error('Product description must not be empty');
          return actions.resetForm({ values });
        }
        mutate({
          ...values,
          slug: null,
          type: 'variant',
          description: convertToRaw(editorDesc.getCurrentContent()),
        });

        return actions.resetForm({ values });
      }}
    >
      {({ handleSubmit, isValid, values }) => (
        <Form role="form" autoComplete="Off" onSubmit={handleSubmit}>
          <div className={styles.Grid}>
            <div className={styles.SideBar}>
              {menuKeys.map((key) => (
                <button
                  type="button"
                  key={key}
                  className={
                    menuKey === key ? styles.ActiveMenuItem : styles.MenuItem
                  }
                  onClick={() => {
                    setMenuKey(key);
                  }}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>

            <ProductGeneral menuKey={menuKey} />

            <ProductDescription menuKey={menuKey} handler={setEditorDesc} />

            <ProductDetails
              title="Details About The Product"
              menuKey={menuKey}
            />

            <ProductFeatures menuKey={menuKey} />

            <ProductOptions menuKey={menuKey} />

            <ProductVariants menuKey={menuKey} />
          </div>

          <div style={{ height: '30px' }} />

          <Center>
            <AdminSubmit
              update={false}
              loading={isLoading}
              disabled={
                !(isValid && values.title !== '' && values.departmentId !== '')
              }
            />
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default VariantsProductForm;
