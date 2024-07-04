import TextParticle from "pages/portfolio/three-text-particle";

/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file Introduction.tsx
 * @version 0.0.1 "2024-05-31 17:33:07"
 * @description 설명 
 */
const Introduction = () => {
  return (
    <section className={'flex flex-col gap-[1rem] py-[2rem]'}>
      <TextParticle />
      <ul
        className={
          'px-[1rem] text-[1.2rem] w-full flex flex-col gap-[.75rem] outline outline-[#333] outline-offset-[-0.25rem] outline-[.25rem] py-[.5rem] italic'
        }
      >
        <li> 다양한 시도를 하면서 더 좋은 개발 방법을 찾고 있습니다.</li>
        <li> 여러 토이 프로젝트를 통해 다양한 경험을 얻고 있습니다.</li>
        <li> 유지보수를 어떻게 하면 좋을지 고민합니다. </li>
        <li> UI, UX, DX에 대해서 고민합니다.</li>
      </ul>
    </section>
  );
};
export default Introduction
