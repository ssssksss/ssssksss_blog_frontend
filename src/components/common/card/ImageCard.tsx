import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ImageCard.tsx
 * @version 0.0.1 "2024-03-04 03:13:29"
 * @description 설명
 */

interface IImageCardProps {
  imgSrc: string;
  w?: string;
  minW?: string;
  maxW?: string;
  h?: string;
  minH?: string;
  maxH?: string;
  backComponent?: ReactNode;
  className?: string;
}

const ImageCard = (props: IImageCardProps) => {
  const [isFront, setIsFront] = useState(true);

  return (
    <Container
      h={props.h}
      maxH={props.maxH}
      minH={props.minH}
      w={props.w}
      maxW={props.maxW}
      minW={props.minW}
      className={props.className}
      isFront={isFront}
      onClick={()=>setIsFront(prev => !prev)}
    >

        <Image className={'front-card'} src={props.imgSrc} fill alt={""} />
        <BehindCard className={'back-card'}>{props.backComponent}</BehindCard>
    </Container>
  );
};
export default ImageCard;

const Container = styled.div<{
  h: string;
  maxH: string;
  minH: string;
  w: string;
  maxW: string;
  minW: string;
  isFront: boolean;
}>`
  position: relative;
  height: 100%;
  height: ${(props) => props.h || '100%'};
  min-height: ${(props) => props.minH};
  max-height: ${(props) => props.maxH};
  width: ${(props) => props.w || '100%'};
  min-width: ${(props) => props.minW};
  max-width: ${(props) => props.maxW};
  border-radius: 1.6rem;
  img {
    border-radius: 1.6rem;
  }

  .front-card {
    ${(props) =>
      props.isFront
        ? css`
            transition: all 1.2s ease;
            visibility: visible;
            background: ${props.theme.colors.white60};
            cursor: pointer;
          `
        : css`
            transition: all 1.2s ease;
            visibility: hidden;
            opacity: 0;
          `}
  }
  .back-card {
    ${(props) =>
      props.isFront
        ? css`
            transition: all 1.2s ease;
            visibility: hidden;
            opacity: 0;
          `
        : css`
            transition: all 1.2s ease;
            visibility: visible;
            background: ${props.theme.colors.white60};
          `}
  }
`;

const BehindCard = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  border-radius: 1.6rem;
`;
