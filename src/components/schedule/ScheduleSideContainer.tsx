import { ScheduleAPI } from '@api/ScheduleAPI';
import ModalButton from '@components/common/button/ModalButton';
import styled from '@emotion/styled';
import { faArrowLeft, faArrowRight, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import ScheduleCategoryItem from './ScheduleCategoryItem';
import ScheduleCategoryModal from './modal/ScheduleCategoryModal';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleSideContainer.tsx
 * @version 0.0.1 "2024-02-06 04:52:41"
 * @description 설명
 */
const ScheduleSideContainer = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  const [isOpen, setIsOpen] = useState(false);
  const scheduleCategoryListResData = ScheduleAPI.getScheduleCategoryList();
  return (
    <Container isOpen={isOpen}>
      {isOpen ? (
        <CC.ColumnLeftDiv w={"100%"}>
          <CC.RowBetweenCenterBox w={"100%"} bg={"primary20"}>
          <CC.ImgContainer w={'2rem'} h={'2rem'} onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </CC.ImgContainer>
            {!!authStore.id && (
              <ModalButton
              color={'primary80'}
                modalW={'calc(100vw - 1rem)'}
                modalH={'auto'}
                modalMaxW={'30rem'}
                modalBg={'white20'}
                modalOverlayVisible={true}
                w={'1.6rem'}
                h={'1.6rem'}
                modal={<ScheduleCategoryModal />}
                >
                <CC.ImgContainer w={'100%'} h={'100%'}>
                <FontAwesomeIcon icon={faGear} />
                </CC.ImgContainer>
                </ModalButton>
              )}
              </CC.RowBetweenCenterBox>
            <CategoryListContainer>
              {scheduleCategoryListResData?.isLoading ||
                scheduleCategoryListResData?.data?.data?.scheduleCategoryList.map(
                  (i, index) => <ScheduleCategoryItem key={index} {...i} />,
                )}
            </CategoryListContainer>
        </CC.ColumnLeftDiv>
      ) : (
        <CC.ImgContainer w={'2rem'} h={'2rem'} onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </CC.ImgContainer>
      )}
    </Container>
  );
};
export default memo(ScheduleSideContainer);

const Container = styled(CC.ColumnDiv.withComponent('article'))<{isOpen: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props=>props.isOpen ? "10rem" : "auto"};
`;

const CategoryListContainer = styled(CC.ColumnDiv)`
  width: 100%;
  display: flex;
  z-index: 1;
  background: white;
`;
