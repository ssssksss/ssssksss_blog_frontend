import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { dateFormat4y2m2d } from '@utils/function/dateFormat';
import { localStorageSetHandler } from '@utils/storage/localStorageHandler';
import { AWSS3Prefix } from '@utils/variables/url';
import Image from 'next/image';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogItem.tsx
 * @version 0.0.1 "2023-11-01 17:35:24"
 * @description 설명
 */
interface IBlogItemProps {
  viewMode: boolean;
  element: object;
  defaultImageUrl?: string;
}

// TODO: 나중에 카드 모양의 형태로 보여질지에 대해서는 보류(props.viewMode)

const BlogItem = (props: IBlogItemProps) => {
  return (
    <Container
      onClick={() =>
        localStorageSetHandler(
          'recentBlog',
          {
            id: props.element.id,
            title: props.element.title,
            description: props.element.description,
            viewNumber: props.element.viewNumber,
            likeNumber: props.element.likeNumber,
            baseTimeEntity: props.element.baseTimeEntity,
            thumbnailImageUrl: props.element.thumbnailImageUrl,
          },
          4,
        )
      }
    >
      {props.viewMode && (
        <CC.ImgContainer>
          <Image
            src={`${AWSS3Prefix}${props.element.thumbnailImageUrl ?? props.defaultImageUrl ?? props.element.defaultImageUrl}`}
            width={1}
            height={1}
          />
        </CC.ImgContainer>
      )}
      <CC.ColumnDiv gap={4}>
        <Title> {props.element.title} </Title>
        <Description> {props.element.description} </Description>
        <CC.RowBetweenDiv w={'100%'}>
          <UpdateData>
            {dateFormat4y2m2d(props.element.baseTimeEntity.modifiedAt)}
          </UpdateData>
          <ViewAndLIke>
            <CC.RowDiv gap={2} h={'100%'}>
              <CC.ImgContainer h={'100%'}>
                <Image src={Icons.ViewIcon} alt="view" />
              </CC.ImgContainer>
              <span> {props.element.viewNumber} </span>
            </CC.RowDiv>
            <CC.RowDiv gap={2} h={'100%'}>
              <CC.ImgContainer h={'100%'}>
                <Image src={Icons.LikeIcon} alt="like" />
              </CC.ImgContainer>
              <span> {props.element.likeNumber} </span>
            </CC.RowDiv>
          </ViewAndLIke>
        </CC.RowBetweenDiv>
      </CC.ColumnDiv>
    </Container>
  );
};
export default BlogItem;

const Container = styled.div`
  width: 100%;
  outline: solid 0.1rem ${(props) => props.theme.main.primary40};
  border-radius: ${(props) => props.theme.borderRadius.br10};
  cursor: pointer;
  background: ${(props) => props.theme.colors.white80};
  outline-offset: 0rem;
  text-shadow: none;
  display: grid;
  grid-template-columns: 4rem auto;
  align-items: center;
  font-size: 1.2rem;
  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 1rem;
  }
  padding: 0.8rem 0.4rem;

  &:hover {
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    /* border: 0.1rem solid ${(props) => props.theme.main.primary40}; */
    outline-color: ${(props) => props.theme.main.primary40};
    outline-offset: 0.1rem;
    background: ${(props) => `${props.theme.main.secondary20}`};
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.colors.black100};
  font-weight: 600;
  font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
  padding-top: 0.4rem;

  white-space: wrap;
  text-overflow: ellipsis;
`;
const Description = styled.div`
  color: ${(props) => props.theme.colors.black40};
  font-weight: 600;

  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 0.7rem;
  }
`;
const UpdateData = styled.span`
  color: ${(props) => props.theme.colors.black40};
  font-weight: 800;
  font-size: 0.8em;
`;
const ViewAndLIke = styled.div`
  ${(props) => props.theme.flex.row._.center};
  gap: 1rem;
  font-weight: 800;
  height: 1rem;
  font-size: 0.8em;
`;
