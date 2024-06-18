<a href="https://blog.ssssksss.xyz/" target="_blanket"> 배포주소 : https://blog.ssssksss.xyz/ </a>

# [1] 설명

개인 블로그 사용 용도와 여러 개인 토이 프로젝트 용도로 제작

# [2] 스택

프론트 엔드 : Next.js, emotion, react-query, tailwindcss, redux-toookit => vercel로 배포 중

백엔드 : Spring Boot, Spring Security, Spring Data JPA(+navtive query) => oracle free tier에 war파일 수동 배포 중

DB 및 서버 : Oracle Free Tier에 centos7, nginx, tomcat, mysql 설치해서 운영 중, 이미지 서버만 aws s3 사용

# [3] 유저플로우, ERD

* 개인적으로 흐름이나 코드를 정리하려고 만든 유저플로우
* 

[피그마 참고](https://www.figma.com/design/9NC19XbZokgmjBqk7TOQFg/%EC%BD%94%EB%94%A9%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83%EC%9D%84-%EC%A0%95%EB%A6%AC%ED%95%98%EB%8A%94-%EA%B3%B5%EA%B0%84?node-id=974-948&t=8h7a5n3tzzjNdQ1v-0)

[ERD Cloud](https://www.erdcloud.com/d/GsKo8HnYFXHbrqJoQ)

![image](https://github.com/ssssksss/ssssksss_blog_frontend/assets/60907697/8514dd5c-f1bc-4149-8bdc-bff7783be9e4)

![image](https://github.com/ssssksss/ssssksss_blog_frontend/assets/60907697/0779caf4-3a09-4e34-83bb-3cd3983c4014)


# [4] 기능

## 공통

> theme을 통해 공통적인 색상을 적용
> 모바일에서도 볼 수 있도록 반응형 작업

## 블로그

![image](https://github.com/ssssksss/ssssksss_blog_frontend/assets/60907697/2bcf3af0-6fe0-4e3c-ab98-c0140367fcbc)

> CSR, ISR, lazy image upload, toastify, react-query, observer API, react-md-editor
> 2개의 카테고로 분류를 하여 블로그 글을 나누고 작업이나 공부 등 여러 정보들을 개인적으로 정리한 블로그
> 블로그를 만든 이유는 여러 개발 경험을 얻을 수 있을 것 같았고, SEO나 AI 등을 추가해서 블로그 글을 작성해주는 기능들을 추후에 추가할 수 있을 것 같아서 만들었고 개인적인 블로그를 가지고 있으면 디자인이나 스타일 등을 자유롭게 변경이 가능하여 만들기 시작하였다.

1. url을 이용하여 2개의 카테고리로 블로그 글들을 분류, CSR로 처리
2. 금 숨김 기능, 정렬 기능, 최근 본 블로그 기능
3. 블로그 검색 기능 => react-query infinite query 사용
4. 1,2번쨰 카테고리 CRUD, 블로그 CRUD 기능
5. 이미지 업로드는 createObjectURL을 이용하여 미리보기를 사용하고 추후에 업로드하는 방식
6. 카테고리 클릭시 뒤로가기 히스토리 추가, 클릭한 카테고리가 가로 스크롤 중간에 위치하도록 변경

## 게시판

![image](https://github.com/ssssksss/ssssksss_blog_frontend/assets/60907697/e2995f1b-bbdb-45fe-92c3-5be9ffea17da)

> pagenation
> 일반적인 기능만 대략적으로 만든 게시판

1. 페이지 네이션으로 게시판 목록을 볼 수 있도록 작업
2. 일반적인 게시판 기능과 유사하고 이미지 업로드나 댓글, 좋아요 기능들은 없다.

## 유튜브 플레이어

![image](https://github.com/ssssksss/ssssksss_blog_frontend/assets/60907697/5f3028d4-d6b3-4a60-97eb-139ddacf9881)


> react-playerm, google youtube API, localstorage
> 유튜브에 들어가지 않고도 원하는 노래를 실행할 수 있도록 기능을 추가하였다.
> 유튜브 링크만 바로 넣으면 작동은 되지만 어떤 노래인지 알 수 없어서 구글에서 API를 추가하여 정보를 받아오도록 하였다.

1. 유튜브 링크로 API를 불러와 정보를 DB에 보관하고 유튜브 리스트에서 선택시 로컬스토리지를 이용하여 유튜브 실행
