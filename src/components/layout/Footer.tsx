import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <Container>
      <ImageList gap={8}>
        <li>
          <Link href={'/'} prefetch={false}>
            <Image src={Icons.HomeIcon} width={'100%'} height={'100%'} />
          </Link>
        </li>
        <li>
          <a
            href={'https://www.notion.so/1e30249dcdf741398637235d6d251552'}
            target={'_blanket'}
          >
            <Image src={Icons.NotionIcon} width={'100%'} height={'100%'} />
          </a>
        </li>
        <li>
          <a
            href={'https://www.erdcloud.com/d/GsKo8HnYFXHbrqJoQ'}
            target={'_blanket'}
          >
            <Image src={Icons.ErdCloudIcon} width={'100%'} height={'100%'} />
          </a>
        </li>
        <li>
          <a
            href={
              'https://www.figma.com/file/9NC19XbZokgmjBqk7TOQFg/%EC%BD%94%EB%94%A9%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83%EC%9D%84-%EC%A0%95%EB%A6%AC%ED%95%98%EB%8A%94-%EA%B3%B5%EA%B0%84?type=design&node-id=974%3A948&mode=design&t=Ydosap26M3YvcoFi-1'
            }
            target={'_blanket'}
          >
            <Image src={Icons.FigmaIcon} width={'100%'} height={'100%'} />
          </a>
        </li>
        <li>
          <a href={'https://github.com/ssssksss'} target={'_blanket'}>
            <Image src={Icons.GithubIcon} width={'100%'} height={'100%'} />
          </a>
        </li>
        <li>
          <a
            href={'https://master--64eeece7369a220b140a6b70.chromatic.com/'}
            target={'_blanket'}
          >
            <Image src={Icons.StoryBookIcon} width={'100%'} height={'100%'} />
          </a>
        </li>
        <li>
          <Link href={'/portfolio'} prefetch={false}>
            <Image src={Icons.PortfolioIcon} />
          </Link>
        </li>
      </ImageList>
      <CC.ColumnDiv color={'contrast'} gap={16} pd={'0.8rem 0rem'}>
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
  background: ${(props) => props.theme.main.primary80};
  padding: 0.8rem 0.2rem;
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
`;
const ImageList = styled(CC.RowBetweenDiv.withComponent('ul'))`
  max-width: 50rem;
  margin: auto;
  li {
    width: 3rem;
    aspect-ratio: 1;
    padding: 0.4rem;
    background: ${(props) => props.theme.main.contrast};
    border-radius: 0.8rem;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
