import { BlogAPI } from '@api/BlogAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ViewBlogFixContainer.tsx
 * @version 0.0.1 "2024-03-19 15:20:19"
 * @description 설명
 */
const ViewBlogFixContainer = (
  firstCategoryId: string,
  secondCategoryId: string,
) => {
  const authStore = useSelector((state: RootState) => state.authStore);
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  const BACK_URL = `/blog?first-category=${firstCategoryId}&second-category=${secondCategoryId}`;
  const router = useRouter();
  const deleteHandler = () => {
    BlogAPI.deleteBlog({
      id: router.query.id,
    }).then(() => {
      router.replace(
        `/blog?first-category=${blogStore1.activeFirstCategory}&second-category=${blogStore1.activeSecondCategory}`,
      );
    });
  };

  return (
    <Container className={'fix-container'}>
      <Container1>
        {authStore.role === 'ROLE_ADMIN' && (
          <Link href={`/blog/update?id=${router.query.id}`} prefetch={false}>
            <CC.ImgContainer w={'2rem'}>
              <Image src={Icons.EditIcon} alt="" width={1} height={1} />
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
              <Image src={Icons.DeleteIcon} alt="" width={1} height={1} />
            </CC.ImgContainer>
          </ConfirmButton>
        )}
        <Link href={BACK_URL}>
          <CC.ImgContainer w={'2rem'}>
            <Image src={Icons.MenuIcon} alt="" width={1} height={1} />
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
  top: max(6.2rem, 50vh);
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
  msoverflowstyle: none;
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
