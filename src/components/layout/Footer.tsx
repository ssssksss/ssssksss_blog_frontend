import { Icons } from '@/components/common/icons/Icons';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';

const siteList1 = [
  ['/img/stackIcon/github.svg', 'github1', 'https://github.com/ssssksss'],
  ['/img/stackIcon/github.svg', 'github2', 'https://github.com/ssssksss1'],
  [
    '/img/stackIcon/notion.svg',
    'notion',
    'https://www.notion.so/1e30249dcdf741398637235d6d251552',
  ],
  [
    '/img/stackIcon/ERDCloud.png',
    'ERD',
    'https://www.erdcloud.com/d/GsKo8HnYFXHbrqJoQ',
  ],
  [
    '/img/stackIcon/figma.svg',
    'figma',
    'https://www.figma.com/file/9NC19XbZokgmjBqk7TOQFg/%EC%BD%94%EB%94%A9%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83%EC%9D%84-%EC%A0%95%EB%A6%AC%ED%95%98%EB%8A%94-%EA%B3%B5%EA%B0%84?node-id=1%3A24',
  ],
];
const siteList2 = [
  [
    '/img/stackIcon/baekjoon_icon.svg',
    '백준',
    'https://www.acmicpc.net/user/ssssksss',
  ],
  ['/img/gif/토토로왼쪽으로걸어감.gif', 'temp', '#'],
  ['/img/gif/토토로왼쪽으로걸어감.gif', 'temp', '#'],
  ['/img/gif/토토로왼쪽으로걸어감.gif', 'temp', '#'],
  ['/img/gif/토토로왼쪽으로걸어감.gif', 'temp', '#'],
];

const Footer = () => {
  const router = useRouter();
  return (
    <Container>
      <ImageList gap={8}>
        <li>
          <Image src={Icons.NotionIcon} width={'100%'} height={'100%'} />
        </li>
        <li>
          <Image src={Icons.ErdCloudIcon} width={'100%'} height={'100%'} />
        </li>
        <li>
          <Image src={Icons.FigmaIcon} width={'100%'} height={'100%'} />
        </li>
        <li>
          <Image src={Icons.GithubIcon} width={'100%'} height={'100%'} />
        </li>
      </ImageList>
      <CC.ColumnDiv color={'contrast'} gap={16} pd={'8px 0px'}>
        <CC.RowCenterDiv gap={8}>
          <div> email : ssssksss@naver.com </div>
        </CC.RowCenterDiv>
        <CC.RowCenterDiv>
          © 2021-{new Date().getFullYear()} Creative 가출한토토로 - All rights
          reserved.
        </CC.RowCenterDiv>
      </CC.ColumnDiv>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  background: ${props => props.theme.main.primary80};
`;
const ImageList = styled(CC.RowCenterDiv.withComponent('ul'))`
  padding: 8px 0px;
  li {
    width: 64px;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    padding: 4px;
    background: ${props => props.theme.main.contrast};
    border-radius: 8px;
    cursor: pointer;
    img {
      object-fit: contain;
    }
  }
`;
