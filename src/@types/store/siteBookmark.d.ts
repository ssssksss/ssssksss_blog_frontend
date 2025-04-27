declare interface ISiteBookmarkCategory {
  id: number;
  name: string;
  siteBookmarkList: ISiteBookmark[];
}

declare interface ISiteBookmark {
  id: number;
  name: string;
  url: string;
}