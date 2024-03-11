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
        <BlogItemImageBox>
          <Image
            src={`${AWSS3Prefix}${props.element.thumbnailImageUrl ?? props.defaultImageUrl ?? props.element.defaultImageUrl}`}
            width={'80px'}
            height={'80px'}
          />
        </BlogItemImageBox>
      )}
      <CC.ColumnDiv gap={4} w={'100%'} pd={'5px 0px'}>
        <BlogItemTitle> {props.element.title} </BlogItemTitle>
        <BlogItemSubTitle> {props.element.description} </BlogItemSubTitle>
        <CC.RowBetweenDiv pd={'10px 0px 0px 0px'} w={'100%'}>
          <BlogItemDate>
            {dateFormat4y2m2d(props.element.baseTimeEntity.modifiedAt)}
          </BlogItemDate>
          <BlogItemViewAndLIke>
            <CC.RowDiv gap={2} h={'20px'}>
              <Image src={Icons.ViewIcon} alt="view" />
              <span> {props.element.viewNumber} </span>
            </CC.RowDiv>
            <CC.RowDiv gap={2} h={'20px'}>
              <Image src={Icons.LikeIcon} alt="like" />
              <span> {props.element.likeNumber} </span>
            </CC.RowDiv>
          </BlogItemViewAndLIke>
        </CC.RowBetweenDiv>
      </CC.ColumnDiv>
    </Container>
  );
};
export default BlogItem;

const Container = styled(CC.RowDiv)`
  width: 100%;
  outline: solid 1px ${(props) => props.theme.main.primary40};
  border-radius: ${(props) => props.theme.borderRadius.br10};
  cursor: pointer;
  gap: 4px;
  padding: 0px 4px;
  background: ${(props) => props.theme.colors.white80};

  outline-offset: 0px;
  text-shadow: none;

  &:hover {
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    /* border: 1px solid ${(props) => props.theme.main.primary40}; */
    outline-color: ${(props) => props.theme.main.primary40};
    outline-offset: 1px;
    background: ${(props) => `${props.theme.main.secondary20}`};
  }
`;

const BlogItemImageBox = styled(CC.RowDiv)`
  min-width: 80px;
  width: 80px;
  background: ${(props) => props.theme.colors.gray20};
  border-radius: 10px;
  margin: 5px 0px;
`;

const BlogItemTitle = styled.div`
  color: ${(props) => props.theme.colors.black100};
  font-weight: 600;
  font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
  font-size: 1rem;
  width: 100%;
  padding-top: 4px;

  white-space: wrap;
  text-overflow: ellipsis;

  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 0.8rem;
  }
`;
const BlogItemSubTitle = styled.div`
  color: ${(props) => props.theme.colors.black40};
  font-weight: 600;
  font-size: 0.9rem;

  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 0.7rem;
  }
`;
const BlogItemDate = styled.span`
  color: ${(props) => props.theme.colors.black40};
  font-weight: 800;
  font-size: 14px;
`;
const BlogItemViewAndLIke = styled.div`
  ${(props) => props.theme.flex.row._.center};
  gap: 10px;
  color: ${(props) => props.theme.colors.black40};
  font-weight: 800;
  font-size: 14px;
`;
