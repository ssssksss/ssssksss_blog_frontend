import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
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
        setTransition("");
        setTime(0);
      }
    }
  }, time);

  // 2 3 1 2 3 1 2
  const prevIndexHandler = () => {
    setCurrentIndex((prev) => (prev === 1 ? arr.length - 3 : prev - 1));
    setTime(props.IntervalTime);
    if (currentIndex === arr.length - 3) {
      setTransition(transitionStyle);
    }
    if (currentIndex === 1) {
      setTransition("");
      setTime(0);
    }
  };

  const nextIndexHandler = () => {
    setCurrentIndex((prev) => (prev === arr.length - 2 ? 2 : prev + 1));
    if (currentIndex === 2) {
      setTransition(transitionStyle);
    }
    if (currentIndex === arr.length - 2) {
      setCurrentIndex(2);
      setTransition("");
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
                // transform: `translateX(-${currentIndex * 100}%)`,
                transition: slideTransition,
              }}
              onClick={() => router.push(el[3])}
            >
              <SliderContent>
                <Title> {el[0]} </Title>
                <Content> {el[1]} </Content>
                <Intro>
                  {el[2].split("\n").map((i: any, index: number) => (
                    <p key={index}> {i} </p>
                  ))}
                </Intro>
              </SliderContent>
            </SliderItem>
          ))}
        </SliderContainer>
      </SliderSizeContainer>
      <Button onClick={prevIndexHandler}>{"<"}</Button>
      <Button onClick={nextIndexHandler}>{">"}</Button>
      <Button onClick={() => setAutoPlay((prev) => !prev)}>
        {autoPlay ? "auto" : "stop"}
      </Button>
    </Container>
  );
};
export default BasicCarousel;

const Container = styled.section`
  min-width: 360px;
  padding: 0px 10px;
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
  max-width: 100%;
  aspect-ratio: 1;
  margin: auto;
`;
const SliderContainer = styled.div<{ arrLength: number }>`
  width: ${(props) => props.arrLength * 100}%;
  height: 100%;
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
`;

const SliderItem = styled.button<{
  currentIndex: number;
  isCurrent: boolean;
}>`
  z-index: 4;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  transform: ${(props) =>
    props.isCurrent
      ? `translateX(-${props.currentIndex * 100}%)`
      : `translateX(-${props.currentIndex * 100}%) scale(0.7)`};
  ${(props) =>
    props.isCurrent &&
    css`
      width: 100%;
      height: 100%;
      opacity: 1;
    `};
  background: transparent;
`;
const SliderContent = styled(CF.ColumnDiv)`
  margin: auto;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: ${theme.backgroundColors.thirdLight};
  gap: 10px;
  border-radius: 20px;
`;
const Title = styled(CF.RowCenterDiv)`
  height: 40px;
  font-size: 24px;
  font-family: ${theme.customFonts.GmarketSansBold};
`;
const Content = styled(CF.RowDiv)`
  width: 100%;
  height: 300px;
  background-color: blue;
`;
const Intro = styled(CF.ColumnLeftDiv)`
  height: auto;
  font-size: 16px;
`;
const Button = styled.button`
  position: absolute;
  z-index: 5;
  bottom: 10px;
  left: 10px;
  width: 40px;
  height: 40px;

  &:nth-child(2) {
    left: 70px;
  }

  &:nth-child(3) {
    left: 130px;
  }
`;
