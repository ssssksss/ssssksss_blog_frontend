import styled from '@emotion/styled';
import { RootState } from '@/redux/store/reducers';
import { useSelector } from 'react-redux';
import {
  SET_CALENDAR_MONTH,
  SET_CALENDAR_YEAR,
  SET_MONTH_SCHEDULE_DATA,
} from '@/redux/store/schedule';
import theme from '@/styles/theme';
import { CC } from '@/styles/commonComponentStyle';
import { store } from '@/redux/store';
import { useEffect } from 'react';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file HeaderCalendarContainer.tsx
 * @version 0.0.1 "2023-09-06 01:38:33"
 * @description 설명
 */
const HeaderCalendarContainer = () => {
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);

  useEffect(() => {
    AxiosInstance({
      url: '/api/schedules',
      method: 'GET',
      params: {
        date:
          scheduleStore.calendarYear +
          '-' +
          (scheduleStore.calendarMonth + 1).toString().padStart(2, '0') +
          '-' +
          scheduleStore.calendarDay,
      },
    })
      .then(response => {
        store.dispatch(
          SET_MONTH_SCHEDULE_DATA(response?.data.data.scheduleList)
        );
      })
      .catch(error => {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: 'error',
            message: error.response?.data.msg,
          })
        );
      });
  }, [scheduleStore.calendarMonth]);

  const moveLeftDate = () => {
    if (scheduleStore.calendarMonth === 0) {
      store.dispatch(SET_CALENDAR_YEAR(scheduleStore.calendarYear - 1));
      store.dispatch(SET_CALENDAR_MONTH(11));
    } else {
      store.dispatch(SET_CALENDAR_MONTH(scheduleStore.calendarMonth - 1));
    }
  };

  const moveRightDate = () => {
    if (scheduleStore.calendarMonth === 11) {
      store.dispatch(SET_CALENDAR_YEAR(scheduleStore.calendarYear + 1));
      store.dispatch(SET_CALENDAR_MONTH(0));
    } else {
      store.dispatch(SET_CALENDAR_MONTH(scheduleStore.calendarMonth + 1));
    }
  };

  return (
    <Container>
      <Header>
        <CC.Img
          src="/img/ui-icon/left_arrow_icon.png"
          size="30px"
          onClick={() => {
            moveLeftDate();
          }}
        />
        {scheduleStore.calendarYear}년 {scheduleStore.calendarMonth + 1}월
        <CC.Img
          src="/img/ui-icon/right_arrow_icon.png"
          size="30px"
          onClick={() => {
            moveRightDate();
          }}
        />
      </Header>
    </Container>
  );
};
export default HeaderCalendarContainer;

const Container = styled.section`
  height: 120px;
  background: white;
`;

const Header = styled.header`
  width: 100%;
  text-align: center;
  display: flex;
  flex-flow: nowrap row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.backgroundColors.white};
  font-size: 20px;
  font-weight: 600;
  color: black;

  img:hover {
    cursor: pointer;
    transform: scale(1.6, 1.6);
    transition: ease-in-out 0.2s;
  }

  @media (max-width: 768px) {
    img {
      height: 20px;
    }
  }
`;
