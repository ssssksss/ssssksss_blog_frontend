import {
  BookMinus,
  CalendarFold,
  ClipboardList,
  Code2,
  Contact2,
  Disc3,
  Github,
  Globe,
  Mail,
  Map,
  Terminal,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black-100 p-8 text-white-80">
      <div
        className={"mx-auto max-w-4xl space-y-8 transition-all duration-1000"}>
        <nav className="mb-16 flex items-center justify-between">
          <div className="text-xl font-bold">DEV.에이지</div>
          <div className="flex gap-6">
            <a href="#skills" className="transition-colors hover:text-blue-40">
              Skills
            </a>
            <a
              href="#projects"
              className="transition-colors hover:text-blue-40">
              Projects
            </a>
            {/* <a href="#contact" className="transition-colors hover:text-blue-40">
              Contact
            </a> */}
          </div>
        </nav>

        <div className="space-y-6 text-center">
          <h1 className="mb-4 text-5xl font-bold">Frontend Developer</h1>
          <p className="text-xl text-gray-400">
            다양한 시도를 해보면서 경험을 쌓아가고 있습니다.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/ssssksss"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors hover:text-blue-40">
              <Github size={24} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors hover:text-blue-40">
              <Contact2 size={24} />
            </a>
            <a href="" className="p-2 transition-colors hover:text-blue-40">
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <section id="skills" className="flex flex-col gap-y-8 py-8">
          <h2 className="text-center text-3xl font-bold">Skills</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: <Terminal size={32} />,
                title: "Frontend",
                skills: ["Next.js", "TailwindCSS"],
                etc: [
                  "react,",
                  "ts,",
                  "emotion,",
                  "redux,",
                  "zustand,",
                  "react-hook-form",
                ],
              },
              {
                icon: <Code2 size={32} />,
                title: "Backend",
                skills: ["Spring", "MySQL"],
                etc: ["spring-data-jpa,", "spring security"],
              },
              {
                icon: <Globe size={32} />,
                title: "Other",
                skills: ["Git,", "Figma"],
                etc: ["slack, jira, discord, erdcloud"],
              },
            ].map((category, index) => (
              <div className="flex flex-col gap-y-4" key={index}>
                <div className="rounded-lg bg-black-80 p-6 text-white-60 transition-colors">
                  <div className="mb-4 flex items-center gap-4">
                    {category.icon}
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div
                  className={
                    "flex h-[2rem] items-center overflow-hidden whitespace-nowrap rounded-lg bg-black-80 px-2"
                  }>
                  <div className={"flex animate-marquee5 flex-nowrap gap-x-2"}>
                    {category.etc.map((i, index) => (
                      <span key={index}> {i} </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Section */}
        <section id="projects" className="flex flex-col gap-y-8 py-8">
          <h2 className="text-center text-3xl font-bold">Projects</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((i, index) => (
              <div className="flex flex-col gap-y-4" key={index}>
                <div className="h-full rounded-lg bg-black-80 p-6 text-white-60 transition-colors">
                  <div className="mb-4 flex items-center gap-4">
                    {i.icon}
                    <h3 className="text-xl font-semibold">{i.title}</h3>
                  </div>
                  <div> 분류 : {i.workType} </div>
                  <div className="pt-[0.125rem]">역할 : {i.role} </div>
                  <div>
                    링크 :
                    <a href={i.link} target="_blank">
                      {i.link}
                    </a>
                  </div>
                  <div
                    className={
                      "mb-2 mt-3 flex flex-col rounded-[0.25rem] py-2 outline outline-white-80"
                    }>
                    {i.work.map((j, index) => (
                      <div key={index} className="pl-1 font-cookieRunRegular">
                        {j}
                      </div>
                    ))}
                  </div>
                  {i.term && <div> {i.term} </div>}
                  {i.etc && <div> {i.etc} </div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const projects = [
  {
    icon: <BookMinus size={32} />,
    title: "개인 블로그",
    workType: "개인",
    work: [
      "1. 블로그 카테고리 CRUD",
      "2. 블로그 글 CRUD",
      "3. 이미지 업로드",
      "4. 블로그 에디터(기능 추가 및 수정 중)",
      "5. 블로그 인덱스 목차",
    ],
    role: "FE,BE",
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/72`,
    term: "",
    etc: "",
  },
  {
    icon: <Disc3 size={32} />,
    title: "음악 플레이어",
    workType: "개인",
    work: [
      "1. 유튜브 URL을 youtube data api v3로 정보 받아오기",
      "2. 재생노래, 재생목록 로컬스토리지 저장",
      "3. 플레이리스트 생성",
      "4. 재생,정지 등 기능 구현",
    ],
    role: "FE,BE",
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/70`,
    term: "",
    etc: "",
  },
  {
    icon: <CalendarFold size={32} />,
    title: "일정",
    workType: "개인",
    work: [
      "1. 일정 카테고리 CRUD",
      "2. 일정 CRUD",
      "3. openweather api로 날씨 조회",
      "4. 메모장",
    ],
    role: "FE,BE",
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/71`,
    term: "",
    etc: "",
  },
  {
    icon: <ClipboardList size={32} />,
    title: "게시판",
    workType: "개인",
    work: ["...다시만들어야 함"],
    role: "FE,BE",
    link: "",
    term: "",
    etc: "",
  },
  {
    icon: <Map size={32} />,
    title: "솔로투어",
    workType: "팀",
    work: ["블로그 카테고리 CRUD", "블로그 에디터(기능 추가 및 수정 중)"],
    role: "FE",
    link: "https://www.solitourist.com",
    term: "",
    etc: "",
  },
];
