import { Dispatch, SetStateAction, useState } from 'react';
import Column from '@components/Layout/Containers/Column';
import { EditorState } from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';
import dynamic from 'next/dynamic';
import styles from './ProductDescription.module.scss';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const ProductDescription = ({
  menuKey,
  handler,
}: {
  menuKey: string;
  handler: Dispatch<SetStateAction<EditorState>>;
}) => {
  const [editorDesc, setEditorDesc] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newState: any) => {
    setEditorDesc(newState);
  };

  if (menuKey === 'description') {
    return (
      <Column>
        <h2>Description </h2>
        <Editor
          editorState={editorDesc}
          wrapperClassName={styles.EditorWrapper}
          editorClassName={styles.Editor}
          toolbarClassName={styles.EditorToolBar}
          onEditorStateChange={onEditorStateChange}
          onBlur={() => {
            handler(editorDesc);
          }}
        />
        <div style={{ height: '30px' }} />
      </Column>
    );
  }

  return <div style={{ display: 'none' }} />;
};

export default ProductDescription;
