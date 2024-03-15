import RowScrollListBox from '@components/common/ListBox/RowScrollListBox';
import Button from '@components/common/button/Button';
import { StackIcon } from '@components/common/icons/StackIcon';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MyStack.tsx
 * @version 0.0.1 "2024-03-04 18:07:12"
 * @description 설명
 */

interface IMyStackProps {
  active: 'Frontend' | 'Backend' | 'Design' | 'Database' | 'Server' | 'Etc';
}

const DevelopList = {
  Frontend: [
    {
      stack: 'react',
      img: StackIcon.React,
      desc: [
        {
          title: 'useHooks와 React.memo에 대한 이해 및 사용',
          ex: 'useEffect, useRef, useRewardRef, useState, useReducer, useCallback, useMemo, React.memo',
        },
      ],
    },
    {
      stack: 'nextjs',
      img: StackIcon.Nextjs,
      desc: [
        {
          title: 'CSR SSR 사용',
          ex: 'getStaticPaths와 getStaticProps를 사용하여 블로그 글 정적 배포',
        },
      ],
    },
    {
      stack: 'emotion',
      img: StackIcon.Emotion,
      desc: [
        {
          title: 'theme',
          ex: 'theme 설정을 통한 전체적인 스타일 관리',
        },
      ],
    },
    {
      stack: 'react-query',
      img: StackIcon.ReactQuery,
      desc: [
        {
          title: 'CRUD',
          ex: 'REST API는 useQuery와 useMutation 사용',
        },
        {
          title: 'useInfiniteQuery',
          ex: '블로그 검색시 무한스크롤 쿼리 사용',
        },
      ],
    },
    {
      stack: 'storybook',
      img: StackIcon.Storybook,
      desc: [
        {
          title: '기초',
          ex: '서버에서 컴포넌트들을 볼 수 있는 정도만 가능',
        },
      ],
    },
    {
      stack: 'typescript',
      img: StackIcon.Typescript,
      desc: [
        {
          title: '기초',
          ex: 'type이나 interface의 상속이나 확장 등에 대해서는 습득',
        },
      ],
    },
    {
      stack: 'html',
      img: StackIcon.Html,
      desc: [
        {
          title: '다양한 태그 사용',
          ex: 'a, h, input, div, span, ul, select, details 등',
        },
        {
          title: '시멘틱 태그',
          ex: '아직 완벽하지는 않지만 시멘틱 태그 사용',
        },
      ],
    },
    {
      stack: 'css',
      img: StackIcon.Css,
      desc: [
        {
          title: '레이아웃',
          ex: 'flex, grid, position 등을 사용하여 적절한 배치 가능',
        },
        {
          title: '반응형',
          ex: '화면에 맞게 반응형 웹을 만들 수 있다.',
        },
      ],
    },
    {
      stack: 'javascript',
      img: StackIcon.Javascript,
      desc: [
        {
          title: '스크롤, 라우터, setInterval, setTimeout',
          ex: '스크롤 좌표 이해, 라우터 처리에 push나 replace에 대한 이해, 일정 시간 뒤 이벤트 작동',
        },
        {
          title: '문자열, 배열, 객체 사용방법',
          ex: '문자열, 배열, 객체와 관련된 메소드 사용방법',
        },
        {
          title: '스토리지',
          ex: '스토리지를 사용하여 최근목록이나 뮤직플레이어 url을 저장해놓는 작업',
        },
      ],
    },
  ],
  Backend: [
    {
      stack: 'spring-boot',
      img: StackIcon.SpringBoot,
      desc: [
        {
          title: 'CRUD , REST API',
          ex: 'mvc 패턴을 이용해서 crud 정도의 기능들은 만들어 낼 수 있다.',
        },
      ],
    },
    {
      stack: 'spring-security',
      img: StackIcon.SpringSecurity,
      desc: [
        {
          title: '기초',
          ex:
            '인증, 인가에 대해서는 숙지, 필터체인에 대해서나 토큰 처리 방법에 대해서는 이해 \n' +
            '하지만 필터처리나 예외 처리에 대해서는 좀 더 공부가 필요',
        },
      ],
    },
    {
      stack: 'spring-data-jpa',
      img: StackIcon.SpringDataJpa,
      desc: [
        {
          title: '기본적인 JPA 사용방법',
          ex: 'jpa를 이용해서 연관관계 매핑 가능, 복잡한 쿼리는 native query를 이용해서도 처리',
        },
      ],
    },
    {
      stack: 'swagger',
      img: StackIcon.Swagger,
      desc: [
        {
          title: '기초',
          ex: '기본적인 사용 방법',
        },
      ],
    },
  ],
  Database: [
    {
      stack: 'mysql',
      img: StackIcon.Mysql,
      desc: [
        {
          title: '기본',
          ex: '기본적인 query나 join 쿼리 등은 사용가능, 데이터 베이스 튜닝이나 인덱스 사용에 대해서는 공부 필요',
        },
      ],
    },
    // {
    //   stack: 'firebase',
    //   img: StackIcon.BlogIcon,
    //   desc: ['1', '2'],
    // },
  ],
  Design: [
    {
      stack: 'figma',
      img: StackIcon.Figma,
      desc: [
        {
          title: '기본',
          ex: '컴포넌트 생성이나 flex, layout 등 기본적인 사용방법은 터득, 인터렉션 사용방법에 대해서는 좀 더 공부 필요',
        },
      ],
    },
  ],
  Server: [
    {
      stack: 'tomcat',
      img: StackIcon.Tomcat,
      desc: [
        {
          title: '기초',
          ex: 'yml설정과 직접 war파일 이용해서 배포',
        },
      ],
    },
    {
      stack: 'nginx',
      img: StackIcon.Nginx,
      desc: [
        {
          title: '기초',
          ex: '간단한 포트포워딩 정도만 구현',
        },
      ],
    },
    {
      stack: 'linux',
      img: StackIcon.Linux,
      desc: [
        {
          title: '기초',
          ex: '리눅스 스크립트에 대한 이해는 있지만 사용한지 오래되어 공부 필요',
        },
      ],
    },
    {
      stack: 's3',
      img: StackIcon.AwsS3,
      desc: [
        {
          title: '기초',
          ex: 'spring boot와 연결',
        },
      ],
    },
    {
      stack: 'jenkins',
      img: StackIcon.Jenkins,
      desc: [
        {
          title: '기초',
          ex: '이전에 깃허브와 연결하여 자동 배포 경험',
        },
      ],
    },
  ],
  // Etc: [
  //   {
  //     stack: 'slack',
  //     img: StackIcon.BlogIcon,
  //     desc: ['1', '2'],
  //   },
  //   {
  //     stack: 'trello',
  //     img: StackIcon.BlogIcon,
  //     desc: ['1', '2'],
  //   },
  //   {
  //     stack: 'notion',
  //     img: StackIcon.BlogIcon,
  //     desc: ['1', '2'],
  //   },
  //   {
  //     stack: 'github',
  //     img: StackIcon.BlogIcon,
  //     desc: ['1', '2'],
  //   },
  //   {
  //     stack: 'erd',
  //     img: StackIcon.BlogIcon,
  //     desc: ['1', '2'],
  //   },
  //   {
  //     stack: 'postman',
  //     img: StackIcon.BlogIcon,
  //     desc: ['1', '2'],
  //   },
  //   {
  //     stack: 'eslint',
  //     img: StackIcon.BlogIcon,
  //     desc: ['1', '2'],
  //   },
  //   {
  //     stack: 'prettier',
  //     img: StackIcon.BlogIcon,
  //     desc: ['1', '2'],
  //   },
  // ],
};

const MyStack = (props: IMyStackProps) => {
  const [activeStack, setActiveStack] = useState(
    DevelopList[props.active][0].stack,
  );

  useEffect(() => {
    setActiveStack(DevelopList[props.active][0].stack);
  }, [props.active]);

  return (
    <Container>
      <RowScrollListBox gap={16} pd={'8px'} scrollHidden={true}>
        {DevelopList[props.active].map((i) => (
          <Button
            animation={i.stack == activeStack && 1}
            key={i.stack}
            active={i.stack == activeStack}
            w={'120px'}
            h={'120px'}
            pd={'0px'}
            onClick={() => setActiveStack(i.stack)}
          >
            <Image src={i.img} layout="fill" />
          </Button>
        ))}
      </RowScrollListBox>
      <DescriptionList>
        {DevelopList[props.active]
          .filter(
            (i) =>
              i.stack == (activeStack ?? DevelopList[props.active][0].stack),
          )[0]
          ?.desc.map((j, index) => (
            <li key={index}>
              <div> {j.title} </div>
              <div> {j.ex} </div>
            </li>
          ))}
      </DescriptionList>
    </Container>
  );
};
export default MyStack;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  gap: 20px;
  padding: 20px 0px;
  -webkit-backdrop-filter: brightness(1.1) blur(20px);
  backdrop-filter: brightness(1.1) blur(20px);
`;

const DescriptionList = styled(CC.ColumnDiv.withComponent('ul'))`
  padding-left: 4px;
  gap: 16px;
  color: white;
  font-size: 1.4rem;

  li {
    display: grid;
    grid-template-columns: 200px auto;
    gap: 8px;
    border-bottom: solid white 4px;
    padding-bottom: 8px;
    div:nth-of-type(1) {
      font-weight: 600;
      padding: 8px;
      font-weight: 800;
      display: flex;
      align-items: center;
      border-right: solid white 4px;
    }
    div:nth-of-type(2) {
      padding: 8px;
      display: flex;
      align-items: center;
    }
  }
`;
