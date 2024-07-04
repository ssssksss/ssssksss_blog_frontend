import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import tw from "twin.macro";

const PrivateProjectYoutubePlayer = () => {
    const imageList = [
      [
        'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/player/player-component.png',
        '플레이어 UI',
      ],
      [
        'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/player/player-list.png',
        '플레이어 CRD',
      ],
    ];

  return (
    <section
      className={
        'flex flex-col items-start gap-[1rem] w-full  bg-[#f0f0f0] p-[1rem] rounded-2xl'
      }
    >
      <H2> 유튜브 플레이어 </H2>
      <Article>
        <div className="justify-start flex font-bold text-[1.6rem]">설명</div>
        <span className="justify-start flex text-[1rem] font-semibold">
          유튜브 링크로 노래 등을 실행 가능한 기능
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
            유튜브 링크 등록 CRD
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start text-blue-600 font-bold text-lg'
            }
          >
            {`localStorage에 유튜브 정보(url주소, 제목 등)를 넣어놓고 음악 듣기 기능`}
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start text-red-600 font-bold text-lg'
            }
          >
            youtube를 이용해서 google youtube api를 이용해서 유튜브의 정보를
            받아옴
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
            <div className={'text-purple-400 text-lg font-semibold'}>
              <p> 유튜브 링크를 가져와서 react-player라이브러리로 실행하는 기능 </p> 
              <p> 이미지나 제목 등의 정보를 가져오기 위해서 google api를 사용 </p>
            </div>
          </li>
          <li
            className={
              'w-full text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-red-600 text-lg font-semibold'}>
              youtube 링크를 저장해도 실행이 안되거나 하는 문제가 존재, 유튜브에서 지원을 안하는 문제라고 판단 중
            </p>
            <br />
            <p className={'text-blue-600 text-lg font-semibold'}>
              미해결
            </p>
          </li>
          <li
            className={
              'w-full text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-green-600 text-lg font-semibold'}>
              1. 그룹으로 묶어서 플레이리스트로 듣기 등의 기능 추가 예정
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
export default PrivateProjectYoutubePlayer

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