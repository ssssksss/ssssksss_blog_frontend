
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MyStack.tsx
 * @version 0.0.1 "2024-03-04 18:07:12"
 * @description 설명
 */


const MyStack = () => {


  return (
    <section className={'flex flex-col gap-[1rem]'}>
      <h1 className={'text-[2.4rem] font-[800]'}> 기술스택 </h1>
      <ul
        className={
          'flex flex-col gap-[.5rem] p-[.75rem] outline outline-[#333] outline-offset-[-0.25rem] outline-[.25rem]'
        }
      >
        <li
          className={
            'grid grid-cols-[10rem_auto] bg-gray-200 p-[.5rem] rounded-lg'
          }
        >
          <h2 className={'text-[1.2rem] font-[600]'}> 프론트엔드 </h2>
          <ul className="flex flex-wrap gap-[.5rem] ">
            <li>
              <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=next.js&logoColor=white" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white" />
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
          </ul>
        </li>
        <li
          className={
            'grid grid-cols-[10rem_auto] bg-gray-200 p-[.5rem] rounded-lg'
          }
        >
          <h2 className={'text-[1.2rem] font-[600]'}> 백엔드 </h2>
          <ul className="flex flex-wrap gap-[.5rem] ">
            <li>
              <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
            </li>
          </ul>
        </li>
        <li
          className={
            'grid grid-cols-[10rem_auto] bg-gray-200 p-[.5rem] rounded-lg'
          }
        >
          <h2 className={'text-[1.2rem] font-[600]'}> DB & 서버 </h2>
          <ul className="flex flex-wrap gap-[.5rem] ">
            <li>
              <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/apachetomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=black" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" />
            </li>
          </ul>
        </li>
        <li
          className={
            'grid grid-cols-[10rem_auto] bg-gray-200 p-[.5rem] rounded-lg'
          }
        >
          <h2 className={'text-[1.2rem] font-[600]'}> 디자인 & 협업 툴 </h2>
          <ul className="flex flex-wrap gap-[.5rem] ">
            <li>
              <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
            </li>
            <li>
              <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white" />
            </li>
          </ul>
        </li>
      </ul>
    </section>
  );
};
export default MyStack;


