import Center from '@components/Layout/Containers/Center';
import AdminSubmit from '@components/UI/Butons/AdminSubmit';
import * as Yup from 'yup';
import { convertToRaw, EditorState } from 'draft-js';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { addProduct } from '@api/products/products';
import onErrorHandler from '@api/authentication/onErrorHandler';
import { ImageBanner } from '../../../types/others';
import ProductDescription from './ProductDescription';
import ProductDetails from './ProductDetails';
import ProductFeatures from './ProductFeatures';
import ProductGeneral from './ProductGenral';
import ProductImages from './ProductImages';
import ProductInventory from './ProductInventory';
import styles from './ProductForm.module.scss';

const schema = Yup.object({
  title: Yup.string()
    .trim()
    .required('name is required')
    .min(4, 'name must be at least 4 characters')
    .max(70, 'too long name'),
  departmentId: Yup.string().trim().required('is required select a department'),
  categoryId: Yup.string().trim().required('is required select a department'),
  currency: Yup.string().trim().required('is required select a currency'),
  sku: Yup.string().trim().required('is required select a currency'),
  condition: Yup.string().trim().required('is required select a currency'),
  state: Yup.string().trim().required('is required select a currency'),
  brand: Yup.string().trim().required('is required select a currency'),
  availability: Yup.string().trim().required('is required select a currency'),
  basePrice: Yup.number().min(0).required('product price is required'),
  stock: Yup.number().min(0).required('product stock is required'),
  features: Yup.array(Yup.string()).required(),
  subs: Yup.array(Yup.string()).required(),
  specifications: Yup.array(
    new Yup.ObjectSchema({
      name: Yup.string().required(),
      value: Yup.string().required(),
    })
  ).required(),
  details: Yup.string().required(),
  images: Yup.array(
    new Yup.ObjectSchema({
      publicId: Yup.string().required(),
      url: Yup.string().required(),
    })
  ),
});

const initialValues = {
  title: '',
  departmentId: '',
  categoryId: '',
  currency: '',
  sku: '',
  condition: '',
  state: '',
  brand: '',
  availability: '',
  basePrice: 0.0,
  stock: 0,
  features: [''],
  subs: [''],
  specifications: [{ name: '', value: '' }],
  details: '',
  images: [],
};

const menuKeys = [
  'general',
  'inventory',
  'features',
  'description',
  'details',
  'images',
];

const SimpleProductForm = () => {
  const [images, setImages] = useState<ImageBanner[]>([]);
  const [editorDesc, setEditorDesc] = useState(EditorState.createEmpty());
  const [menuKey, setMenuKey] = useState('general');

  const { isLoading, mutate } = useMutation('addProduct', addProduct, {
    onSuccess: ({ data, status }) => {
      if (status === 200) {
        toast.success(`Product ${data.title} was created succesfully`);
        setImages([]);
        setEditorDesc(EditorState.createEmpty());
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validateOnChange
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        if (images.length <= 0) {
          toast.error('Product must have at least one image');
          return actions.resetForm({ values });
        }
        if (editorDesc === EditorState.createEmpty()) {
          toast.error('Product description must not be empty');
          return actions.resetForm({ values });
        }

        mutate({
          ...values,
          slug: null,
          type: 'simple',
          images,
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

            <ProductImages
              menuKey={menuKey}
              setImages={setImages}
              images={images}
            />

            <ProductDescription menuKey={menuKey} handler={setEditorDesc} />

            <ProductDetails menuKey={menuKey} />

            <ProductInventory menuKey={menuKey} />

            <ProductFeatures menuKey={menuKey} />
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

export default SimpleProductForm;
