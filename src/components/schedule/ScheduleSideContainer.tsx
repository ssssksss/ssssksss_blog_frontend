import { ScheduleAPI } from '@api/ScheduleAPI';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import ScheduleCategoryModal from '@components/schedule/modal/ScheduleCategoryModal';
import styled from '@emotion/styled';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { memo, useReducer } from 'react';
import { useSelector } from 'react-redux';
import ScheduleCategoryItem from './ScheduleCategoryItem';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleSideContainer.tsx
 * @version 0.0.1 "2024-02-06 04:52:41"
 * @description 설명
 */
const ScheduleSideContainer = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  const [scheduleCategoryBoxIsOpen, hideScheduleCategoryBoxToggle] = useReducer(
    (v) => !v,
    true,
  );

  const scheduleCategoryListResData = ScheduleAPI.getScheduleCategoryList();
  return (
    <Container>
      <CategoryBox onClick={() => hideScheduleCategoryBoxToggle()}>
        <CategorySideTitle isOpen={scheduleCategoryBoxIsOpen}>
          카테고리
        </CategorySideTitle>
        {authStore.id && (
          <ModalButton
            color={'primary80'}
            modalW={'100vw'}
            modalMaxW={'600px'}
            modalOverlayVisible={true}
            w={'16px'}
            h={'16px'}
            modal={<ScheduleCategoryModal />}
          >
            <CC.ImgContainer w={'100%'} h={'100%'}>
              <Image src={Icons.SettingIcon} alt="" />
            </CC.ImgContainer>
          </ModalButton>
        )}
      </CategoryBox>
      <CategoryListContainer isOpen={scheduleCategoryBoxIsOpen}>
        {scheduleCategoryListResData?.isLoading ||
          scheduleCategoryListResData?.data?.json?.scheduleCategoryList.map(
            (i, index) => <ScheduleCategoryItem key={index} {...i} />,
          )}
      </CategoryListContainer>
    </Container>
  );
};
export default memo(ScheduleSideContainer);

const Container = styled(CC.ColumnDiv.withComponent('article'))`
  position: relative;
  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    top: ${(props) => props.theme.calcRem(1)};
    left: ${(props) => props.theme.calcRem(1)};
    position: absolute;
    background: ${(props) => props.theme.main.contrast};
  }
`;
const CategoryBox = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: auto ${(props) => props.theme.calcRem(20)};
  background: ${(props) => props.theme.main.secondary40};
  align-items: center;

  & > button {
    position: absolute;
    width: ${(props) => props.theme.calcRem(16)};
    height: ${(props) => props.theme.calcRem(20)};
    right: 4px;
  }
`;

const CategorySideTitle = styled.div<{ isOpen: boolean }>`
  padding: 4px 2px;
  /* @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    writing-mode: ${(props) =>
    props.isOpen ? 'horizontal-tb' : 'vertical-lr'};
  } */
`;

const CategoryListContainer = styled(CC.ColumnDiv)<{ isOpen: boolean }>`
  width: 100%;
  display: flex;

  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  }
`;
