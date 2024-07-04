import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import tw from "twin.macro";

const PrivateProjectSchedule = () => {
    const imageList = [
      [
        'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/memo/memo-all-list.png',
        '메모 전체 목록',
      ],
    ];

  return (
    <section
      className={
        'flex flex-col items-start gap-[1rem] w-full bg-[#f0f0f0] p-[1rem] rounded-2xl'
      }
    >
      <H2> 스케줄 </H2>
      <Article>
        <div className="justify-start flex font-bold text-[1.6rem]">설명</div>
        <span className="justify-start flex text-[1rem] font-semibold">
          일정 관리를 위해서 제작
        </span>
      </Article>
      <Article>
        <div className="justify-start items-start h-full flex font-bold text-[1.6rem]">
          기능
        </div>
        <ul className="flex flex-col gap-[.5rem] items-start">
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            일정 카테고리 CRUD, 일정 CRUD
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
              구글 캘린더와 같이 막대 형태의 바가 겹치지 않게 만들게 하고 일정
              작성 및 관리하고 추가적으로 알림 기능 등을 추가하기 위해 제작
            </p>
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-red-600 text-lg font-semibold'}>
              구글 캘린더처럼 일정이 2주 이상이 되었을 때 막대 형태의 바를 다른
              줄까지 이어주어야 하고 다른 일정의 막대 형태의 바와 겹치게 되지
              않아야 하는 문제
            </p>
            <br />
            <p className={'text-blue-600 text-lg font-semibold'}>
              grid 방식으로 문제를 문제하려 시도하였고 css만으로 처리하기는
              어려워서 js를 이용해서 css 속성 grid-row-start를 변경하여 일정
              막대바를 중복되지 않게 배치하였다. 하지만 일정이 변경되면 전체가
              렌더링되는 문제가 있어서 좀 더 나은 방법을 생각 중
            </p>
          </li>
          <li
            className={
              'w-full text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-green-600 text-lg font-semibold'}>
              1. 연도별, 주별 등 일정 볼 수 있게 제작
            </p>
            <p className={'text-green-600 text-lg font-semibold'}>
              2. 외부 어플리케이션과 데이터를 주고 받을 수 있게 연동 작업
            </p>
            <p className={'text-green-600 text-lg font-semibold'}>
              3. 일정뿐만이 아니라 프로젝트 단위나 여러 사람과의 일정 공유 등의
              작업 계획 중
            </p>
          </li>
        </ul>
      </Article>
      <Article>
        <div className="justify-start items-start h-full flex flex-col font-bold text-[1.6rem]">
          <span> 결과 </span>
        </div>
        <ul className="flex justify-center flex-wrap gap-[1rem] ">
          {imageList.map((i) => (
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
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </Article>
    </section>
  );
};
export default PrivateProjectSchedule

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
