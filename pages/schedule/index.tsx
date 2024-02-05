import Layout1 from '@/components/layout/Layout1';
import styled from '@emotion/styled';
import ScheduleContainer from './../../src/components/schedule/ScheduleContainer';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2024-02-05 13:59:41"
 * @description 설명
 */
const Index = () => {
  return (
    <Container>
      <ScheduleContainer />
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  width: 100%;
`;
