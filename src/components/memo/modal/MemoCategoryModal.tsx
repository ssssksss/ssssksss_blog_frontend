import styled from '@emotion/styled';
import { CC } from '@/styles/commonComponentStyle';
import { Input } from '@/components/common/input/Input';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import Dropdown from '@/components/common/dropdown/Dropdown';
import AddMemoCategoryBox from '../AddMemoCategoryBox';
import UpdateMemoCategoryBox from '../UpdateMemoCategoryBox';
import DeleteMemoCategoryBox from '../DeleteMemoCategoryBox';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MemoCategoryModal.tsx
 * @version 0.0.1 "2023-12-13 15:34:42"
 * @description 설명
 */
const MemoCategoryModal = props => {
  return (
    <Container>
      <AddMemoCategoryBox closeModal={props.closeModal} />
      <UpdateMemoCategoryBox closeModal={props.closeModal} />
      <DeleteMemoCategoryBox closeModal={props.closeModal} />
    </Container>
  );
};
export default MemoCategoryModal;

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
