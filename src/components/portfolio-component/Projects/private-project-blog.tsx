import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import tw from "twin.macro";
/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file private-project-blog.tsx
 * @version 0.0.1 "2024-06-30 13:10:58"
 * @description 설명 
 */
const PrivateProjectBlog = () => {

  const imageList = [
    [
      'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/blog/blog-flow.png',
      `흐름도`,
    ],
    [
      'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/blog/blog-first-category-crud.png',
      '1번째 카테고리 CRUD',
    ],
    [
      'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/blog/blog-second-category-crud.png',
      '2번째 카테고리 CRUD',
    ],
    [
      'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/blog/blog-read-blogList.png',
      '블로그 리스트 조회',
    ],
    [
      'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/blog/blog-search.png',
      '블로그 검색',
    ],
    [
      'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/blog/blog-read.png',
      '블로그 조회',
    ],
    [
      'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/blog/blog-create.png',
      '블로그 생성',
    ],
    [
      'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/blog/blog-update.png',
      '블로그 수정',
    ],
  ];

  return (
    <section
      className={
        'flex flex-col items-start w-full gap-[1rem] bg-[#f0f0f0] p-[1rem] rounded-2xl'
      }
    >
      <H2> 블로그 </H2>
      <Article>
        <div className="justify-start flex font-bold text-[1.6rem]">설명</div>
        <span className="justify-start flex text-[1rem] font-semibold">
          개발 및 여러 공부 및 지식 등을 기록하는 블로그
        </span>
      </Article>
      <Article>
        <div className="justify-start items-start h-full flex flex-col font-bold text-[1.6rem]">
          <span className={'text-blue-600'}> 프론트 </span>
          <span className={'px-[2rem]'}> {' & '} </span>
          <span className={'text-red-600'}> 백엔드 </span>
        </div>
        <ul className="flex flex-col gap-[.5rem] items-start">
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start text-blue-600 font-bold text-lg'
            }
          >
            블로그 글, 블로그 카테고리 1,2차 CRUD
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start text-blue-600 font-bold text-lg'
            }
          >
            createObjectURL을 이용한 이미지 업로드
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start text-blue-600 font-bold text-lg'
            }
          >
            react-query + intersection observer API를 이용하여 무한 스크롤
            검색기능
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start text-blue-600 font-bold text-lg'
            }
          >
            local storage로 최근 본 블로그 조회
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start text-blue-600 font-bold text-lg'
            }
          >
            블로그 글은 Nextjs ODR 방식을 사용
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start text-blue-600 font-bold text-lg'
            }
          >
            블로그 글 HIDE, DEVELOP, PUBLIC으로 구분해서 숨김 및 보이기 기능
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start text-red-600 font-bold text-lg'
            }
          >
            연관관계를 이용해서 블로그 카테고리나 블로그 삭제 시 하위 이미지 및
            데이터까지 전부 삭제 처리
          </li>
        </ul>
      </Article>
      <Article>
        <div className="justify-start items-start h-full flex flex-col font-bold text-[1.6rem]">
          <span className={'text-purple-400'}> 세부 </span>
          <span className={'text-purple-400'}> 설명 </span>
          <span className={'px-[1rem]'}> {' & '} </span>
          <span className={'text-red-600'}> 문제 </span>
          <span className={'px-[1rem]'}> {' & '} </span>
          <span className={'text-blue-600'}> 해결 </span>
          <span className={'px-[1rem]'}> {' & '} </span>
          <span className={'text-green-600'}> 개발 </span>
          <span className={'text-green-600'}> 계획 </span>
        </div>
        <ul className="flex flex-col gap-[.5rem] items-start">
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-purple-400 text-lg font-semibold'}>
              여러개의 카테고리로 분류해서 세밀하게 블로그 글 작성이 가능하다.
            </p>
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-red-600 text-lg font-semibold'}>
              블로그 카테고리를 1,2차 분류하게 되면서 카테고리가 변경이 되었을
              때 항목이 없거나 하는 경우 에러 등이 많이 발생
            </p>
            <br />
            <p className={'text-blue-600 text-lg font-semibold'}>
              Object.entries를 이용하면 키값을 불러 사용하면 편할줄 알았지만
              문제점이 많아져 다시 배열방식으로 변경을 하고 복잡한 로직을
              피그마에서 흐름을 정리하여 프론트부터 백엔드까지 차근차근 정리를
              하였고 다시 csr 방식으로 변경하여 url 변경에 따라서 상태를
              변경하여 렌더링 작업을 하였다.
            </p>
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-red-600 text-lg font-semibold'}>
              글이 업로드 되기전에 불필요한 이미지들은 올라가지 않도록 작업
            </p>
            <br />
            <p className={'text-blue-600 text-lg font-semibold'}>
              createObjectURL을 사용하여 lazy 업로드를 하였고, 추가된 이미지
              경로들을 보관하였다가 글 업로드 직전 글 내용에 존재하는지 파악하고
              백엔드에 데이터 전송 백엔드에서 이미지를 업로드하고 임시 이미지
              경로를 실제 이미지 경로로 대체 후 데이터 저장
            </p>
          </li>
          <li
            className={
              'w-full text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-red-600 text-lg font-semibold'}>
              react-md-editor를 사용하면서 미리보기 이미지가 보이지를 않는 문제
            </p>
            <br />
            <p className={'text-blue-600 text-lg font-semibold'}>
              이미지를 넣을 경우 "blob:"를 이미지 경로에 붙여주고 글 작성 후에
              다시 제거하는 방식으로 문제 해결
            </p>
          </li>
          <li
            className={
              'w-full text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-red-600 text-lg font-semibold'}>
              블로그 글에서 특정 태그에 위치로 이동하는 내부 하이퍼링크 기능
              구현이 필요
            </p>
            <br />
            <p className={'text-blue-600 text-lg font-semibold'}>
              태그가 일단 페이지에 위치한 이후에 위치를 참조할 수 있어서 일단
              임시로 1초정도 스크롤을 막고 그 동안 태그의 위치를 파악하여 내부
              하이퍼링크 기능 구현
            </p>
          </li>
          <li
            className={
              'w-full text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-green-600 text-lg font-semibold'}>
              1. AI로 블로그 글 작성 기능 혹은 검색해서 도와주는 기능 추가
            </p>
            <p className={'text-green-600 text-lg font-semibold'}>
              2. 블로그 작성 템플릿(균일한 양식의 글을 위해서) 작업하기
            </p>
            <p className={'text-green-600 text-lg font-semibold'}>
              3. SEO 작업 완성하기
            </p>
            <p className={'text-green-600 text-lg font-semibold'}>
              4. 여러 사람이 글 작성이 가능한 블로그 플랫폼도 고민중...
            </p>
          </li>
        </ul>
      </Article>
      <Article>
        <div className="justify-start items-start h-full flex flex-col font-bold text-[1.6rem]">
          <span> 결과 </span>
        </div>
        <ul className="flex justify-center flex-wrap gap-[1rem] ">
          {imageList.map((i, index: number) => (
            <Link
              key={i[0]}
              className={
                ' outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] w-full flex flex-col items-center min-[1300px]:max-w-[40rem] min-[1300px]:max-w-[40rem]'
              }
              href={i[0]}
              target={'_blanket'}
            >
              <div className="max-w-[40rem] h-[30rem] relative mb-[2rem] flex justify-center flex-shrink-0 w-full">
                <Image
                  src={i[0]}
                  alt={''}
                  fill
                  style={{ borderRadius: '0px', objectFit: 'contain' }}
                />
                <div className="w-full justify-center absolute bottom-[-1.5rem] text-gray-400 text-sm font-semibold">
                  {i[1]}
                  {index == 0 && (
                    <a
                      className="ml-2 hover:text-red-400 z-10"
                      href={
                        'https://www.figma.com/design/9NC19XbZokgmjBqk7TOQFg/%EC%BD%94%EB%94%A9%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83%EC%9D%84-%EC%A0%95%EB%A6%AC%ED%95%98%EB%8A%94-%EA%B3%B5%EA%B0%84?node-id=1760-3504'
                      }
                      target="_blanket"
                    >
                      (피그마에서 보기)
                    </a>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </Article>
    </section>
  );
};
export default PrivateProjectBlog

const Article = tw.article`
${'py-[1rem] px-[.5rem] w-full grid grid-cols-[5rem_auto] gap-[2rem] items-center outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] bg-[#fefefe]'}
`;

const H2 = styled.h2`
  border: none;
  outline: solid ${(props) => props.theme.main.secondary80} 0.25rem;
  outline-offset: -0.25rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  max-width: max-content;
  font-weight: 800;
  font-size: 1.8rem;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
`;