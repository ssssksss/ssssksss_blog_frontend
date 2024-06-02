import ImageCard from "@components/common/card/ImageCard";
import ImgForestDescription from "./Projects/img-forest-description";
import PrivateProjectDescription from "./Projects/private-project-description";
import BlogProject from '/public/img/portfolio/project/blogProject.png';
/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file ProjectsContainer.tsx
 * @version 0.0.1 "2024-05-31 17:29:36"
 * @description 설명 
 */


const ProjectsContainer = () => {
  return (
    <section className={'flex flex-col gap-[1rem]'}>
      <h1 className={'text-[2.4rem] font-[800]'}> 프로젝트 </h1>
      <ul
        className={
          'flex flex-col gap-[1rem] sm:flex-row items-center outline outline-[#333] outline-offset-[-0.25rem] outline-[.25rem] p-[1rem]'
        }
      >
        <li className="aspect-square max-w-[30rem] outline outline-[#333]  outline-offset-[-0.125rem] p-[0.125rem] rounded-md w-full">
          <ImageCard
            imgSrc={BlogProject.src}
            w={'100%'}
            h={'100%'}
            className={'aspect-auto'}
            backComponent={PrivateProjectDescription()}
          />
        </li>
        <li className="aspect-square max-w-[30rem] outline outline-[#333] outline-offset-[-0.125rem] p-[0.125rem] rounded-md w-full">
          <ImageCard
            imgSrc={''}
            w={'100%'}
            h={'100%'}
            className={'aspect-auto'}
            backComponent={ImgForestDescription()}
          />
        </li>
      </ul>
    </section>
  );
};
export default ProjectsContainer;
