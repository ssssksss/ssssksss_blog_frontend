import { MemoAPI } from '@api/MemoAPI';
import RowScrollListBox from '@components/common/ListBox/RowScrollListBox';
import Button from '@components/common/button/Button';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import MemoCategoryModal from '@components/memo/modal/MemoCategoryModal';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { IMemoCategory } from 'src/@types/memo/memoCategory';
import { IMemoItem } from 'src/@types/memo/memoItem';
import MemoItem from './MemoItem';

const MemoContainer = () => {
  const memoStore = useSelector((state: RootState) => state.memoStore);
  const { data: memoCategoryResData = [] } = MemoAPI.getMemoCategoryList();
  const { data: memoResData = [] } = MemoAPI.getMemoList({type: "all"});
  
    return (
      <Container>
        <MemoMenuNavListContainer>
          <Button
            bg={'gray60'}
            active={memoStore.memoActiveCategoryId == 0}
            activeBg={'transparent'}
            activeColor={'black80'}
            h={'2.25rem'}
            onClick={() => {
              window.history.replaceState(
                window.history.state,
                '',
                `/memo?active=all`,
              );
              store.dispatch(rootActions.memoStore.SET_ACTIVE_CATEGORY_ID(0));
            }}
          >
            ALL
          </Button>
          {memoCategoryResData?.data?.memoCategoryList?.map(
            (i: IMemoCategory) => (
              <Button
                key={i.id}
                bg={i.backgroundColor}
                h={'2.25rem'}
                active={memoStore.memoActiveCategoryId == Number(i.id)}
                activeBg={'transparent'}
                activeColor={'black80'}
                onClick={() => {
                  window.history.replaceState(
                    window.history.state,
                    '',
                    `/memo?active=${i.name}&categoryId=${Number(i.id)}`,
                  );
                  store.dispatch(
                    rootActions.memoStore.SET_ACTIVE_CATEGORY_ID(Number(i.id)),
                  );
                }}
              >
                {i.name}
              </Button>
            ),
          )}
          <ModalButton
            modal={<MemoCategoryModal />}
            modalOverlayVisible={true}
            modalMinW={'32rem'}
            modalBg={'white'}
            outline={true}
            h={'2.25rem'}
          >
            <Image src={Icons.SettingIcon} width={20} height={20} alt="" />
          </ModalButton>
        </MemoMenuNavListContainer>
        <MainContainer>
          {memoStore.memoActiveCategoryId != 0 && (
            <MemoItem
              edit={false}
              category={{ categoryId: memoStore.memoActiveCategoryId }}
            />
          )}
          {memoResData.data?.memoList
            ?.filter((i: IMemoItem) =>
              memoStore.memoActiveCategoryId == 0
                ? true
                : i.memoCategory.id == memoStore.memoActiveCategoryId,
            )
            .map((i: IMemoItem) => (
              <MemoItem data={i} edit={true} key={i.id} />
            ))}
        </MainContainer>
      </Container>
    );
};
export default React.memo(MemoContainer);

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
