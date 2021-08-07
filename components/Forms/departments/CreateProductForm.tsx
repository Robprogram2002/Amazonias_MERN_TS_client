import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import SimpleProductForm from '../products/SimpleProductForm';
import VariantsProductForm from '../products/VariantsProductForm';
import styles from './CreateDepartmentForm.module.scss';

const CreateProductForm = ({ type }: { type: string }) => {
  console.log(type);

  // const createMarkup = (html: any) => ({
  //   __html: DOMPurify.sanitize(html),
  // });

  return (
    <div className={styles.Container}>
      {type === 'simple' ? <SimpleProductForm /> : <VariantsProductForm />}
    </div>
  );
};

export default CreateProductForm;
