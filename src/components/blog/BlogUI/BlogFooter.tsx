import Profile from "@/components/common/profile/Profile";
import { CF } from "@/styles/commonComponentStyle";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const siteList1 = [
  ["/img/stackIcon/github.svg", "github1", "https://github.com/ssssksss"],
  ["/img/stackIcon/github.svg", "github2", "https://github.com/ssssksss1"],
  [
    "/img/stackIcon/notion.svg",
    "notion",
    "https://www.notion.so/1e30249dcdf741398637235d6d251552",
  ],
  [
    "/img/stackIcon/ERDCloud.png",
    "ERD",
    "https://www.erdcloud.com/d/GsKo8HnYFXHbrqJoQ",
  ],
  [
    "/img/stackIcon/figma.svg",
    "figma",
    "https://www.figma.com/file/9NC19XbZokgmjBqk7TOQFg/%EC%BD%94%EB%94%A9%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83%EC%9D%84-%EC%A0%95%EB%A6%AC%ED%95%98%EB%8A%94-%EA%B3%B5%EA%B0%84?node-id=1%3A24",
  ],
];
const siteList2 = [
  [
    "/img/stackIcon/baekjoon_icon.svg",
    "백준",
    "https://www.acmicpc.net/user/ssssksss",
  ],
  ["/img/gif/토토로왼쪽으로걸어감.gif", "temp", ""],
  ["/img/gif/토토로왼쪽으로걸어감.gif", "temp", ""],
  ["/img/gif/토토로왼쪽으로걸어감.gif", "temp", ""],
  ["/img/gif/토토로왼쪽으로걸어감.gif", "temp", ""],
];

const BlogFooter = () => {
  const router = useRouter();
  return (
    <Footer>
      <Container>
        <Div1>
          <Profile
            imageUrl={"/img/gif/토토로왼쪽으로걸어감.gif"}
            size={"160px"}
            imgBackgroundColor={"#1a1a1a"}
            borderRadius={"50%"}
            name={"가출한 토토로의 블로그"}
            gap={"20px"}
          />
        </Div1>
        <Div2>
          <CF.RowBetweenDiv gap={20}>
            {siteList1.map((el: any, index: number) => (
              <Profile
                key={index}
                imageUrl={el[0]}
                size={"60px"}
                imgBackgroundColor={"white"}
                borderRadius={"50%"}
                name={el[1]}
                gap={"10px"}
                onClick={() => router.push(el[2])}
              />
            ))}
          </CF.RowBetweenDiv>
          <CF.RowBetweenDiv gap={20}>
            {siteList2.map((el: any, index: number) => (
              <Profile
                key={index}
                imageUrl={el[0]}
                size={"60px"}
                imgBackgroundColor={"white"}
                borderRadius={"50%"}
                name={el[1]}
                gap={"10px"}
                onClick={() => router.push(el[2])}
                noCursor={el[2] ? false : true}
              />
            ))}
          </CF.RowBetweenDiv>
        </Div2>
        <Div3>
          <div> Contact Me </div>
          <div> email : ssssksss@naver.com </div>
          <div> name: SuKyung Lee </div>
        </Div3>
      </Container>
      <Copyright>
        © 2021-2022 Creative 가출한토토로 - All rights reserved.
      </Copyright>
    </Footer>
  );
};

export default BlogFooter;

const Footer = styled.footer``;
const Container = styled.div`
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  height: 300px;
  background: black;
  margin: auto;
  padding: 40px 20px 20px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  color: white;
`;
const Copyright = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0px;
  background-color: #e0e0e0;
`;

const Div1 = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
`;

const Div2 = styled(CF.ColumnDiv)`
  gap: 20px;
  padding: 0px 10px;
`;

const Div3 = styled(CF.ColumnCenterDiv)`
  max-width: 300px;
  min-width: 220px;
  width: 100%;
  height: 100%;
  gap: 10px;
  border: white solid 1px;

  & > div:nth-child(1) {
    font-variant: small-caps;
    font-size: 30px;
    padding-bottom: 20px;
  }

  & > div:nth-child(2) {
  }

  & > div:nth-child(3) {
  }
`;
