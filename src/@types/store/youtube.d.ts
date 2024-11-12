declare interface YoutubeLink {
  id: string;
  youtubeUrl: string;
  imageUrl: string;
  title: string;
  tags: string;
}

declare interface createYoutubePlaylistResponse {
  msg: string;
  statusCode: number;
  data: YoutubePlaylist;
}

declare interface IYoutubePlaylist {
  id: number;
  title: string;
  youtubeList: IYoutube[];
}

declare interface getYoutubePlaylistResponse {
  msg: string;
  statusCode: number;
  data: YoutubePlaylist[];
}

// ===========================================

declare interface createYoutubeUrlResponse {
  msg: string;
  statusCode: number;
  data: {
    youtube: youtubeUrl;
  };
}

declare interface IYoutube {
  id: number;
  imageUrl: string;
  tags: string;
  title: string;
  youtubeUrl: string;
}
