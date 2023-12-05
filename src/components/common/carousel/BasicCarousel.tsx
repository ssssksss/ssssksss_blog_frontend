import { CC } from '@/styles/commonComponentStyle';
import { commonTheme } from '@/styles/theme';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/button/Button';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

/**
 * Author : Sukyung Lee
 * FileName: basicCarousel.tsx
 * Date: 2022-10-06 16:29:35
 * Description :
 */
interface IBasicCarouselProps {
  arr: any[];
  arrLength: number; // 배열의 갯수
  IntervalTime: number;
  transitionTime: number;
}

const BasicCarousel = (props: IBasicCarouselProps) => {
  // 배열의 앞뒤로 2개씩 복제해서 붙임
  const arr = [
    props.arr[props.arrLength - 2],
    props.arr[props.arrLength - 1],
    ...props.arr,
    props.arr[0],
    props.arr[1],
  ];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [time, setTime] = useState(props.IntervalTime);
  const transitionRef = useRef<any>(null);
  const transitionStyle = `transform ${props.transitionTime}ms ease-out 0s`;
  const [slideTransition, setTransition] = useState(transitionStyle);
  const [autoPlay, setAutoPlay] = useState(true);
  const router = useRouter();

  function useInterval(callback: any, delay: any) {
    const savedCallback = useRef<any>(null);
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // 오토 실행
  useInterval(() => {
    if (autoPlay) {
      setCurrentIndex(currentIndex + 1);
      // setTransition(transitionStyle);
      if (currentIndex === 2) {
        setTime(props.IntervalTime);
        setTransition(transitionStyle);
      }
      if (currentIndex === arr.length - 2) {
        setCurrentIndex(2);
        setTransition('');
        setTime(0);
      }
    }
  }, time);

  // 2 3 1 2 3 1 2
  const prevIndexHandler = () => {
    setCurrentIndex(prev => (prev === 1 ? arr.length - 3 : prev - 1));
    setTime(props.IntervalTime);
    if (currentIndex === arr.length - 3) {
      setTransition(transitionStyle);
    }
    if (currentIndex === 1) {
      setTransition('');
      setTime(0);
    }
  };

  const nextIndexHandler = () => {
    setCurrentIndex(prev => (prev === arr.length - 2 ? 2 : prev + 1));
    if (currentIndex === 2) {
      setTransition(transitionStyle);
    }
    if (currentIndex === arr.length - 2) {
      setCurrentIndex(2);
      setTransition('');
      setTime(0);
    }
  };

  return (
    <Container>
      <SliderSizeContainer>
        <SliderContainer arrLength={arr.length}>
          {arr.map((el: any, index: number) => (
            <SliderItem
              key={index}
              currentIndex={currentIndex}
              ref={transitionRef}
              isCurrent={index === currentIndex}
              style={{
                transition: slideTransition,
              }}
            >
              <SliderContent>
                <Title>{el[0]}</Title>
                <Content>
                  <CC.Img src={el[1]} width="100%" height="100%" />
                </Content>
                <Button
                  width={'100%'}
                  height={'40px'}
                  onClick={(e: any) => router.push(el[2])}
                >
                  보러 가기
                </Button>
              </SliderContent>
            </SliderItem>
          ))}
        </SliderContainer>
      </SliderSizeContainer>
      <Button1 onClick={prevIndexHandler}>{'👈'}</Button1>
      <Button1 onClick={nextIndexHandler}>{'👉'}</Button1>
      <Button1 onClick={() => setAutoPlay(prev => !prev)}>
        {autoPlay ? '⏸' : '▶'}
      </Button1>
    </Container>
  );
};
export default BasicCarousel;

const Container = styled.section`
  min-width: 360px;
  padding: 50px 10px 0px 10px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 40px;
`;

const SliderSizeContainer = styled.div`
  width: 500px;
  height: 600px;
  max-width: 100%;
  margin: auto;
`;
const SliderContainer = styled.div<{ arrLength: number }>`
  width: ${props => props.arrLength * 100}%;
  height: 100%;
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
`;

const SliderItem = styled.div<{
  currentIndex: number;
  isCurrent: boolean;
}>`
  z-index: 4;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  transform: ${props =>
    props.isCurrent
      ? `translateX(-${props.currentIndex * 100}%)`
      : `translateX(-${props.currentIndex * 100}%) scale(0.7)`};
  ${props =>
    props.isCurrent &&
    css`
      width: 100%;
      height: 100%;
      opacity: 1;
    `};
`;
const SliderContent = styled(CC.ColumnDiv)`
  margin: auto;
  width: 360px;
  height: 90%;
  padding: 20px;
  gap: 10px;
  border-radius: 20px;
  background: #999999;
`;
const Title = styled(CC.RowCenterDiv)`
  height: 40px;
  font-size: 24px;
  font-family: ${commonTheme.fontFamily.gmarketSansBold};
  color: white;
`;
const Content = styled(CC.RowDiv)`
  width: 100%;
  height: calc(100% - 100px);
  background-color: white;
  margin-bottom: 10px;
`;
const Button1 = styled.button`
  position: absolute;
  z-index: 5;
  bottom: 10px;
  left: calc(50% - 160px);
  width: 40px;
  height: 40px;
  /* background: ${commonTheme.backgroundColors.transparent}; */
  color: white;
  box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
    25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
    inset -20px -20px 25px rgba(255, 255, 255, 0.9);
  transition: 0.5s;
  transform: translate(-50%, 0);
  &:hover {
    border-radius: 50%;
  }

  &:nth-of-type(2) {
    left: calc(50% + 160px);
  }

  &:nth-of-type(3) {
    left: 50%;
  }
`;
