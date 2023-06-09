import styled from "@emotion/styled";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import React, { useEffect, useRef, useState } from "react";

/**
 * Author : Sukyung Lee
 * FileName: PageTransitions.tsx
 * Date: 2022-10-05 01:27:12
 * Description :
 */

interface IPageTransitionsProps {
  children: any;
  route: any;
  routingPageOffset: any;
}

const PageTransitions = (props: IPageTransitionsProps) => {
  const nodeRef = useRef(null);
  return (
    <>
      {/* <TransitionGroup component={null}>
        <CSSTransition
          key={props.route}
          classNames="page"
          // nodeRef={nodeRef}
          timeout={600}>
          <Container routingPageOffset={props.routingPageOffset} ref={nodeRef}>
            {props.children}
          </Container>
        </CSSTransition>
      </TransitionGroup>
      <Wipe className="wipe" /> */}
    </>
  );
};
export default PageTransitions;
const Container = styled.div<{ routingPageOffset?: any }>`
  width: 100%;

  /* & .page-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 4;
  }

  & .page-exit {
    ~ .wipe {
      transform: translateY(100%);
    }
  }

  &.page-exit-active {
    ~ .wipe {
      transform: translateY(0);
      transition: transform 100ms ease;
    }

    > * {
      transform: translateY(-${(props) => props.routingPageOffset}px);
    }
  }

  &.page-enter-done {
    ~ .wipe {
      transform: translateY(-100%);
      transition: transform 2000ms ease;
    }
  } */

  &.page-enter {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 4;
    transform: translateY(100%);
  }
  & .page-enter-active {
    opacity: 0.5;
    transform: translateY(-${(props) => props.routingPageOffset}px);
    transition: 300ms;
  }
  &.page-enter-done {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.page-exit {
    opacity: 1;
    z-index: 4;
  }
  &.page-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

const Wipe = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 5;
  transform: translateY(100%);
`;
