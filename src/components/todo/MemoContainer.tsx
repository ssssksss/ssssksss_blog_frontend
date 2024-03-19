import { MemoAPI } from '@api/MemoAPI';
import RowScrollListBox from '@components/common/ListBox/RowScrollListBox';
import Button from '@components/common/button/Button';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import MemoCategoryModal from '@components/memo/modal/MemoCategoryModal';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { SET_MEMO_CATEGORY_LIST, SET_MEMO_LIST } from '@redux/store/memo';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MemoItem from './MemoItem';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MemoContainer.tsx
 * @version 0.0.1 "2023-09-29 02:20:31"
 * @description 설명
 */

const MemoContainer = () => {
  const memoStore = useSelector((state: RootState) => state.memoStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  const [activeMenu, setActiveMenu] = useState({
    type: 'all',
    categoryId: '',
    isShowMessage: true,
  });

  // const memoCategoryListQueryResData = MemoAPI.getMemoCategoryList();
  // const memoListQueryResData = MemoAPI.getMemoList({
  //   type: 'all',
  // });

  useEffect(() => {
    if (!authStore.id) return;
    MemoAPI.getMemoCategoryList().then((res: any) => {
      store.dispatch(SET_MEMO_CATEGORY_LIST(res.json?.memoCategoryList));
    });

    MemoAPI.getMemoList({
      type: 'all',
    }).then((res: any) => {
      store.dispatch(SET_MEMO_LIST(res.json?.memoList));
    });
  }, [authStore.id]);

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
        {memoStore.memoCategoryList?.map((i) => (
          <Button
            key={i.id}
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
        {authStore.id && (
          <ModalButton
            modal={<MemoCategoryModal />}
            modalOverlayVisible={true}
            modalMinW={'32rem'}
            outline={true}
          >
            <Image src={Icons.SettingIcon} weight={20} height={20} alt="" />
          </ModalButton>
        )}
      </MemoMenuNavListContainer>
      <MainContainer>
        {activeMenu.type != 'all' && authStore.id && (
          <MemoItem edit={false} category={activeMenu} />
        )}
        {memoStore.memoList
          ?.filter((i) =>
            activeMenu.type == 'all'
              ? true
              : i.memoCategory.name == activeMenu.type,
          )
          .map((i) => <MemoItem data={i} edit={true} key={i.id} />)}
      </MainContainer>
    </Container>
  );
};
export default MemoContainer;

const Container = styled(CC.ColumnStartDiv.withComponent('article'))`
  margin-bottom: 1.2rem;
  height: 100%;
`;

const MemoMenuNavListContainer = styled(RowScrollListBox)`
  gap: 0.4rem;
  background: ${(props) => props.theme.main.contrast};
  border-radius: 0.4rem;
  outline: solid black 0.1rem;
  padding: 0.4rem;
  height: 3em;
  flex-shrink: 0;
  ${(props) => props.theme.scroll.hidden};
  & > button {
    min-width: 7rem;
    border-radius: ${(props) => props.theme.borderRadius.br10};
    font-family: ${(props) => props.theme.fontFamily.yanoljaYacheBold};
  }
`;

const MainContainer = styled.div`
  display: grid;
  gap: 0.8rem;
  outline: solid black 0.1rem;
  border-radius: 0.4rem;
  padding: 0.8rem 0.8rem 1.6rem 0.8rem;
  background: ${(props) => props.theme.colors.gray20};
  ${(props) => props.theme.scroll.hidden};

  @media (min-width: ${(props) => props.theme.deviceSizes.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${(props) => props.theme.deviceSizes.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${(props) => props.theme.deviceSizes.pc}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
