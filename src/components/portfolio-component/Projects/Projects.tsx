const DescriptionContainer = dynamic(() => import('@components/portfolio-component/Projects/private-project-description'), {
  loading: () => <p>Loading...</p>,
});

import ImageCard from '@components/common/card/ImageCard';
import dynamic from 'next/dynamic';
import BlogProject from '/public/img/portfolio/project/blogProject.png';

const Projects = () => {
  return (
    <section className={'flex flex-col gap-[1rem]'}>
      <h1 className={'text-[2.4rem] font-[800]'}> 프로젝트 </h1>
      <ul
        className={
          'flex flex-col gap-[.5rem] p-[.75rem] outline outline-[#333] outline-offset-[-0.25rem] outline-[.25rem]'
        }
      >
        <li className="aspect-square max-w-[24rem] outline outline-[#333]  outline-offset-[-0.125rem] p-[0.125rem] rounded-md w-full">
          <ImageCard
            imgSrc={BlogProject.src}
            w={'100%'}
            h={'100%'}
            className={'aspect-auto'}
            backComponent={<DescriptionContainer />}
          />
        </li>
      </ul>
    </section>
  );
};
export default Projects;
