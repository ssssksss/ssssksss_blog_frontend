import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { dateFormat4y2m2d } from '@utils/function/dateFormat';
import { AWSS3Prefix } from '@utils/variables/url';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ViewHeaderContainer.tsx
 * @version 0.0.1 "2024-03-19 15:15:49"
 * @description 설명
 */
const ViewHeaderContainer = (props) => {
  const router = useRouter();
  const [blogCategory] = useState({
    firstCategoryName: props.blogFirstCategoryName,
    secondCategoryName: props.blogSecondCategoryName,
  });
  return (
    <Container
      className={'header-container'}
      pd={'0rem'}
      imageUrl={`${AWSS3Prefix}${props.thumbnailImageUrl}`}
    >
      <CC.AbsoluteRowBox gap={4} pd={'0.25rem'} left={0} top={0}>
        <Button
          bg={'primary20'}
          w={'max-content'}
          onClick={() =>
            router.push('/blog?first-category=' + props.firstCategoryId)
          }
        >
          {blogCategory.firstCategoryName}
        </Button>
        <Button
          bg={'secondary20'}
          w={'max-content'}
          onClick={() =>
            router.push(
              '/blog?first-category=' +
                props.firstCategoryId +
                '&second-category=' +
                props.secondCategoryId,
            )
          }
        >
          {props.blogSecondCategoryName}
        </Button>
        <CC.RowDiv gap={8}>
          <CC.RowDiv
            w={'max-content'}
            bg={'primary20'}
            h={'100%'}
            brR={'0.8rem'}
            pd={'0.2rem'}
          >
            {dateFormat4y2m2d(props.createdAt)}
          </CC.RowDiv>
          <CC.RowDiv
            gap={4}
            bg={'secondary20'}
            h={'100%'}
            brR={'0.8rem'}
            pd={'0.2rem'}
          >
            <CC.ImgContainer w={'1rem'} h={'1rem'}>
              <Image src={Icons.LikeIcon} alt="" />
            </CC.ImgContainer>
            {props.likeNumber}
          </CC.RowDiv>
        </CC.RowDiv>
      </CC.AbsoluteRowBox>
      <Title>
        <h1> {props.title} </h1>
        <h3> {props.description} </h3>
      </Title>
    </Container>
  );
};
export default ViewHeaderContainer;

const Container = styled(CC.ColumnDiv)<{ props: any }>`
  background-image: url(${(props) => props?.imageUrl});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  /* background-size: cover; */
  /* 추가 */
  isolation: isolate;
  border-bottom: solid ${(props) => props.theme.main.primary80} 0.1rem;
  width: 100%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    background: white;
    z-index: -1;
    inset: 0;
    opacity: 0.7;
    -webkit-filter: blur(0.3rem);
    -moz-filter: blur(0.3rem);
    -ms-filter: blur(0.3rem);
    filter: blur(0.2rem);
  }
`;

const Title = styled(CC.ColumnCenterDiv)`
  height: 15rem;
  width: 100%;
  gap: 0.8rem;
  text-align: center;
  h1 {
    font-weight: 800;
    font-size: 1.6rem;
    font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
  }
  h3 {
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.black40};
    font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  }
`;
