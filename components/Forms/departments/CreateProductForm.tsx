import { useState } from 'react';
import Center from '@components/Layout/Containers/Center';
import AdminSubmit from '@components/UI/Butons/AdminSubmit';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { toast } from 'react-toastify';
// import { useRouter } from 'next/router';
import { ImageBanner } from 'types/others';
import { addProduct } from 'api/products/products';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './CreateDepartmentForm.module.scss';
import 'jodit/build/jodit.min.css';
import ProductDetails from '../products/ProductDetails';
import ProductGeneral from '../products/ProductGenral';
import ProductInventory from '../products/ProductInventory';
import ProductFeatures from '../products/ProductFeatures';
import ProductDescription from '../products/ProductDescription';
import ProductImages from '../products/ProductImages';

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

const CreateProductForm = ({ type }: { type: string }) => {
  const [images, setImages] = useState<ImageBanner[]>([]);
  const [editorDesc, setEditorDesc] = useState(EditorState.createEmpty());
  const [menuKey, setMenuKey] = useState('general');

  // const router = useRouter();
  console.log(type);

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

  // const createMarkup = (html: any) => ({
  //   __html: DOMPurify.sanitize(html),
  // });

  return (
    <div className={styles.Container}>
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
            type,
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
                  !(
                    isValid &&
                    values.title !== '' &&
                    values.departmentId !== ''
                  )
                }
              />
            </Center>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductForm;
