import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Animations from '../common/animations/Animations';
import { Button } from '@/components/common/button/Button';
import MemoItem from './MemoItem';
import Image from 'next/image';
import { Icons } from '@/components/common/icons/Icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { useEffect, useState } from 'react';
import { store } from '@/redux/store';
import { MemoAPI } from '@/api/MemoAPI';
import { SET_MEMO_CATEGORY_LIST, SET_MEMO_LIST } from '@/redux/store/memo';
import ModalButton from '@/components/common/button/ModalButton';
import MemoCategoryModal from '@/components/memo/modal/MemoCategoryModal';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MemoContainer.tsx
 * @version 0.0.1 "2023-09-29 02:20:31"
 * @description 설명
 */

interface IMemoContainerProps {
  active: number;
  onClick: () => void;
}

const MemoContainer = (props: IMemoContainerProps) => {
  const memoStore = useSelector((state: RootState) => state.memoStore);
  const [activeMenu, setActiveMenu] = useState({
    type: 'all',
    categoryId: '',
  });

  useEffect(() => {
    MemoAPI.getMemoCategoryList()
      .then((res: any) => {
        store.dispatch(
          SET_MEMO_CATEGORY_LIST(res.jsonObject?.memoCategoryList)
        );
      })
      .catch((err: any) => {
        console.log('MemoCategoryModal.tsx 파일1 err: ', err);
      });

    MemoAPI.getMemoList({
      type: 'all',
    })
      .then((res: any) => {
        store.dispatch(SET_MEMO_LIST(res.jsonObject?.memoList));
      })
      .catch((err: any) => {
        console.log('MemoCategoryModal.tsx 파일2 err: ', err);
      });
  }, []);

  return (
    <Container>
      <MemoMenuNavListContainer>
        <Button
          bg={'gray60'}
          active={activeMenu.type === 'all'}
          onClick={() =>
            setActiveMenu({
              type: 'all',
              categoryId: '',
            })
          }
        >
          ALL
        </Button>
        {memoStore.memoCategoryList?.map(i => (
          <Button
            bg={i.backgroundColor}
            active={activeMenu.type === i.name}
            onClick={() =>
              setActiveMenu({
                type: i.name,
                categoryId: i.id,
              })
            }
          >
            {i.name}
          </Button>
        ))}
        {memoStore.memoCategoryList.length == 0 && (
          <div> 우측에서 카테고리를 먼저 추가해주세요 </div>
        )}
        <ModalButton
          modal={<MemoCategoryModal />}
          modalOverlayVisible={true}
          h={'32px'}
          modalW={'50%'}
          modalH={'200%'}
        >
          <Image src={Icons.SettingIcon} weight={20} height={20} alt="" />
        </ModalButton>
      </MemoMenuNavListContainer>
      <MainContainer>
        {activeMenu.type != 'all' && (
          <MemoItem edit={false} category={activeMenu} />
        )}
        {memoStore.memoList
          .filter(i =>
            activeMenu.type == 'all'
              ? true
              : i.memoCategory.name == activeMenu.type
          )
          .map(i => (
            <MemoItem data={i} edit={true} key={i.id} />
          ))}
      </MainContainer>
    </Container>
  );
};
export default MemoContainer;

const Container = styled(CC.ColumnStartDiv)`
  height: max-content;
  margin-bottom: 12px;
`;

const MemoMenuNavListContainer = styled(CC.RowDiv)`
  gap: 4px;
  padding: 10px 4px;
  flex-flow: wrap row;
  background: ${props => props.theme.main.contrast};
  border-radius: 4px;
  outline: solid black 1px;
  height: 48px;
  & > button {
    min-width: 70px;
    border-radius: ${props => props.theme.borderRadius.br10};
    font-family: ${props => props.theme.fontFamily.yanoljaYacheBold};
  }
`;

const MainContainer = styled.div`
  display: grid;
  gap: 8px;
  outline: solid black 1px;
  border-radius: 4px;
  padding: 8px 8px 16px 8px;
  background: ${props => props.theme.colors.gray20};
  height: max-content;

  @media (min-width: ${props => props.theme.deviceSizes.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${props => props.theme.deviceSizes.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${props => props.theme.deviceSizes.pc}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
