import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import tw from "twin.macro";

const PrivateProjectAuth = () => {
    const imageList = [
      [
        'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/auth/auth-signin.png',
        '로그인',
      ],
      [
        'https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/auth/auth-signup.png',
        '회원가입',
      ],
    ];

  return (
    <section
      className={
        'flex flex-col items-start gap-[1rem] w-full bg-[#f0f0f0] p-[1rem] rounded-2xl'
      }
    >
      <H2> 인증 처리 </H2>
      <Article>
        <div className="justify-start flex font-bold text-[1.6rem]">설명</div>
        <span className="justify-start flex text-[1rem] font-semibold">
          로그인, 회원가입, 로그아웃
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
            로그인, 회원가입, 로그아웃, Oauth
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
        <ul className="flex flex-col gap-[2rem] items-start">
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start w-full'
            }
          >
            <p className={'text-purple-400 text-lg font-semibold'}>
              1. 일반적인 회원가입, 로그인 방식
            </p>
            <p className={'text-purple-400 text-lg font-semibold'}>
              2. 카카오, 네이버, 구글 Oauth
            </p>
            <p className={'text-purple-400 text-lg font-semibold'}>
              3. react-hook-form으로 validation
            </p>
            <p className={'text-purple-400 text-lg font-semibold'}>
              4. accessToken은 redux, refreshToken은 jwt cookie에 보관
            </p>
          </li>
          <li
            className={
              'text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start  w-full'
            }
          >
            <p className={'text-red-600 text-lg font-semibold'}>
              모달창에서 로그인 페이지로 이동하지 않고서 oauth로그인을 하는
              방법에 대해서 고민
            </p>
            <br />
            <p className={'text-blue-600 text-lg font-semibold'}>
              모달창에서 "카카오 로그인"을 클릭하면 "window.open"으로 새탭을
              열고 완료 후 합성 이벤트를 사용해서 로그인 처리
            </p>
          </li>
          <li
            className={
              'w-full text-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] rounded-[1rem] p-2 text-start'
            }
          >
            <p className={'text-green-600 text-lg font-semibold'}>
              서버에서 refreshToken을 보관하는 방법이나 next auth나 더 좋은
              보안관련 방법을 찾는다면 변경 예정
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
export default PrivateProjectAuth

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
