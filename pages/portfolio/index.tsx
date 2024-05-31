import Layout2 from '@components/layout/Layout2';
import Introduction from '@components/portfolio-component/Introduction';
import MyStack from '@components/portfolio-component/MyStack';
import ProjectsContainer from '@components/portfolio-component/projects-container';
import { ReactElement } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2024-03-03 23:54:02"
 * @description 설명
 */


const Index = () => {
  return (
    <div
      className={
        'w-full flex flex-col gap-[2rem] overflow-y-scroll overflow-x-hidden'
      }
    >
      <Introduction />
      <MyStack active={'Frontend'} />
      <ProjectsContainer />
      <section className={'flex flex-col gap-[1rem]'}>
        <h1 className={'text-[2.4rem] font-[800]'}> 경험 및 교육 </h1>
      </section>
      <section className={'flex flex-col gap-[1rem]'}>
        <h1 className={'text-[2.4rem] font-[800]'}> Contact </h1>
      </section>
    </div>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout2>{page}</Layout2>;
};