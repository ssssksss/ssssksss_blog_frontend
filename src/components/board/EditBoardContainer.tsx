import { CC } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import dynamic from "next/dist/shared/lib/dynamic";
import styled from "@emotion/styled";
import Loading1 from "../common/loading/Loading1";
import BoardEditor from "./BoardEditor";
/**
 * Author : Sukyung Lee
 * FileName: EditBoardContainer.tsx
 * Date: 2022-09-23 23:39:04
 * Description :
 */

const Editor = dynamic(() => import("./BoardEditor"), {
  ssr: false,
  loading: () => <Loading1 />,
}) as any;

interface IEditBoardContainerProps {
  edit?: boolean;
}

const EditBoardContainer = (props: IEditBoardContainerProps) => {
  return <Container>{typeof window !== "undefined" && <Editor />}</Container>;
};
export default EditBoardContainer;
const Container = styled(CC.ColumnDiv)`
  padding-top: 40px;
  align-items: center;
`;
