"use client";

import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import useSiteBookmarkStore from "@store/siteBookmarkStore";
import { useEffect } from "react";
import { IoIosSettings } from "react-icons/io";
import SiteBookmarkCategoryModal from "./SiteBookmarkCategoryModal";
import SiteBookmarkModal from "./SiteBookmarkModal";
interface ISiteBookmarkCategoryList {
  data: ISiteBookmarkCategory[];
}

const SiteBookmarkCategoryList = (props: ISiteBookmarkCategoryList) => {
  const siteBookmarkStore = useSiteBookmarkStore();

  useEffect(() => {
    siteBookmarkStore.setInit(props.data);
  }, []);
  
  return (
    <div className={"flex h-[calc(100vh-5rem)] w-full flex-col gap-2"}>
      <section className="relative w-full rounded-2xl border-4 border-primary-80 py-4 default-flex">
        <h1 className="text-2xl"> ⭐ 사이트 링크 모음 </h1>
        <NestedModalButton
          buttonClassName="absolute right-2 p-2 default-flex outline rounded-xl"
          modal={<SiteBookmarkCategoryModal />}
        >
          <IoIosSettings size={24} />
        </NestedModalButton>
      </section>
      <section className="h-full w-full rounded-2xl border-4 border-primary-80 p-2">
        {siteBookmarkStore.siteBookmarkCategoryList?.map((i) => (
          <div
            key={i.id}
            className="w-[12.5rem] rounded-2xl p-2 shadow-2xl outline outline-primary-80"
          >
            <div className="flex flex-col gap-2">
              <h3 className="relative w-full rounded-2xl bg-secondary-80 px-1 font-DNFBitBitv2 text-[1.75rem] default-flex">
                {i.name}
                <NestedModalButton
                  buttonClassName="absolute right-1 p-1 default-flex rounded-xl hover:bg-primary-60 hover:text-primary-contrast"
                  modal={<SiteBookmarkModal siteBookmarkCategoryId={i.id} />}
                >
                  <IoIosSettings size={24} />
                </NestedModalButton>
              </h3>
              <div className="flex h-full min-h-[15rem] w-full flex-col gap-1 rounded-2xl bg-secondary-80 px-2 py-1">
                {i.siteBookmarkList?.map((j) => (
                  <a
                    key={j.id}
                    target="_blank"
                    className="cursor-pointer rounded-2xl py-1 default-flex bg-primary-60 hover:text-primary-contrast"
                    href={j.url}
                  >
                    {j.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
export default SiteBookmarkCategoryList;