import styled from "@emotion/styled";
import Layout1 from "@/components/layout/Layout1";
/**
 * Author : Sukyung Lee
 * FileName: index.tsx
 * Date: 2023-01-04 21:50:14
 * Description :
 */
const Index = () => {
  const except_lotto_number = [7, 26, 28, 38, 41, 45] as any;
  const choice_lotto_number = [] as any;
  const Lotto = () => {
    while (1) {
      let number = Math.floor(Math.random() * Math.random() * 45) + 1;
      if (!except_lotto_number.includes(number)) {
        if (!choice_lotto_number.includes(number)) {
          choice_lotto_number.push(number);
        }
      }
      if (choice_lotto_number.length >= 6) break;
    }
    return choice_lotto_number.sort((a: any, b: any) => (a >= b ? 1 : -1));
  };

  return (
    <Container>
      {Lotto().map((el: any, index: any) => (
        <span key={index}>
          <span> {el} </span>
        </span>
      ))}
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  width: 100%;
`;
