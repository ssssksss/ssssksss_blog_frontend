import { ScheduleAPI } from '@api/ScheduleAPI';
import Button from '@components/common/button/Button';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import Textarea from '@components/common/textarea/Textarea';
import styled from '@emotion/styled';
import { RootState } from '@react-three/fiber';
import { store } from '@redux/store';
import { SET_TODAY_SCHEDULE_LIST } from '@redux/store/schedule';
import { CC } from '@styles/commonComponentStyle';
import { dateFormat4y2m2d } from '@utils/function/dateFormat';
import { timeFunction } from '@utils/function/timeFunction';
import { addDays } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleModal.tsx
 * @version 0.0.1 "2023-12-09 17:03:26"
 * @description 설명
 */
interface IScheduleModalProps {
  edit?: boolean;
  data?: {
    id: number;
    title: string;
    content: string;
    isChecked: boolean;
    startDateTime: 'YYYY-MM-DDThh:mm:ss';
    endDateTime: 'YYYY-MM-DDThh:mm:ss';
    scheduleCategory: {
      id: number;
      name: string;
      backgroundColor: string;
      userId: number;
    };
  };
  closeModal?: () => void;
  // methodType은 달력 월 형태와 오늘의 일정만 보는 2가지의 경우 redux에 저장하는 형태가 달라서 필요한 props
  methodType?: string;
}

const ScheduleModal = (props: IScheduleModalProps) => {
  const scheduleTitleRef = useRef<null>();
  const scheduleContentRef = useRef<null>();
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  const queryClient = useQueryClient();
  const [scheduleCategory, setScheduleCategory] = useState(
    props.edit
      ? {
          id: props.data.scheduleCategory?.id,
          name: props.data.scheduleCategory?.name,
          userId: props.data.scheduleCategory?.userId,
          bg: props.data.scheduleCategory?.backgroundColor,
        }
      : {},
  );
  const scheduleCategoryListResData = ScheduleAPI.getScheduleCategoryList();

  const [state, setState] = useState([
    {
      startDate: props.data?.startDateTime
        ? new Date(props.data?.startDateTime)
        : new Date(),
      endDate: props.data?.endDateTime
        ? new Date(props.data?.endDateTime)
        : addDays(new Date(props.data?.startDateTime), 6),
      key: 'selection',
    },
  ]);

  const createScheduleHandler = () => {
    if (
      !scheduleTitleRef.current.value ||
      !scheduleContentRef.current.value ||
      !scheduleCategory.id
    ) {
      alert('비어있는 공간이 있습니다');
    }

    ScheduleAPI.addSchedule({
      title: scheduleTitleRef.current.value,
      content: scheduleContentRef.current.value,
      startDateTime: timeFunction.jsDateTypeAddDays(state[0].startDate, 1),
      endDateTime: timeFunction.jsDateTypeAddDays(state[0].endDate, 1),
      scheduleCategoryId: Number(scheduleCategory.id),
    }).then((res: unknown) => {
      const scheduleData = res.json.schedule;
      const { id, title, content, startDateTime, endDateTime, isChecked } =
        scheduleData;
      if (props.methodType === 'month') {
        queryClient.setQueryData(
          [
            'scheduleList',
            store.getState().scheduleStore.calendarMonth,
            authStore.id,
          ],
          (oldData) => {
            let _index = -1;
            oldData.json.scheduleList.map((i, index) => {
              if (
                dateFormat4y2m2d(scheduleData.startDateTime) <
                  i.startDateTime &&
                _index == -1
              ) {
                _index = index;
                oldData.json.scheduleList.splice(index, 0, {
                  id,
                  title,
                  content,
                  startDateTime,
                  endDateTime,
                  isChecked,
                  scheduleCategory: {
                    id: Number(scheduleData.scheduleCategory.id),
                    name: scheduleData.scheduleCategory.name,
                    backgroundColor:
                      scheduleData.scheduleCategory.backgroundColor,
                    userId: scheduleData.scheduleCategory.userId,
                    isVisible: scheduleData.scheduleCategory.isVisible,
                  },
                });
              }
            });
            if (_index == -1) {
              oldData.json.scheduleList.push({
                id: scheduleData.id,
                title: scheduleData.title,
                content: scheduleData.content,
                startDateTime: scheduleData.startDateTime,
                endDateTime: scheduleData.endDateTime,
                isChecked: scheduleData.isChecked,
                scheduleCategory: {
                  id: Number(scheduleData.scheduleCategory.id),
                  name: scheduleData.scheduleCategory.name,
                  backgroundColor:
                    scheduleData.scheduleCategory.backgroundColor,
                  userId: scheduleData.scheduleCategory.userId,
                  isVisible: scheduleData.scheduleCategory.isVisible,
                },
              });
            }
            return oldData;
          },
        );
      } else {
        store.dispatch(
          SET_TODAY_SCHEDULE_LIST([
            ...scheduleStore.todayScheduleList,
            {
              id: scheduleData.id,
              title: scheduleData.title,
              content: scheduleData.content,
              startDateTime: scheduleData.startDateTime,
              endDateTime: scheduleData.endDateTime,
              isChecked: scheduleData.isChecked,
              scheduleCategory: {
                id: Number(scheduleData.scheduleCategory.id),
                name: scheduleData.scheduleCategory.name,
                backgroundColor: scheduleData.scheduleCategory.backgroundColor,
                userId: scheduleData.scheduleCategory.userId,
                isVisible: scheduleData.scheduleCategory.isVisible,
              },
            },
          ]),
        );
      }

      props.closeModal();
    });
  };

  const updateScheduleHandler = () => {
    ScheduleAPI.updateSchedule({
      id: props.data.id,
      title: scheduleTitleRef.current.value,
      content: scheduleContentRef.current.value,
      startDateTime: timeFunction.jsDateTypeAddDays(state[0].startDate, 1),
      endDateTime: timeFunction.jsDateTypeAddDays(state[0].endDate, 1),
      scheduleCategoryId: Number(scheduleCategory.id),
    }).then((res: unknown) => {
      const scheduleData = res.json.schedule;
      if (scheduleData.id == props.data.id)
        if (props.methodType == 'month') {
          queryClient.setQueryData(
            [
              'scheduleList',
              store.getState().scheduleStore.calendarMonth,
              authStore.id,
            ],
            (oldData) => {
              oldData.json.scheduleList = oldData.json.scheduleList.map((i) => {
                if (scheduleData.id == i.id) {
                  return {
                    id: scheduleData.id,
                    title: scheduleData.title,
                    content: scheduleData.content,
                    startDateTime: scheduleData.startDateTime,
                    endDateTime: scheduleData.endDateTime,
                    isChecked: scheduleData.isChecked,
                    scheduleCategory: {
                      id: Number(scheduleData.scheduleCategory.id),
                      name: scheduleData.scheduleCategory.name,
                      backgroundColor:
                        scheduleData.scheduleCategory.backgroundColor,
                      userId: scheduleData.scheduleCategory.userId,
                      isVisible: scheduleData.scheduleCategory.isVisible,
                    },
                  };
                }
                return i;
              });
              return oldData;
            },
          );
        } else {
          const temp = scheduleStore.todayScheduleList.map((i) => {
            if (i.id == props.data.id) {
              return {
                id: scheduleData.id,
                title: scheduleData.title,
                content: scheduleData.content,
                startDateTime: scheduleData.startDateTime,
                endDateTime: scheduleData.endDateTime,
                scheduleCategory: {
                  id: Number(scheduleData.scheduleCategory.id),
                  name: scheduleData.scheduleCategory.name,
                  backgroundColor:
                    scheduleData.scheduleCategory.backgroundColor,
                  userId: scheduleData.scheduleCategory.userId,
                },
              };
            } else {
              return i;
            }
          });
          store.dispatch(SET_TODAY_SCHEDULE_LIST(temp));
        }
      props.closeModal();
    });
  };

  const deleteScheduleHandler = () => {
    ScheduleAPI.deleteSchedule({
      id: props.data.id,
    }).then(() => {
      store.dispatch(
        SET_TODAY_SCHEDULE_LIST(
          scheduleStore.todayScheduleList.filter((i) => i.id != props.data.id),
        ),
      );
      queryClient.setQueryData(
        [
          'scheduleList',
          store.getState().scheduleStore.calendarMonth,
          authStore.id,
        ],
        (oldData) => {
          oldData.json.scheduleList = oldData.json.scheduleList.filter(
            (i) => props.data.id != i.id,
          );
          return oldData;
        },
      );
      props.closeModal();
    });
  };

  useEffect(() => {
    if (scheduleCategoryListResData.isFetching) return;
    const _temp = store
      .getState()
      .scheduleStore.scheduleCategoryList.filter(
        (i) => i.id == scheduleCategory?.id,
      )[0];
    if (_temp) {
      setScheduleCategory(_temp);
    } else {
      if (!props.edit) return;
    }
  }, [scheduleCategoryListResData.dataUpdatedAt]);

  return (
    <Container onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <ReactiveDiv>
        <CC.ColumnDiv pd={'0rem 0.5rem'}>
          <CC.ColumnStartDiv gap={8}>
            <CC.RowBetweenDiv w={'100%'}>
              <div>카테고리</div>
            </CC.RowBetweenDiv>
            <CC.RowDiv gap={8}>
              <Select
                w={'100%'}
                placeholder={
                  props.edit
                    ? ''
                    : scheduleStore.scheduleCategoryList.length == 0
                      ? '우측에서 카테고리를 생성해주세요'
                      : '카테고리를 선택해주세요'
                }
                outline={true}
                onChange={(i) =>
                  setScheduleCategory({ id: i.value, name: i.name, bg: i.bg })
                }
                defaultValue={{
                  value: scheduleCategory?.id,
                  name: scheduleCategory?.name,
                  bg: scheduleCategory?.bg || scheduleCategory?.backgroundColor,
                }}
                data={scheduleCategoryListResData?.data?.json?.scheduleCategoryList.map(
                  (i) => {
                    return { value: i.id, name: i.name, bg: i.backgroundColor };
                  },
                )}
              ></Select>
            </CC.RowDiv>
          </CC.ColumnStartDiv>
          <CC.ColumnStartDiv gap={8}>
            <CC.RowStartDiv w={'100%'}>일정 제목</CC.RowStartDiv>
            <Input
              placeholder={'제목을 작성해주세요'}
              ref={scheduleTitleRef}
              defaultValue={props.data?.title}
              outline={1}
              h={'2.25rem'}
              pd={'0 0 0 0.5rem'}
              bg={"white80"}
            />
          </CC.ColumnStartDiv>
          <CC.ColumnStartDiv h={'100%'} gap={8}>
            <CC.RowStartDiv w={'100%'}>일정 내용</CC.RowStartDiv>
            <Textarea
              submit={() =>
                props.edit ? updateScheduleHandler() : createScheduleHandler()
              }
              h={'100%'}
              pd={'0.5rem'}
              ref={scheduleContentRef}
              defaultValue={props.data?.content}
              placeholder={'일정 내용을 작성해주세요'}
            />
          </CC.ColumnStartDiv>
        </CC.ColumnDiv>
        <CC.ColumnCenterDiv h={'100%'} gap={8} pd={'0rem 0.5rem'}>
          <DateRangePicker
            onChange={(item) => {
              setState([item.selection]);
            }}
            showSelectionPreview={true}
            // moveRangeOnFirstSelection={true}
            showDateDisplay={false}
            months={2}
            ranges={state}
          />
        </CC.ColumnCenterDiv>
      </ReactiveDiv>
      {props.edit ? (
        <CC.RowDiv gap={8}>
          <Button
            w={'100%'}
            bg={'white80'}
            onClick={(e: MouseEvent) => {
              updateScheduleHandler();
              e.stopPropagation();
            }}
            outline={true}
          >
            일정 수정
          </Button>
          <ConfirmButton
            w={'100%'}
            bg={'red60'}
            outline={true}
            onClick={(e: React.MouseEvent) => {
              deleteScheduleHandler();
              e.stopPropagation();
            }}
          >
            일정 삭제
          </ConfirmButton>
        </CC.RowDiv>
      ) : (
        <Button
          w={'100%'}
          onClick={(e: React.MouseEvent) => {
            createScheduleHandler();
            e.stopPropagation();
          }}
          outline={true}
          h={'2.75rem'}
        >
          일정 추가
        </Button>
      )}
    </Container>
  );
};
export default ScheduleModal;

const Container = styled(CC.ColumnBetweenDiv)`
  gap: 0.5rem;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.black80};
  overflow: scroll;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  font-size: 1.4rem;
  min-height: 26rem;

  .rdrCalendarWrapper {
  }
  .rdrDefinedRangesWrapper {
    display: none;
  }
  .rdrMonthAndYearWrapper {
    box-shadow: 0.2rem 0.2rem 0.4rem 0rem rgba(0, 0, 0, 0.25);
    margin-bottom: 0.8rem;
  }
  .rdrDateRangeWrapper {
    width: 100%;
    padding: 0.8rem 0rem;
  }
  .rdrMonthsVertical {
    align-items: center;
    gap: 0.8rem;
  }
  .rdrMonth {
    font-size: 1.2rem;
    @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
      font-size: 1rem;
    }
  }
  & > button {
    flex-shrink: 0;
  }
`;

const ReactiveDiv = styled.div`
  display: flex;
  flex-flow: nowrap column;
  gap: 0.4rem;

  @media (min-width: ${(props) => props.theme.deviceSizes.tablet}) {
    flex-flow: nowrap row;
    & > div {
      width: 50%;
      min-width: 32rem;
    }
  }

  textarea {
    min-height: 20rem;
  }
`;
