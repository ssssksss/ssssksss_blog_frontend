import Layout1 from '@/components/layout/Layout1';
import { store } from '@/redux/store';
import { rootActions } from '@/redux/store/actions';
import { CC } from '@/styles/commonComponentStyle';
import rootTheme from '@/styles/theme';
import styled from '@emotion/styled';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */
const Index = () => {
  return (
    <Container>
      <CC.RowDiv h={'40px'} bg={'white80'} fontSize={'1.2rem'}>
        전체 색상 설정
      </CC.RowDiv>
      <CC.ColumnDiv>
        {Object.keys(rootTheme).map(i => (
          <ThemeColorBox
            theme={i}
            onClick={() => {
              if (store.getState().themeStore.theme == i) return;
              store.dispatch(rootActions.themeStore.setTheme(i));
              window.localStorage.setItem('theme', i);
              store.dispatch(
                rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
                  type: 'success',
                  message: '색상 변경',
                })
              );
            }}
          >
            <CC.GridColumn3>
              <div> </div>
              <div> </div>
              <div> </div>
            </CC.GridColumn3>
          </ThemeColorBox>
        ))}
      </CC.ColumnDiv>
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  width: 100%;
`;

const ThemeColorBox = styled.div<{ theme: string }>`
  background: white;
  padding: 8px;
  & > div {
    cursor: pointer;
    :hover {
      outline: solid black 4px;
    }
  }
  & > div > div {
    height: 40px;
  }
  & > div > div:nth-of-type(1) {
    background: ${props => rootTheme[props.theme].main.primary20};
    :hover {
      background: ${props => rootTheme[props.theme].main.primary100};
    }
  }
  & > div > div:nth-of-type(2) {
    background: ${props => rootTheme[props.theme].main.secondary20};
    :hover {
      background: ${props => rootTheme[props.theme].main.secondary100};
    }
  }
  & > div > div:nth-of-type(3) {
    background: ${props => rootTheme[props.theme].main.third20};
    :hover {
      background: ${props => rootTheme[props.theme].main.secondary100};
    }
  }
`;
