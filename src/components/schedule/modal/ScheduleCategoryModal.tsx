import styled from '@emotion/styled';
import { CC } from '@/styles/commonComponentStyle';
import { Input } from '@/components/common/input/Input';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import Dropdown from '@/components/common/dropdown/Dropdown';
import AddScheduleCategoryBox from '../AddScheduleCategoryBox';
import UpdateScheduleCategoryBox from '../UpdateScheduleCategoryBox';
import DeleteScheduleCategoryBox from '../DeleteScheduleCategoryBox';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleCategoryModal.tsx
 * @version 0.0.1 "2023-12-13 15:34:42"
 * @description 설명
 */
const ScheduleCategoryModal = props => {
  return (
    <Container>
      <AddScheduleCategoryBox closeModal={props.closeModal} />
      <UpdateScheduleCategoryBox closeModal={props.closeModal} />
      <DeleteScheduleCategoryBox closeModal={props.closeModal} />
    </Container>
  );
};
export default ScheduleCategoryModal;

const Container = styled(CC.ColumnDiv)`
  gap: 32px;
  padding: 0px 4px;
  color: ${props => props.theme.colors.black80};
  overflow: scroll;
  background: ${props => props.theme.main.primary40};
  font-family: ${props => props.theme.fontFamily.cookieRunRegular};
  font-size: ${props => props.theme.fontSize.xl};
  min-height: 260px;
`;
