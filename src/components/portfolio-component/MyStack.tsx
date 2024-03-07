import RowScrollListBox from '@components/common/ListBox/RowScrollListBox';
import Button from '@components/common/button/Button';
import { StackIcon } from '@components/common/icons/StackIcon';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';

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
          desc: 'useEffect, useRef, useRewardRef, useState, useReducer, useCallback, useMemo, React.memo',
        },
      ],
    },
    {
      stack: 'nextjs',
      img: StackIcon.Nextjs,
      desc: ['3', '4'],
    },
    {
      stack: 'emotion',
      img: StackIcon.Emotion,
      desc: ['3', '4'],
    },
    {
      stack: 'react-query',
      img: StackIcon.ReactQuery,
      desc: ['useQuery, useMutation, useInfiniteQuery 사용방법'],
    },
    {
      stack: 'storybook',
      img: StackIcon.Storybook,
      desc: ['1', '2'],
    },
    {
      stack: 'typescript',
      img: StackIcon.Typescript,
      desc: ['3', '4'],
    },
    {
      stack: 'html',
      img: StackIcon.Html,
      desc: [
        {
          title: '다양한 태그 사용법 습득',
          desc: 'a, h, input, div, span, ul, select, details 등',
        },
        {
          title: '시멘틱 태그',
          desc: '아직 완벽하지는 않지만 시멘틱 태그 사용',
        },
      ],
    },
    {
      stack: 'css',
      img: StackIcon.Css,
      desc: [
        {
          title: '배치',
          desc: 'flex, grid, position 등을 사용하여 적절한 배치 가능',
        },
        {
          title: '반응형',
          desc: '화면에 맞게 반응형 웹을 만들 수 있다',
        },
      ],
    },
    {
      stack: 'javascript',
      img: StackIcon.Javascript,
      desc: [
        {
          title: '스크롤, 라우터, setInterval, setTimeout',
          desc: '스크롤 좌표 이해, 라우터 처리에 push나 replace에 대한 이해, 일정 시간 뒤 이벤트 작동',
        },
        {
          title: '문자열, 배열, 객체 사용방법',
          desc: '문자열, 배열, 객체와 관련된 메소드 사용방법',
        },
        {
          title: '스토리지',
          desc: '스토리지를 사용하여 최근목록이나 뮤직플레이어 url을 저장해놓는 작업',
        },
      ],
    },
  ],
  Backend: [
    {
      stack: 'spring-boot',
      img: StackIcon.SpringBoot,
      desc: ['1', '2'],
    },
    {
      stack: 'spring-security',
      img: StackIcon.SpringSecurity,
      desc: ['1', '2'],
    },
    {
      stack: 'spring-data-jpa',
      img: StackIcon.SpringDataJpa,
      desc: ['1', '2'],
    },
    {
      stack: 'swagger',
      img: StackIcon.Swagger,
      desc: ['1', '2'],
    },
  ],
  Database: [
    {
      stack: 'mysql',
      img: StackIcon.Mysql,
      desc: ['1', '2'],
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
      desc: ['1', '2'],
    },
  ],
  Server: [
    {
      stack: 'tomcat',
      img: StackIcon.Tomcat,
      desc: ['1', '2'],
    },
    {
      stack: 'nginx',
      img: StackIcon.Nginx,
      desc: ['1', '2'],
    },
    {
      stack: 'linux',
      img: StackIcon.Linux,
      desc: ['1', '2'],
    },
    {
      stack: 's3',
      img: StackIcon.AwsS3,
      desc: ['1', '2'],
    },
    {
      stack: 'jenkins',
      img: StackIcon.Jenkins,
      desc: ['1', '2'],
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

  useLayoutEffect(() => {
    setActiveStack(DevelopList[props.active][0].stack);
  }, [props.active]);

  return (
    <Container>
      <RowScrollListBox gap={16} bg={'gray40'} pd={'8px'} scrollHidden={true}>
        {DevelopList[props.active].map((i) => (
          <Button
            key={i.stack}
            active={i.stack == activeStack}
            w={'80px'}
            h={'80px'}
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
              <div> {j.desc} </div>
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
`;

const DescriptionList = styled(CC.ColumnDiv.withComponent('ul'))`
  padding-left: 4px;
  gap: 16px;

  li {
    display: grid;
    grid-template-columns: 200px auto;
    div:nth-of-type(1) {
      font-weight: 600;
    }
    div:nth-of-type(2) {
    }
  }
`;
