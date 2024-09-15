import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import tw from "twin.macro";

const PrivateProjectSetting = () => {
    const imageList = [
      [
        'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/setting/setting-color.png',
        '전체 색상 변경',
      ],
    ];

  return (
    <section
      className={
        'flex flex-col items-start gap-[1rem] w-full  bg-[#f0f0f0] p-[1rem] rounded-2xl'
      }
    >
      <H2> 설정 </H2>
      <Article>
        <div className="justify-start flex font-bold text-[1.6rem]">설명</div>
        <span className="justify-start flex text-[1rem] font-semibold">
          시스템의 스타일을 한번에 제어하기 위한 기능
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
            primary, secondary 2가지 속성을 변경해서 전체적인 스타일 변경
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
              디자인 시스템을 구축하고 전체적으로 공통된 스타일을 주기 위한 작업,
              현재 제대로 작업이 진행되지 않음
            </p>
          </li>
          <li
            className={
              'w-full text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-green-600 text-lg font-semibold'}>
              1. 3가지 색상으로 전체 색상 설정
            </p>
            <p className={'text-green-600 text-lg font-semibold'}>
              2. 다크모드 작업 
            </p>
            <p className={'text-green-600 text-lg font-semibold'}>
              3. 특정 날짜나 계절 등에 따라 테마 변경  
            </p>
            <p className={'text-green-600 text-lg font-semibold'}>
              4. 여러 사람마다 편한 색상 및 스타일로 변경할 수 있게 작업   
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
                ' outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] w-full flex flex-col items-center min-[1300px]:max-w-[40rem]'
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
export default PrivateProjectSetting

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