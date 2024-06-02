/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file img-forest.tsx
 * @version 0.0.1 "2024-05-31 18:51:53"
 * @description 설명 
 */
const ImgForestDescription = () => {
  return (
    <ul className="p-[1rem] gap-[1rem] flex flex-col h-full items-start justify-start bg-red-100 w-full overflow-y-scroll">
      <li>
        <h3
          className={
            'font-bold text-[1.2rem] outline outline-[#AF74E6] outline-offset-[-0.2rem] outline-[.2rem] inline p-[.125rem] rounded-lg  px-[.5rem]'
          }
        >
          설명 (작업 중)
        </h3>
        <div className={'flex flex-col gap-[0.5rem] pt-[.5rem]'}>
          pixabay 같이 이미지를 다운로드 및 판매하는 이미지 공유 사이트
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
            <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/reactquery-EF4154?style=for-the-badge&logo=react-query&logoColor=white" />
          </li>
          <li>
            <img src="https://img.shields.io/badge/zustand-56514B?style=for-the-badge&logo=zustand&logoColor=white" />
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
          <img src="https://img.shields.io/badge/BE4,FE2-000000?style=for-the-badge&logo=&logoColor=white" />
          <img src="https://img.shields.io/badge/frontend-3B66BC?style=for-the-badge&logo=&logoColor=white" />
          <div
            className={'rounded-lg bg-black text-[white] px-[.25rem] font-bold'}
          >
            2024.04.04 ~ now 
          </div>
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
          {/* <a
            href={'https://github.com/ssssksss/ssssksss_blog_frontend'}
            target={'_blank'}
            rel="noreferrer"
          >
          </a> */}
          {/* <img src="https://img.shields.io/badge/깃허브-181717?style=for-the-badge&logo=github&logoColor=white" /> */}
          {/* <a
            href={'https://blog.ssssksss.xyz/blog'}
            target={'_blank'}
            rel="noreferrer"
          >
          </a> */}
          <img src="https://img.shields.io/badge/배포임시중단-000000?style=for-the-badge&logo=&logoColor=white" />
        </div>
      </li>
    </ul>
  );
};
export default ImgForestDescription