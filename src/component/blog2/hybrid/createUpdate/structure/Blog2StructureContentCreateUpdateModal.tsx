import Blog2SubCreateUpdateHeaderView from "@component/blog2/view/common/Blog2SubCreateUpdateHeader";
import Dropdown from "@component/common/dropdown/Dropdown";
import CustomEditor from "@component/common/editor/CustomEditor";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetchCSR from "@hooks/useFetchCSR";
import useModalState from "@hooks/useModalState";
import { Blog2CreateStructureContentYup } from "@utils/validation/BlogYup";
import { useEffect, useState } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

interface IFormContext {
  directory: string;
  content: string;
  project: string;
  version: string;
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
  const fetchCSR = useFetchCSR();
  const [projectName, setProjectName] = useState(props.item?.project || "");
  const modalState = useModalState(props.edit ? true : false);
  const blog2ContentFormContext = useForm<IFormContext>({
    resolver: yupResolver(Blog2CreateStructureContentYup),
    mode: "onChange",
    defaultValues: {
      directory: props.edit ? props.item?.directory : "",
      content: props.edit ? props.item?.content : "",
      project: props.edit ? props.item?.project : "",
      version: props.edit ? props.item?.version : "",
    },
  });
  const [projectList, setProjectList] = useState<
    {value: string; name: string}[]
  >([]);

  const blog2FormContext = useFormContext();
  const handleSubmitClick: SubmitHandler<any> = async (data) => {
    // API 공통 작업
    await fetchCSR.requestWithHandler({
      url: props.edit
        ? `/api/blog2/structure?id=${props.item!.id}`
        : "/api/blog2/structure",
      method: props.edit ? "PUT" : "POST",
      body: {
        directory: blog2ContentFormContext.getValues("directory"),
        content: blog2ContentFormContext.getValues("content"),
        project: blog2ContentFormContext.getValues("project"),
        version: blog2ContentFormContext.getValues("version"),
      },
      showSuccessToast: true,
      successMessage: props.edit ? "구조글 수정에 성공" : "구조글 생성에 성공",
      handleSuccess: (result: IBlog2StructureContent) => {
        if (props.edit) {
          // 블로그 구조 수정 성공시
          props.updateBlog2StructureContent!(result);
          props.closeModalAfterSuccess!();
        } else {
          // 블로그 구조 생성 성공시
          props.addBlog2StructureContent!(result);
          props.closeModalAfterSuccess!();
        }
      },
      handleFail: () => {
        return;
      },
    });
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
      blog2ContentFormContext.setValue("version", props.item!.version);
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
        saveHandler={async () => {
          blog2ContentFormContext.handleSubmit(
            handleSubmitClick,
            onClickErrorSubmit,
          )();
        }
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
              className={"flex h-[3rem] min-h-12 w-full items-center px-2"}
              placeholder="프로젝트명을 입력하세요."
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
                value={
                  projectList.filter((i) => i.name == projectName).length > 0
                    ? projectName
                    : ""
                }
                placeholder="프로젝트명"
                defaultValue={""}
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
            className={"flex h-[3rem] min-h-12 items-center px-2"}
            placeholder="경로 입력 ex) src/..."
          />
          <ThemeInput1
            type={"text"}
            register={blog2ContentFormContext.register("version")}
            className={"flex h-[3rem] min-h-12 items-center px-2"}
            placeholder="version 입력, 입력하지 않을 경우 최신 버전으로 처리"
          />
          <div className="text-xs"> 📌 버전과 경로가 동일한 경우 덮어쓰기가 됩니다. </div>
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
