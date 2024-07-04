import ModalButton from "@components/common/button/ModalButton";
import tw, { styled } from "twin.macro";
import PrivateProjectModal from "./modal/private-project-modal";

/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file private-project.tsx
 * @version 0.0.1 "2024-05-31 18:48:56"
 * @description 설명 
 */
const PrivateProjectDescription = () => {
  return (
    <Container>
      <li className="flex flex-col gap-[1rem]">
        <h3
          className={
            'py-[.5rem] font-bold text-[1.2rem] outline outline-[#AF74E6] outline-offset-[-0.2rem] outline-[.2rem] inline p-[.125rem] rounded-lg  px-[.5rem]'
          }
        >
          설명 (개인 프로젝트)
        </h3>
        <div className={'flex flex-col gap-[0.5rem] '}>
          <p> 기능 : 인증, 블로그, 게시판, 일정, 메모, TODO, 음악 플레이어 </p>
          <p> 블로그 사용 및 여러 개발을 위해 만든 개인 프로젝트 </p>
        </div>
      </li>
      <li className="flex flex-col gap-[1rem]">
        <h3
          className={
            'py-[.5rem] font-bold text-[1.2rem] outline outline-[#AF74E6] outline-offset-[-0.2rem] outline-[.2rem] inline p-[.125rem] rounded-lg  px-[.5rem]'
          }
        >
          깃허브 / 배포 주소 / 상세 설명
        </h3>
        <div className={'flex gap-[.25rem] h-[3rem]'}>
          <a
            href={'https://github.com/ssssksss/ssssksss_blog_frontend'}
            target={'_blank'}
            rel="noreferrer"
          >
            <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />
          </a>
          <a
            href={'https://blog.ssssksss.xyz/blog'}
            target={'_blank'}
            rel="noreferrer"
          >
            <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
          </a>
          <ModalButton
            modal={<PrivateProjectModal />}
            h={'2rem'}
            bg={'primary60'}
            pd={'0rem 1rem'}
            color={'contrast'}
            modalW={'calc(100vw - 8rem)'}
            modalH={'calc(100vh - 8rem)'}
            modalBg={'gray80'}
            modalOverlayVisible={true}
          >
            설명
          </ModalButton>
        </div>
      </li>
      <li className="flex flex-col gap-[1rem]">
        <h3
          className={
            'py-[.5rem] font-bold text-[1.2rem] outline outline-[#AF74E6] outline-offset-[-0.2rem] outline-[.2rem] inline p-[.125rem] rounded-lg  px-[.5rem]'
          }
        >
          팀원, 역할, 기간
        </h3>
        <div className={'flex gap-[.25rem]  h-[2rem]'}>
          <img src="https://img.shields.io/badge/frontend-3B66BC?style=for-the-badge&logo=&logoColor=white" />
          <img src="https://img.shields.io/badge/backend-DD0700?style=for-the-badge&logo=&logoColor=white" />
          <div
            className={
              'rounded-lg bg-black text-[white] px-[.25rem] font-bold flex items-center'
            }
          >
            2022, 2024
          </div>
        </div>
      </li>
      <li className="flex flex-col gap-[1rem]">
        <h3
          className={
            'py-[.5rem] font-bold text-[1.2rem] outline outline-[#AF74E6] outline-offset-[-0.2rem] outline-[.2rem] inline p-[.125rem] rounded-lg  px-[.5rem]'
          }
        >
          스택
        </h3>
        <ul className="flex flex-wrap gap-[.5rem]">
          <li>
            <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=next.js&logoColor=white" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/emotion-A100FF?style=for-the-badge&logo=styledcomponents&logoColor=white" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/reactquery-EF4154?style=for-the-badge&logo=react-query&logoColor=white" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
          </li>
        </ul>
      </li>
    </Container>
  );
};
export default PrivateProjectDescription;

const Container = styled.ul`
  ${
    tw`p-[1rem] gap-[2rem] flex flex-col h-full items-start justify-start w-full overflow-y-scroll`
  }
  ${props=>props.theme.scroll.hidden};
`;