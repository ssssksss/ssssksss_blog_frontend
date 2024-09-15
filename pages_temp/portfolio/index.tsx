import Layout2 from '@components/layout/Layout2';
import Introduction from '@components/portfolio-component/Introduction';
import MyStack from '@components/portfolio-component/MyStack';
import Projects from '@components/portfolio-component/Projects/Projects';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ReactElement } from 'react';
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  return (
    <div
      className={
        'w-full flex flex-col gap-[2rem] overflow-y-scroll overflow-x-hidden '
      }
    >
        <Introduction />
      <MyStack />
      <Projects />
    </div>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout2>{page}</Layout2>;
};