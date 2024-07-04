import PrivateProjectAuth from "../private-project-auth";
import PrivateProjectBlog from "../private-project-blog";
import PrivateProjectBoard from "../private-project-board";
import PrivateProjectHeader from "../private-project-header";
import PrivateProjectMemo from "../private-project-memo";
import PrivateProjectSchedule from "../private-project-schedule";
import PrivateProjectSetting from "../private-project-setting";
import PrivateProjectYoutubePlayer from "../private-project-youtube-player";

const PrivateProjectModal = () => {
  return (
    <div
      className={
        'w-full h-full text-black p-[2rem] bg-[#f0f0f0] flex flex-col place-items-start gap-[1rem]'
      }
      onClick={(e) => e.stopPropagation()}
    >
      <PrivateProjectHeader />
      <PrivateProjectAuth />
      <PrivateProjectBlog />
      <PrivateProjectMemo />
      <PrivateProjectSchedule />
      <PrivateProjectYoutubePlayer />
      <PrivateProjectBoard />
      <PrivateProjectSetting />
    </div>
  );
};
export default PrivateProjectModal;
