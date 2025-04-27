import {
  BookMinus,
  CalendarFold,
  ClipboardList,
  Code2,
  Contact2,
  Disc3,
  Github,
  Globe,
  KeyRound,
  Mail,
  Map,
  Terminal,
} from "lucide-react";


export default async function Home() {
  return (
    <div className="min-h-screen p-8 text-contrast-1 bg-default-1">
      <div
        className={"mx-auto max-w-4xl space-y-8 transition-all duration-1000"}
      >
        <nav className="mb-16 flex items-center justify-between">
          <div className="text-xl font-bold">DEV.에이지</div>
          <div className="flex gap-6">
            <a href="#skills" className="transition-colors hover:text-blue-40">
              Skills
            </a>
            <a
              href="#projects"
              className="transition-colors hover:text-blue-40"
            >
              Projects
            </a>
            <a href="#contact" className="transition-colors hover:text-blue-40">
              Contact
            </a>
          </div>
        </nav>

        <div className="space-y-6 text-center">
          <h1 className="mb-4 text-5xl font-bold">Frontend Developer</h1>
          <p className="text-xl ">
            개인 프로젝트 정리 중
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/ssssksss"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors hover:text-blue-40"
            >
              <Github size={24} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors hover:text-blue-40"
            >
              <Contact2 size={24} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors hover:text-blue-40"
            >
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
                skills: ["Spring Boot", "MySQL"],
                etc: ["spring-data-jpa,", "spring security"],
              },
              {
                icon: <Globe size={32} />,
                title: "Other",
                skills: ["Git", "Figma"],
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
                  }
                >
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
          <h2 className="text-center text-3xl font-bold">
            Projects ({projects.length})
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((i, index) => (
              <div className="flex flex-col gap-y-4" key={index}>
                <div className="h-full rounded-lg bg-black-80 p-6 text-white-60 transition-colors">
                  <div className="mb-4 flex items-center gap-4">
                    {i.icon}
                    <h3 className="text-xl font-semibold">{i.title}</h3>
                  </div>
                  <div>
                    분류 :
                    <span className={`${i.workType == "팀" && ""}`}>
                      {i.workType}
                    </span>
                  </div>
                  <div className="pt-[0.125rem]">역할 : {i.role} </div>
                  <div>
                    정리 👉 :
                    <a href={i.link} target="_blank">
                      {i.link}
                    </a>
                  </div>
                  {i.deploymentLink && (
                    <div>
                      배포 👉 :
                      <a
                        className="pl-2"
                        href={i.deploymentLink}
                        target="_blank"
                      >
                        {i.deploymentLink}
                      </a>
                    </div>
                  )}
                  <div
                    className={
                      "mb-2 mt-3 flex flex-col rounded-[0.25rem] py-2 outline outline-white-80"
                    }
                  >
                    {i.work.map((j, index) => (
                      <div key={index} className="pl-1 font-cookieRunRegular">
                        {j}
                      </div>
                    ))}
                  </div>
                  {i.term && <div> 기간: {i.term} </div>}
                  {i.etc && <div> 기타: {i.etc} </div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="flex flex-col gap-y-8 py-8">
          <h2 className="text-center text-3xl font-bold">Contact</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* 이메일 */}
            <div className="rounded-lg bg-black-80 p-6 text-white-60 transition-colors">
              <div className="mb-4 flex flex-col items-center gap-4">
                <h3 className="w-full text-xl font-semibold default-flex">
                  이메일
                </h3>
                <div className="default-flex"> ssssksss@naver.com </div>
              </div>
            </div>
            {/* 학업 */}
            <div className="rounded-lg bg-black-80 p-6 text-white-60 transition-colors">
              <div className="mb-4 flex flex-col items-center gap-4">
                <h3 className="w-full text-xl font-semibold default-flex">
                  학업
                </h3>
                <div className="flex-col default-flex">
                  
                  <span> 서울과학기술대학교 </span>
                  <span> 기계시스템디자인 </span>
                </div>
              </div>
            </div>
            {/* 자격증 */}
            <div className="rounded-lg bg-black-80 p-6 text-white-60 transition-colors">
              <div className="mb-4 flex flex-col items-center gap-4">
                <h3 className="w-full text-xl font-semibold default-flex">
                  
                  자격증
                </h3>
                <div className="flex-col default-flex"> 정보처리기사 </div>
              </div>
            </div>
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
    stack: "",
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/72`,
    term: "",
    deploymentLink:
      "https://blog.ssssksss.xyz/blog2",
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
    stack: "",
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/70`,
    term: "",
    deploymentLink: "",
    etc: "노래가 많아지면 찾기가 어려워 검색이나, 페이지네이션 등을 고려 중",
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
    stack: "",
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/71`,
    term: "",
    deploymentLink: "https://blog.ssssksss.xyz/plan",
    etc: "연도, 주단위 등의 일정과 일정 공유, 일정 숨김처리 등의 기능 추가 예정",
  },
  {
    icon: <ClipboardList size={32} />,
    title: "게시판",
    workType: "개인",
    work: ["1. 게시판 CRUD", "2. 게시판 정렬", "3. 게시판 제목 검색"],
    role: "FE,BE",
    stack: "",
    link: "",
    term: "24.11.11 ~ 24.11.12",
    deploymentLink: "https://blog.ssssksss.xyz/board",
    etc: "개발중 - 댓글, 좋아요 기능, 이미지, 에디터 기능 추가 예정",
  },
  {
    icon: <KeyRound />,
    title: "인증처리",
    workType: "개인",
    work: ["1.일반 로그인", "2.oauth 로그인"],
    role: "FE,BE",
    stack: "",
    link: "",
    term: "",
    deploymentLink: "",
    etc: "정리 필요",
  },
  {
    icon: <Map size={32} />,
    title: "솔리투어",
    workType: "팀",
    work: ["블로그 카테고리 CRUD", "블로그 에디터(기능 추가 및 수정 중)"],
    role: "FE",
    stack: "",
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/105`,
    term: "",
    deploymentLink: "",
    etc: "현재 기획부터 다시 리빌딩 중",
  },
];
