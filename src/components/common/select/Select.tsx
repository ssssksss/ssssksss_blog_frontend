import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Select.tsx
 * @version 0.0.1 "2023-10-19 04:29:50"
 * @description 설명
 */
const Select = ({ children, ...props }, ref) => {
  return (
    <Container background={props.bg} outline={props.outline} color={props.color} height={props.h}>
      <select ref={ref} onChange={() => props.onChange && props.onChange()} disabled={props.disabled || children?.length === 0} defaultValue={props.defaultValue} {...props}>
        {children}
      </select>
      <IconSVG
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 14L16 6H4L10 14Z"
          fill="#1A1A1A"
          // fill="#1A1A1A"
          />
      </IconSVG>
    </Container>
  );
};
export default forwardRef(Select);

const Container = styled.div`
  width: 100%;
  display: flex;
  background:  ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] ||  props.theme.main.contrast};
  height: ${props => props.height || "30px"};
  border-radius: 10px;
  position: relative;
  
  ${props =>
    props.outline &&
    css`
      outline: solid ${(props.theme.colors.[props.color] || props.theme.main.[props.color] ||  props.theme.main.contrast)} 1px;
      background: transparent;
    `}
      
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    min-width: 0;
    display: block;
    width: 100%;
    padding: 0px 4px;
    line-height: inherit;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: transparent;
    color: ${props => props.theme.colors.[props.color] || props.theme.main.[props.color] ||  props.theme.main.contrast};
    
    &:disabled {
      cursor: not-allowed;
    }

    &:focus {
      --clr: ${props=>props.theme.main.primary60};

      animation-name: animate-in; 
      animation-duration: 1s;
      background-image: linear-gradient(to right, var(--clr), var(--clr)), 
      linear-gradient(to bottom, var(--clr), var(--clr)), 
      linear-gradient(to right, var(--clr), var(--clr)),
      linear-gradient(to bottom, var(--clr), var(--clr)); 
      background-position: 0 0, 100% 0, 100% 100%, 0 100%; 
      background-size: 100% 4px, 4px 100%, 100% 4px, 4px 100%; 
      background-repeat: no-repeat;   
    }
      

    @keyframes animate-in {
      0% {
        background-size: 0 4px, 0 0, 0 0, 0 0; 
      }

      25% {
        background-size: 100% 4px, 0 0, 0 0, 0 0; 
        border-radius: 10px 10px 0px 0px;
      }

      50% {
        background-size: 100% 4px, 4px 100%, 0 0, 0 0; 
        border-radius: 10px 10px 10px 0px;
      }

      75% {
        background-size: 100% 4px, 4px 100%, 100% 4px, 0 0; 
        border-radius: 10px 10px 10px 10px;
      }

      100% {
        background-size: 100% 4px, 4px 100%, 100% 4px, 4px 100%;
        border-radius: 10px 10px 10px 10px; 
      }
    }

    option {
      /* background:  ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] ||  props.theme.main.contrast}; */
      color: ${props=>props.theme.main.primary80};
    }
  }
`;

const IconSVG = styled.svg`
position: absolute;
right: 0;
  align-self: center;
  width: 24px;
  height: 24px;
`;
