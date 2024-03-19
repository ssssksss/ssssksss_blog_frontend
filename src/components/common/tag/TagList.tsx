import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TagList.tsx
 * @version 0.0.1 "2024-03-04 04:21:57"
 * @description 설명
 */

interface ITagListProps {
  data: [];
  bg: string;
}

const TagList = (props: ITagListProps) => {
  return (
    <Container gap={8}>
      {props.data?.map((i, index) => (
        <Tag key={index} bg={props.bg}>
          {i}
        </Tag>
      ))}
    </Container>
  );
};
export default TagList;

const Container = styled(CC.RowCenterDiv)`
  width: 100%;
  flex-flow: wrap row;
  padding: 0.4rem;
`;

const Tag = styled(CC.RowDiv)<{ bg: string }>`
  border-radius: 0.8rem;
  height: 1.6rem;
  background: ${(props) =>
    props.theme.colors?.[props.bg] ||
    props.theme.main?.[props.bg] ||
    props.bg ||
    props.theme.main.primary20};
  padding: 1.2rem 0.4rem;
  width: max-content;
`;
