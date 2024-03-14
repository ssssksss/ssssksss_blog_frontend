import '@uiw/react-markdown-preview/markdown.css';
import { MDEditorProps } from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

export type EditorProps = MDEditorProps;

export const Editor = ({ ...rest }: MDEditorProps) => {
  return <MDEditor {...rest} />;
};