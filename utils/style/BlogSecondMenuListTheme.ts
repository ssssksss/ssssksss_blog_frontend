import styled from "styled-components";

export const MenuTitle = styled.div`
  background: ${({ theme }) => theme.customColors.secondTitle};
  color: white;
  height: 40px;
  font-size: 20px;
  border-radius: 10px 10px 0px 0px;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  ${({ theme }) => theme.flex.flexCenter};

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 14px;
  }
`;
export const MenuContainer = styled.div`
  background: ${({ theme }) => theme.customColors.second};
  color: white;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  border-radius: 0px 0px 10px 10px;
  padding: 10px 4px;
  font-size: 12px;

  a {
    height: 24px;
    box-shadow: 1px 1px 0px 0px grey, -1px -1px 1px 1px grey, inset 1px 1px grey;
    ${({ theme }) => theme.flex.flexCenter};
    background: ${({ theme }) => theme.customColors.second};
    color: white;
    font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};

    &:hover {
      color: ${({ theme }) => theme.customColors.second};
      background: white;
      box-shadow: 0px 0px 1px 1px grey, inset 1px 1px grey;
      transform: translate(-2px, -2px);
    }
  }
`;
