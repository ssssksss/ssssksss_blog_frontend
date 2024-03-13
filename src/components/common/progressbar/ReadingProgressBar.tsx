import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ReadingProgressBar.tsx
 * @version 0.0.1 "2024-03-13 09:56:56"
 * @description 설명
 */

const ReadingProgressBar = () => {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const element = document.documentElement;
    const ScrollTop = element.scrollTop || document.body.scrollTop;
    const ScrollHeight = element.scrollHeight || document.body.scrollHeight;
    const percent = (ScrollTop / (ScrollHeight - element.clientHeight)) * 100;

    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  }, []);

  return <Container className="progressBar" width={width}></Container>;
};

export default ReadingProgressBar;

const Container = styled.div<{ width: number }>`
  width: ${(props) => props.width + '%'};
  position: fixed;
  z-index: 50;
  top: 44px;
  left: 0px;
  height: 600px;
  border-radius: 0px 2px 0px 0px;
  background: linear-gradient(90deg, #ffdd00, #fbb034);
`;
