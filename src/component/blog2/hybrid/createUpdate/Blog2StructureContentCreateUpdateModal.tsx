import Dropdown from "@component/common/dropdown/Dropdown";
import CustomEditor from "@component/common/editor/CustomEditor";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
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
import Blog2SubCreateUpdateHeaderView from "../../view/Blog2SubCreateUpdateHeaderView";

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
  const [projectName, setProjectName] = useState("");
  const modalState = useModalState(props.edit ? true : false);
  const blog2ContentFormContext = useForm<IFormContext>({
    resolver: yupResolver(Blog2CreateStructureContentYup),
    mode: "onChange",
    defaultValues: {
      directory: props.edit ? props.item?.directory : "",
      content: props.edit ? props.item?.content : "",
      project: props.edit ? props.item?.project : "",
    },
  });
  const [projectList, setProjectList] = useState<
    {value: string; name: string}[]
  >([]);

  const blog2FormContext = useFormContext();
  const handleSubmitClick: SubmitHandler<any> = async (data) => {

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
      return {
        type: "error",
        message: props.edit ? "수정 실패" : "생성 실패",
      };
    }
    if (props.edit) {
      // 블로그 구조 수정 성공시
      const result: responseCreateUpdateBlog2StructureContent =
      await response.json();
      props.updateBlog2StructureContent!(result.data.blog2StructureContent);
      props.closeModal!();
      return {
        message: result.msg,
      };
    } else {
      // 블로그 구조 생성 성공시
      const result: responseCreateUpdateBlog2StructureContent =
      await response.json();
      props.addBlog2StructureContent!(result.data.blog2StructureContent);
      props.closeModal!();
      return {
        message: result.msg,
      };
    }

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
      <Blog2SubCreateUpdateHeaderView
        type={"structure"}
        saveHandler={() =>
          props.loadingWithHandler(
            blog2ContentFormContext.handleSubmit(
              handleSubmitClick,
              onClickErrorSubmit,
            ),
          )
        }
        saveDisabled={!blog2ContentFormContext.formState.isValid}
        edit={props.edit ?? false}
        modalState={modalState}
      />
      {!modalState.isOpen && (
        <div className="absolute left-[1rem] top-[7.325rem] z-10 flex w-[calc(100%-2rem)] flex-col gap-y-2 bg-default-1 p-4 primary-border">
          <div
            className={`grid w-full ${projectList?.length > 0 ? "grid-cols-2" : "grid-cols-1"}`}
          >
            <ThemeInput1
              type={"text"}
              // register={blog2ContentFormContext.register("project")}
              className={"flex h-[3rem] min-h-12 w-full items-center px-2"}
              placeholder="프로젝트명 스네이크케이스(_)를 이용해서 표기"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                blog2ContentFormContext.setValue("project", e.target.value, {
                  shouldValidate: true,
                });
              }}
            />
            {projectList?.length > 0 && (
              <Dropdown
                options={projectList}
                value={projectList.filter(i=> i.name == projectName).length > 0 ? projectName : ""}
                defaultValue=""
                containerClassName={"min-h-12 bg-default-1 "}
                dropdownHandler={(value) => {
                  setProjectName(value);
                  blog2ContentFormContext.setValue("project", value, {
                    shouldValidate: true,
                  });
                }}
              />
            )}
          </div>
          <ThemeInput1
            type={"text"}
            register={blog2ContentFormContext.register("directory")}
            className={
              "flex h-[3rem] min-h-12 items-center px-2"
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
