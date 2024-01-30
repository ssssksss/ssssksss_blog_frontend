import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Button from '@/components/common/button/Button';
import { Shell } from '@/components/common/shell/Shell';
import { Input } from '@/components/common/input/Input';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import ModalButton from '@/components/common/button/ModalButton';
import { useEffect, useRef, useState } from 'react';
import { UserSignupYup } from '@/components/yup/UserSignupYup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { TodoAPI } from '@/api/TodoAPI';
import { useSelector } from 'react-redux';
import { RootState } from '@react-three/fiber';
import { store } from '@/redux/store';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import ko from 'date-fns/locale/ko';
import ScheduleCategoryModal from '@/components/schedule/modal/ScheduleCategoryModal';
import Textarea from '@/components/common/textarea/Textarea';
import { ScheduleAPI } from '@/api/ScheduleAPI';
import {
  SET_SCHEDULE_CATEGORY_LIST,
  SET_TODAY_SCHEDULE_LIST,
  SET_TOGGLE_UP_TO_DATE_MONTH_SCHEDULE,
} from '@/redux/store/schedule';
import { Time } from '@/utils/function/Time';
import Select from '@/components/common/select/Select';
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
  closeModal: () => void;
  // methodType은 달력 월 형태와 오늘의 일정만 보는 2가지의 경우 redux에 저장하는 형태가 달라서 필요한 props
  methodType: string;
}

const ScheduleModal = (props: IScheduleModalProps) => {
  const scheduleTitleRef = useRef<null>();
  const scheduleContentRef = useRef<null>();
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const [scheduleCategory, setScheduleCategory] = useState('');
  const [state, setState] = useState([
    {
      startDate: props.data?.startDateTime
        ? new Date(props.data?.startDateTime)
        : new Date(),
      endDate: addDays(
        props.data?.startDateTime
          ? new Date(props.data?.startDateTime)
          : new Date(),
        6
      ),
      key: 'selection',
    },
  ]);
  let choiceScheduleCategory = '';

  const changeScheduleCategory = (i: {
    id: number;
    name: string;
    userId: number;
    backgroundColor: string;
  }) => {
    setScheduleCategory(i);
  };

  const addScheduleHandler = () => {
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
      startDateTime: Time.jsDateTypeAddDays(state[0].startDate, 1),
      endDateTime: Time.jsDateTypeAddDays(state[0].endDate, 1),
      scheduleCategoryId: Number(scheduleCategory.id),
    })
      .then((res: any) => {
        if (props.methodType === 'month') {
          store.dispatch(
            SET_TOGGLE_UP_TO_DATE_MONTH_SCHEDULE(
              !scheduleStore.toggleUptoDateMonthSchedule
            )
          );
        } else {
          store.dispatch(
            SET_TODAY_SCHEDULE_LIST([
              ...scheduleStore.todayScheduleList,
              {
                id: res.json.schedule.id,
                title: res.json.schedule.title,
                content: res.json.schedule.content,
                startDateTime: res.json.schedule.startDateTime,
                endDateTime: res.json.schedule.endDateTime,
                scheduleCategory: {
                  id: Number(res.json.schedule.scheduleCategory.id),
                  name: res.json.schedule.scheduleCategory.name,
                  backgroundColor:
                    res.json.schedule.scheduleCategory.backgroundColor,
                  userId: res.json.schedule.scheduleCategory.userId,
                },
              },
            ])
          );
        }
        props.closeModal();
      })
      .catch((err: any) => {
        console.log('ScheduleModal.tsx 파일 : ', err);
      });
  };

  const updateScheduleHandler = () => {
    ScheduleAPI.updateSchedule({
      id: props.data.id,
      title: scheduleTitleRef.current.value,
      content: scheduleContentRef.current.value,
      startDateTime: Time.jsDateTypeAddDays(state[0].startDate, 1),
      endDateTime: Time.jsDateTypeAddDays(state[0].endDate, 1),
      scheduleCategoryId: Number(scheduleCategory.id),
    })
      .then((res: any) => {
        if (props.methodType === 'month') {
          store.dispatch(
            SET_TOGGLE_UP_TO_DATE_MONTH_SCHEDULE(
              !scheduleStore.toggleUptoDateMonthSchedule
            )
          );
        } else {
          let temp = scheduleStore.todayScheduleList.map(i => {
            if (i.id == props.data.id) {
              return {
                id: res.json.schedule.id,
                title: res.json.schedule.title,
                content: res.json.schedule.content,
                startDateTime: res.json.schedule.startDateTime,
                endDateTime: res.json.schedule.endDateTime,
                scheduleCategory: {
                  id: Number(res.json.schedule.scheduleCategory.id),
                  name: res.json.schedule.scheduleCategory.name,
                  backgroundColor:
                    res.json.schedule.scheduleCategory.backgroundColor,
                  userId: res.json.schedule.scheduleCategory.userId,
                },
              };
            }
          });
          store.dispatch(SET_TODAY_SCHEDULE_LIST(temp));
        }
        props.closeModal();
      })
      .catch((err: any) => {
        console.log('ScheduleModal.tsx 파일 : ', err);
      });
  };

  const deleteScheduleHandler = () => {
    ScheduleAPI.deleteSchedule({
      id: props.data.id,
    })
      .then((res: any) => {
        store.dispatch(
          SET_TODAY_SCHEDULE_LIST(
            scheduleStore.todayScheduleList.filter(i => i.id != props.data.id)
          )
        );
        props.closeModal();
      })
      .catch((err: any) => {
        console.log('ScheduleModal.tsx 파일 : ', err);
      });
  };

  useEffect(() => {
    ScheduleAPI.getScheduleCategoryList()
      .then((res: any) => {
        store.dispatch(
          SET_SCHEDULE_CATEGORY_LIST(res.json?.scheduleCategoryList)
        );
      })
      .catch((err: any) => {
        console.log('ScheduleCategoryModal.tsx 파일 err: ', err);
      });

    if (props.edit) {
      setScheduleCategory({
        id: props.data.scheduleCategory?.id,
        name: props.data.scheduleCategory?.name,
        userId: props.data.scheduleCategory?.userId,
        bg: props.data.scheduleCategory?.backgroundColor,
      });
    }
  }, []);

  return (
    <Container>
      <ReactiveDiv>
        <CC.ColumnDiv pd={'0px 4px'}>
          <CC.ColumnStartDiv gap={4}>
            <CC.RowBetweenDiv w={'100%'}>
              <div>카테고리</div>
            </CC.RowBetweenDiv>
            <CC.RowDiv gap={4}>
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
                onChange={i =>
                  setScheduleCategory({ id: i.value, name: i.name, bg: i.bg })
                }
                defaultValue={{
                  value: props.data?.scheduleCategory?.id,
                  name: props.data?.scheduleCategory?.name,
                  bg: props.data?.scheduleCategory?.backgroundColor,
                }}
                data={scheduleStore.scheduleCategoryList.map(i => {
                  return { value: i.id, name: i.name, bg: i.backgroundColor };
                })}
              ></Select>
              <ModalButton
                color={'primary80'}
                bg={'primary20'}
                modalW={'100%'}
                modalH={'100%'}
                w={'24px'}
                h={'24px'}
                modalMaxH={'100%'}
                modal={<ScheduleCategoryModal />}
              >
                <Image src={Icons.SettingIcon} alt="" />
              </ModalButton>
            </CC.RowDiv>
          </CC.ColumnStartDiv>
          <CC.ColumnStartDiv gap={4}>
            <CC.RowStartDiv w={'100%'}>일정 제목</CC.RowStartDiv>
            <Input
              placeholder={'제목을 작성해주세요'}
              ref={scheduleTitleRef}
              defaultValue={props.data?.content}
              outline={true}
            />
          </CC.ColumnStartDiv>
          <CC.ColumnStartDiv h={'100%'} gap={4}>
            <CC.RowStartDiv w={'100%'}>일정 내용</CC.RowStartDiv>
            <Textarea
              submit={() => alert('test')}
              h={'100%'}
              pd={'8px'}
              ref={scheduleContentRef}
              defaultValue={props.data?.content}
              placeholder={'일정 내용을 작성해주세요'}
            />
          </CC.ColumnStartDiv>
        </CC.ColumnDiv>
        <CC.ColumnCenterDiv h={'100%'} gap={4} pd={'0px 4px'}>
          <DateRangePicker
            onChange={item => {
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
            onClick={e => {
              updateScheduleHandler();
              e.stopPropagation();
            }}
            outline={true}
          >
            일정 수정
          </Button>
          <Button
            w={'100%'}
            bg={'red60'}
            outline={true}
            onClick={e => {
              deleteScheduleHandler();
              e.stopPropagation();
            }}
          >
            일정 삭제
          </Button>
        </CC.RowDiv>
      ) : (
        <Button
          w={'100%'}
          bg={'white80'}
          onClick={e => {
            addScheduleHandler();
            e.stopPropagation();
          }}
          outline={true}
        >
          일정 추가
        </Button>
      )}
    </Container>
  );
};
export default ScheduleModal;

const Container = styled(CC.ColumnBetweenDiv)`
  gap: 4px;
  padding: 8px 8px;
  color: ${props => props.theme.colors.black80};
  overflow: scroll;
  background: ${props => props.theme.main.primary40};
  font-family: ${props => props.theme.fontFamily.cookieRunRegular};
  font-size: ${props => props.theme.fontSize.xl};
  min-height: 260px;

  .rdrCalendarWrapper {
  }
  .rdrDefinedRangesWrapper {
    display: none;
  }
  .rdrMonthAndYearWrapper {
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    margin-bottom: 8px;
  }
  .rdrDateRangeWrapper {
    width: 100%;
    padding: 8px 0px;
  }
  .rdrMonthsVertical {
    align-items: center;
    gap: 8px;
  }
  .rdrMonth {
    outline: solid ${props => props.theme.main.primary40} 2px;
    font-size: 0.8rem;
    @media (max-width: ${props => props.theme.deviceSizes.tablet}) {
      font-size: 0.7rem;
    }
  }
  & > button {
    flex-shrink: 0;
  }
`;

const ReactiveDiv = styled.div`
  display: flex;
  flex-flow: nowrap column;
  gap: 4px;

  @media (min-width: ${props => props.theme.deviceSizes.pc}) {
    flex-flow: nowrap row;
    & > div {
      width: 50%;
    }
  }

  textarea {
    min-height: 200px;
  }
`;
