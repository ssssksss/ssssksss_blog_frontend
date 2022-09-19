import styled from "styled-components";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { CF } from "@/styles/commonComponentStyle";
import Button from "@/components/common/button/Button";

/**
 * Author : Sukyung Lee
 * FileName: PostDeleteListContainer.tsx
 * Date: 2022-09-19 14:28:54
 * Description :
 */
const PostDeleteListContainer = () => {
  const [deletePostList, setDeletePostList] = useState([]);

  useEffect(() => {
    AxiosInstance({
      url: "/api/delete/posts",
      method: "GET",
    })
      .then((response) => {
        setDeletePostList(response.data.data.posts);
      })
      .catch((error) => {
        // console.log(error.response);
      });
  }, []);

  const deleteHandler = (id: number) => {
    AxiosInstance({
      url: "/api/remove/post",
      method: "DELETE",
      data: id,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // console.log(error.response);
      });
  };

  return (
    <Container>
      {deletePostList?.map((el: any, index: number) => (
        <CF.RowBetweenDiv key={index} gap={10}>
          <div> {el.id} </div>
          <div> {el.title} </div>
          <Button size={"40px"} onClick={() => deleteHandler(el.id)}>
            삭제
          </Button>
        </CF.RowBetweenDiv>
      ))}
    </Container>
  );
};
export default PostDeleteListContainer;
const Container = styled(CF.ColumnDiv)`
  width: 100%;
  gap: 10px;
`;
