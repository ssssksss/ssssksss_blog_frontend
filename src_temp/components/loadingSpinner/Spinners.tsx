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
  border: 0.8rem solid;
  border-color: #fff #0000;
  animation: s1 1s infinite;

  @keyframes s1 {
    to {
      transform: rotate(0.5turn);
    }
  }
`;

export const Spinner2 = styled.div`
  width: 5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 0.8rem solid lightblue;
  border-right-color: orange;
  animation: s2 1s infinite linear;

  @keyframes s2 {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner3 = styled.div`
  width: 5rem;
  padding: 0.8rem;
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
  width: 5rem;
  --b: 0.8rem; /* the border thickness */
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 0.1rem;
  background: conic-gradient(#0000 10%, #f03355) content-box;
  -webkit-mask: repeating-conic-gradient(
      #0000 0deg,
      #000 1deg 20deg,
      #0000 21deg 36deg
    ),
    radial-gradient(
      farthest-side,
      #0000 calc(100% - var(--b) - 0.1rem),
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
  width: 5rem;
  --b: 0.8rem; /* the border thickness */
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
      #0000 calc(100% - var(--b) - 0.1rem),
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
  width: 5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 0.3rem;
  background:
    radial-gradient(farthest-side, #ffa516 95%, #0000) 50% 0/1.2rem 1.2rem
      no-repeat,
    radial-gradient(
        farthest-side,
        #0000 calc(100% - 0.5rem),
        #ffa516 calc(100% - 0.4rem)
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
  width: 5rem;
  aspect-ratio: 1;
  --_c: radial-gradient(farthest-side, #25b09b 92%, #0000);
  background:
    var(--_c) top,
    var(--_c) left,
    var(--_c) right,
    var(--_c) bottom;
  background-size: 1.2rem 1.2rem;
  background-repeat: no-repeat;
  animation: s7 1s infinite;
  @keyframes s7 {
    to {
      transform: rotate(0.5turn);
    }
  }
`;

export const Spinner8 = styled.div`
  width: 5rem;
  aspect-ratio: 1;
  color: #f03355;
  --_c: no-repeat radial-gradient(farthest-side, currentColor 92%, #0000);
  background:
    var(--_c) 50% 0 /1.2rem 1.2rem,
    var(--_c) 50% 100%/1.2rem 1.2rem,
    var(--_c) 100% 50%/1.2rem 1.2rem,
    var(--_c) 0 50%/1.2rem 1.2rem,
    var(--_c) 50% 50%/1.2rem 1.2rem,
    conic-gradient(from 90deg at 0.4rem 0.4rem, #0000 90deg, currentColor 0) -0.4rem -0.4rem /
      calc(50% + 0.2rem) calc(50% + 0.2rem);
  animation: s8 1s infinite linear;
  @keyframes s8 {
    to {
      transform: rotate(0.5turn);
    }
  }
`;

export const Spinner9 = styled.div`
  width: 5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #f03355 95%, #0000) 50% 0.1rem/1.2rem 1.2rem
      no-repeat,
    radial-gradient(farthest-side, #0000 calc(100% - 1.4rem), #ccc 0);
  animation: s9 2s infinite linear;
  @keyframes s9 {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner10 = styled.div`
  width: 5rem;
  aspect-ratio: 1;
  color: #854f1d;
  border-radius: 50%;
  display: grid;
  background:
    conic-gradient(from 90deg at 0.4rem 0.4rem, #0000 90deg, currentColor 0) -0.4rem -0.4rem /
      calc(50% + 0.2rem) calc(50% + 0.2rem),
    radial-gradient(
        farthest-side,
        currentColor 0.6rem,
        #0000 0.7rem calc(100% - 0.6rem),
        currentColor calc(100% - 0.5rem)
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
  width: 5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 0.6rem;
  background:
    conic-gradient(from 135deg at top, currentColor 90deg, #0000 0) 0
      calc(50% - 0.4rem) / 10.7rem 8.5rem,
    radial-gradient(
        farthest-side at bottom left,
        #0000 calc(100% - 0.6rem),
        currentColor calc(100% - 0.5rem) 99%,
        #0000
      )
      top right/50% 50% content-box content-box,
    radial-gradient(
        farthest-side at top,
        #0000 calc(100% - 0.6rem),
        currentColor calc(100% - 0.5rem) 99%,
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
  width: 5rem;
  aspect-ratio: 1;
  display: grid;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    --c: radial-gradient(farthest-side, #25b09b 92%, #0000);
    background:
      var(--c) 50% 0,
      var(--c) 50% 100%,
      var(--c) 100% 50%,
      var(--c) 0 50%;
    background-size: 1.2rem 1.2rem;
    background-repeat: no-repeat;
    animation: s2 1s infinite;
  }
  &::before {
    margin: 0.4rem;
    filter: hue-rotate(45deg);
    background-size: 0.8rem 0.8rem;
    animation-timing-function: linear;
  }

  @keyframes s2 {
    100% {
      transform: rotate(0.5turn);
    }
  }
`;
export const Spinner13 = styled.div`
  width: 5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #ffa516 94%, #0000) top/0.8rem 0.8rem
      no-repeat,
    conic-gradient(#0000 30%, #ffa516);
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 0.8rem),
    #000 0
  );
  animation: s3 1s infinite linear;

  @keyframes s3 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export const Spinner14 = styled.div`
  width: 5rem;
  aspect-ratio: 1;
  display: grid;
  animation: s4 4s infinite;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    border: 0.8rem solid;
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
  width: 5rem;
  aspect-ratio: 1;
  display: grid;
  border: 0.4rem solid #0000;
  border-radius: 50%;
  border-right-color: #25b09b;
  animation: s5 1s infinite linear;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    margin: 0.2rem;
    border: inherit;
    border-radius: 50%;
    animation: s5 2s infinite;
  }

  &::after {
    margin: 0.8rem;
    animation-duration: 3s;
  }

  @keyframes s5 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export const Spinner16 = styled.div`
  width: 5rem;
  aspect-ratio: 1;
  display: grid;
  border: 0.4rem solid #0000;
  border-radius: 50%;
  border-color: #ccc #0000;
  animation: s6 1s infinite linear;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    margin: 0.2rem;
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
    margin: 0.8rem;
  }

  @keyframes s6 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export const Spinner17 = styled.div`
  width: 7rem;
  aspect-ratio: 1;
  background:
    radial-gradient(farthest-side, #ffa516 90%, #0000) center/1.6rem 1.6rem,
    radial-gradient(farthest-side, green 90%, #0000) bottom/1.2rem 1.2rem;
  background-repeat: no-repeat;
  animation: s7 1s infinite linear;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 0.8rem;
    aspect-ratio: 1;
    inset: auto 0 1.6rem;
    margin: auto;
    background: #ccc;
    border-radius: 50%;
    transform-origin: 50% calc(100% + 1rem);
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
  width: 5rem;
  aspect-ratio: 1;
  --c: radial-gradient(farthest-side, #514b82 92%, #0000);
  background:
    var(--c) 50% 0,
    var(--c) 50% 100%,
    var(--c) 100% 50%,
    var(--c) 0 50%;
  background-size: 1rem 1rem;
  background-repeat: no-repeat;
  animation: s8 1s infinite;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: 0.3rem;
    background: repeating-conic-gradient(#0000 0 35deg, #514b82 0 90deg);
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 0.3rem),
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
  width: 5rem;
  aspect-ratio: 1;
  display: grid;
  color: #854f1d;
  background: radial-gradient(
    farthest-side,
    currentColor calc(100% - 0.6rem),
    #0000 calc(100% - 0.5rem) 0
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 10.3rem),
    #000 calc(100% - 1.2rem)
  );
  border-radius: 50%;
  animation: s9 2s infinite linear;
  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    background:
      linear-gradient(currentColor 0 0) center,
      linear-gradient(currentColor 0 0) center;
    background-size:
      100% 1rem,
      1rem 100%;
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
  width: 5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 0.8rem solid #514b82;
  animation:
    s10-1 0.8s infinite linear alternate,
    s10-2 1.6s infinite linear;
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
  width: 5rem;
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
  width: 5rem;
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
  width: 5rem;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background:
    linear-gradient(0deg, rgb(0 0 0/50%) 30%, #0000 0 70%, rgb(0 0 0/100%) 0)
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
  width: 5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 0.8rem solid #0000;
  border-right-color: #ffa50097;
  position: relative;
  animation: s4 1s infinite linear;
  &:before,
  &:after {
    content: '';
    position: absolute;
    inset: -0.8rem;
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
  width: 5rem;
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
  width: 5rem;
  aspect-ratio: 1;
  display: grid;
  -webkit-mask: conic-gradient(from 15deg, #0000, #000);
  animation: s6 1s infinite steps(12);
  background:
    radial-gradient(closest-side at 50% 12.5%, #f03355 96%, #0000) 50% 0/20% 80%
      repeat-y,
    radial-gradient(closest-side at 12.5% 50%, #f03355 96%, #0000) 0 50%/80% 20%
      repeat-x;
  &:before,
  &:after {
    background:
      radial-gradient(closest-side at 50% 12.5%, #f03355 96%, #0000) 50% 0/20%
        80% repeat-y,
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
  --d: 2.2rem;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  color: #25b09b;
  box-shadow:
    calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
    calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 0.1rem,
    calc(0 * var(--d)) calc(1 * var(--d)) 0 0.2rem,
    calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 0.3rem,
    calc(-1 * var(--d)) calc(0 * var(--d)) 0 0.4rem,
    calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 0.5rem,
    calc(0 * var(--d)) calc(-1 * var(--d)) 0 0.6rem;
  animation: s7 1s infinite steps(8);

  @keyframes s7 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner28 = styled.div`
  width: 5rem;
  aspect-ratio: 1;
  display: grid;
  color: #514b82;
  background: conic-gradient(
      from 90deg at 0.3rem 0.3rem,
      #0000 90deg,
      currentColor 0
    ) -0.3rem -0.3rem / calc(50% + 1.5rem) calc(50% + 1.5rem);
  animation: s8 2s infinite;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    background: repeating-conic-gradient(#0000 0 35deg, currentColor 0 90deg);
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 0.3rem),
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
  width: 5rem;
  aspect-ratio: 1;
  --_c: no-repeat linear-gradient(orange 0 0) 50%;
  background:
    var(--_c) / 100% 50%,
    var(--_c) / 50% 100%;
  border-radius: 50%;
  animation: s9 2s infinite linear;

  @keyframes s9 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const Spinner30 = styled.div`
  --R: 3rem;
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
    background:
      radial-gradient(farthest-side, var(--g1))
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
    perspective: 100rem;
    border-radius: 50%;
    width: 4.8rem;
    height: 4.8rem;
    color: ${(props) => props.theme.main.primary80};
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
    color: ${(props) => props.theme.main.secondary80};
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
      box-shadow: 0.2em 0rem 0 0rem currentcolor;
    }
    12% {
      box-shadow: 0.2em 0.2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 0.2em 0 0rem currentcolor;
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
      box-shadow: 0rem -0.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: 0.2em -0.2em 0 0 currentcolor;
    }
  }
`;

// export const Spinner32 = styled.div`
//   --box-size: 50vw;
//   & {
//     width: 4.8rem;
//     height: 4.8rem;
//     aspect-ratio: 1;
//     display: inline-block;
//     position: relative;
//     transform: rotate(45deg);
//   }
//   &::before {
//     content: '';
//     box-sizing: border-box;
//     width: 2.4rem;
//     height: 2.4rem;
//     position: absolute;
//     left: 0;
//     top: -2.4rem;
//     animation: animloader 4s ease infinite;
//   }
//   &::after {
//     content: '';
//     box-sizing: border-box;
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 2.4rem;
//     height: 2.4rem;
//     /* background: rgba(255, 255, 255, 0.85); */
//     /* 이게 이동하는 블럭 색상 */
//     background: ${props => props.theme.main.primary80};
//     box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
//     animation: animloader2 2s ease infinite;
//   }

//   @keyframes animloader {
//     0% {
//       box-shadow: 0 2.4rem rgba(255, 255, 255, 0),
//         2.4rem 2.4rem rgba(255, 255, 255, 0), 2.4rem 4.8rem rgba(255, 255, 255, 0),
//         0rem 4.8rem rgba(255, 255, 255, 0);
//     }
//     12% {
//       box-shadow: 0 2.4rem ${props => props.theme.main.secondary80},
//         2.4rem 2.4rem rgba(255, 255, 255, 0), 2.4rem 4.8rem rgba(255, 255, 255, 0),
//         0rem 4.8rem rgba(255, 255, 255, 0);
//     }
//     25% {
//       box-shadow: 0 2.4rem ${props => props.theme.main.secondary80},
//         2.4rem 2.4rem ${props => props.theme.main.secondary80},
//         2.4rem 4.8rem rgba(255, 255, 255, 0), 0rem 4.8rem rgba(255, 255, 255, 0);
//     }
//     37% {
//       box-shadow: 0 2.4rem ${props => props.theme.main.secondary80},
//         2.4rem 2.4rem ${props => props.theme.main.secondary80},
//         2.4rem 4.8rem ${props => props.theme.main.secondary80},
//         0rem 4.8rem rgba(255, 255, 255, 0);
//     }
//     50% {
//       box-shadow: 0 2.4rem ${props => props.theme.main.secondary80},
//         2.4rem 2.4rem ${props => props.theme.main.secondary80},
//         2.4rem 4.8rem ${props => props.theme.main.secondary80},
//         0rem 4.8rem ${props => props.theme.main.secondary80};
//     }
//     62% {
//       box-shadow: 0 2.4rem rgba(255, 255, 255, 0),
//         2.4rem 2.4rem ${props => props.theme.main.secondary80},
//         2.4rem 4.8rem ${props => props.theme.main.secondary80},
//         0rem 4.8rem ${props => props.theme.main.secondary80};
//     }
//     75% {
//       box-shadow: 0 2.4rem rgba(255, 255, 255, 0),
//         2.4rem 2.4rem rgba(255, 255, 255, 0),
//         2.4rem 4.8rem ${props => props.theme.main.secondary80},
//         0rem 4.8rem ${props => props.theme.main.secondary80};
//     }
//     87% {
//       box-shadow: 0 2.4rem rgba(255, 255, 255, 0),
//         2.4rem 2.4rem rgba(255, 255, 255, 0), 2.4rem 4.8rem rgba(255, 255, 255, 0),
//         0rem 4.8rem ${props => props.theme.main.secondary80};
//     }
//     100% {
//       box-shadow: 0 2.4rem rgba(255, 255, 255, 0),
//         2.4rem 2.4rem rgba(255, 255, 255, 0), 2.4rem 4.8rem rgba(255, 255, 255, 0),
//         0rem 4.8rem rgba(255, 255, 255, 0);
//     }
//   }

//   @keyframes animloader2 {
//     0% {
//       transform: translate(0, 0) rotateX(0) rotateY(0);
//     }
//     25% {
//       transform: translate(100%, 0) rotateX(0) rotateY(180deg);
//     }
//     50% {
//       transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
//     }
//     75% {
//       transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
//     }
//     100% {
//       transform: translate(0, 0) rotateX(0) rotateY(360deg);
//     }
//   }
// `;

export const Spinner32 = styled.div`
  --box-size: 50vw;
  & {
    width: var(--box-size);
    height: var(--box-size);
    aspect-ratio: 1;
    display: inline-block;
    position: relative;
    transform: rotate(45deg);
  }
  &::before {
    content: '';
    box-sizing: border-box;
    width: calc(var(--box-size) / 2);
    height: calc(var(--box-size) / 2);
    position: absolute;
    left: 0;
    top: -calc(var(--box-size) / 2);
    animation: animloader 4s ease infinite;
  }
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: calc(var(--box-size) / 2);
    height: calc(var(--box-size) / 2);
    /* background: rgba(255, 255, 255, 0.85); */
    /* 이게 이동하는 블럭 색상 */
    background: ${(props) => props.theme.main.primary80};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
    animation: animloader2 2s ease infinite;
  }

  @keyframes animloader {
    0% {
      box-shadow:
        0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0rem var(--box-size) rgba(255, 255, 255, 0);
    }
    12% {
      box-shadow:
        0 calc(var(--box-size) / 2) ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0rem var(--box-size) rgba(255, 255, 255, 0);
    }
    25% {
      box-shadow:
        0 calc(var(--box-size) / 2) ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0rem var(--box-size) rgba(255, 255, 255, 0);
    }
    37% {
      box-shadow:
        0 calc(var(--box-size) / 2) ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size)
          ${(props) => props.theme.main.secondary80},
        0rem var(--box-size) rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow:
        0 calc(var(--box-size) / 2) ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size)
          ${(props) => props.theme.main.secondary80},
        0rem var(--box-size) ${(props) => props.theme.main.secondary80};
    }
    62% {
      box-shadow:
        0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size)
          ${(props) => props.theme.main.secondary80},
        0rem var(--box-size) ${(props) => props.theme.main.secondary80};
    }
    75% {
      box-shadow:
        0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size)
          ${(props) => props.theme.main.secondary80},
        0rem var(--box-size) ${(props) => props.theme.main.secondary80};
    }
    87% {
      box-shadow:
        0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0rem var(--box-size) ${(props) => props.theme.main.secondary80};
    }
    100% {
      box-shadow:
        0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0rem var(--box-size) rgba(255, 255, 255, 0);
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
    color: ${(props) => props.theme.main.primary80};
    font-family: Consolas, Menlo, Monaco, monospace;
    font-weight: bold;
    font-size: 7.8rem;
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
      color: ${(props) => props.theme.main.primary80};
    }
    50% {
      transform: scale(0.8);
      opacity: 0.5;
      color: ${(props) => props.theme.main.secondary80};
    }
    100% {
      transform: scale(1);
      opacity: 1;
      color: ${(props) => props.theme.main.primary80};
    }
  }
`;

export const Spinner34 = styled.div`
  & {
    position: relative;
    width: 16.4rem;
    height: 16.4rem;
    border-radius: 50%;
    animation: rotate 1.2s linear infinite;
  }
  &::before {
    content: '';
    position: absolute;
    width: 2rem;
    height: 4rem;
    border: 0.1rem solid ${(props) => props.theme.main.primary80};
    border-width: 1.2rem 0.2rem 0.7rem;
    border-radius: 0.2rem 0.2rem 0.1rem 0.1rem;
    box-sizing: border-box;
    transform: rotate(45deg) translate(2.4rem, -1rem);
    background-image: linear-gradient(
        ${(props) => props.theme.main.primary80} 2rem,
        transparent 0
      ),
      linear-gradient(
        ${(props) => props.theme.main.primary80} 3rem,
        transparent 0
      ),
      linear-gradient(
        ${(props) => props.theme.main.primary80} 3rem,
        transparent 0
      );
    background-size:
      1rem 1.2rem,
      0.1rem 3rem,
      0.1rem 3rem;
    background-repeat: no-repeat;
    background-position:
      center,
      1.2rem 0rem,
      0.3rem 0rem;
  }
  &::after {
    content: '';
    position: absolute;
    height: 0.4rem;
    width: 0.4rem;
    left: 2rem;
    top: 40.7rem;
    border-radius: 50%;
    color: ${(props) => props.theme.main.secondary80};
    box-shadow:
      -0.4rem 0.7rem 0.2rem,
      -0.7rem 1.6rem 0.3rem 0.1rem,
      -1.1rem 2.4rem 0.4rem 0.1rem,
      -0.6rem 2.4rem 0.4rem 0.1rem,
      -1.4rem 3.5rem 0.6rem 0.2rem,
      -0.5rem 3.6rem 0.8rem 0.2rem,
      -0.5rem 4.5rem 0.8rem 0.2rem,
      -1.4rem 4.9rem 0.8rem 0.2rem,
      0.6rem 6rem 1.1rem 0.1rem,
      -1.1rem 6.6rem 1.1rem 0.1rem,
      1.1rem 7.5rem 10.3rem,
      -0.1rem 8.2rem 1.5rem;
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
    width: 8rem;
    height: 3rem;
    line-height: 1.8rem;
    text-align: center;
    color: #931010;
    font-weight: 700;
    letter-spacing: 0.5rem;
    font-size: 1.4rem;
    box-sizing: border-box;
    border: 0.5rem groove ${(props) => props.theme.main.primary80};
    border-radius: 0 0 0.4rem 0.4rem;
    box-shadow: 0 0.5rem 0.7rem #0002;
  }
  &:before {
    content: '';
    width: 7rem;
    height: 8rem;
    background: #fff;
    box-shadow: 0 0 1rem #0003;
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
    bottom: calc(100% + 0.6rem);
    animation: loadPaper 4s ease-in infinite;
  }
  &:after {
    content: '';
    width: 7rem;
    height: 8rem;
    background: linear-gradient(to right, #fff 50%, #0000 51%);
    background-size: 0.9rem 8rem;
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
    top: calc(100% + 0.6rem);
    animation: disposePaper 4s ease-in infinite;
  }

  @keyframes loadPaper {
    0%,
    10% {
      height: 8rem;
      bottom: calc(100% + 4rem);
    }
    50% {
      height: 8rem;
      bottom: calc(100% + 0.6rem);
    }
    75%,
    100% {
      height: 0rem;
      bottom: calc(100% + 0.6rem);
    }
  }

  @keyframes disposePaper {
    0%,
    50% {
      height: 0rem;
      top: calc(100% + 0.6rem);
    }
    75% {
      height: 8rem;
      top: calc(100% + 0.6rem);
      opacity: 1;
    }
    100% {
      height: 8rem;
      top: calc(100% + 4rem);
      opacity: 0;
    }
  }
`;

export const Spinner36 = styled.div`
  & {
    position: relative;
    border-style: solid;
    box-sizing: border-box;
    border-width: 4rem 6rem 3rem 6rem;
    border-color: #3760c9 #96ddfc #96ddfc #36bbf7;
    animation: envFloating 1s ease-in infinite alternate;
  }

  &:after {
    content: '';
    position: absolute;
    right: 6.2rem;
    top: -4rem;
    height: 7rem;
    width: 5rem;
    background-image: linear-gradient(#fff 4.5rem, transparent 0),
      linear-gradient(#fff 4.5rem, transparent 0),
      linear-gradient(#fff 4.5rem, transparent 0);
    background-repeat: no-repeat;
    background-size: 3rem 0.4rem;
    background-position:
      0rem 1.1rem,
      0.8rem 3.5rem,
      0rem 6rem;
    animation: envDropping 0.75s linear infinite;
  }

  @keyframes envFloating {
    0% {
      transform: translate(-0.2rem, -0.5rem);
    }
    100% {
      transform: translate(0, 0.5rem);
    }
  }

  @keyframes envDropping {
    0% {
      background-position:
        10rem 1.1rem,
        11.5rem 3.5rem,
        10.5rem 6rem;
      opacity: 1;
    }
    50% {
      background-position:
        0rem 1.1rem,
        2rem 3.5rem,
        0.5rem 6rem;
    }
    60% {
      background-position:
        -3rem 1.1rem,
        0rem 3.5rem,
        -1rem 6rem;
    }
    75%,
    100% {
      background-position:
        -3rem 1.1rem,
        -3rem 3.5rem,
        -3rem 6rem;
      opacity: 0;
    }
  }
`;

export const Spinner37 = styled.div`
  & {
    position: relative;
    width: 10rem;
    height: 13rem;
    background: #eee;
    border-radius: 0.4rem;
  }
  &:before {
    content: '';
    position: absolute;
    width: 5.4rem;
    height: 2.5rem;
    left: 50%;
    top: 0;
    background-image: radial-gradient(
        ellipse at center,
        #0000 24%,
        ${(props) => props.theme.main.primary80} 25%,
        ${(props) => props.theme.main.primary80} 64%,
        #0000 65%
      ),
      linear-gradient(
        to bottom,
        #0000 34%,
        ${(props) => props.theme.main.primary80} 35%
      );
    background-size:
      1.2rem 1.2rem,
      100% auto;
    background-repeat: no-repeat;
    background-position: center top;
    transform: translate(-50%, -65%);
    box-shadow: 0 -0.3rem rgba(0, 0, 0, 0.25) inset;
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
      ${(props) => props.theme.main.secondary80} 30%,
      #0000 31%
    );
    background-size: 100% 1.6rem;
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
    width: 10rem;
    height: 7.5rem;
    margin: 0 auto;
    background: #fff;
    position: relative;
    border-radius: 100%;
  }
  &:before {
    content: '';
    position: absolute;
    box-sizing: border-box;
    border: 1.5rem solid transparent;
    border-top: 2.5rem solid #fff;
    transform: rotate(45deg);
    top: 5rem;
    left: -1.5rem;
  }

  &:after {
    content: '';
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #ff3d00;
    box-shadow:
      2rem 0 #ff3d00,
      -2rem 0 #ff3d00;
    animation: flash 0.5s ease-out infinite alternate;
  }

  @keyframes flash {
    0% {
      background-color: rgba(255, 60, 0, 0.25);
      box-shadow:
        2rem 0 rgba(255, 60, 0, 0.25),
        -2rem 0 #ff3d00;
    }
    50% {
      background-color: #ff3d00;
      box-shadow:
        2rem 0 rgba(255, 60, 0, 0.25),
        -2rem 0 rgba(255, 60, 0, 0.25);
    }
    100% {
      background-color: rgba(255, 60, 0, 0.25);
      box-shadow:
        2rem 0 #ff3d00,
        -2rem 0 rgba(255, 60, 0, 0.25);
    }
  }
`;
