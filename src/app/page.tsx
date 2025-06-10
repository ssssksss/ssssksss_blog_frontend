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
import Image from "next/image";
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
          {/* Achieve. Goal. Evolve */}
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
                skills: [
                  <i
                    key="nextjs"
                    className="devicon-nextjs-plain colored border-1 rounded-2xl border bg-white-80 p-1 text-[2.75rem] text-default-1"
                  >
                    <title>nextjs</title>
                  </i>,
                  <i
                    key="tailwindcss"
                    className="devicon-tailwindcss-original colored border-1 rounded-2xl border bg-white-80 p-1 text-[2.75rem] text-default-1"
                  >
                    <title>tailwindcss</title>
                  </i>,
                ],
                etc: [
                  <svg
                    viewBox="0 0 128 128"
                    height={44}
                    width={44}
                    key="react"
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                  >
                    <title>react</title>
                    <g fill="#61DAFB">
                      <circle cx="64" cy="64" r="11.4"></circle>
                      <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"></path>
                    </g>
                  </svg>,
                  <svg
                    viewBox="0 0 128 128"
                    height={44}
                    width={44}
                    key="typescript"
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                  >
                    <title>typescript</title>
                    <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z"></path>
                    <path
                      data-name="original"
                      fill="#007acc"
                      d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
                    ></path>
                  </svg>,
                  <Image
                    key="zustand"
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                    alt={""}
                    src={"/images/icons/ic-zustand.svg"}
                    width={44}
                    height={44}
                    title="zustand"
                  />,
                  <svg
                    key="react-hook-form"
                    height={44}
                    width={44}
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                  >
                    <title>React Hook Form</title>
                    <path d="M10.7754 17.3477H5.8065a.2815.2815 0 1 0 0 .563h4.9689a.2815.2815 0 1 0 0-.563zm7.3195 0h-4.9688a.2815.2815 0 1 0 0 .563h4.9688a.2815.2815 0 0 0 0-.563zm-7.3336-6.475H5.8065a.2815.2815 0 1 0 0 .563h4.9548a.2815.2815 0 1 0 0-.563zm7.3195 0h-4.9547a.2815.2815 0 1 0 0 .563h4.9547a.2815.2815 0 0 0 0-.563zm.5518-9.2001h-4.341a2.4042 2.4042 0 0 0-4.5804 0H5.3674c-1.7103 0-3.0968 1.3864-3.0968 3.0967v16.134C2.2706 22.6135 3.6571 24 5.3674 24h13.2652c1.7103 0 3.0968-1.3865 3.0968-3.0967V4.7693c0-1.7103-1.3865-3.0967-3.0968-3.0967zm-8.7046.563a.2815.2815 0 0 0 .2815-.2224 1.8411 1.8411 0 0 1 3.5979 0 .2815.2815 0 0 0 .2815.2224h1.5146v1.844a.8446.8446 0 0 1-.8446.8446H9.2552a.8446.8446 0 0 1-.8446-.8446v-1.844Zm11.2383 18.6677c0 1.3993-1.1344 2.5337-2.5337 2.5337H5.3674c-1.3993 0-2.5337-1.1344-2.5337-2.5337V4.7693c0-1.3993 1.1344-2.5337 2.5337-2.5337h2.4802v1.844c0 .7774.6302 1.4076 1.4076 1.4076h5.4896c.7774 0 1.4076-.6302 1.4076-1.4076v-1.844h2.4802c1.3993 0 2.5337 1.1344 2.5337 2.5337z" />
                  </svg>,
                  <svg
                    key="sentry"
                    height={44}
                    width={44}
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Sentry</title>
                    <path d="M13.91 2.505c-.873-1.448-2.972-1.448-3.844 0L6.904 7.92a15.478 15.478 0 0 1 8.53 12.811h-2.221A13.301 13.301 0 0 0 5.784 9.814l-2.926 5.06a7.65 7.65 0 0 1 4.435 5.848H2.194a.365.365 0 0 1-.298-.534l1.413-2.402a5.16 5.16 0 0 0-1.614-.913L.296 19.275a2.182 2.182 0 0 0 .812 2.999 2.24 2.24 0 0 0 1.086.288h6.983a9.322 9.322 0 0 0-3.845-8.318l1.11-1.922a11.47 11.47 0 0 1 4.95 10.24h5.915a17.242 17.242 0 0 0-7.885-15.28l2.244-3.845a.37.37 0 0 1 .504-.13c.255.14 9.75 16.708 9.928 16.9a.365.365 0 0 1-.327.543h-2.287c.029.612.029 1.223 0 1.831h2.297a2.206 2.206 0 0 0 1.922-3.31z" />
                  </svg>,
                ],
              },
              {
                icon: <Code2 size={32} />,
                title: "Backend",
                skills: [
                  <svg
                    key={"spring-boot"}
                    role="img"
                    height={52}
                    width={52}
                    viewBox="0 0 24 24"
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Spring Boot</title>
                    <path d="m23.693 10.7058-4.73-8.1844c-.4094-.7106-1.4166-1.2942-2.2402-1.2942H7.2725c-.819 0-1.8308.5836-2.2402 1.2942L.307 10.7058c-.4095.7106-.4095 1.873 0 2.5837l4.7252 8.189c.4094.7107 1.4166 1.2943 2.2402 1.2943h9.455c.819 0 1.826-.5836 2.2402-1.2942l4.7252-8.189c.4095-.7107.4095-1.8732 0-2.5838zM10.9763 5.7547c0-.5365.4377-.9742.9742-.9742s.9742.4377.9742.9742v5.8217c0 .5366-.4377.9742-.9742.9742s-.9742-.4376-.9742-.9742zm.9742 12.4294c-3.6427 0-6.6077-2.965-6.6077-6.6077.0047-2.0896.993-4.0521 2.6685-5.304a.8657.8657 0 0 1 1.2142.1788.8657.8657 0 0 1-.1788 1.2143c-2.1602 1.6048-2.612 4.6592-1.0072 6.8194 1.6049 2.1603 4.6593 2.612 6.8195 1.0072 1.2378-.9177 1.9673-2.372 1.9673-3.9157a4.8972 4.8972 0 0 0-1.9861-3.925c-.386-.2824-.466-.8284-.1836-1.2143.2824-.386.8283-.466 1.2143-.1835 1.6895 1.2471 2.6826 3.2238 2.6873 5.3228 0 3.6474-2.965 6.6077-6.6077 6.6077z" />
                  </svg>,
                ],
                etc: [
                  <svg
                    key="mysql"
                    height={44}
                    width={44}
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                    viewBox="0 0 128 128"
                  >
                    <title>mysql</title>
                    <path
                      fill="#00618A"
                      d="M0 91.313h4.242V74.566l6.566 14.598c.773 1.77 1.832 2.391 3.914 2.391s3.098-.621 3.871-2.391l6.566-14.598v16.746h4.242V74.594c0-1.633-.652-2.422-2-2.828-3.223-1.004-5.383-.137-6.363 2.039l-6.441 14.41-6.238-14.41c-.937-2.176-3.14-3.043-6.359-2.039-1.348.406-2 1.195-2 2.828zM32.93 77.68h4.238v9.227c-.039.5.16 1.676 2.484 1.715h9.223V77.633h4.25c.02 0-.008 14.984-.008 15.047.023 3.695-4.582 4.496-6.707 4.559H33.02v-2.852l13.414-.004c2.73-.285 2.406-1.645 2.406-2.098v-1.113h-9.012c-4.195-.039-6.863-1.871-6.898-3.977-.004-.191.09-9.422 0-9.516zm23.461 13.633h12.195c1.426 0 2.813-.301 3.914-.816 1.836-.84 2.73-1.984 2.73-3.48v-3.098c0-1.223-1.016-2.367-3.016-3.125-1.059-.41-2.367-.625-3.629-.625h-5.141c-1.711 0-2.527-.516-2.73-1.656-.039-.137-.039-.246-.039-.383V76.2c0-.109 0-.219.039-.355.203-.867.652-1.113 2.16-1.25l.41-.027h12.109v-2.824H63.488c-1.711 0-2.609.109-3.426.352-2.527.789-3.629 2.039-3.629 4.215v2.473c0 1.902 2.16 3.535 5.789 3.914.41.027.816.055 1.223.055h4.406c.164 0 .324 0 .449.027 1.344.109 1.914.355 2.324.844.211.195.332.473.324.758v2.477c0 .297-.203.68-.609 1.004-.367.328-.98.543-1.793.598l-.449.027H56.391zm45.297-4.922c0 2.91 2.164 4.539 6.523 4.867.41.027.816.055 1.227.055h11.051v-2.828h-11.133c-2.488 0-3.426-.625-3.426-2.121V71.738h-4.238V86.39zm-23.75.148V76.457c0-2.559 1.801-4.113 5.355-4.602a7.976 7.976 0 0 1 1.145-.082h8.047c.41 0 .777.027 1.188.082 3.555.488 5.352 2.043 5.352 4.602v10.082c0 2.078-.762 3.188-2.523 3.914l4.18 3.77h-4.926l-3.379-3.051-3.402.215H84.44a9.23 9.23 0 0 1-2.492-.352c-2.699-.734-4.008-2.152-4.008-4.496zm4.578-.246c0 .137.043.273.082.438.246 1.172 1.352 1.824 3.023 1.824h3.852l-3.539-3.195h4.926l3.086 2.789c.57-.305.945-.766 1.074-1.363.043-.137.043-.273.043-.41v-9.668c0-.109 0-.246-.043-.383-.246-1.09-1.348-1.715-2.98-1.715h-6.418c-1.879 0-3.105.816-3.105 2.098zm41.703-19.246c-2.605-.07-4.598.172-6.301.891-.484.203-1.258.207-1.336.813.266.281.309.699.52 1.039.406.66 1.094 1.539 1.707 2 .664.508 1.355 1.047 2.074 1.484 1.273.777 2.699 1.223 3.93 2 .723.461 1.441 1.039 2.148 1.559.348.254.582.656 1.039.816v-.074c-.238-.305-.301-.723-.52-1.039l-.965-.965c-.941-1.25-2.137-2.348-3.41-3.262-1.016-.727-3.281-1.711-3.707-2.891l-.074-.074c.719-.078 1.563-.34 2.223-.516 1.117-.301 2.113-.223 3.262-.52l1.559-.449v-.293c-.582-.598-.996-1.387-1.633-1.93-1.656-1.41-3.469-2.824-5.336-4.004-1.035-.652-2.312-1.074-3.41-1.629-.367-.187-1.016-.281-1.262-.594-.574-.734-.887-1.664-1.332-2.52a96.534 96.534 0 0 1-2.668-5.633c-.562-1.285-.93-2.555-1.633-3.707-3.363-5.535-6.988-8.875-12.602-12.156-1.191-.699-2.633-.973-4.148-1.332l-2.449-.148c-.496-.211-1.012-.82-1.48-1.113-1.859-1.176-6.629-3.73-8.008-.371-.867 2.121 1.301 4.191 2.078 5.266.543.754 1.242 1.598 1.629 2.445.258.555.301 1.113.52 1.703.539 1.453 1.008 3.031 1.707 4.375.352.68.738 1.395 1.184 2 .273.371.742.539.816 1.113-.457.641-.484 1.633-.742 2.445-1.16 3.652-.723 8.191.965 10.898.516.828 1.734 2.609 3.41 1.926 1.465-.598 1.137-2.445 1.555-4.078.098-.367.039-.641.223-.887v.074l1.336 2.668c.988 1.59 2.738 3.25 4.223 4.371.773.582 1.379 1.59 2.375 1.93V68.6h-.074c-.195-.297-.496-.422-.742-.664-.582-.57-1.227-1.277-1.703-1.93-1.352-1.832-2.547-3.84-3.633-5.93-.52-.996-.973-2.098-1.41-3.113-.168-.391-.164-.984-.516-1.184-.48.742-1.187 1.344-1.559 2.223-.594 1.402-.668 3.117-.891 4.891l-.148.074c-1.031-.25-1.395-1.312-1.777-2.223-.973-2.305-1.152-6.02-.297-8.672.219-.687 1.219-2.852.813-3.484-.191-.633-.828-1-1.184-1.484a11.7 11.7 0 0 1-1.187-2.074c-.793-1.801-1.164-3.816-2-5.633-.398-.871-1.074-1.75-1.629-2.523-.617-.855-1.305-1.484-1.781-2.52-.168-.367-.398-.957-.148-1.336.078-.254.195-.359.445-.441.43-.332 1.629.109 2.074.293 1.191.496 2.184.965 3.191 1.633.48.32.969.941 1.555 1.113h.668c1.043.238 2.211.07 3.188.367 1.723.523 3.27 1.34 4.668 2.227 4.273 2.695 7.766 6.535 10.156 11.117.387.738.551 1.441.891 2.223.684 1.578 1.543 3.203 2.223 4.746s1.34 3.094 2.297 4.375c.504.672 2.453 1.031 3.336 1.406.621.262 1.637.535 2.223.891 1.125.676 2.211 1.48 3.266 2.223.523.375 2.141 1.188 2.223 1.855zM91.082 38.805a5.26 5.26 0 0 0-1.332.148v.074h.074c.258.535.715.879 1.035 1.336l.742 1.555.074-.07c.461-.324.668-.844.668-1.633-.187-.195-.211-.437-.371-.668-.211-.309-.621-.48-.891-.742zm0 0"
                    ></path>
                  </svg>,
                  <svg
                    key="spring-security"
                    height={44}
                    width={44}
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Spring Security</title>
                    <path d="M20.59 2.066 11.993 0 3.41 2.066v6.612h4.557a3.804 3.804 0 0 0 0 .954H3.41v3.106C3.41 19.867 11.994 24 11.994 24s8.582-4.133 8.582-11.258V9.635h-4.545a3.616 3.616 0 0 0 0-.954h4.558zM12 12.262h-.006a3.109 3.109 0 1 1 .006 0zm-.006-4.579a.804.804 0 0 0-.37 1.52v.208l.238.237v.159l.159.159v.159l-.14.14.15.246v.159l-.16.189.223.222.246-.246V9.218a.804.804 0 0 0-.346-1.535zm0 .836a.299.299 0 1 1 .298-.299.299.299 0 0 1-.298.3z" />
                  </svg>,
                  <Image
                    key="aws s3"
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                    alt={""}
                    src={"/images/icons/ic-aws-s3.svg"}
                    width={44}
                    height={44}
                    title="aws s3"
                  />,
                ],
              },
              {
                icon: <Globe size={32} />,
                title: "Other",
                skills: [
                  <svg
                    key="github"
                    height={52}
                    width={52}
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                    viewBox="0 0 128 128"
                  >
                    <title> github </title>
                    <g fill="#181616">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                      ></path>
                      <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                    </g>
                  </svg>,
                  <svg
                    viewBox="0 0 128 128"
                    key="figma"
                    height={52}
                    width={52}
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                  >
                    <title> figma </title>
                    <path
                      fill="#0acf83"
                      d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129zm0 0"
                    ></path>
                    <path
                      fill="#a259ff"
                      d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5zm0 0"
                    ></path>
                    <path
                      fill="#f24e1e"
                      d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5zm0 0"
                    ></path>
                    <path
                      fill="#ff7262"
                      d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0"
                    ></path>
                    <path
                      fill="#1abcfe"
                      d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5 76.6 43 88.5 43 110 52.6 110 64.5zm0 0"
                    ></path>
                  </svg>,
                ],
                etc: [
                  <svg
                    viewBox="0 0 128 128"
                    key="slack"
                    height={44}
                    width={44}
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                  >
                    <title> slack </title>
                    <path
                      d="M27.255 80.719c0 7.33-5.978 13.317-13.309 13.317C6.616 94.036.63 88.049.63 80.719s5.987-13.317 13.317-13.317h13.309zm6.709 0c0-7.33 5.987-13.317 13.317-13.317s13.317 5.986 13.317 13.317v33.335c0 7.33-5.986 13.317-13.317 13.317-7.33 0-13.317-5.987-13.317-13.317zm0 0"
                      fill="#de1c59"
                    ></path>
                    <path
                      d="M47.281 27.255c-7.33 0-13.317-5.978-13.317-13.309C33.964 6.616 39.951.63 47.281.63s13.317 5.987 13.317 13.317v13.309zm0 6.709c7.33 0 13.317 5.987 13.317 13.317s-5.986 13.317-13.317 13.317H13.946C6.616 60.598.63 54.612.63 47.281c0-7.33 5.987-13.317 13.317-13.317zm0 0"
                      fill="#35c5f0"
                    ></path>
                    <path
                      d="M100.745 47.281c0-7.33 5.978-13.317 13.309-13.317 7.33 0 13.317 5.987 13.317 13.317s-5.987 13.317-13.317 13.317h-13.309zm-6.709 0c0 7.33-5.987 13.317-13.317 13.317s-13.317-5.986-13.317-13.317V13.946C67.402 6.616 73.388.63 80.719.63c7.33 0 13.317 5.987 13.317 13.317zm0 0"
                      fill="#2eb57d"
                    ></path>
                    <path
                      d="M80.719 100.745c7.33 0 13.317 5.978 13.317 13.309 0 7.33-5.987 13.317-13.317 13.317s-13.317-5.987-13.317-13.317v-13.309zm0-6.709c-7.33 0-13.317-5.987-13.317-13.317s5.986-13.317 13.317-13.317h33.335c7.33 0 13.317 5.986 13.317 13.317 0 7.33-5.987 13.317-13.317 13.317zm0 0"
                      fill="#ebb02e"
                    ></path>
                  </svg>,
                  <svg
                    viewBox="0 0 128 128"
                    key="jira"
                    height={44}
                    width={44}
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                  >
                    <title> jira </title>
                    <defs>
                      <linearGradient
                        id="jira-original-wordmark-a"
                        gradientUnits="userSpaceOnUse"
                        x1="22.034"
                        y1="9.773"
                        x2="17.118"
                        y2="14.842"
                        gradientTransform="translate(1.136 -13.247) scale(3.90869)"
                      >
                        <stop offset=".176" stop-color="#0052cc"></stop>
                        <stop offset="1" stop-color="#2684ff"></stop>
                      </linearGradient>
                      <linearGradient
                        id="jira-original-wordmark-b"
                        gradientUnits="userSpaceOnUse"
                        x1="16.641"
                        y1="15.564"
                        x2="10.957"
                        y2="21.094"
                        gradientTransform="translate(1.136 -13.247) scale(3.90869)"
                      >
                        <stop offset=".176" stop-color="#0052cc"></stop>
                        <stop offset="1" stop-color="#2684ff"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M106.691 2.387h-45.16c0 11.258 9.114 20.37 20.367 20.37h8.309v8.04c0 11.258 9.113 20.371 20.371 20.371V6.273a3.89 3.89 0 00-3.887-3.886zm0 0"
                      fill="#2684ff"
                    ></path>
                    <path
                      d="M84.313 24.902h-45.16c0 11.258 9.109 20.368 20.367 20.368h8.308v8.042c0 11.258 9.113 20.372 20.371 20.372V28.789a3.89 3.89 0 00-3.886-3.887zm0 0"
                      fill="url(#jira-original-wordmark-a)"
                    ></path>
                    <path
                      d="M61.934 47.414H16.77c0 11.258 9.113 20.371 20.37 20.371h8.31v8.043c0 11.254 9.112 20.367 20.37 20.367V51.301a3.89 3.89 0 00-3.886-3.887zm0 0"
                      fill="url(#jira-original-wordmark-b)"
                    ></path>
                    <path
                      d="M46 101.242h3.434v16.98c0 4.481-2.043 7.606-6.786 7.606-1.78 0-3.175-.297-4.132-.633v-3.254c1.047.422 2.308.633 3.57.633 2.914 0 3.914-1.687 3.914-4.14zm0 0M55.742 99.93c1.348 0 2.305.804 2.305 2.238 0 1.394-.957 2.242-2.305 2.242-1.347 0-2.304-.805-2.304-2.242 0-1.39.957-2.238 2.304-2.238zm-1.695 7.14h3.305v18.59h-3.305zm0 0M65.527 125.66H62.31v-18.59h3.218v3.254c1.133-2.199 3.047-3.761 6.785-3.55v3.128c-4.218-.422-6.785.801-6.785 4.774zm0 0M87.758 122.32c-1.219 2.453-3.524 3.72-6.485 3.72-5.085 0-7.652-4.185-7.652-9.677 0-5.238 2.695-9.672 8.047-9.672 2.781 0 4.957 1.223 6.09 3.633v-3.254h3.305v18.59h-3.305zm-5.613.762c2.957 0 5.566-1.816 5.566-5.957v-1.477c0-4.14-2.39-5.957-5.219-5.957-3.695 0-5.61 2.364-5.61 6.672.044 4.48 1.872 6.719 5.263 6.719zm0 0"
                      fill="#253858"
                    ></path>
                  </svg>,
                  <svg
                    key="discord"
                    height={44}
                    width={44}
                    className="border-1 rounded-2xl border bg-white-80 p-1 text-default-1"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Discord</title>
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>,
                ],
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
                  <ul className="flex items-center gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div
                  className={
                    "flex h-full flex-wrap items-start gap-2 rounded-lg bg-third-80 p-2"
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
