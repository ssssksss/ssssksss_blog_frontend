import Layout4 from '@components/layout/Layout4';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
/**
 * Author : Sukyung Lee
 * FileName: 404.tsx
 * Date: 2022-12-07 23:20:41
 * Description :
 */
const Index = () => {
  const router = useRouter();
  return (
    <Container>
      <div className={"w-full"}>
        <h1>500</h1>
        <h3>Server Error</h3>
        <h2>It's not you, it's me.</h2>
        <button
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </button>
        <button
          onClick={() => {
            router.push('/');
          }}
        >
          Go Home
        </button>
      </div>
    </Container>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout4>{page}</Layout4>;
};
const Container = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #a0a0a0;
  width: 100vw;
  height: 100vh;

  h1,
  h2,
  h3 {
    margin: 0;
    line-height: 0.8;
  }

  h2,
  h3 {
    font-weight: 300;
    color: $light-text-color;
  }

  h1 {
    font-weight: 700;
    color: $dark-text-color;
    font-size: 8em;
  }

  h2 {
    margin: 30px 0;
  }

  h3 {
    font-size: 2.5em;
  }

  h4 {
    display: inline-block;
    margin: 0 15px;
  }

  button {
    background: transparent;
    border: 2px solid $light-text-color;
    color: $light-text-color;
    padding: 5px 15px;
    font-size: 1.25em;
    transition: all 0.15s ease;
    border-radius: 3px;
  }

  button:hover {
    background: $dark-text-color;
    border: 2px solid $dark-text-color;
    color: #111;
    cursor: pointer;
    transform: scale(1.05);
  }
`;
