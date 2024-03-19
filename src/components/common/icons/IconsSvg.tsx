import styled from '@emotion/styled';
const EditIcon = (props: any) => {
  return (
    <IconSVG
      fill={props.fill}
      w={props.w}
      width="96"
      height="96"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_978_184)">
        <path
          d="M12 69V84H27L71.24 39.76L56.24 24.76L12 69ZM82.84 28.16C84.4 26.6 84.4 24.08 82.84 22.52L73.48 13.16C71.92 11.6 69.4 11.6 67.84 13.16L60.52 20.48L75.52 35.48L82.84 28.16Z"
          fill="#323232"
        />
      </g>
    </IconSVG>
  );
};

export const IconsSvg = {
  EditIcon,
};

const IconSVG = styled.svg<{ fill: any }>`
  align-self: center;
  width: ${(props) => props.w || '1.6rem'};
  aspect-ratio: 1;
  path {
    fill: ${(props) =>
      props.theme.colors?.[props.fill] ||
      props.theme.main?.[props.fill] ||
      props.fill};
  }
`;
