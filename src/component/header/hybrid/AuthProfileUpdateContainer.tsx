import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import Input from "@component/common/input/Input";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { useDragAndDropBlob } from "@hooks/useDragAndDropBlob";
import useFetchCSR from "@hooks/useFetchCSR";
import useToastifyStore from "@store/toastifyStore";
import useUserStore from "@store/userStore";
import { waitForImage } from "@utils/editor/CheckImageUrl";
import { AWSS3Prefix } from "@utils/variables/s3url";
import Image from "next/image";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";

interface IAuthProfileUpdateContainer extends IModalComponent {

}
const AuthProfileUpdateContainer = (props: IAuthProfileUpdateContainer) => {
  const userStore = useUserStore();
  const fetchCSR = useFetchCSR();
  const toastifyStore = useToastifyStore();
  const [imagePath, setImagePath] = useState<string>("");

  const fakeImageUpload = async ({file, url}: {file: File; url: string}) => {
    const MAX_SIZE = 4.8 * 1024 * 1024; // 4.8MB
    if (file.size > MAX_SIZE) {
      toastifyStore.setToastify({
        type: "error",
        message: "이미지 용량은 최대 4.8MB까지 업로드할 수 있습니다.",
        duration: 3000,
      });
      setImagePath("");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("directory", "user/profile");

    await fetchCSR.requestWithHandler({
      url: "/api/image",
      method: "POST",
      formData: formData,
      showLoading: false,
      handleSuccess: async (result) => {
        toastifyStore.setToastify({
          message: "이미지를 변환중입니다. 최대 30초까지 걸릴 수 있습니다.",
          duration: 5000,
        });

        // 업로드 성공: 이미지 URL을 실제 S3 경로로 교체
        const uploadedUrl = `${result}`;
        const isImageReady = await waitForImage(
          `${AWSS3Prefix}${uploadedUrl}`,
        ); // 15초동안 1초마다 이미지 URL이 유효한지 확인하는 함수

        if (!isImageReady) {
          setImagePath("");
          toastifyStore.setToastify({
            type: "error",
            message: "이미지를 변환에 실패했습니다.",
            duration: 2000,
          });
          return;
        }

        toastifyStore.setToastify({
          message: "이미지를 변환이 완료되었습니다.",
          duration: 2000,
        });

        setImagePath(`${uploadedUrl}`);  
      },
      handleFail: () => {
        setImagePath("");
        return;  
      }
    });


  };

  const updateUserProfileImage = async() => {
    await fetchCSR.requestWithHandler({
      url: "/api/user/profile",
      method: "PUT",
      body: {
        profileImagePath: imagePath
      },
      handleSuccess: () => {
        userStore.setUser({
          profileImagePath: imagePath,
        });
        props.closeModal!();
      }
    });
  };
  
  const {isDragging, onDragEnter, onDragLeave, onDragOver, onDropOrInputEvent} =
    useDragAndDropBlob({ fakeImageUpload });

  return (
    <ModalTemplate style={{width: "calc(100vw - 8px)"}} className="max-w-[37.5rem]">
      {props.closeButtonComponent}
      {/* 프로필 이미지 */}
      <div className="flex w-full flex-col items-center gap-4 p-4">
        {/* 닉네임 & 이메일 */}
        <div className="text-center">
          <div className="text-lg font-semibold">{userStore.nickname}</div>
          <div className="text-sm text-gray-500">{userStore.email}</div>
        </div>

        {/* 닉네임/이메일 편집 버튼 */}
        <label
          className={`relative h-[16rem] w-full cursor-pointer primary-border-radius ${isDragging && "bg-primary-20"}`}
          htmlFor={"imageUpload1"}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDropOrInputEvent}
        >
          {imagePath ? (
            <Image
              src={`${AWSS3Prefix}${imagePath}`}
              alt="image"
              layout="fill"
              className="rounded-[1rem] object-contain" // object-cover vs object-contain
            />
          ) : (
            <div className="h-full w-full flex-col default-flex">
              <CiImageOn size={72} />
              <span> 클릭하거나 이미지를 넣으세요. </span>
            </div>
          )}
        </label>
        <Input
          id="imageUpload1"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onDropOrInputEvent}
        />
        <ThemeActiveButton1
          onClick={updateUserProfileImage}
          isActive={imagePath != "" && userStore.profileImagePath != imagePath}
          className="h-[3rem] w-full"
        >
          프로필 이미지 수정
        </ThemeActiveButton1>
      </div>
    </ModalTemplate>
  );
};
export default AuthProfileUpdateContainer;