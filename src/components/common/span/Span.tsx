import styled from '@emotion/styled';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Span.tsx
 * @version 0.0.1 "2023-09-20 22:35:58"
 * @description 설명
 */

interface SpanProps {
  fontSize?: String;
  fontFamily?: String;
  color?: String;
  children?: ReactNode;
}

const Span = ({ children, ...props }: SpanProps) => {
  return <Container {...props}>{children}</Container>;
};
export default Span;

const Container = styled.span<SpanProps>`
    font-size: ${props => props.fontSize};
    font-family: : ${props => props.fontFamily};
    color: ${props => props.color};
`;
