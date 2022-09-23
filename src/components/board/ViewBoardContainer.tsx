import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect } from "react";
import AxiosInstance from "@/utils/axios/AxiosInstance";
/**
 * Author : Sukyung Lee
 * FileName: ViewBoardContainer.tsx
 * Date: 2022-09-23 23:39:04
 * Description :
 */
const ViewBoardContainer = () => {
  const router = useRouter();
  useEffect(() => {
    AxiosInstance({
      url: "/api/board",
      method: "GET",
      params: {
        id: router.query.boardNumber,
      },
    })
      .then((response) => {
        console.log("ViewBoardContainer.tsx : ", response.data);
      })
      .catch((error) => {
        alert("문제가 발생했습니다.");
        router.back();
      });
  }, []);

  return (
    <Container>
      <div> </div>
    </Container>
  );
};
export default ViewBoardContainer;
const Container = styled.div`
  width: 100%;
`;
