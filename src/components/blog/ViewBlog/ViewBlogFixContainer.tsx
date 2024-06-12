import { deleteBlogAPI } from '@api/BlogAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ViewBlogFixContainer.tsx
 * @version 0.0.1 "2024-03-19 15:20:19"
 * @description 설명
 */
const ViewBlogFixContainer = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const BACK_URL = `/blog?firstCategoryId=${blogStore.activeFirstCategoryId}&secondCategoryId=${blogStore.activeSecondCategoryId}`;
  const router = useRouter();
  const deleteHandler = () => {
    deleteBlogAPI(router.query.id as string).then(() => {
      router.replace(
        `/blog?firstCategoryId=${blogStore.activeFirstCategoryId}&secondCategoryId=${blogStore.activeSecondCategoryId}`,
      );
    });
  };

  return (
    <Container className={'fix-container'}>
      <Container1>
        {authStore.role === 'ROLE_ADMIN' && (
          <Link href={`/blog/update?id=${router.query.id}`} prefetch={false}>
            <CC.ImgContainer w={'2rem'}>
              <EditIcon />
            </CC.ImgContainer>
          </Link>
        )}
        {authStore.role === 'ROLE_ADMIN' && (
          <ConfirmButton
            onClick={() => deleteHandler()}
            w={'max-content'}
            h={'max-content'}
            bg={'transparent'}
            pd={'0'}
          >
            <CC.ImgContainer w={'2rem'}>
              <DeleteIcon />
            </CC.ImgContainer>
          </ConfirmButton>
        )}
        <Link href={BACK_URL}>
          <CC.ImgContainer w={'2rem'}>
            <MenuIcon />
          </CC.ImgContainer>
        </Link>
      </Container1>
    </Container>
  );
};
export default ViewBlogFixContainer;

const Container = styled(CC.ColumnDiv)`
  background: ${(props) => props.theme.main.primary80};
  position: sticky;
  width: 0px;
  height: 0px;
  left: 100vw;
  top: max(6.2rem, 22rem);
  z-index: 40;

  img {
    cursor: pointer;
  }
  img:hover {
    transform: scale(1.2);
  }
`;

const Container1 = styled(CC.ColumnDiv)`
  width: 3rem;
  z-index: 50;
  position: relative;
  transform: translate(-100%, 0%);
  background: ${(props) => props.theme.colors.white80};
  outline: solid black 1px;
  outline-offset: -1px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background: ${(props) => props.theme.main.primary80};
  align-items: center;
  gap: 0.2rem;
  padding: 0.4rem 0rem;
  border-radius: 4px;
  & > * {
    flex-shrink: 0;
  }
`;
