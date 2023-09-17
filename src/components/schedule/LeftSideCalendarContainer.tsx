import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file LeftSideCalendarContainer.tsx
 * @version 0.0.1 "2023-09-06 01:37:05"
 * @description 설명
 */
const LeftSideCalendarContainer = () => {
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  return (
    <Container>
      {scheduleStore.monthScheduleData.map((i, index) => (
        <div>
          <ul>
            <li> {i.id} </li>
            <li> {i.categoryName} </li>
          </ul>
        </div>
      ))}
    </Container>
  );
};
export default LeftSideCalendarContainer;

const Container = styled.aside`
  height: 100%;
  background: red;
`;
