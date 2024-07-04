import { BoardAPI } from '@api/BoardAPI';
import Button from '@components/common/button/Button';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import Input from '@components/common/input/Input';
import { Editor } from '@components/editor/MDEditor';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { BoardCreateYup, BoardUpdateYup } from '../yup/BoardYup';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateUpdateBoardContainer.tsx
 * @version 0.0.1 "2023-10-14 00:59:02"
 * @description 설명
 */

interface IEditCreateUpdateBoardContainerProps {
  edit?: boolean;
}

const CreateUpdateBoardContainer = (
  props: IEditCreateUpdateBoardContainerProps,
) => {
  const router = useRouter();
  const authStore = useSelector((state: RootState) => state.authStore);
  const createUpdateBoardMutation = props.edit
    ? BoardAPI.updateBoard()
    : BoardAPI.createBoard();
  const [value, setValue] = useState('');
  const boardResData = BoardAPI.getBoard({
    onSuccessHandler: (res) => {
      methods.setValue('title', res.data.data?.board.title);
      methods.setValue('content', res.data.data?.board.content, {
        shouldValidate: true,
      });
      methods.trigger('title');
      setValue(res.data.data?.board.content);
    },
    enabled: props.edit && router.query.id != undefined,
  });
  const methods = useForm({
    resolver: yupResolver(props.edit ? BoardUpdateYup : BoardCreateYup),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '# \n ##  \n',
    },
  });

  if (props.edit && boardResData?.status != 'success') return;

  const submitHandler = () => {
    if (props.edit) {
      createUpdateBoardMutation({
        id: router.query.id,
        title: methods.getValues('title'),
        content: value,
      });
    } else {
      createUpdateBoardMutation({
        title: methods.getValues('title'),
        content: value,
        writer: authStore.id,
      });
    }
  };

  const editorChangeHandler = (value: string) => {
    methods.setValue('content', value);
    setValue(value);
  };

  return (
    <>
      {(authStore.role === 'ROLE_ADMIN' || authStore.role === 'ROLE_USER') && (
        <>
          <Container>
            {(!props.edit || boardResData?.status == 'success') && (
              <Title
                placeholder="제목을 입력해주세요"
                defaultValue={methods.getValues('title')}
                register={methods.register('title')}
              />
            )}
            <EditorContainer id={'editor-container'}>
              <Editor
                height={'100%'}
                onChange={editorChangeHandler}
                highlightEnable={false}
                visibleDragbar={false}
                value={value}
              />
            </EditorContainer>
            <EditorFooter outline={1} pd={'0.5rem'} gap={8} brR={'0.5rem'}>
              <Button w={'100%'} outline={true} onClick={() => submitHandler()}>
                {props.edit ? '수정' : '제출'}
              </Button>
              <ConfirmButton
                w={'100%'}
                outline={true}
                onClick={() => router.back()}
              >
                취소
              </ConfirmButton>
            </EditorFooter>
          </Container>
        </>
      )}
    </>
  );
};
export default CreateUpdateBoardContainer;

const Title = styled(Input)`
  width: 100%;
  height: 3rem;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  color: ${(props) => props.theme.colors.black80};
  z-index: 3;
  border: none;
  font-size: 1.6rem;
  border-radius: 0rem;
  outline: solid black 1px;
  outline-offset: -1px;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  gap: 0.5rem;
  
  &::placeholder {
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.black40};
  }
`;
const Container = styled.section<{
  isLoading?: boolean;
  icon?: string;
}>`
  height: 100%;
  visibility: ${(props) => props.isLoading && 'hidden'};
  position: relative;
  select {
    z-index: 5;
  }
`;

const EditorContainer = styled(CC.ColumnDiv)<{ isDragging: boolean }>`
  overflow: scroll;
  -ms-over-flow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }

  .w-md-editor {
  }

  .w-md-editor-content {
    height: calc(100vh - 12.2rem);

    &::before {
      content: '';
      background-size: 50%;
      background-image: url('/img/backgroundImage/원피스.jpg');
      background-repeat: repeat-x;
      background-position: right bottom;
      opacity: 0.2;
      position: absolute;
      top: 0rem;
      left: 0rem;
      right: 0rem;
      bottom: 0rem;
    }
  }
  .w-md-editor-area {
    opacity: ${(props) => props.isDragging && 0.5};
    height: 100%;
  }
  .w-md-editor-text-input {
    height: 100%;
  }
  .w-md-editor-preview {
    pre {
      outline: solid ${(props) => props.theme.main.primary80} 0.1rem;
      border-radius: 1rem;
      position: relative;
      box-shadow: 0.1rem 0.1rem 0.2rem 0rem rgba(0, 0, 0, 0.25);
      font-size: 1.2rem;

      button {
        display: none;
        content: '';
        background-image: ${(props) =>
          props.icon && `url('/img/ui-icon/ic-board.svg')`};
        background-size: 1rem;
        background-repeat: no-repeat;
        background-position-x: 50%;
        background-position-y: 50%;
        aspect-ratio: 1;
        position: absolute;
        width: max-content;
        top: 0rem;

        aspect-ratio: 1;
        padding: 0rem;
        border: none;
      }
      &:hover > button {
        display: flex;
      }
    }
    code {
      font-size: 1rem;
      background: #1488cc; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to right,
        #2b32b2,
        #1488cc
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to right,
        #2b32b2,
        #1488cc
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      color: white;
      padding: 2px;
    }
    pre {
      code {
        font-size: 0.8rem;
        padding: 8px 4px;
        ${(props) => props.theme.scroll.hiddenX};
        background: none;
        color: black;
      }
    }
  }
  .w-md-editor-input {
  }
  .w-md-editor-text {
    height: 100%;
  }
  .w-md-editor-show-live {
  }
`;
const EditorFooter = styled(CC.GridColumn2)`
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  z-index: 1;
  position: sticky;
`;
