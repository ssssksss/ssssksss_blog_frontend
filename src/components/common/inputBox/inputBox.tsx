import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Input from '@/components/common/input/Input';
import theme from '@/styles/theme';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file inputBox.tsx
 * @version 0.0.1 "2023-09-02 15:30:39"
 * @description 설명
 */

interface IInputBoxProps {
  labelMessage?: String;
  labelWidth?: Number;
  errorMessage?: String;
  type?: String;
  children?: React.ReactNode;
  height?: String;
}

const InputBox = ({
  children = <Input value="컴포넌트를 넣어주면 된다." color="white" />,
  ...props
}: IInputBoxProps) => {
  return (
    <Container height={props.height}>
      <Main>
        <Label width={props.labelWidth ?? '100px'}>{props.labelMessage}</Label>
        {/* <Input value="123" color="white" /> */}
        {children}
      </Main>
      <Error errorMessage={props.errorMessage}> {props.errorMessage} </Error>
    </Container>
  );
};
export default InputBox;

const Container = styled(CC.ColumnDiv)<{ height: String }>`
  width: 100%;
  background: #fff;
  height: ${props => props.height || '60px'};
`;

const Main = styled(CC.RowDiv)`
  border-radius: none;
  outline: solid black 3px;
  height: 100%;
  background: ${theme.backgroundColors.white};
`;

const Label = styled(CC.RowDiv)<{
  width?: string;
}>`
  width: ${props => props.width};
  height: 100%;
  /* background: white; */
  outline: solid black 3px;
  padding-left: 2px;
  align-items: center;
  background: ${theme.backgroundColors.white};
  z-index: 2;
`;

const Error = styled(CC.RowDiv)<{ errorMessage?: String }>`
  color: red;
  background: white;
  outline: solid black 3px;
  height: 20px;
  font-size: 10px;
  z-index: 2;
  padding-left: 2px;
  background: ${theme.backgroundColors.white};

  ${props =>
    props.errorMessage ||
    `
    background: ${theme.backgroundColors.grayLight};
  `}
`;
