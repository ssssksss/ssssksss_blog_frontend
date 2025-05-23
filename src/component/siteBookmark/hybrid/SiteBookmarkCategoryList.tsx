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
    <div
      className={
        "flex min-h-[calc(100vh-5rem)] w-full flex-col gap-1 rounded-2xl"
      }
    >
      <section className="relative w-full px-2 pt-2 default-flex">
        <h1 className="w-full rounded-2xl py-3 text-2xl default-flex">
          ⭐ 사이트 링크 모음
        </h1>
        <NestedModalButton
          buttonClassName="absolute right-4 p-2 default-flex outline outline-primary-80 rounded-2xl"
          modal={<SiteBookmarkCategoryModal />}
        >
          <IoIosSettings size={24} />
        </NestedModalButton>
      </section>
      <section className="grid w-full gap-3 p-2 min-[480px]:grid-cols-2 min-[720px]:grid-cols-3 min-[1080px]:grid-cols-4">
        {siteBookmarkStore.siteBookmarkCategoryList?.map((i) => (
          <div
            key={i.id}
            className="w-full rounded-2xl p-1 shadow-md outline outline-1 outline-primary-80"
          >
            <div className="flex flex-col gap-[0.125rem] text-contrast-1">
              <h3 className="relative w-full rounded-t-2xl px-1 font-DNFBitBitv2 text-[1.5rem] default-flex">
                {i.name}
                <NestedModalButton
                  buttonClassName="absolute right-1 p-1 default-flex rounded-xl hover:bg-primary-60 hover:text-primary-contrast"
                  modal={<SiteBookmarkModal siteBookmarkCategoryId={i.id} />}
                >
                  <IoIosSettings size={24} />
                </NestedModalButton>
              </h3>
              <div className="h-1 w-full bg-primary-100">  </div>
              <div className="flex min-h-[15rem] w-full flex-col gap-1 rounded-b-2xl bg-default-1 px-2 py-1">
                {i.siteBookmarkList?.map((j) => (
                  <a
                    key={j.id}
                    target="_blank"
                    className="cursor-pointer rounded-2xl py-2 default-flex hover:bg-primary-80 hover:text-primary-contrast"
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
      {siteBookmarkStore.siteBookmarkCategoryList?.length == 0 && (
        <section className="h-full w-full flex-1 p-2 default-flex">
          <div className="h-full flex-col rounded-2xl p-2 text-xl shadow-2xl outline outline-primary-80 default-flex">
            <p> 아무런 카테고리가 존재하지 않습니다. </p>
            <p> 우측 상단에 아이콘을 클릭하여 추가해주세요. </p>
          </div>
        </section>
      )}
    </div>
  );
};
export default SiteBookmarkCategoryList;