import Button from "@component/common/button/hybrid/Button";
import Dropdown from "@component/common/dropdown/Dropdown";
import CustomEditor from "@component/common/editor/CustomEditor";
import Input from "@component/common/input/Input";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import {yupResolver} from "@hookform/resolvers/yup";
import {Blog2CreateStructureContentYup} from "@utils/validation/BlogYup";
import {useEffect, useState} from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import useToastifyStore from "src/store/toastifyStore";

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
  const [loading, setIsLoading] = useState(false);
  const toastifyStore = useToastifyStore();
  const [projectName, setProjectName] = useState("");
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
    setIsLoading(true);

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

    // 블로그 수정 API
    if (props.edit) {
      const response = await fetch("/api/blog2/structure", {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) {
        toastifyStore.setToastify({
          type: "error",
          message: "수정이 실패했습니다.",
        });
        return;
      }
      const result: responseCreateUpdateBlog2StructureContent =
        await response.json();
      props.updateBlog2StructureContent!(result.data.blog2StructureContent);
      props.closeModal!();
    }

    // 블로그 생성 API
    if (!props.edit) {
      const response = await fetch("/api/blog2/structure", {
        method: "POSt",
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        toastifyStore.setToastify({
          type: "error",
          message: data.msg || "생성에 실패했습니다.",
        });
        return;
      }
      const result: responseCreateUpdateBlog2StructureContent =
        await response.json();
      props.addBlog2StructureContent!(result.data.blog2StructureContent);
      props.closeModal!();
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
    <ModalTemplate className={"w-[calc(100vw-1rem)]"}>
      {props.closeButtonComponent}
      <div className="grid h-screen max-h-[calc(100vh-1rem)] w-[calc(100%-2rem)] grid-rows-[3rem_3rem_3rem_1fr_3rem] gap-y-4 p-8">
        <h2
          className={
            "max-w-[576px]:text-[2rem] min-w-[576px]:text-[3rem] w-full font-bold default-flex"
          }>
          블로그 구조 글 {props.edit ? "수정" : "생성"}
        </h2>
        <div className={"grid w-full grid-cols-2"}>
          <Input
            type={"text"}
            // register={blog2ContentFormContext.register("project")}
            className={"flex h-[3rem] w-full items-center px-2 default-outline"}
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
          className={"flex h-[3rem] items-center px-2 default-outline"}
          placeholder="경로의 시작은 /로 시작하지 않습니다. ex) src/..."
        />
        <CustomEditor
          defaultValue={props.edit ? props.item!.content : "```js\n\n```"}
          handleContentChange={handleContentChange}
        />
        <div className={"mt-auto flex h-[3rem] w-full gap-x-2"}>
          <Button
            onClick={blog2ContentFormContext.handleSubmit(
              handleSubmitClick,
              onClickErrorSubmit,
            )}
            disabled={!blog2ContentFormContext.formState.isValid}
            className={
              "h-[3rem] w-full bg-primary-60 text-white-80 default-outline default-flex hover:bg-primary-20 disabled:bg-gray-80"
            }>
            {props.edit ? "수정" : "생성"}
          </Button>
          <Button
            onClick={() => props.closeModal && props.closeModal()}
            className={
              "h-[3rem] w-full default-outline default-flex hover:bg-red-20"
            }>
            취소
          </Button>
          {/* <span> {errors.변수?.message} </span> */}
        </div>
      </div>
    </ModalTemplate>
  );
};
export default Blog2StructureContentCreateUpdateModal;
