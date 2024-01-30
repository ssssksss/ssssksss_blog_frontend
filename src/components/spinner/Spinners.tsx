import styled from '@emotion/styled';

/**
 * Author : Sukyung Lee
 * FileName: spinner1.tsx
 * Date: 2022-06-17 08:57:45
 * Description : css만을 이용한 스피너
 * Reference : https://css-tricks.com/single-element-loaders-the-spinner/?utm_source=CSS-Weekly&utm_campaign=Issue-509&utm_medium=email
 * Reference : https://cssloaders.github.io/
 * Reference : "css only spinner" 검색
 */
const Spinners = () => {
  return (
    <Container>
      <div>
        <Spinner1 />
        <Spinner2 />
        <Spinner3 />
        <Spinner4 />
        <Spinner5 />
        <Spinner6 />
        <Spinner7 />
        <Spinner8 />
        <Spinner9 />
        <Spinner10 />
      </div>
      <div>
        <Spinner11 />
        <Spinner12 />
        <Spinner13 />
        <Spinner14 />
        <Spinner15 />
        <Spinner16 />
        <Spinner17 />
        <Spinner18 />
        <Spinner19 />
        <Spinner20 />
      </div>
      <div>
        <Spinner21 />
        <Spinner22 />
        <Spinner23 />
        <Spinner24 />
        <Spinner25 />
        <Spinner26 />
        <Spinner27 />
        <Spinner28 />
        <Spinner29 />
        <Spinner30 />
      </div>
      <div>
        <Spinner31 />
        <Spinner32 />
        <Spinner33 />
        <Spinner34 />
        {/* 삭제 */}
        <Spinner35 />
        {/* 우편 */}
        <Spinner36 />
        {/* 게시판 */}
        <Spinner37 />
        {/* 댓글 */}
        <Spinner38 />
      </div>
    </Container>
  );
};
export default Spinners;

const Container = styled.div`
  width: 100%;

  & > div {
    display: flex;
  }
`;

export const Spinner1 = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: #000 #0000;
  animation: s1 1s infinite;

  @keyframes s1 {
    to {
      transform: rotate(0.5turn);
    }
  }
`;

export const Spinner2 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid lightblue;
  border-right-color: orange;
  animation: s2 1s infinite linear;

  @keyframes s2 {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner3 = styled.div`
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: s3 1s infinite linear;
  @keyframes s3 {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner4 = styled.div`
  width: 50px;
  --b: 8px; /* the border thickness */
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 1px;
  background: conic-gradient(#0000 10%, #f03355) content-box;
  -webkit-mask: repeating-conic-gradient(
      #0000 0deg,
      #000 1deg 20deg,
      #0000 21deg 36deg
    ),
    radial-gradient(
      farthest-side,
      #0000 calc(100% - var(--b) - 1px),
      #000 calc(100% - var(--b))
    );
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: s4 1s infinite steps(10);
  @keyframes s4 {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner5 = styled.div`
  width: 50px;
  --b: 8px; /* the border thickness */
  aspect-ratio: 1;
  border-radius: 50%;
  background: #514b82;
  -webkit-mask: repeating-conic-gradient(
      #0000 0deg,
      #000 1deg 70deg,
      #0000 71deg 90deg
    ),
    radial-gradient(
      farthest-side,
      #0000 calc(100% - var(--b) - 1px),
      #000 calc(100% - var(--b))
    );
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: s5 1s infinite;
  @keyframes s5 {
    to {
      transform: rotate(0.5turn);
    }
  }
`;

export const Spinner6 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 3px;
  background: radial-gradient(farthest-side, #ffa516 95%, #0000) 50% 0/12px 12px
      no-repeat,
    radial-gradient(
        farthest-side,
        #0000 calc(100% - 5px),
        #ffa516 calc(100% - 4px)
      )
      content-box;
  animation: s6 2s infinite;
  @keyframes s6 {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner7 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  --_c: radial-gradient(farthest-side, #25b09b 92%, #0000);
  background: var(--_c) top, var(--_c) left, var(--_c) right, var(--_c) bottom;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  animation: s7 1s infinite;
  @keyframes s7 {
    to {
      transform: rotate(0.5turn);
    }
  }
`;

export const Spinner8 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  color: #f03355;
  --_c: no-repeat radial-gradient(farthest-side, currentColor 92%, #0000);
  background: var(--_c) 50% 0 /12px 12px, var(--_c) 50% 100%/12px 12px,
    var(--_c) 100% 50%/12px 12px, var(--_c) 0 50%/12px 12px,
    var(--_c) 50% 50%/12px 12px,
    conic-gradient(from 90deg at 4px 4px, #0000 90deg, currentColor 0) -4px -4px /
      calc(50% + 2px) calc(50% + 2px);
  animation: s8 1s infinite linear;
  @keyframes s8 {
    to {
      transform: rotate(0.5turn);
    }
  }
`;

export const Spinner9 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #f03355 95%, #0000) 50% 1px/12px
      12px no-repeat,
    radial-gradient(farthest-side, #0000 calc(100% - 14px), #ccc 0);
  animation: s9 2s infinite linear;
  @keyframes s9 {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner10 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  color: #854f1d;
  border-radius: 50%;
  display: grid;
  background: conic-gradient(from 90deg at 4px 4px, #0000 90deg, currentColor 0) -4px -4px /
      calc(50% + 2px) calc(50% + 2px),
    radial-gradient(
        farthest-side,
        currentColor 6px,
        #0000 7px calc(100% - 6px),
        currentColor calc(100% - 5px)
      )
      no-repeat;
  animation: s10 2s infinite linear;
  position: relative;
  &:before {
    content: '';
    border-radius: inherit;
    background: inherit;
    transform: rotate(45deg);
  }
  @keyframes s10 {
    to {
      transform: rotate(0.5turn);
    }
  }
`;
export const Spinner11 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 6px;
  background: conic-gradient(from 135deg at top, currentColor 90deg, #0000 0) 0
      calc(50% - 4px) / 17px 8.5px,
    radial-gradient(
        farthest-side at bottom left,
        #0000 calc(100% - 6px),
        currentColor calc(100% - 5px) 99%,
        #0000
      )
      top right/50% 50% content-box content-box,
    radial-gradient(
        farthest-side at top,
        #0000 calc(100% - 6px),
        currentColor calc(100% - 5px) 99%,
        #0000
      )
      bottom / 100% 50% content-box content-box;
  background-repeat: no-repeat;
  animation: s1 1s infinite linear;

  @keyframes s1 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export const Spinner12 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    --c: radial-gradient(farthest-side, #25b09b 92%, #0000);
    background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
      var(--c) 0 50%;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    animation: s2 1s infinite;
  }
  &::before {
    margin: 4px;
    filter: hue-rotate(45deg);
    background-size: 8px 8px;
    animation-timing-function: linear;
  }

  @keyframes s2 {
    100% {
      transform: rotate(0.5turn);
    }
  }
`;
export const Spinner13 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px
      no-repeat,
    conic-gradient(#0000 30%, #ffa516);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;

  @keyframes s3 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export const Spinner14 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  animation: s4 4s infinite;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    border: 8px solid;
    border-radius: 50%;
    border-color: red red #0000 #0000;
    mix-blend-mode: darken;
    animation: s4 1s infinite linear;
  }

  &::after {
    border-color: #0000 #0000 blue blue;
    animation-direction: reverse;
  }

  @keyframes s4 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export const Spinner15 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: #25b09b;
  animation: s5 1s infinite linear;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
    animation: s5 2s infinite;
  }

  &::after {
    margin: 8px;
    animation-duration: 3s;
  }

  @keyframes s5 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export const Spinner16 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-color: #ccc #0000;
  animation: s6 1s infinite linear;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
  }
  &::before {
    border-color: #f03355 #0000;
    animation: inherit;
    animation-duration: 0.5s;
    animation-direction: reverse;
  }
  &::after {
    margin: 8px;
  }

  @keyframes s6 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export const Spinner17 = styled.div`
  width: 70px;
  aspect-ratio: 1;
  background: radial-gradient(farthest-side, #ffa516 90%, #0000) center/16px
      16px,
    radial-gradient(farthest-side, green 90%, #0000) bottom/12px 12px;
  background-repeat: no-repeat;
  animation: s7 1s infinite linear;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 8px;
    aspect-ratio: 1;
    inset: auto 0 16px;
    margin: auto;
    background: #ccc;
    border-radius: 50%;
    transform-origin: 50% calc(100% + 10px);
    animation: inherit;
    animation-duration: 0.5s;
  }

  @keyframes s7 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export const Spinner18 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  --c: radial-gradient(farthest-side, #514b82 92%, #0000);
  background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
    var(--c) 0 50%;
  background-size: 10px 10px;
  background-repeat: no-repeat;
  animation: s8 1s infinite;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: 3px;
    background: repeating-conic-gradient(#0000 0 35deg, #514b82 0 90deg);
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 3px),
      #000 0
    );
    border-radius: 50%;
  }

  @keyframes s8 {
    100% {
      transform: rotate(0.5turn);
    }
  }
`;
export const Spinner19 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  color: #854f1d;
  background: radial-gradient(
    farthest-side,
    currentColor calc(100% - 6px),
    #0000 calc(100% - 5px) 0
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 13px),
    #000 calc(100% - 12px)
  );
  border-radius: 50%;
  animation: s9 2s infinite linear;
  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    background: linear-gradient(currentColor 0 0) center,
      linear-gradient(currentColor 0 0) center;
    background-size: 100% 10px, 10px 100%;
    background-repeat: no-repeat;
  }
  &::after {
    transform: rotate(45deg);
  }

  @keyframes s9 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export const Spinner20 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #514b82;
  animation: s10-1 0.8s infinite linear alternate, s10-2 1.6s infinite linear;
  @keyframes s10-1 {
    0% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
    }
    12.5% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 0%,
        100% 0%,
        100% 0%
      );
    }
    25% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 100%,
        100% 100%,
        100% 100%
      );
    }
    50% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    62.5% {
      clip-path: polygon(
        50% 50%,
        100% 0,
        100% 0%,
        100% 0%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    75% {
      clip-path: polygon(
        50% 50%,
        100% 100%,
        100% 100%,
        100% 100%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    100% {
      clip-path: polygon(
        50% 50%,
        50% 100%,
        50% 100%,
        50% 100%,
        50% 100%,
        50% 100%,
        0% 100%
      );
    }
  }
  @keyframes s10-2 {
    0% {
      transform: scaleY(1) rotate(0deg);
    }
    49.99% {
      transform: scaleY(1) rotate(135deg);
    }
    50% {
      transform: scaleY(-1) rotate(0deg);
    }
    100% {
      transform: scaleY(-1) rotate(-135deg);
    }
  }
`;
export const Spinner21 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: repeating-conic-gradient(#000 0 90deg, #ccc 0 180deg);
  animation: s1 1s infinite linear;

  @keyframes s1 {
    100% {
      transform: rotate(0.5turn);
    }
  }
`;

export const Spinner22 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background: conic-gradient(
    #25b09b 25%,
    #f03355 0 50%,
    #514b82 0 75%,
    #ffa516 0
  );
  animation: s2 2s infinite linear;
  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    margin: 15%;
    border-radius: 50%;
    background: inherit;
    animation: inherit;
  }
  &::after {
    margin: 25%;
    animation-duration: 3s;
  }

  @keyframes s2 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner23 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background: linear-gradient(
        0deg,
        rgb(0 0 0/50%) 30%,
        #0000 0 70%,
        rgb(0 0 0/100%) 0
      )
      50%/8% 100%,
    linear-gradient(90deg, rgb(0 0 0/25%) 30%, #0000 0 70%, rgb(0 0 0/75%) 0)
      50%/100% 8%;
  background-repeat: no-repeat;
  animation: s3 1s infinite steps(12);
  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    border-radius: 50%;
    background: inherit;
    opacity: 0.915;
    transform: rotate(30deg);
  }
  &::after {
    opacity: 0.83;
    transform: rotate(60deg);
  }

  @keyframes s3 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner24 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #0000;
  border-right-color: #ffa50097;
  position: relative;
  animation: s4 1s infinite linear;
  &:before,
  &:after {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: inherit;
    animation: inherit;
    animation-duration: 2s;
  }
  &:after {
    animation-duration: 4s;
  }

  @keyframes s4 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner25 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #514b82;
  -webkit-mask: radial-gradient(
    circle closest-side at 50% 40%,
    #0000 94%,
    #000
  );
  transform-origin: 50% 40%;
  animation: s5 1s infinite linear;

  @keyframes s5 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner26 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  -webkit-mask: conic-gradient(from 15deg, #0000, #000);
  animation: s6 1s infinite steps(12);
  background: radial-gradient(closest-side at 50% 12.5%, #f03355 96%, #0000) 50%
      0/20% 80% repeat-y,
    radial-gradient(closest-side at 12.5% 50%, #f03355 96%, #0000) 0 50%/80% 20%
      repeat-x;
  &:before,
  &:after {
    background: radial-gradient(closest-side at 50% 12.5%, #f03355 96%, #0000)
        50% 0/20% 80% repeat-y,
      radial-gradient(closest-side at 12.5% 50%, #f03355 96%, #0000) 0 50%/80%
        20% repeat-x;
  }
  &:before,
  &:after {
    content: '';
    grid-area: 1/1;
    transform: rotate(30deg);
  }
  &:after {
    transform: rotate(60deg);
  }

  @keyframes s6 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner27 = styled.div`
  --d: 22px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: #25b09b;
  box-shadow: calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
    calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
    calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
    calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px,
    calc(-1 * var(--d)) calc(0 * var(--d)) 0 4px,
    calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 5px,
    calc(0 * var(--d)) calc(-1 * var(--d)) 0 6px;
  animation: s7 1s infinite steps(8);

  @keyframes s7 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner28 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  color: #514b82;
  background: conic-gradient(from 90deg at 3px 3px, #0000 90deg, currentColor 0) -3px -3px /
    calc(50% + 1.5px) calc(50% + 1.5px);
  animation: s8 2s infinite;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    background: repeating-conic-gradient(#0000 0 35deg, currentColor 0 90deg);
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 3px),
      #000 0
    );
    border-radius: 50%;
  }
  &::after {
    margin: 20%;
  }

  @keyframes s8 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner29 = styled.div`
  width: 50px;
  aspect-ratio: 1;
  --_c: no-repeat linear-gradient(orange 0 0) 50%;
  background: var(--_c) / 100% 50%, var(--_c) / 50% 100%;
  border-radius: 50%;
  animation: s9 2s infinite linear;

  @keyframes s9 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner30 = styled.div`
  --R: 30px;
  --g1: #514b82 96%, #0000;
  --g2: #eeeeee 96%, #0000;
  width: calc(2 * var(--R));
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid;
  -webkit-mask: linear-gradient(#000 0 0);
  animation: s10 2s infinite linear;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    width: 50%;
    background: radial-gradient(farthest-side, var(--g1))
        calc(var(--R) + 0.866 * var(--R) - var(--R))
        calc(var(--R) - 0.5 * var(--R) - var(--R)),
      radial-gradient(farthest-side, var(--g1))
        calc(var(--R) + 0.866 * var(--R) - var(--R))
        calc(var(--R) - 0.5 * var(--R) - var(--R)),
      radial-gradient(farthest-side, var(--g2))
        calc(var(--R) + 0.5 * var(--R) - var(--R))
        calc(var(--R) - 0.866 * var(--R) - var(--R)),
      radial-gradient(farthest-side, var(--g1)) 0 calc(-1 * var(--R)),
      radial-gradient(farthest-side, var(--g2))
        calc(var(--R) - 0.5 * var(--R) - var(--R))
        calc(var(--R) - 0.866 * var(--R) - var(--R)),
      radial-gradient(farthest-side, var(--g1))
        calc(var(--R) - 0.866 * var(--R) - var(--R))
        calc(var(--R) - 0.5 * var(--R) - var(--R)),
      radial-gradient(farthest-side, var(--g2)) calc(-1 * var(--R)) 0,
      radial-gradient(farthest-side, var(--g1))
        calc(var(--R) - 0.866 * var(--R) - var(--R))
        calc(var(--R) + 0.5 * var(--R) - var(--R));
    background-size: calc(2 * var(--R)) calc(2 * var(--R));
    background-repeat: no-repeat;
  }

  &::after {
    transform: rotate(180deg);
    transform-origin: right;
  }

  @keyframes s10 {
    100% {
      transform: rotate(-1turn);
    }
  }
`;

export const Spinner31 = styled.div`
  & {
    transform: rotateZ(45deg);
    perspective: 1000px;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    color: ${props => props.theme.main.primary80};
  }
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s spin linear infinite;
  }
  &:after {
    color: ${props => props.theme.main.secondary80};
    transform: rotateY(70deg);
    animation-delay: 0.4s;
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotateZ(360deg);
    }
  }

  @keyframes rotateccw {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  @keyframes spin {
    0%,
    100% {
      box-shadow: 0.2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: 0.2em 0.2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 0.2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -0.2em 0.2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -0.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -0.2em -0.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -0.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: 0.2em -0.2em 0 0 currentcolor;
    }
  }
`;

export const Spinner32 = styled.div`
  & {
    width: 48px;
    height: 48px;
    display: inline-block;
    position: relative;
    transform: rotate(45deg);
  }
  &::before {
    content: '';
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0;
    top: -24px;
    animation: animloader 4s ease infinite;
  }
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    /* background: rgba(255, 255, 255, 0.85); */
    /* 이게 이동하는 블럭 색상 */
    background: ${props => props.theme.main.primary80};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    animation: animloader2 2s ease infinite;
  }

  @keyframes animloader {
    0% {
      box-shadow: 0 24px rgba(255, 255, 255, 0),
        24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0),
        0px 48px rgba(255, 255, 255, 0);
    }
    12% {
      box-shadow: 0 24px ${props => props.theme.main.secondary80},
        24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0),
        0px 48px rgba(255, 255, 255, 0);
    }
    25% {
      box-shadow: 0 24px ${props => props.theme.main.secondary80},
        24px 24px ${props => props.theme.main.secondary80},
        24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
    }
    37% {
      box-shadow: 0 24px ${props => props.theme.main.secondary80},
        24px 24px ${props => props.theme.main.secondary80},
        24px 48px ${props => props.theme.main.secondary80},
        0px 48px rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow: 0 24px ${props => props.theme.main.secondary80},
        24px 24px ${props => props.theme.main.secondary80},
        24px 48px ${props => props.theme.main.secondary80},
        0px 48px ${props => props.theme.main.secondary80};
    }
    62% {
      box-shadow: 0 24px rgba(255, 255, 255, 0),
        24px 24px ${props => props.theme.main.secondary80},
        24px 48px ${props => props.theme.main.secondary80},
        0px 48px ${props => props.theme.main.secondary80};
    }
    75% {
      box-shadow: 0 24px rgba(255, 255, 255, 0),
        24px 24px rgba(255, 255, 255, 0),
        24px 48px ${props => props.theme.main.secondary80},
        0px 48px ${props => props.theme.main.secondary80};
    }
    87% {
      box-shadow: 0 24px rgba(255, 255, 255, 0),
        24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0),
        0px 48px ${props => props.theme.main.secondary80};
    }
    100% {
      box-shadow: 0 24px rgba(255, 255, 255, 0),
        24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0),
        0px 48px rgba(255, 255, 255, 0);
    }
  }

  @keyframes animloader2 {
    0% {
      transform: translate(0, 0) rotateX(0) rotateY(0);
    }
    25% {
      transform: translate(100%, 0) rotateX(0) rotateY(180deg);
    }
    50% {
      transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
    }
    75% {
      transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
    }
    100% {
      transform: translate(0, 0) rotateX(0) rotateY(360deg);
    }
  }
`;

export const Spinner33 = styled.div`
  & {
    color: ${props => props.theme.main.primary80};
    font-family: Consolas, Menlo, Monaco, monospace;
    font-weight: bold;
    font-size: 78px;
    opacity: 0.8;
  }
  &:before {
    content: '{';
    display: inline-block;
    animation: pulse 0.4s alternate infinite ease-in-out;
  }
  &:after {
    content: '}';
    display: inline-block;
    animation: pulse 0.4s 0.3s alternate infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
      color: ${props => props.theme.main.primary80};
    }
    50% {
      transform: scale(0.8);
      opacity: 0.5;
      color: ${props => props.theme.main.secondary80};
    }
    100% {
      transform: scale(1);
      opacity: 1;
      color: ${props => props.theme.main.primary80};
    }
  }
`;

export const Spinner34 = styled.div`
  & {
    position: relative;
    width: 164px;
    height: 164px;
    border-radius: 50%;
    animation: rotate 1.2s linear infinite;
  }
  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 40px;
    border: 1px solid ${props => props.theme.main.primary80};
    border-width: 12px 2px 7px;
    border-radius: 2px 2px 1px 1px;
    box-sizing: border-box;
    transform: rotate(45deg) translate(24px, -10px);
    background-image: linear-gradient(
        ${props => props.theme.main.primary80} 20px,
        transparent 0
      ),
      linear-gradient(
        ${props => props.theme.main.primary80} 30px,
        transparent 0
      ),
      linear-gradient(
        ${props => props.theme.main.primary80} 30px,
        transparent 0
      );
    background-size: 10px 12px, 1px 30px, 1px 30px;
    background-repeat: no-repeat;
    background-position: center, 12px 0px, 3px 0px;
  }
  &::after {
    content: '';
    position: absolute;
    height: 4px;
    width: 4px;
    left: 20px;
    top: 47px;
    border-radius: 50%;
    color: ${props => props.theme.main.secondary80};
    box-shadow: -4px 7px 2px, -7px 16px 3px 1px, -11px 24px 4px 1px,
      -6px 24px 4px 1px, -14px 35px 6px 2px, -5px 36px 8px 2px,
      -5px 45px 8px 2px, -14px 49px 8px 2px, 6px 60px 11px 1px,
      -11px 66px 11px 1px, 11px 75px 13px, -1px 82px 15px;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner35 = styled.div`
  & {
    position: relative;
    background: #ff3d00;
    width: 80px;
    height: 30px;
    line-height: 18px;
    text-align: center;
    color: #931010;
    font-weight: 700;
    letter-spacing: 0.5px;
    font-size: 14px;
    box-sizing: border-box;
    border: 5px groove ${props => props.theme.main.primary80};
    border-radius: 0 0 4px 4px;
    box-shadow: 0 5px 7px #0002;
  }
  &:before {
    content: '';
    width: 70px;
    height: 80px;
    background: #fff;
    box-shadow: 0 0 10px #0003;
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
    bottom: calc(100% + 6px);
    animation: loadPaper 4s ease-in infinite;
  }
  &:after {
    content: '';
    width: 70px;
    height: 80px;
    background: linear-gradient(to right, #fff 50%, #0000 51%);
    background-size: 9px 80px;
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
    top: calc(100% + 6px);
    animation: disposePaper 4s ease-in infinite;
  }

  @keyframes loadPaper {
    0%,
    10% {
      height: 80px;
      bottom: calc(100% + 40px);
    }
    50% {
      height: 80px;
      bottom: calc(100% + 6px);
    }
    75%,
    100% {
      height: 0px;
      bottom: calc(100% + 6px);
    }
  }

  @keyframes disposePaper {
    0%,
    50% {
      height: 0px;
      top: calc(100% + 6px);
    }
    75% {
      height: 80px;
      top: calc(100% + 6px);
      opacity: 1;
    }
    100% {
      height: 80px;
      top: calc(100% + 40px);
      opacity: 0;
    }
  }
`;

export const Spinner36 = styled.div`
  & {
    position: relative;
    border-style: solid;
    box-sizing: border-box;
    border-width: 40px 60px 30px 60px;
    border-color: #3760c9 #96ddfc #96ddfc #36bbf7;
    animation: envFloating 1s ease-in infinite alternate;
  }

  &:after {
    content: '';
    position: absolute;
    right: 62px;
    top: -40px;
    height: 70px;
    width: 50px;
    background-image: linear-gradient(#fff 45px, transparent 0),
      linear-gradient(#fff 45px, transparent 0),
      linear-gradient(#fff 45px, transparent 0);
    background-repeat: no-repeat;
    background-size: 30px 4px;
    background-position: 0px 11px, 8px 35px, 0px 60px;
    animation: envDropping 0.75s linear infinite;
  }

  @keyframes envFloating {
    0% {
      transform: translate(-2px, -5px);
    }
    100% {
      transform: translate(0, 5px);
    }
  }

  @keyframes envDropping {
    0% {
      background-position: 100px 11px, 115px 35px, 105px 60px;
      opacity: 1;
    }
    50% {
      background-position: 0px 11px, 20px 35px, 5px 60px;
    }
    60% {
      background-position: -30px 11px, 0px 35px, -10px 60px;
    }
    75%,
    100% {
      background-position: -30px 11px, -30px 35px, -30px 60px;
      opacity: 0;
    }
  }
`;

export const Spinner37 = styled.div`
  & {
    position: relative;
    width: 100px;
    height: 130px;
    background: #eee;
    border-radius: 4px;
  }
  &:before {
    content: '';
    position: absolute;
    width: 54px;
    height: 25px;
    left: 50%;
    top: 0;
    background-image: radial-gradient(
        ellipse at center,
        #0000 24%,
        ${props => props.theme.main.primary80} 25%,
        ${props => props.theme.main.primary80} 64%,
        #0000 65%
      ),
      linear-gradient(
        to bottom,
        #0000 34%,
        ${props => props.theme.main.primary80} 35%
      );
    background-size: 12px 12px, 100% auto;
    background-repeat: no-repeat;
    background-position: center top;
    transform: translate(-50%, -65%);
    box-shadow: 0 -3px rgba(0, 0, 0, 0.25) inset;
  }
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    width: 66%;
    height: 60%;
    background: linear-gradient(
      to bottom,
      ${props => props.theme.main.secondary80} 30%,
      #0000 31%
    );
    background-size: 100% 16px;
    animation: writeDown 2s ease-out infinite;
  }

  @keyframes writeDown {
    0% {
      height: 0%;
      opacity: 0;
    }
    20% {
      height: 0%;
      opacity: 1;
    }
    80% {
      height: 65%;
      opacity: 1;
    }
    100% {
      height: 65%;
      opacity: 0;
    }
  }
`;
export const Spinner38 = styled.div`
  & {
    width: 100px;
    height: 75px;
    margin: 0 auto;
    background: #fff;
    position: relative;
    border-radius: 100%;
  }
  &:before {
    content: '';
    position: absolute;
    box-sizing: border-box;
    border: 15px solid transparent;
    border-top: 25px solid #fff;
    transform: rotate(45deg);
    top: 50px;
    left: -15px;
  }

  &:after {
    content: '';
    width: 12px;
    height: 12px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #ff3d00;
    box-shadow: 20px 0 #ff3d00, -20px 0 #ff3d00;
    animation: flash 0.5s ease-out infinite alternate;
  }

  @keyframes flash {
    0% {
      background-color: rgba(255, 60, 0, 0.25);
      box-shadow: 20px 0 rgba(255, 60, 0, 0.25), -20px 0 #ff3d00;
    }
    50% {
      background-color: #ff3d00;
      box-shadow: 20px 0 rgba(255, 60, 0, 0.25), -20px 0 rgba(255, 60, 0, 0.25);
    }
    100% {
      background-color: rgba(255, 60, 0, 0.25);
      box-shadow: 20px 0 #ff3d00, -20px 0 rgba(255, 60, 0, 0.25);
    }
  }
`;
