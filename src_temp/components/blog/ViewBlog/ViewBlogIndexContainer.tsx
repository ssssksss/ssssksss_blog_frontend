import styled from '@emotion/styled';
import usePreventBodyScroll from '@hooks/usePreventBodyScroll';
import ListIcon from '@mui/icons-material/List';
import { CC } from '@styles/commonComponentStyle';
import { useReducer } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ViewBlogIndexContainer.tsx
 * @version 0.0.1 "2024-03-19 15:37:23"
 * @description 설명
 */
const ViewBlogIndexContainer = (props: { blogIndexList: unknown }) => {
  const [isOpenModal, IsOpenModalToggle] = useReducer((v) => !v, false);
  usePreventBodyScroll(isOpenModal);
  return (
    <Container>
      {isOpenModal ? (
        <ContentIndexContainer>
          <ContentIndexHeaderContainer>
            <Title1
              onClick={() => IsOpenModalToggle()}
              className={'title-trigger'}
            >
              목차
            </Title1>
            <Exit onClick={() => IsOpenModalToggle()}>
              <div> </div>
              <div> </div>
              <div> </div>
            </Exit>
          </ContentIndexHeaderContainer>
          <ContentIndexMainContainer>
            {props.blogIndexList?.map((i, index) => (
              <button
                key={index}
                onClickCapture={() => {
                  window.scrollTo(0, i.top - 32);
                }}
                className={i.tagName}
              >
                {i.content}
              </button>
            ))}
          </ContentIndexMainContainer>
        </ContentIndexContainer>
      ) : (
        <ContentIndexNotOpenMenuContainer
          onClick={() => {
            IsOpenModalToggle();
          }}
          >
            <CC.ImgContainer w={"2.25rem"}>
                <ListIcon />
            </CC.ImgContainer>
        </ContentIndexNotOpenMenuContainer>
      )}
    </Container>
  );
};
export default ViewBlogIndexContainer;

const Container = styled.div`
  position: sticky;
  width: 0px;
  height: 0px;
  left: 100vw;
  top: 3.5rem;
  z-index: 40;
`;

const ContentIndexContainer = styled.nav`
  width: 20rem;
  z-index: 50;
  position: relative;
  overflow: scroll;
  transform: translate(-100%, 0%);
  background: ${(props) => props.theme.colors.white40};
  outline: solid ${(props) => props.theme.main.primary40} 1px;
  outline-offset: -1px;
  msoverflowstyle: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentIndexHeaderContainer = styled.div`
  width: 100%;
  background-color: ${(props: unknown) => props.theme.menuBackground};
  position: absolute;
  top: 0;
`;
const Title1 = styled.div`
  padding-left: 1rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2rem;
  color: black;
  background: ${(props) => props.theme.main.third20};
  font-weight: 800;
  &:hover {
    cursor: pointer;
  }
`;
const Exit = styled.button`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  top: 0;
  right: 0px;
  position: absolute;
  background: transparent;

  & > div {
    position: absolute;
    width: 1.6rem;
    height: 0.2rem;
    background-color: #000;
    border-radius: 0.4rem;
    transition: all 0.4s ease-in-out;
    transform: translateZ(0);
  }

  & > div:nth-of-type(1) {
    top: 50%;
    transform: translate(0rem, -50%) rotate(405deg);
  }

  & > div:nth-of-type(2) {
    opacity: 0;
    transform: translate(0rem, -50%) rotate(360deg);
  }

  & > div:nth-of-type(3) {
    top: 50%;
    transform: translate(0rem, -50%) rotate(-405deg);
  }
`;
const ContentIndexMainContainer = styled.div`
  z-index: 50;
  padding: 2rem 0.5rem 0px 0.5rem;
  height: calc(100vh - 4.5rem);
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  button {
    z-index: 50;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    text-align: start;
    :hover {
      background: ${(props) => props.theme.main.primary20};
    }
  }

  .H1 {
    padding: 0.2rem 0rem;
    color: ${(props) => props.theme.main.primary80};
    font-weight: 800;
    font-size: 1.25rem;
  }
  .H1::before {
    counter-increment: section;
    content: '[' counter(section) '] ';
  }
  .H2 {
    padding: 0.2rem 0rem 0.2rem 0.4rem;
    color: ${(props) => props.theme.colors.black80};
    font-weight: 600;
    font-size: 1rem;
  }
  .H3 {
    padding: 0.2rem 0rem 0.2rem 0.8rem;
    color: ${(props) => props.theme.colors.black60};
    font-weight: 400;
  }
`;

const ContentIndexNotOpenMenuContainer = styled.button`
  width: 2.25rem;
  aspect-ratio: 1;
  position: absolute;
  z-index: 50;
  right: 0px;
  overflow: scroll;
  msoverflowstyle: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background: ${(props) => props.theme.main.secondary40};
  outline: solid black 1px;
  outline-offset: -1px;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
    box-shadow: black 0.1rem 0.1rem 0rem 0rem;
  }
`;
