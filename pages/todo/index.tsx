import styled from "@emotion/styled";
import BlogLayout from "@/components/layout/BlogLayout";
import { animationKeyFrames } from "../../styles/animationKeyFrames";
import { useState } from "react";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import Loading1 from "@/components/common/loading/Loading1";
/**
 * Author : Sukyung Lee
 * FileName: index.tsx
 * Date: 2022-10-15 21:48:12
 * Description :
 */
const TodoPage = () => {
  const [currentCategory, setCurrentCategory] = useState("all");
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Container>
        <Loading1 />
      </Container>
    );
  }

  return (
    <Container>
      <TodoCategoryBox>
        <TodoCategoryItem> 전체 </TodoCategoryItem>
        <TodoSettingCategoryItem> ⚙ </TodoSettingCategoryItem>
      </TodoCategoryBox>
      <TodoListBox>
        <TodoListItem>
          <TodoListItemTitle> 오늘 </TodoListItemTitle>
          <TodoItem>
            <input type="checkbox" />
            <span> 내용 </span>
          </TodoItem>
        </TodoListItem>
        <TodoListItem>
          <TodoListItemTitle> 오늘 </TodoListItemTitle>
          <TodoItem>
            <input type="checkbox" />
            <span> 내용 </span>
          </TodoItem>
        </TodoListItem>
        <TodoListItem>
          <TodoListItemTitle> 오늘 </TodoListItemTitle>
          <TodoItem>
            <input type="checkbox" />
            <span> 내용 </span>
          </TodoItem>
        </TodoListItem>
        <TodoListItem>
          <TodoListItemTitle> 오늘 </TodoListItemTitle>
          <TodoItem>
            <input type="checkbox" />
            <span> 내용 </span>
          </TodoItem>
        </TodoListItem>
        <TodoListItem>
          <TodoListItemTitle> 오늘 </TodoListItemTitle>
          <TodoItem>
            <input type="checkbox" />
            <span> 내용 </span>
          </TodoItem>
        </TodoListItem>
      </TodoListBox>
      <TodoFooterMenu>1</TodoFooterMenu>
    </Container>
  );
};
export default TodoPage;
TodoPage.layout = BlogLayout;
const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
`;
const TodoCategoryBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
  background: #f0e9df;
`;
const TodoCategoryItem = styled.div`
  min-width: 100px;
  height: 100%;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${theme.backgroundColors.purpleLight};
  font-size: 18px;
  color: #fefefe;
  font-weight: 600;
`;
const TodoSettingCategoryItem = styled.button`
  min-width: 60px;
  height: 100%;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25%;
  background: transparent;
  font-size: 2rem;
  background: white;
  &:hover {
    color: white;
    background: black;
    animation: ${animationKeyFrames.Fadein} 1s;
  }
`;
const TodoListBox = styled.div`
  max-height: calc(100% - 80px - 70px);
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
`;
const TodoListItem = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-flow: nowrap column;
  gap: 10px;
`;
const TodoListItemTitle = styled.div`
  padding: 10px 10px 10px 10px;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${theme.backgroundColors.blueDark};
`;
const TodoItem = styled.div`
  background: ${theme.backgroundColors.background3};
  height: 60px;
  margin: 0px 10px;
  border-radius: 1px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  gap: 8px;
`;
const TodoFooterMenu = styled.div`
  width: 100%;
  height: 70px;
  padding: 5px 0px;
  position: absolute;
  bottom: 0px;
  background: #aeaeae;
`;
