import { useReducer, useRef, useState } from 'react';
import Button from 'src/component/common/button/hybrid/Button';

interface YoutubeLink {
  id: string;
  youtubeUrl: string;
  imageUrl: string;
  title: string;
  tags: string;
}

const YoutubePlayerModal: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // const createYoutubeLinkMutation = YoutubeAPI.createYoutubeLink({
  //   onSuccessHandler: () => {
  //     setLoading(false);
  //   },
  // });
  // const getYoutubeLinkListResData = YoutubeAPI.getYoutubeLinkList();
  // const deleteYoutubeLinkMutation = YoutubeAPI.deleteYoutubeLink();

  const [, toggleHandler] = useReducer((prev: boolean) => !prev, true);

  const addYoutubeLinkHandler = async (): Promise<void> => {
    // if (inputRef.current) {
    //   createYoutubeLinkMutation({
    //     youtubeUrlKeyId: UrlQueryStringToObject(inputRef.current.value)?.v,
    //     youtubeUrl: inputRef.current.value,
    //   });
    // }
  };

  const copyLinkHandler = (youtubeUrl: string): void => {
    navigator.clipboard.writeText(youtubeUrl);
    // store.dispatch(
    //   SET_TOASTIFY_MESSAGE({
    //     type: 'success',
    //     message: `복사되었습니다.`,
    //   }),
    // );
  };

  const deleteLinkHandler = (id: string): void => {
    // deleteYoutubeLinkMutation({
    //   id: id,
    // });
  };

  const selectYoutubeLinkHandler = (data: YoutubeLink): void => {
    // if (store.getState().reactPlayerStore.youtubeTitle == data.title) {
    //   store.dispatch(
    //     rootActions.reactPlayerStore.setYoutubePlay(
    //       !store.getState().reactPlayerStore.youtubePlay,
    //     ),
    //   );
    //   return;
    // }
    // window.localStorage.setItem('youtubeLink', data.youtubeUrl);
    // window.localStorage.setItem('youtubeTitle', data.title);
    // toggleHandler();
    // store.dispatch(rootActions.reactPlayerStore.setYoutubeTitle(data.title));
    // store.dispatch(rootActions.reactPlayerStore.setYoutubePlay(true));
    // store.dispatch(
    //   SET_TOASTIFY_MESSAGE({
    //     type: 'success',
    //     message: `선택되었습니다.`,
    //   }),
    // );
  };

  return (
    <section className="flex flex-col gap-2 w-full">
      <article className="flex flex-col gap-2 px-2">
        <div className="flex gap-2.5">
          <h2 className="h-12 flex items-center text-gray-800 mb-6 text-lg font-bold border-b border-gray-300">
            
            Add YouTube Links
          </h2>
        </div>
        <label
          htmlFor={'youtube-link'}
          className="flex justify-start font-semibold"
        >
          YouTube Link
        </label>
        {/* <Input
          id={'youtube-link'}
          placeholder={'Enter YouTube link'}
          onKeyPressAction={addYoutubeLinkHandler}
          ref={inputRef as MutableRefObject<HTMLInputElement>}
          className="py-3 px-1 rounded border-2 border-gray-300 placeholder-gray-400"
        /> */}
        <span className="text-xs text-gray-500 text-left">
          
          Add a YouTube video link here
        </span>
        <Button
          className="w-full bg-gray-800 text-gray-200 h-14"
          onClick={() => {
            setLoading(true);
            addYoutubeLinkHandler();
          }}
        >
          {loading ? (
            <div className="w-6 aspect-square">
              스피너
            </div>
          ) : (
            'Add Link'
          )}
        </Button>
      </article>
      <ul className="min-h-48 w-full border border-primary-500 overflow-hidden">
        {/* {getYoutubeLinkListResData.isLoading ||
          getYoutubeLinkListResData.data?.data?.youtubeList.map(
            (i: YoutubeLink, index: number) => (
              <li
                key={index}
                onClick={() => selectYoutubeLinkHandler(i)}
                className={`h-24 border-b border-gray-200 grid grid-cols-[3.6rem_calc(100%-12.5rem)_3.6rem_3.6rem] px-1 gap-1 items-center w-full hover:bg-primary-200 hover:cursor-pointer hover:text-contrast ${
                  i.youtubeUrl == window.localStorage.getItem('youtubeLink')
                    ? 'bg-primary-200 text-contrast'
                    : ''
                }`}
              >
                <div className="w-20 aspect-square">
                  <img src={i.imageUrl} alt="" />
                </div>
                <div className="flex flex-col justify-start items-start max-w-full overflow-hidden text-ellipsis px-1 border-r border-gray-300">
                  <p className="font-extrabold px-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    
                    {`${i.title}`}
                  </p>
                  <div className="flex text-gray-500 gap-1">
                    {JSON.parse(i.tags)?.map((j: string, index1: number) => (
                      <span
                        key={index1}
                        className="outline outline-1 outline-black-200 rounded-lg p-1"
                      >
                        
                        {j}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className="flex justify-center items-center p-1 rounded-lg bg-gray-300 hover:bg-primary-200 hover:outline hover:outline-2 hover:outline-contrast"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    copyLinkHandler(i.youtubeUrl);
                  }}
                >
                  <Image src={Icons.CopyIcon} width={39} height={39} alt="" />
                </button>
                <ConfirmButton
                  className="p-1 rounded-lg bg-red-500"
                  onClick={(e: React.MouseEvent) => {
                    deleteLinkHandler(i.id);
                    e.stopPropagation();
                  }}
                >
                  <Image src={Icons.DeleteIcon} width={39} height={39} alt="" />
                </ConfirmButton>
              </li>
            ),
          )} */}
      </ul>
    </section>
  );
};

export default YoutubePlayerModal;
