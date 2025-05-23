import RiseAnimationText from "@component/common/text/riseAnimationText";
import {
  BookMinus,
  CalendarFold,
  ClipboardList,
  Code2,
  Contact2,
  Disc3,
  Globe,
  KeyRound,
  Mail,
  Map,
  Terminal
} from "lucide-react";
import { FaGithub, FaHome } from "react-icons/fa";

const navItems = [
  {href: "#skills", label: "Skills"},
  {href: "#projects", label: "Projects"},
  {href: "#contact", label: "Contact"},
];

export default async function Home() {
  return (
    <div className="min-h-screen bg-default-1 p-4 min-[480px]:p-8">
      <article
        className={"mx-auto max-w-4xl space-y-8 transition-all duration-1000"}
      >
        <nav className="mb-2 flex flex-col justify-between gap-y-2 min-[480px]:mb-16">
          {/* <div className="glow-text text-xl font-bold">DEV.AGE</div> */}
          <RiseAnimationText
            text="DEV.AGE"
            textClassName="font-bold min-[480px]:text-[2rem]"
          />
          <div className="flex items-center gap-[0.375rem] self-end text-sm min-[480px]:text-lg">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="h-btn-sm content-center rounded-2xl bg-primary-80 px-2 py-1 text-primary-contrast transition-colors hover:scale-105 min-[480px]:h-btn-md"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <section className="space-y-2 text-center min-[480px]:space-y-6">
          <h1 className="mb-4 text-2xl font-bold min-[480px]:text-5xl">
            Frontend Developer
          </h1>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/ssssksss"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors hover:text-blue-40"
              aria-label="깃허브 이동"
            >
              <FaGithub size={24} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors hover:text-blue-40"
              aria-label="연락하기"
            >
              <Contact2 size={24} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors hover:text-blue-40"
              aria-label="이메일 보내기"
            >
              <Mail size={24} />
            </a>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="flex flex-col gap-y-6 py-4">
          <h2 className="rounded-2xl bg-secondary-80 py-2 text-center text-2xl font-bold text-secondary-contrast">
            Skills
          </h2>
          <div className="grid grid-cols-1 gap-x-2 gap-y-6 md:grid-cols-3">
            {[
              {
                icon: <Terminal size={32} />,
                title: "Frontend",
                skills: ["Next.js", "TailwindCSS"],
                etc: [
                  "react",
                  "ts",
                  "emotion",
                  "redux",
                  "zustand",
                  "react-hook-form",
                ],
              },
              {
                icon: <Code2 size={32} />,
                title: "Backend",
                skills: ["Spring Boot", "MySQL"],
                etc: ["spring-data-jpa", "spring security"],
              },
              {
                icon: <Globe size={32} />,
                title: "Other",
                skills: ["Git", "Figma"],
                etc: ["slack", "jira", "discord", "erdcloud"],
              },
            ].map((category, index) => (
              <div
                className="flex flex-col gap-y-4 text-third-contrast"
                key={index}
              >
                <div className="rounded-lg bg-third-80 p-6 transition-colors">
                  <div className="mb-4 flex items-center gap-4">
                    {category.icon}
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <div className="mb-4 h-[0.0625rem] w-full bg-white-100"></div>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div
                  className={
                    "flex h-full flex-wrap items-start gap-x-2 rounded-lg bg-third-80 p-2"
                  }
                >
                  {category.etc.map((i, index) => (
                    <span key={index}> {i} </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Section */}
        <section id="projects" className="flex flex-col gap-y-6 py-4">
          <h2 className="rounded-2xl bg-secondary-80 py-2 text-center text-2xl font-bold text-secondary-contrast">
            Projects <span className="text-xl"> ({projects.length}) </span>
          </h2>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {projects.map((i, index) => (
              <article
                className="flex h-full flex-col gap-y-2 rounded-2xl bg-third-80 px-4 py-2 text-third-contrast transition-colors"
                key={index}
              >
                <section className="flex items-center gap-4 py-2">
                  {i.icon}
                  <div className="flex w-full justify-between">
                    <h3 className="text-2xl font-semibold min-[480px]:text-[2rem]">
                      {i.title}
                    </h3>
                    <div className="flex gap-x-2">
                      <div className="text-md h-fit rounded-2xl bg-white-80 px-2 py-1 font-bold text-black-80 default-flex">
                        {i.workType}
                      </div>
                      <div className="text-md h-fit rounded-2xl bg-white-80 px-2 py-1 font-bold text-black-80 default-flex">
                        {i.role}
                      </div>
                    </div>
                  </div>
                </section>
                <div
                  className={
                    "mt-6 flex h-full flex-col rounded-[0.5rem] py-2 outline"
                  }
                >
                  {i.work.map((j, index) => (
                    <div key={index} className="pl-1 text-sm">
                      {j}
                    </div>
                  ))}
                </div>
                <div className="pb-1 pt-2">
                  {/* {i.term && <div> 기간: {i.term} </div>} */}
                  {i.etc && <div> 기타: {i.etc} </div>}
                </div>
                <div className="flex gap-x-2">
                  {i.link && (
                    <a
                      href={i.link}
                      className="w-fit rounded-2xl px-2 py-1 outline"
                      target="_blank"
                    >
                      블로그 정리 링크
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="flex flex-col gap-y-6 py-4">
          <h2 className="rounded-2xl bg-secondary-80 py-2 text-center text-2xl font-bold text-secondary-contrast">
            Contact
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* 이메일 */}
            <div className="rounded-lg bg-third-80 p-6 text-third-contrast transition-colors">
              <div className="mb-4 flex flex-col items-center gap-4">
                <h3 className="w-full text-xl font-semibold default-flex">
                  이메일
                </h3>
                <div className="default-flex"> ssssksss@naver.com </div>
              </div>
            </div>
            {/* 학업 */}
            <div className="rounded-lg bg-third-80 p-6 text-third-contrast transition-colors">
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
            <div className="rounded-lg bg-third-80 p-6 text-third-contrast transition-colors">
              <div className="mb-4 flex flex-col items-center gap-4">
                <h3 className="w-full text-xl font-semibold default-flex">
                  자격증
                </h3>
                <div className="flex-col default-flex"> 정보처리기사 </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

const projects = [
  {
    icon: <FaHome size={32} />,
    title: "홈(첫 페이지)",
    workType: "개인",
    work: ["1.개인 소개(업데이트 예정)"],
    role: "FE",
    stack: "",
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/140?menu=기초`,
    term: "",
    deploymentLink: "https://blog.ssssksss.xyz/blog2",
    etc: "",
  },
  {
    icon: <BookMinus size={32} />,
    title: "개인 블로그",
    workType: "개인",
    work: [
      "1. 블로그 카테고리 CRUD",
      "2. 블로그 글 CRUD",
      "3. 이미지 업로드",
      "4. 블로그 마크다운 에디터(기능 추가 및 수정 중)",
      "5. 블로그 인덱스 목차",
    ],
    role: "FE,BE",
    stack: "",
    // link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/72`,
    term: "",
    deploymentLink: "https://blog.ssssksss.xyz/blog2",
    etc: "",
  },
  {
    icon: <Disc3 size={32} />,
    title: "유튜브 플리",
    workType: "개인",
    work: [
      "1. 유튜브 URL을 youtube data api v3로 정보 받아오기",
      "2. 재생노래, 재생목록 로컬스토리지 저장",
      "3. 플레이리스트 생성",
      "4. 재생,정지 등 기능 구현",
    ],
    role: "FE,BE",
    stack: "",
    // link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/70`,
    term: "",
    deploymentLink: "",
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
    stack: "",
    // link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/71`,
    term: "",
    deploymentLink: "https://blog.ssssksss.xyz/plan",
    etc: "",
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
    etc: "",
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
    etc: "",
  },
  {
    icon: <Map size={32} />,
    title: "솔리투어",
    workType: "팀",
    work: ["블로그 카테고리 CRUD", "블로그 에디터(기능 추가 및 수정 중)"],
    role: "FE",
    stack: "",
    // link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog2/105`,
    term: "",
    deploymentLink: "",
    etc: "",
  },
];
