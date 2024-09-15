import styled from '@emotion/styled';
import { useEffect } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ViewEditor.tsx
 * @version 0.0.1 "2024-04-17 15:32:45"
 * @description 설명
 */
interface IViewEditorProps {
  value: string;
}

const ViewEditor = (props: IViewEditorProps) => {
  const test = () => {
    let txt = props.value;
    // multiple spaces are collapsed
    txt = txt.replace(/ +/g, ' ');

    // replace the custom ¨NBSP; with a space
    txt = txt.replace(/¨NBSP;/g, ' ');

    // escape markdown magic characters
    // emphasis, strong and strikethrough - can appear everywhere
    // we also escape pipe (|) because of tables
    // and escape ` because of code blocks and spans
    txt = txt.replace(/([*_~|`])/g, '\\$1');

    // escape > because of blockquotes
    txt = txt.replace(/^(\s*)>/g, '\\$1>');

    // hash character, only troublesome at the beginning of a line because of headers
    txt = txt.replace(/^#/gm, '\\#');

    // horizontal rules
    txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, '$1\\$2$3');

    // dot, because of ordered lists, only troublesome at the beginning of a line when preceded by an integer
    txt = txt.replace(/^( {0,3}\d+)\./gm, '$1\\.');

    // +, * and -, at the beginning of a line becomes a list, so we need to escape them also (asterisk was already escaped)
    txt = txt.replace(/^( {0,3})([+-])/gm, '$1\\$2');

    // images and links, ] followed by ( is problematic, so we escape it
    txt = txt.replace(/]([\s]*)\(/g, '\\]$1\\(');

    // reference URIs must also be escaped
    txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, '\\[$1]:');
    console.log('ViewEditor.tsx 파일 : ', txt);
    return txt;
  };

  useEffect(() => {
    test();
  }, [props.value]);

  return <Container dangerouslySetInnerHTML={{ __html: props.value }} />;
};
export default ViewEditor;

const Container = styled.div`
  width: 100%;
  border: none;
  appearance: none;
  resize: none;
  border-radius: 1rem;
  height: 100%;
  box-shadow: 0.2rem 0.2rem 0.4rem 0rem rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  word-break: break-all;
  &:focus {
    outline: solid ${(props) => `${props.theme.main.primary80}2f`} 0.5rem;
  }
`;
