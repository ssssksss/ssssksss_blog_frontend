import AbsoluteCloseButton from "@component/common/button/hybrid/AbsoluteCloseButton";
import useOutsideClick from "@hooks/useOutsideClick";
import { convertMarkdownToHtml } from "@utils/editor/MarkdownPreview";
import { useRef } from "react";

interface Heading {
  tagName: "H2" | "H3" | "H4";
  id: string;
}

interface HeadingResult {
  id: string;
  htag: Heading["tagName"];
  name: string;
}

interface IBlog2ContentIndexContainer {
  closeModal: () => void;
  data: IBlog2Result[] | IBlog2Basic[];
}
const Blog2ContentIndexContainer = (props: IBlog2ContentIndexContainer) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    event.preventDefault(); // 기본 링크 동작 방지

    // 페이지를 스크롤하여 이동 (targetId에 해당하는 요소로 이동)
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({behavior: "smooth"});
    }

    // URL을 히스토리에 추가하지 않고 변경
    window.history.replaceState(null, "", `#${targetId}`);
  };

  const generateLink = (text: string, parentId: number) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      convertMarkdownToHtml(text, false, parentId),
      "text/html",
    );

    const headings = doc.querySelectorAll(
      "h1[data-index='true'], h2[data-index='true'], h3[data-index='true']",
    );

    const idsArray: HeadingResult[] = Array.from(headings)
      .filter((el): el is HTMLElement => el instanceof HTMLElement)
      .filter((el): el is HTMLElement & {tagName: Heading["tagName"]} =>
        ["H2", "H3", "H4"].includes(el.tagName),
      )
      .map((heading) => {
        const tag = heading.tagName as Heading["tagName"];

        return {
          id: heading.id,
          htag: tag,
          name: heading.id,
        };
      });
    
    return idsArray.map((i) => (
      <label
        key={i.id}
        className={
          "relative flex items-center justify-start p-1 text-[1rem] hover:scale-105"
        }
      >
        <a
          className={`w-full font-DNFBitBitv2 ${i.htag == "H2" ? "pl-2 text-secondary-80" : "pl-3 text-third-80"}`}
          href={`#${i.id}`}
          onClick={(event) => handleLinkClick(event, i.id)}
        >
          {i.name.replace(/^\d+-H\d-\d+-/, "")}
        </a>
      </label>
    ));
  };
  
  useOutsideClick(ref, () => {
    props.closeModal();
  });

  return (
    <div
      ref={ref}
      className="sticky left-[100%] top-[4.5rem] z-10 h-0 w-0 translate-x-1"
    >
      <ul className="primary-border-radius absolute right-[0.25rem] flex max-h-[calc(100vh-5rem)] w-[20rem] max-w-[50vw] flex-col gap-y-2 bg-default-1 p-2 pt-[2.25rem] min-[1900px]:left-[0.375rem]">
        <AbsoluteCloseButton
          className={"right-[0.25rem] top-[0.25rem]"}
          onClick={() => props.closeModal()}
          size="32"
        />
        <div className="overflow-y-scroll rounded-lg">
          {props.data.map((i) => {
            const title = "content" in i ? i.title : i.blog2BasicContent.title;
            const content =
              "content" in i ? i.content : i.blog2BasicContent.content;

            return (
              <div key={i.id}>
                <label className="relative flex items-center justify-start p-1 font-bold text-primary-80 hover:bg-primary-20">
                  <a
                    className="w-full"
                    href={`#${title.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = title.replace(/\s+/g, "-").toLowerCase();
                      const targetElement = document.getElementById(id);
                      if (targetElement) {
                        targetElement.scrollIntoView({behavior: "smooth"});
                        history.replaceState(null, "", `#${id}`);
                      }
                    }}
                  >
                    {title}
                  </a>
                </label>
                {generateLink(content, i.id)}
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
};
export default Blog2ContentIndexContainer;