import { ScheduleAPI } from '@api/ScheduleAPI';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { CC } from '@styles/commonComponentStyle';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleCategoryItem.tsx
 * @version 0.0.1 "2024-02-07 04:17:55"
 * @description 설명
 */

interface IScheduleCategoryItemProps {
  id: number;
  name: string;
  backgroundColor: string;
  isVisible: boolean;
  userId: number;
}

const ScheduleCategoryItem = (props: IScheduleCategoryItemProps) => {
  const [isVisible, setIsVisible] = useState(props.isVisible);
  const authStore = useSelector((state) => state.authStore);
  const queryClient = useQueryClient();
  const scheduleBarVisibleHandler = () => {
    setIsVisible((prev) => !prev);
    ScheduleAPI.toggleCheckScheduleCategory({ id: props.id });
    queryClient.setQueryData(
      [
        'scheduleList',
        store.getState().scheduleStore.calendarMonth,
        authStore.id,
      ],
      (oldData) => {
        oldData.data?.scheduleList.map((i) => {
          if (props.id == i.scheduleCategory.id) {
            i.scheduleCategory.isVisible = !isVisible;
          }
          return i;
        });
        return {
          ...oldData,
        };
      },
    );
  };

  return (
    <Container
      gap={4}
      bg={props.backgroundColor}
      pd={'0.4rem 0.2rem'}
      isVisible={isVisible}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        scheduleBarVisibleHandler();
      }}
    >
      <span>{props.name}</span>
    </Container>
  );
};
export default ScheduleCategoryItem;

const Container = styled(CC.RowDiv)<{ isVisible: boolean }>`
  opacity: ${(props) => !props.isVisible && 0.2};
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  }
`;
