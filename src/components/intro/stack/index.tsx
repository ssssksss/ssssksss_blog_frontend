import styled, { css } from "styled-components";
import { useState } from "react";
import theme from "@/styles/theme";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
/**
 * Author : Sukyung Lee
 * FileName: index.tsx
 * Date: 2022-10-14 11:34:26
 * Description :
 */
const Stack = () => {
  const [stackItem, setStackItem] = useState("frontend");
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
      <StackMain>
        {stackItem === "frontend" && (
          <>
            <StackGrid>
              <StackGridList>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/html.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/css.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/javascript.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/react.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/redux.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/typescript.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/stylecomponent.svg"} />
                </StackItem>
              </StackGridList>
              <StackDescription>설명</StackDescription>
            </StackGrid>
          </>
        )}
        {stackItem === "backend" && (
          <>
            <StackGrid>
              <StackGridList>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/java.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/springboot.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/springsecurity.svg"} />
                </StackItem>
              </StackGridList>
              <StackDescription>설명</StackDescription>
            </StackGrid>
          </>
        )}
        {stackItem === "server" && (
          <>
            <StackGrid>
              <StackGridList>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/linux.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/centos.svg"} />
                </StackItem>
              </StackGridList>
              <StackDescription>설명</StackDescription>
            </StackGrid>
          </>
        )}
        {stackItem === "database" && (
          <>
            <StackGrid>
              <StackGridList>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/mysql.svg"} />
                </StackItem>
              </StackGridList>
              <StackDescription>설명</StackDescription>
            </StackGrid>
          </>
        )}
        {stackItem === "cicd" && (
          <>
            <StackGrid>
              <StackGridList>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/jenkins.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/githubaction.svg"} />
                </StackItem>
              </StackGridList>
              <StackDescription>설명</StackDescription>
            </StackGrid>
          </>
        )}
        {stackItem === "configuration_management" && (
          <>
            <StackGrid>
              <StackGridList>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/git.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/github.svg"} />
                </StackItem>
              </StackGridList>
              <StackDescription>설명</StackDescription>
            </StackGrid>
          </>
        )}
        {stackItem === "communication_tool" && (
          <>
            <StackGrid>
              <StackGridList>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/figma.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/slack.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/notion.svg"} />
                </StackItem>
                <StackItem>
                  <StackImg alt="" src={"/img/stackIcon/gathertown.svg"} />
                </StackItem>
              </StackGridList>
              <StackDescription>설명</StackDescription>
            </StackGrid>
          </>
        )}
        {stackItem === "etc" && (
          <>
            <StackGrid>
              <StackGridList>
                {/*<StackItem>
                    <StackImg alt="" src={'/img/stackIcon/springsecurity.svg'} />
                  </StackItem>*/}
              </StackGridList>
              <StackDescription>설명</StackDescription>
            </StackGrid>
          </>
        )}
      </StackMain>
    </Container>
  );
};
export default Stack;
const Container = styled.div`
  width: 100%;
  height: 800px;
  padding: 0px 20px 20px 20px;
  font-family: "Cafe24Ssurround";
  margin-top: 50px;
`;
const StackMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 16px;
`;
const StackMenuButton = styled.button<{ active: boolean }>`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1.2rem;
  box-shadow: 0px 0px 5px 0px white;
  font-weight: 800;
  background: ${theme.backgroundColors.primary};

  @media (max-width: 600px) {
    width: 80px;
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
const StackMain = styled.div`
  background: white;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
  height: calc(100% - 180px);
`;
const StackGrid = styled.div`
  display: grid;
  grid-template-columns: 245px calc(100% - 245px);

  @media only screen and (max-width: "1440px") {
    grid-template-columns: 205px calc(100% - 205px);
  }
`;
const StackGridList = styled.div`
  width: 245px;
  grid-gap: 15px;
  display: grid;
  grid-template-columns: 100px 100px;

  @media only screen and (max-width: "1440px") {
    width: 60px;
    height: 60px;
    grid-template-columns: 80px 80px;
  }
`;
const StackItem = styled.button`
  width: 100px;
  height: 100px;
  margin-left: 10px;
  border-radius: 20px;
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  align-content: center;
  box-shadow: 0px 4px 2px 2px black, 0px -1px 1px 1px #6f6f6f;

  @media only screen and (max-width: "1440px") {
    width: 80px;
    height: 80px;
  }
`;
const StackImg = styled.img`
  width: 80px;
  height: 80px;

  @media only screen and (max-width: "1440px") {
    width: 60px;
    height: 60px;
  }
`;
const StackDescription = styled.div`
  border-left: solid 3px #aeaeae;
  padding: 10px;
  height: auto;
`;
