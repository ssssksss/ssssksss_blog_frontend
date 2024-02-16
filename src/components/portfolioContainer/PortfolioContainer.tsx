import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

const PortfolioContainer = () => {
  const [stackItem, setStackItem] = useState('frontend');

  return (
    <Container>
      <Title>
        <TitleIcon rotateAni alt="" src={'/img/stackIcon/shipsteer.svg'} />
        <Water> </Water>
      </Title>
      <Introduction>
        <IntroductionTitle> Introduce </IntroductionTitle>
        <IntroductionItem> 이름 : 이수경 </IntroductionItem>
        {/* <IntroductionItem> 나이 : 1995년생 </IntroductionItem> */}
        <IntroductionItem> 이메일 : ssssksss@naver.com </IntroductionItem>
        <IntroductionItem>
          깃허브 :
          <a
            href="https://github.com/ssssksss"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/ssssksss
          </a>
          👈
        </IntroductionItem>
        <IntroductionItem>
          블로그 :
          <a
            href="http://blog.ssssksss.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            blog.ssssksss.xyz
          </a>
          👈
        </IntroductionItem>
      </Introduction>
      <Stack>
        <StackTitle>
          <h1> 기술/스택 </h1>
        </StackTitle>
        <StackMenu>
          <StackMenuButton onClick={() => setStackItem('frontend')}>
            프론트엔드
          </StackMenuButton>
          <StackMenuButton onClick={() => setStackItem('backend')}>
            백엔드
          </StackMenuButton>
          <StackMenuButton onClick={() => setStackItem('server')}>
            서버
          </StackMenuButton>
          <StackMenuButton onClick={() => setStackItem('database')}>
            DB
          </StackMenuButton>
        </StackMenu>
        <br />
        <StackMenu>
          <StackMenuButton onClick={() => setStackItem('cicd')}>
            CI/CD
          </StackMenuButton>
          <StackMenuButton
            onClick={() => setStackItem('configuration_management')}
          >
            형상관리
          </StackMenuButton>
          <StackMenuButton onClick={() => setStackItem('communication_tool')}>
            협업도구
          </StackMenuButton>
          <StackMenuButton onClick={() => setStackItem('etc')}>
            기타
          </StackMenuButton>
        </StackMenu>
        <StackMain>
          {stackItem === 'frontend' && (
            <>
              <h2> 프론트엔드 </h2>
              <StackGrid>
                <StackGridList>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/html.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/css.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/javascript.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/react.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/redux.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/typescript.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg
                      alt=""
                      src={'/img/stackIcon/stylecomponent.svg'}
                    />
                  </StackItem>
                </StackGridList>
                <StackDescription>설명</StackDescription>
              </StackGrid>
            </>
          )}
          {stackItem === 'backend' && (
            <>
              <h2> 백엔드 </h2>
              <StackGrid>
                <StackGridList>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/java.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/springboot.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg
                      alt=""
                      src={'/img/stackIcon/springsecurity.svg'}
                    />
                  </StackItem>
                </StackGridList>
                <StackDescription>설명</StackDescription>
              </StackGrid>
            </>
          )}
          {stackItem === 'server' && (
            <>
              <h2> 서버 </h2>
              <StackGrid>
                <StackGridList>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/linux.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/centos.svg'} />
                  </StackItem>
                </StackGridList>
                <StackDescription>설명</StackDescription>
              </StackGrid>
            </>
          )}
          {stackItem === 'database' && (
            <>
              <h2> Database </h2>
              <StackGrid>
                <StackGridList>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/mysql.svg'} />
                  </StackItem>
                </StackGridList>
                <StackDescription>설명</StackDescription>
              </StackGrid>
            </>
          )}
          {stackItem === 'cicd' && (
            <>
              <h2> CICD </h2>
              <StackGrid>
                <StackGridList>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/jenkins.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/githubaction.svg'} />
                  </StackItem>
                </StackGridList>
                <StackDescription>설명</StackDescription>
              </StackGrid>
            </>
          )}
          {stackItem === 'configuration_management' && (
            <>
              <h2> 형상관리 </h2>
              <StackGrid>
                <StackGridList>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/git.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/github.svg'} />
                  </StackItem>
                </StackGridList>
                <StackDescription>설명</StackDescription>
              </StackGrid>
            </>
          )}
          {stackItem === 'communication_tool' && (
            <>
              <h2> 협업도구 </h2>
              <StackGrid>
                <StackGridList>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/figma.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/slack.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/notion.svg'} />
                  </StackItem>
                  <StackItem>
                    <StackImg alt="" src={'/img/stackIcon/gathertown.svg'} />
                  </StackItem>
                </StackGridList>
                <StackDescription>설명</StackDescription>
              </StackGrid>
            </>
          )}
          {stackItem === 'etc' && (
            <>
              <h2> </h2>
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
      </Stack>
      <Project>프로젝트</Project>
      <Career>경력</Career>
      <div>풋터</div>
    </Container>
  );
};

export default PortfolioContainer;

// 스타일 컴포넌트

const Container = styled.div`
  background: white;
  max-width: 1400px;
  width: 100%;
  margin: auto;
`;
const Title = styled.div`
  height: 400px;
  background: #ececec;
  padding: 20px;
  text-align: center;
  line-height: 360px;
  position: relative;
`;
const waterwave = keyframes`
0%,100%{
  clip-path: polygon(0 50%, 10% 52%, 20% 54%, 30% 54%, 40% 52%, 50% 50%, 60% 48%, 70% 46%, 80% 46%, 90% 48%, 100% 50%, 100% 100%, 0% 100%);
}
50%{
  clip-path: polygon(0 50%, 10% 48%, 20% 46%, 30% 46%, 40% 48%, 50% 50%, 60% 52%, 70% 54%, 80% 54%, 90% 52%, 100% 50%, 100% 100%, 0% 100%);
}
`;
const Water = styled.div`
  position: absolute;
  animation: ${waterwave} 8s ease-in-out infinite;
  background: rgba(0, 0, 255, 0.5);
  width: 100%;
  height: 400px;
  top: 0px;
  left: 0px;
  font-size: 10rem;
`;
const rotation = keyframes`
0%,100%{
  transform: rotate(0deg);
}
50%{
  transform: rotate(60deg);
}
`;
const TitleIcon = styled.img<{ rotateAni: any }>`
  width: 320px;
  height: 320px;
  border-radius: 160px;
  animation: ${props => `${props.rotation} 8s ease-in-out infinite`};
`;
const Introduction = styled.div`
  background: white;
  height: 480px;
  display: grid;
  grid-template-rows: 100px 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  padding: 10px 20px;
  margin-bottom: 20px;
`;
const IntroductionTitle = styled.span`
  height: 100px;
  margin: auto;
  line-height: 100px;
  font-size: calc(3rem + 1.5vw);
  font-family: SANGJUGyeongcheonIsland;
  border-radius: 20px;
  background: linear-gradient(100deg, #dfcff8 33%, #b085f5 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;
const IntroductionItem = styled.div`
  display: flex;
  flex-flow: wrap row;
  align-content: center;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
  font-size: 2rem;
  font-family: SANGJUGyeongcheonIsland;
  box-shadow: 2px 2px 1px 1px, 1px 1px 1px 0px inset;
  background: linear-gradient(100deg, #fafafa 50%, #b085f5 100%);
  color: #b085f5;

  & > a {
    color: #b085f5;
  }
`;
const Stack = styled.div`
  background: #ffbb6d;
  padding: 0px 20px 20px 20px;
  height: 800px;
  overflow: scroll;
  msoverflowstyle: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
  font-family: 'Cafe24Ssurround';
`;
const StackTitle = styled.div`
  height: 60px;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-flow: wrap row;
`;
const StackMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StackMenuButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1.2rem;
  box-shadow: 0px 0px 5px 0px white;
  font-weight: 800;
  &:hover {
    color: white;
    box-shadow: 0px 0px 10px 2px white;
  }
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

  @media only screen and (max-width: '1440px') {
    grid-template-columns: 205px calc(100% - 205px);
  }
`;
const StackGridList = styled.div`
  width: 245px;
  grid-gap: 15px;
  display: grid;
  grid-template-columns: 100px 100px;

  @media only screen and (max-width: '1440px') {
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

  @media only screen and (max-width: '1440px') {
    width: 80px;
    height: 80px;
  }
`;
const StackImg = styled.img`
  width: 80px;
  height: 80px;

  @media only screen and (max-width: '1440px') {
    width: 60px;
    height: 60px;
  }
`;
const StackDescription = styled.div`
  border-left: solid 3px #aeaeae;
  padding: 10px;
  height: auto;
`;
const Project = styled.div`
  background: white;
  height: 800px;
`;
const Career = styled.div`
  min-height: 100px;
  background: #aeaeae;
`;
