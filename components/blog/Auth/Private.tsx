import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import styled from "styled-components";

type Props = {
  state?: string;
  children: JSX.Element[] | JSX.Element;
};

const Private = ({ state, children }: Props) => {
  const authStore = useSelector((state: RootState) => state.authStore);

  return (
    <Container>
      {authStore.role === "" && state === "" && <div> {children} </div>}
      {authStore.role !== "" && state === "logout" && <div> {children} </div>}
      {authStore.role === "master" && state === "master" && (
        <div> {children} </div>
      )}
    </Container>
  );
};

const Container = styled.div``;

export default Private;
