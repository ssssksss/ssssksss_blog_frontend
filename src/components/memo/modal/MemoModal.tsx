import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Button from '@/components/common/button/Button';
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
import MemoCategoryModal from '@/components/memo/modal/MemoCategoryModal';
import Dropdown from '@/components/common/dropdown/Dropdown';
import Textarea from '@/components/common/textarea/Textarea';
import { MemoAPI } from '@/api/MemoAPI';
import { SET_MEMO_CATEGORY_LIST, SET_MEMO_LIST } from '@/redux/store/memo';
import { Time } from '@/utils/function/Time';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MemoModal.tsx
 * @version 0.0.1 "2023-12-09 17:03:26"
 * @description 설명
 */
interface IMemoModalProps {
  edit?: boolean;
  data?: {
    id: number;
    content: string;
    memoCategory: {
      id: number;
      name: string;
      backgroundColor: string;
      userId: number;
    };
  };
  closeModal?: () => void;
}

const MemoModal = (props: IMemoModalProps) => {
  const memoContentRef = useRef<null>();
  const memoStore = useSelector((state: RootState) => state.memoStore);
  const [memoCategory, setMemoCategory] = useState('');
  let choiceMemoCategory = '';

  const changeMemoCategory = (i: {
    id: number;
    name: string;
    userId: number;
    backgroundColor: string;
  }) => {
    setMemoCategory(i);
  };

  const addMemoHandler = () => {
    MemoAPI.addMemo({
      content: memoContentRef.current.value,
      memoCategoryId: Number(memoCategory.id),
    })
      .then((res: any) => {
        store.dispatch(
          SET_MEMO_LIST([
            ...memoStore.memoList,
            {
              id: res.jsonObject.memo.id,
              content: res.jsonObject.memo.content,
              memoCategory: {
                id: Number(res.jsonObject.memo.memoCategory.id),
                name: res.jsonObject.memo.memoCategory.name,
                backgroundColor:
                  res.jsonObject.memo.memoCategory.backgroundColor,
              },
            },
          ])
        );
        props.closeModal();
      })
      .catch((err: any) => {
        console.log('MemoModal.tsx 파일 : ', err);
      });
  };

  useEffect(() => {
    MemoAPI.getMemoCategoryList()
      .then((res: any) => {
        store.dispatch(
          SET_MEMO_CATEGORY_LIST(res.jsonObject?.memoCategoryList)
        );
      })
      .catch((err: any) => {
        console.log('MemoCategoryModal.tsx 파일 err: ', err);
      });

    if (props.edit) {
      setMemoCategory({
        id: props.data.memoCategory.id,
        name: props.data.memoCategory.name,
        userId: props.data.memoCategory.userId,
        backgroundColor: props.data.memoCategory.backgroundColor,
      });
    }
  }, []);

  return (
    <Container>
      <CC.ColumnStartDiv h={'100%'} gap={4}>
        <CC.RowBetweenDiv w={'100%'}>
          <div> 카테고리 </div>
        </CC.RowBetweenDiv>
        <CC.RowDiv gap={4}>
          <Dropdown
            brR={'0px'}
            w={'100%'}
            hoverOff={true}
            value={memoCategory}
            bg={memoCategory.backgroundColor}
            menuList={memoStore.memoCategoryList?.map(i => {
              return {
                name: i.name,
                func: () => changeMemoCategory(i),
                bg: i.backgroundColor,
              };
            })}
          />
          <ModalButton
            color={'primary80'}
            bg={'primary40'}
            modalW={'100%'}
            modalH={'100%'}
            w={'24px'}
            h={'24px'}
            maxH={'200%'}
            modal={<MemoCategoryModal />}
          >
            <Image src={Icons.SettingIcon} alt="" />
          </ModalButton>
        </CC.RowDiv>
      </CC.ColumnStartDiv>
      <CC.ColumnStartDiv h={'100%'} gap={4}>
        <CC.RowStartDiv w={'100%'}>메모 내용</CC.RowStartDiv>
        <Textarea
          submit={() => alert('test')}
          h={'120px'}
          pd={'8px'}
          ref={memoContentRef}
          defaultValue={props.data?.content}
          placeholder={'메모 내용을 작성해주세요'}
        />
      </CC.ColumnStartDiv>
      <Button w={'100%'} onClick={() => addMemoHandler()} bg={'primary80'}>
        메모 추가
      </Button>
    </Container>
  );
};
export default MemoModal;

const Container = styled(CC.ColumnStartDiv)`
  gap: 16px;
  padding: 4px;
  color: ${props => props.theme.colors.black80};
  overflow: scroll;
  background: ${props => props.theme.main.primary40};
  font-family: ${props => props.theme.fontFamily.cookieRunRegular};
  font-size: ${props => props.theme.fontSize.xl};
  min-height: 260px;

  .rdrDefinedRangesWrapper {
    display: none;
  }
  .rdrDateRangeWrapper {
    width: 100%;
  }
  .rdrMonthsVertical {
    align-items: center;
    gap: 8px;
  }
  .rdrMonth {
    outline: solid ${props => props.theme.main.primary20} 1px;
  }
`;
