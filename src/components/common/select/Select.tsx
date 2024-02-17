import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { ReactNode, useEffect, useRef, useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Select.tsx
 * @version 0.0.1 "2023-10-19 04:29:50"
 * @description react-hook-form
 * 
 * @description 설명
*/

interface ISelectProps {
  children: ReactNode;
  placeholder?: string;
  defaultValue?: string;
  data?: [{value: string, name: string, bg: string}];
  outline?: boolean;
  outlineColor?: string;
  w?: string;
  h?: string;
  value?: {
    value: any,
    name: any,
    bg: string,
  };
  bg?: string;
  // react-hook-form에서 사용하는 용도
  setValue?: any;
  trigger?: any;
  // 클릭후 바로 최신 데이터가 필요한 경우에는 onChange에서 props를 이용하여 값을 받아 사용하면 된다.
  onChange?: ({
    value: any,
    name: any,
    bg: string,
  })=>void;
}

const Select = ({ children, ...props }): ISelectProps => {
  const [data,setData] = useState({
    value: props.defaultValue?.value,
    name: props.defaultValue?.name,
    bg: props.defaultValue?.bg,
  });
  const [isOpen,setIsOpen] = useState(false);
  const inputRef = useRef<null>();

  useEffect(()=>{
    const _windowClickHandler = () => {
      setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('click', _windowClickHandler);
    }
    
    return () => {
      window.removeEventListener('click', _windowClickHandler);
    };
  }, [isOpen]);

  useEffect(()=>{
    setData({
      ...data,
      value: props.defaultValue?.value,
      name: props.defaultValue?.name || props.placeholder,
      bg: props.defaultValue?.bg,
    })
  },[props.defaultValue])

  return (
    <Container {...props} onClick={()=>setIsOpen(prev=>!prev)}>
      <CC.RowCenterDiv bg={data?.bg || 'white80'}>
        {data?.name || data?.value}
      </CC.RowCenterDiv>
      {
        isOpen && (
      <ul>
        {
          props.data?.filter(j=>data.value != j.value ).map((i)=>(
            <SelectItem 
            key={i.value}
            bg={i.bg}
            onClick={(e)=>{
              setData({
                ...data,
                value: i.value,
                name: i.name,
                bg: i.bg,
              });
              {
                let temp = props.onChange && props.onChange({
                  value: i.value,
                  name: i.name,
                  bg: i.bg
                });
              }
            }}> {i.name || i.value} </SelectItem>
          ))
        }
      </ul>
        )
      }
      {/* {/* <IconSVG
        width="18"
        height="15"
        viewBox="0 0 18 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 0L17.6603 15H0.339746L9 0Z"
          fill="#1A1A1A"
          />
      </IconSVG> */}
      <IconSVG 
        width="18"
        height="15"
        viewBox="0 0 18 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 15L0 0L17 0L9 15Z"
          />
      </IconSVG>
    </Container>
  );
};
export default Select;
{/* <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 0L17.6603 15H0.339746L9 0Z" fill="black"/>
</svg> */}


const Container = styled.div<ISelectProps>`
// 외곽 디자인(border-radius, outline, box-shadow) //
  outline: inset ${props=>(props.theme.colors.[props.outlineColor] || props.theme.main.[props.outlineColor] ||  props.theme.main.primary80)} 1px;
  border-radius: 8px;

// 컨테이너(width, height, margin, padding, border, flex, grid, position) //
  display: flex;
  width: ${props => props.w || 'max-content'};
  height : ${props => props.h || '32px'};
  position: relative;
  padding-right: 18px;
  
  // 배경색(background) //
  background: ${props => props.theme.colors.[props.bg] || props.theme.main.[props.bg] || props.bg || props.theme.colors.white80};
  
  // 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //
  color: ${props=>props.theme.colors.black60};
  justify-content: flex-start;
  
  // 애니메이션(animation) //
  

// 이벤트(active, focus, hover, visited, focus-within, disabled) //
&:hover {
  cursor: pointer;
}

// 반응형(media-query, overflow, scroll) //


// 커스텀(custom css) //

  div:nth-of-type(1) {

  }

  input {
    display: none;
  }
  
  ul {
    background: transparent;
    position: absolute;
    z-index: 5;
    width: 100%;
    top: 32px;
    max-height: 160px;
    overflow: scroll;
    outline: inset ${props=>props.theme.main.primary80} 1px;
  }
  li {
    --pd-left: 2px;
    --scale-value: 1.4;
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    color: ${props=>props.theme.colors.black60};
    padding-left: var(--pd-left);
    cursor: pointer;
    
    &:hover {
      font-weight: 800;
      transition: all 0.6s ease;
    }
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
  
      
  &:disabled {
      cursor: not-allowed;
    }



`;

const SelectItem = styled.li<{props: any}>`
  background:  ${props => props.theme.colors.[props.bg] || props.theme.main.[props.bg] || props.theme.colors.white80};
`;


const IconSVG = styled.svg`
  position: absolute;
  right: 0;
  align-self: center;
  width: 16px;
  aspect-ratio: 1;
  path {
    fill: ${props=>props.theme.main.primary80};
  }
`;
