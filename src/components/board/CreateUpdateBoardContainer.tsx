import { BoardAPI } from '@api/BoardAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { commonTheme } from '@styles/theme';
import { useRouter } from 'next/router';
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
  const createBoardMutation = BoardAPI.createBoard();
  const updateBoardMutation = BoardAPI.updateBoard();
  const boardResData = BoardAPI.getBoard({
    id: router.query.id,
    onSuccessHandler: (res) => {
      methods.setValue('title', res.data.json?.board.title);
      methods.setValue('content', res.data.json?.board.content, {
        shouldValidate: true,
      });
      methods.trigger('title');
    },
    enabled: props.edit,
  });
  const methods = useForm({
    resolver: yupResolver(props.edit ? BoardUpdateYup : BoardCreateYup),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '# \n ##  \n',
    },
  });

  const submitHandler = () => {
    createBoardMutation({
      title: methods.getValues('title'),
      content: '',
      writer: authStore.nickname,
    });
  };

  const updateHandler = () => {
    updateBoardMutation({
      id: router.query.id,
      title: methods.getValues('title'),
      content: '',
    });
  };

  return (
    <>
      {(authStore.role === 'ROLE_ADMIN' || authStore.role === 'ROLE_USER') && (
        <>
          <Container gap={4}>
            {(!props.edit || boardResData?.status == 'success') && (
              <Title
                placeholder="제목을 입력해주세요"
                defaultValue={methods.getValues('title')}
                register={methods.register('title')}
              />
            )}
            <EditorContainer></EditorContainer>
            <EditorFooter>
              <Button
                w={'100%'}
                outline={true}
                onClick={() => (props.edit ? updateHandler() : submitHandler())}
              >
                {props.edit ? '수정' : '제출'}
              </Button>
              <Button w={'100%'} outline={true} onClick={() => router.back()}>
                취소
              </Button>
            </EditorFooter>
          </Container>
        </>
      )}
    </>
  );
};
export default CreateUpdateBoardContainer;

const Container = styled.section`
  position: relative;
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;
  background-color: white;
  border-radius: 0rem 0rem 1rem 1rem;
  /* background: ${commonTheme.backgroundColors.background2}; */
`;

const Title = styled(Input)`
  width: 100%;
  height: 4.8rem;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  color: ${(props) => props.theme.colors.black80};
  padding: 1.6rem;
  z-index: 3;
  border: none;
  font-size: 1.6rem;
  border-radius: 0rem;
  border-bottom: 0.2rem solid ${(props) => props.theme.colors.black40};
  &::placeholder {
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.black40};
  }
`;
const EditorContainer = styled.div`
  padding-bottom: 0.8rem;
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
    bottom: 8rem;
  }
`;
const EditorFooter = styled(CC.GridColumn2)`
  height: 4rem;
  gap: 1rem;
  position: sticky;
  padding: 0rem 0.4rem;
  bottom: 0.8rem;
  margin-bottom: 0.8rem;
  background: rgba(255, 255, 255, 0.5);
  button {
    color: ${(props) => props.theme.main.primary80};
    &:hover {
      transform: scale(1.2);
      background: ${(props) => props.theme.main.primary80};
      color: ${(props) => props.theme.main.contrast};
    }
  }
`;
