import { commonTheme } from '@/styles/theme';
import React from 'react';
import styled from '@emotion/styled';
import BlogFirstMenu from '../blog/BlogUI/BlogFirstMenu';
import BlogSecondMenu from '../blog/BlogUI/BlogSecondMenu';

type AppLayoutProps = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: AppLayoutProps) => {
  return (
    <Div>
      <Container>{children}</Container>
    </Div>
  );
};

export default BlogLayout;

const Div = styled.div`
  background: linear-gradient(lightCyan, skyBlue, deepSkyBlue);
`;
const Container = styled.div`
  padding-left: 44px;
  padding-top: 44px;
  margin: auto;
  max-width: 1440px;
  min-height: 100vh;
  /* background: linear-gradient(red, blue); */

  @media (min-width: ${commonTheme.deviceSizes.laptop}) {
    padding-left: 120px;
  }
`;
