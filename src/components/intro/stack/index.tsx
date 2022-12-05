import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import theme from "@/styles/theme";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import { v4 as uuid } from "uuid";

/**
 * Author : Sukyung Lee
 * FileName: index.tsx
 * Date: 2022-10-14 11:34:26
 * Description :
 */

const StackButtons = [
  ["frontend", "프론트엔드"],
  ["backend", "백엔드"],
  ["server", "서버"],
  ["database", "DB"],
  ["cicd", "CI/CD"],
  ["configuration_management", "형상관리"],
  ["communication_tool", "협업도구"],
  ["etc", "기타"],
];

type stackImagesType = {
  [key: string]: any;
};

const StackImages: stackImagesType = {
  frontend: {
    html: "/img/stackIcon/html.svg",
    css: "/img/stackIcon/css.svg",
    javascript: "/img/stackIcon/javascript.svg",
    react: "/img/stackIcon/react.svg",
    redux: "/img/stackIcon/redux.svg",
    typescript: "/img/stackIcon/typescript.svg",
    styleComponent: "/img/stackIcon/stylecomponent.svg",
  },
  backend: {
    java: "/img/stackIcon/java.svg",
    springboot: "/img/stackIcon/springboot.svg",
    springsecurity: "/img/stackIcon/springsecurity.svg",
  },
  server: {
    linux: "/img/stackIcon/linux.svg",
    centos: "/img/stackIcon/centos.svg",
  },
  database: {
    mysql: "/img/stackIcon/mysql.svg",
  },
  cicd: {
    jenkins: "/img/stackIcon/jenkins.svg",
    githubaction: "/img/stackIcon/githubaction.svg",
  },
  configuration_management: {
    git: "/img/stackIcon/git.svg",
    github: "/img/stackIcon/github.svg",
  },
  communication_tool: {
    figma: "/img/stackIcon/figma.svg",
    slack: "/img/stackIcon/slack.svg",
    notion: "/img/stackIcon/notion.svg",
    gathertown: "/img/stackIcon/gathertown.svg",
  },
  etc: {
    // void: "",
  },
};

const Stack = () => {
  const [stackItem, setStackItem] = useState("frontend");

  return (
    <Container>
      <StackMenu>
        {StackButtons.map((el: any, index: number) => (
          <StackMenuButton
            key={index}
            onClick={() => setStackItem(el[0])}
            active={stackItem === el[0]}
          >
            {el[1]}
          </StackMenuButton>
        ))}
      </StackMenu>
      <StackMainContainer>
        <StackGrid key={uuid()}>
          <StackGridList>
            {Object.entries(StackImages[stackItem]).map((el: any) => (
              <StackItem key={uuid()}>
                <StackImg
                  alt=""
                  src={el[1]}
                  onClick={() => console.log("index.tsx : ", el[0])}
                />
              </StackItem>
            ))}
          </StackGridList>
          <StackDescription>설명</StackDescription>
        </StackGrid>
      </StackMainContainer>
    </Container>
  );
};
export default Stack;
const Container = styled.div`
  width: 100%;
  min-height: 640px;
  padding: 0px 20px 20px 20px;
  font-family: "Cafe24Ssurround";
  margin-top: 50px;
`;
const StackMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: space-between;
  row-gap: 4px;
`;
const StackMenuButton = styled.button<{ active: boolean }>`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1.2rem;
  box-shadow: 0px 0px 5px 0px white;
  font-weight: 800;
  background: ${theme.backgroundColors.orange};

  @media (max-width: ${theme.customScreen.sm}) {
    font-size: ${theme.fontSizes.sm};
  }

  &:hover {
    color: white;
    box-shadow: 0px 0px 10px 2px white;
  }
  ${(props) =>
    props.active &&
    css`
      color: white;
      animation: ${animationKeyFrames.UpToDownRepeat} 1s infinite;
      height: 48px;
    `}
`;
const StackMainContainer = styled.div`
  background: white;
  border-radius: 10px;
  margin-top: 20px;
  height: calc(100% - 180px);
`;
const StackGrid = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
`;
const StackGridList = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;
const StackItem = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  align-content: center;
  box-shadow: 0px 2px 2px 2px black, 0px -1px 1px 1px #6f6f6f;
`;
const StackImg = styled.img`
  width: 60px;
  height: 60px;
`;
const StackDescription = styled.div`
  border-left: solid 3px #aeaeae;
  padding: 10px;
  height: auto;
`;
