/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file private-project.tsx
 * @version 0.0.1 "2024-05-31 18:48:56"
 * @description 설명 
 */
const PrivateProjectDescription = () => {
  return (
    <ul className="p-[1rem] gap-[.5rem] grid grid-rows-[8fr_4fr_4fr_2fr] h-full items-start justify-start bg-red-100 w-full overflow-y-scroll">
      <li>
        <h3
          className={
            'font-bold text-[1.2rem] outline outline-[#AF74E6] outline-offset-[-0.2rem] outline-[.2rem] inline p-[.125rem] rounded-lg  px-[.5rem]'
          }
        >
          설명 (진행 중)
        </h3>
        <div className={'flex flex-col gap-[0.5rem] pt-[.5rem]'}>
          <p> 인증, 블로그, 게시판, 일정, 메모, TODO, 음악 플레이어 기능</p>
          <p> 코드 리팩토링 및 정리 중</p>
          <p> 블로그 용도(공부 정리 및 기록)로 사용 중 </p>
          <p>
            Oauth, 이미지 업로드(미리보기), 무한스크롤(Intersection Observer
            API, react-query), 페이지네이션 등
          </p>
        </div>
      </li>
      <li>
        <h3
          className={
            'font-bold text-[1.2rem] outline outline-[#AF74E6] outline-offset-[-0.2rem] outline-[.2rem] inline p-[.125rem] rounded-lg  px-[.5rem]'
          }
        >
          스택
        </h3>
        <ul className="flex flex-wrap gap-[.5rem] pt-[.5rem]">
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
      <li>
        <h3
          className={
            'font-bold text-[1.2rem] outline outline-[#AF74E6] outline-offset-[-0.2rem] outline-[.2rem] inline p-[.125rem] rounded-lg  px-[.5rem]'
          }
        >
          팀원 / 역할 / 기간
        </h3>
        <div className={'flex gap-[.25rem] pt-[.5rem]'}>
          <img src="https://img.shields.io/badge/개인-000000?style=for-the-badge&logo=&logoColor=white" />
          <img src="https://img.shields.io/badge/frontend-3B66BC?style=for-the-badge&logo=&logoColor=white" />
          <img src="https://img.shields.io/badge/backend-DD0700?style=for-the-badge&logo=&logoColor=white" />
          <span
            className={'rounded-lg bg-black text-[white] px-[.25rem] font-bold'}
          >
            {' '}
            2022, 2024{' '}
          </span>
        </div>
      </li>
      <li>
        <h3
          className={
            'font-bold text-[1.2rem] outline outline-[#AF74E6] outline-offset-[-0.2rem] outline-[.2rem] inline p-[.125rem] rounded-lg  px-[.5rem]'
          }
        >
          깃허브 / 배포주소
        </h3>
        <div className={'flex gap-[.25rem] pt-[.5rem]'}>
          <a
            href={'https://github.com/ssssksss/ssssksss_blog_frontend'}
            target={'_blank'}
            rel="noreferrer"
          >
            <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />
          </a>
          <a href={'https://blog.ssssksss.xyz/blog'} target={'_blank'}>
            <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
          </a>
        </div>
      </li>
    </ul>
  );
};
export default PrivateProjectDescription;