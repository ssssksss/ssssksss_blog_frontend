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
            modalW={'calc(100vw - 1rem)'}
            modalH={'auto'}
            modalMaxW={'30rem'}
            modalBg={"white20"}
            modalOverlayVisible={true}
            w={'1.6rem'}
            h={'1.6rem'}
            modal={<ScheduleCategoryModal />}
          >
            <CC.ImgContainer w={'100%'} h={'100%'}>
              <Image src={Icons.SettingIcon} alt="" />
            </CC.ImgContainer>
          </ModalButton>
        )}
      </CategoryBox>
      {scheduleCategoryBoxIsOpen && (
        <CategoryListContainer>
          {scheduleCategoryListResData?.isLoading ||
            scheduleCategoryListResData?.data?.json?.scheduleCategoryList.map(
              (i, index) => <ScheduleCategoryItem key={index} {...i} />,
            )}
        </CategoryListContainer>
      )}
    </Container>
  );
};
export default memo(ScheduleSideContainer);

const Container = styled(CC.ColumnDiv.withComponent('article'))`
  position: relative;
  height: 100%;
  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    top: 0;
    left: 0;
    position: absolute;
    height: auto;
  }
  font-size: 1rem;
  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 0.75rem;
  }
`;
const CategoryBox = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 2rem;
  background: ${(props) => props.theme.main.secondary40};
  align-items: center;
  height: 2.4rem;

  & > button {
    position: absolute;
    width: 1.6rem;
    right: 0.4rem;
  }
`;

const CategorySideTitle = styled.div<{ isOpen: boolean }>`
  padding: 0.4rem 0.2rem;
`;

const CategoryListContainer = styled(CC.ColumnDiv)`
  width: 100%;
  top: 2.4rem;
  display: flex;
  position: absolute;
  z-index: 4;
  background: white;
`;
