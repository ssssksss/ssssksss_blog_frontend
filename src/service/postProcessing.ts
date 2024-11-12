import {useToastifyStoreType} from "src/store/toastifyStore";

interface IPostProcessing {
  toastifyStore: useToastifyStoreType;
  response: {
    statusCode: number;
    message: string;
  };
}
const postProcessing = (props: IPostProcessing) => {
  if (props.response.statusCode == 200) {
    props.toastifyStore.setToastify({
      type: "success",
      message: props.response.message,
    });
  }
  if (props.response.statusCode >= 400) {
    props.toastifyStore.setToastify({
      type: "error",
      message: props.response.message,
    });
  }
  return props;
};
export default postProcessing;
