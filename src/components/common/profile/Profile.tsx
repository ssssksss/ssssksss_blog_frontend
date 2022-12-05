import styled from "@emotion/styled";

interface IProfilePros {
  imageUrl?: string;
  name?: string;
  width?: string;
  height?: string;
  size?: string;
  imgBackgroundColor?: string;
  borderRadius?: string;
  gap?: string;
  onClick?: () => void;
  noCursor?: boolean;
}

const Profile = ({
  imageUrl,
  width,
  height,
  size,
  name,
  imgBackgroundColor,
  borderRadius,
  gap,
  onClick,
  noCursor,
}: IProfilePros) => {
  return (
    <Container gap={gap}>
      <div>
        <Img
          alt="footer_icon"
          src={imageUrl}
          width={width}
          height={height}
          size={size}
          imgBackgroundColor={imgBackgroundColor}
          borderRadius={borderRadius}
          onClick={onClick}
          noCursor={noCursor}
        />
      </div>
      <div>
        <span> {name} </span>
      </div>
    </Container>
  );
};

export default Profile;

const Container = styled.div<IProfilePros>`
  display: flex;
  flex-flow: nowrap column;
  align-items: center;
  gap: ${(props) => props.gap};

  & > div:nth-of-type(1) {
    height: 60%;
  }
  & > div:nth-of-type(2) {
    height: 40%;
  }
`;
const Img = styled.img<IProfilePros>`
  width: ${(props) => props.size || props.width};
  height: ${(props) => props.size || props.height};
  background-color: ${(props) => props.imgBackgroundColor};
  border-radius: ${(props) => props.borderRadius};
  &:hover {
    cursor: ${(props) => (props.noCursor ? "default" : "pointer")};
  }
`;
