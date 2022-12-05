import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface ISocialButtonProps {
  backColor?: string;
  fontColor?: string;
  imgsrc: string;
  title: string;
  href?: string;
}

interface IColor {
  backColor: string | undefined;
  fontColor: string | undefined;
}
export default function SocialButton(props: ISocialButtonProps) {
  const router = useRouter();

  const onClickSocialLogin = () => {
    if (!props.href) return;

    router.push(props.href);
  };

  return (
    <Button
      onClick={onClickSocialLogin}
      backColor={props.backColor}
      fontColor={props.fontColor}
    >
      <Img src={props.imgsrc} />
      {props.title}
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  outline: 0;
  border-radius: 10px;
  box-shadow: 0px 1px 1px 1px #e4e4e4;
  background-color: ${(props: IColor) => props.backColor};
  color: ${(props: IColor) => props.fontColor};
  position: relative;
  ${theme.fontSizes.sm}
  font-weight: 400;
  font-size: 16px;
`;

const Img = styled.img`
  width: 50px;
  padding-left: 10px;
  aspect-ratio: 1;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
`;
