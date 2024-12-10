import Dropdown from "@component/common/dropdown/Dropdown";
import CustomEditor from "@component/common/editor/CustomEditor";
import Input from "@component/common/input/Input";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import { yupResolver } from "@hookform/resolvers/yup";
import useLoading from "@hooks/useLoading";
import useModalState from "@hooks/useModalState";
import { fetchMultipartRetry } from "@utils/api/fetchMultipartRetry";
import { Blog2CreateStructureContentYup } from "@utils/validation/BlogYup";
import { useEffect, useState } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import useToastifyStore from "src/store/toastifyStore";
import Blog2SubCreateUpdateHeader from "./Blog2SubCreateUpdateHeader";

interface IFormContext {
  directory: string;
  content: string;
  project: string;
}

interface IBlog2StructureContentCreateUpdateModal extends IModalComponent {
  edit?: boolean;
  item?: IBlog2StructureContent;
  updateBlog2StructureContent?: (data: IBlog2StructureContent) => void;
  addBlog2StructureContent?: (data: IBlog2StructureContent) => void;
}

const Blog2StructureContentCreateUpdateModal = (
  props: IBlog2StructureContentCreateUpdateModal,
) => {
  const toastifyStore = useToastifyStore();
  const [projectName, setProjectName] = useState("");
  const modalState = useModalState(props.edit ? true : false);
  const {loading, startLoading, stopLoading} = useLoading();
  const blog2ContentFormContext = useForm<IFormContext>({
    resolver: yupResolver(Blog2CreateStructureContentYup),
    mode: "onChange",
    defaultValues: {
      directory: props.edit ? props.item?.directory : "",
      content: props.edit ? props.item?.content : "",
      project: props.edit ? props.item?.project : "",
    },
  });
  const {errors} = blog2ContentFormContext.formState;
  const [projectList, setProjectList] = useState<
    {value: string; name: string}[]
  >([]);

  const blog2FormContext = useFormContext();
  const handleSubmitClick: SubmitHandler<any> = async (data) => {
    startLoading();

    // API 공통 작업
    const formData = new FormData();
    if (props.edit) {
      formData.append("id", props.item!.id + "");
    }
    formData.append(
      "directory",
      blog2ContentFormContext.getValues("directory"),
    );
    formData.append("content", blog2ContentFormContext.getValues("content"));
    formData.append("project", blog2ContentFormContext.getValues("project"));

 
    const response: Response = await fetchMultipartRetry({
      url: "/api/blog2/structure",
      method: props.edit ? "PUT" : "POST",
      formData: formData,
    });
    if (!response.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: props.edit
          ? "수정이 실패했습니다."
          : "결과 생성에 실패했습니다.",
      });
      stopLoading();
      return;
    }
    if (props.edit) {
      // 블로그 구조 수정 성공시
      const result: responseCreateUpdateBlog2StructureContent =
        await response.json();
      props.updateBlog2StructureContent!(result.data.blog2StructureContent);
    } else {
      // 블로그 구조 생성 성공시
      const result: responseCreateUpdateBlog2StructureContent =
           await response.json();
         props.addBlog2StructureContent!(result.data.blog2StructureContent);
    }
    stopLoading();
      props.closeModal!();

  };

  const onClickErrorSubmit: SubmitErrorHandler<any> = () => {
    alert("잘못 입력된 값이 존재합니다.");
  };

  const handleContentChange = (value: string) => {
    blog2ContentFormContext.setValue("content", value, {shouldValidate: true});
  };

  useEffect(() => {
    if (props.edit) {
      blog2ContentFormContext.setValue("directory", props.item!.directory);
      blog2ContentFormContext.setValue("content", props.item!.content);
      blog2ContentFormContext.setValue("project", props.item!.project);
      blog2ContentFormContext.watch();
    }
    const temp: string[] = [];
    blog2FormContext
      .getValues("blog2StructureList")
      .forEach((i: IBlog2Structure) => {
        temp.push(i.blog2StructureContent.project);
      });
    setProjectList(
      [...new Set(temp)].map((i) => {
        return {
          value: i,
          name: i,
        };
      }),
    );
  }, []);

  return (
    <ModalTemplate
      className={
        "grid h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] grid-rows-[3rem_auto]"
      }
    >
      {props.closeButtonComponent}
      <LoadingSpinner loading={loading} />
      <Blog2SubCreateUpdateHeader
        type={"structure"}
        saveHandler={blog2ContentFormContext.handleSubmit(
          handleSubmitClick,
          onClickErrorSubmit,
        )}
        saveDisabled={!blog2ContentFormContext.formState.isValid}
        edit={props.edit ?? false}
        modalState={modalState}
      />
      {!modalState.isOpen && (
        <div className="absolute left-[1rem] top-[8rem] flex w-[calc(100%-2rem)] grid-rows-3 flex-col gap-y-2 bg-white-100 p-4 default-outline">
          <div className={"grid w-full grid-cols-2"}>
            <Input
              type={"text"}
              // register={blog2ContentFormContext.register("project")}
              className={
                "flex h-[3rem] min-h-12 w-full items-center px-2 default-outline"
              }
              placeholder="프로젝트명 스네이크케이스를 이용해서 표기"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                blog2ContentFormContext.setValue("project", e.target.value, {
                  shouldValidate: true,
                });
              }}
            />
            <Dropdown
              options={projectList}
              value=""
              defaultValue=""
              containerClassName={"min-h-12 bg-white-80"}
              dropdownHandler={(value) => {
                setProjectName(value);
                blog2ContentFormContext.setValue("project", value, {
                  shouldValidate: true,
                });
              }}
            />
          </div>
          <Input
            type={"text"}
            register={blog2ContentFormContext.register("directory")}
            className={
              "flex h-[3rem] min-h-12 items-center px-2 default-outline"
            }
            placeholder="경로의 시작은 /로 시작하지 않습니다. ex) src/..."
          />
        </div>
      )}
      <CustomEditor
        defaultValue={props.edit ? props.item!.content : "```js\n\n```"}
        handleContentChange={handleContentChange}
      />
    </ModalTemplate>
  );
};
export default Blog2StructureContentCreateUpdateModal;
