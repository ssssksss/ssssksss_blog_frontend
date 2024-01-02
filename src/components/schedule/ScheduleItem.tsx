import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { Input } from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import { useRef, useState } from 'react';
import ModalButton from '@/components/common/button/ModalButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import ScheduleModal from './modal/ScheduleModal';
import { dateFormat4y2m2d } from './../../../utils/function/dateFormat';
/**
 *
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleItem.tsx
 * @version 0.0.1 "2023-09-29 23:52:34"
 * @description 설명
 */

interface IScheduleItemProps {
  data: {
    id: number;
    title: string;
    content: string;
    isChecked: boolean;
    startDateTime: 'YYYY-M-DDThh:mm:ss';
    endDateTime: 'YYYY-M-DDThh:mm:ss';
    scheduleCategory: {
      id: number;
      name: string;
      backgroundColor: string;
      userId: number;
    };
  };
}

const ScheduleItem = (props: IScheduleItemProps) => {
  const inputRef = useRef<null>();
  const todoStore = useSelector((state: RootState) => state.todoStore);

  const _IsCheckedToggleHandler = () => {
    TodoAPI.toggleCheckTodo({
      id: props.data?.id,
    }).then((res: any) => {
      let temp = todoStore.todoList.map(i => {
        if (i.id == props.data?.id) {
          i.isChecked = !props.data?.isChecked;
        }
        return i;
      });
      store.dispatch(SET_TODO_LIST(temp));
    });
  };

  return (
    <Container isChecked={props?.data?.isChecked} bg={props?.data?.scheduleCategory?.backgroundColor}
    modal={<ScheduleModal edit={true} data={props?.data} />}
    overlayVisible={true}
    modalW={'50%'}
    >
      <CategoryName color={'black40'} h={'18px'} fw={true} color={props?.data?.scheduleCategory?.backgroundColor}>
        {props?.data?.scheduleCategory?.name}
      </CategoryName>
      <TitleBox w={'100%'} pd={'2px 6px 2px 2px'} gap={8}>
        <Title
          isChecked={props?.data?.isChecked}
        >
          {props?.data?.content}
        </Title>
        <Input
          type="checkbox"
          outline={true}
          color={'red100'}
          w={"24px"}
          h={"24px"}
          checked={props?.data?.isChecked}
          // onClick={() => _IsCheckedToggleHandler()}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </TitleBox>
      <CC.RowRightDiv color={'white80'} h={'18px'} fw={true} gap={2}>
        <div> {dateFormat4y2m2d(props.data?.startDateTime)} </div>
        <div> ~ </div>
        <div> {dateFormat4y2m2d(props.data?.endDateTime)} </div>
      </CC.RowRightDiv>
    </Container>
  );
};
export default ScheduleItem;

const Container = styled(ModalButton)<{ isChecked: boolean, bg: string }>`
  /* background: ${props =>
    props.isChecked
      ? props.theme.colors.gray20
      : props.theme.colors.[props.bg]}; */
  outline: solid ${props=>props.theme.colors.[props.bg]} 1px;
  padding: 4px;
  border-radius: 4px;
  font-size: 0.8rem;
  gap: 10px;
  display: flex;
  flex-flow: nowrap column;
  align-items: flex-start;
  width: 100%;
  height: max-content;
  &:hover {
    outline: solid ${props => `${props.theme.main.primary80}8f`} 5px;
  }
`;

const CategoryName = styled(CC.RowDiv)<{color: string}>`
  background: ${props=>props.theme.colors.white80};
  max-width: max-content;
  color: ${props=>props.theme.colors.[props.color]};
  padding: 0px 2px;
  border-radius: 4px;
`;

const TitleBox = styled(CC.RowDiv)`
`;

const Title = styled.div<{ isChecked: boolean }>`
  width: calc(100% - 28px);
  justify-content: flex-start;
  text-align: left;
  background: none;
  height: max-content;
  /* white-space: nowrap; */
  word-break: break-all;
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  text-decoration: ${props => props.isChecked && 'line-through'};

`;