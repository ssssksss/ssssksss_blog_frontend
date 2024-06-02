import Layout2 from '@components/layout/Layout2';
import Introduction from '@components/portfolio-component/Introduction';
import MyStack from '@components/portfolio-component/MyStack';
import ProjectsContainer from '@components/portfolio-component/projects-container';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ReactElement, useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { year: 2021, title: 'Project A', description: 'Description of Project A' },
  { year: 2022, title: 'Project B', description: 'Description of Project B' },
  { year: 2023, title: 'Project C', description: 'Description of Project C' },
];

const Project: React.FC<{
  project: { year: number; title: string; description: string };
  index: number;
}> = ({ project, index }) => {
  const projectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (projectRef.current) {
      gsap.fromTo(
        projectRef.current,
        { opacity: 1, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: projectRef.current,
            start: 'top 80%', // 화면의 80% 지점에 도달했을 때 트리거
            toggleActions: 'play none none none', // 스크롤 시 애니메이션 실행
            markers: true, // 마커를 표시하여 트리거 위치를 디버그
            once: true, // 애니메이션이 한 번만 실행되도록 설정
          },
        },
      );
    }
  }, [index]);

  return (
    <div
      ref={projectRef}
      className="bg-red-100 rounded-lg shadow-md p-6 max-w-lg mb-8"
    >
      <h2 className="text-2xl font-semibold">{project.year}</h2>
      <h3 className="text-xl">{project.title}</h3>
      <p className="text-gray-700">{project.description}</p>
    </div>
  );
};


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
        <h1 className="text-4xl font-bold mb-8"> 경험 및 교육 </h1>
        <div className="space-y-8 bg-blue-100">
          {projects.map((project, index) => (
            <Project key={index} project={project} index={index} />
          ))}
        </div>
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