import styled from "@emotion/styled";
import tw from "twin.macro";

const PrivateProjectHeader = () => {
  return (
    <section
      className={
        'flex flex-col items-start gap-[1rem] bg-[#f0f0f0] p-[1rem] w-full rounded-2xl'
      }
    >
      <div className="flex gap-2 items-center">
        <H1> 개인프로젝트 </H1>
        <a
          href={'https://blog.ssssksss.xyz/blog'}
          target={'_blank'}
          rel="noreferrer"
          className={
            'hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white p-[1rem] rounded-lg'
          }
        >
          https://blog.ssssksss.xyz/blog
        </a>
      </div>
      <Article>
        <div className="w-[5rem] justify-start flex font-bold text-[1.6rem]">
          설명
        </div>
        <span className="text-start">
          블로그 및 다양한 프로젝트를 개발 및 만드는 프로젝트
        </span>
      </Article>
      <Article>
        <div className="w-[5rem] justify-start flex font-bold text-[1.6rem]">
          스택
        </div>
        <span className="text-start">
          nextjs, emotion, tailwind-css, redux, typescript
        </span>
      </Article>
      <Article>
        <div className="w-[5rem] justify-start flex font-bold text-[1.6rem]">
          기능
        </div>
        <span className="text-start">
          인증, 블로그, 게시판, todo, 스케줄, 메모, 음악 플레이어
        </span>
      </Article>
      <Article>
        <div className="w-[5rem] justify-start flex font-bold text-[1.6rem]">
          기간
        </div>
        <span className="text-start">2022, 2024 ~ 현재 진행 중</span>
      </Article>
    </section>
  );
};
export default PrivateProjectHeader

const Article = tw.article`
${'py-[1rem] px-[.5rem] w-full grid grid-cols-[5rem_auto] gap-[2rem] items-center outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] bg-[#fefefe]'}
`;

const H1 = styled.h1`
  font-weight: 800;
  outline: solid ${(props) => props.theme.main.primary80} 0.25rem;
  outline-offset: -0.25rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  max-width: max-content;
  font-size: 2rem;
  font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
`;
