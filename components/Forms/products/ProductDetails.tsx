/* eslint-disable global-require */
import Column from '@components/Layout/Containers/Column';
import { useRef, useEffect, ChangeEvent, useState } from 'react';
import { useFormikContext } from 'formik';

const ProductDetails = ({ menuKey }: { menuKey: string }) => {
  const editorRef = useRef<any>();
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const {
    values: { details },
    setFieldValue,
  } = useFormikContext<{
    title: string;
    departmentId: string;
    categoryId: string;
    currency: string;
    details: string;
  }>();

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
    setIsEditorLoaded(true);
  }, []);

  if (menuKey === 'details') {
    return (
      <Column>
        <h2>Details About The Product </h2>

        {isEditorLoaded && (
          <CKEditor
            editor={ClassicEditor}
            data={
              details !== ''
                ? details
                : '<p>Type here the details of the product</p>'
            }
            // onReady={(editor) => {
            //   // You can store the "editor" and use when it is needed.
            //   console.log('Editor is ready to use!', editor);
            // }}
            // onChange={(event: ChangeEvent, editor: any) => {
            // setFieldValue('details', editor.getData());
            // }}
            onBlur={(event: ChangeEvent, editor: any) => {
              setFieldValue('details', editor.getData());
            }}
            // onFocus={(event, editor) => {
            //   console.log('Focus.', editor);
            // }}
          />
        )}
      </Column>
    );
  }
  return <div style={{ display: 'none' }} />;
};

export default ProductDetails;
