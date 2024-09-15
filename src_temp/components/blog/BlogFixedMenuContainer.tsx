import Button from "@components/common/button/Button";
import styled from "@emotion/styled";
import { faArrowDown, faArrowUp, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "@redux/store/reducers";
import { CC } from "@styles/commonComponentStyle";
import Link from "next/link";
import { useSelector } from "react-redux";

/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file BlogFixedMenuContainer.tsx
 * @version 0.0.1 "2024-06-02 22:45:21"
 * @description 설명 
 */
const BlogFixedMenuContainer = () => {
      const authStore = useSelector((state: RootState) => state.authStore);
  return (
    <FixedContainer>
      <CC.ColLeftCenterBox bg={'primary20'} pd={'0.4rem'} gap={8}>
        {authStore.role == 'ROLE_ADMIN' && (
          <Link href={`/blog/create`}>
            <Button>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Link>
        )}
        <Button onClick={() => window.scrollTo(0, 0)}>
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
        <Button
          onClick={() => window.scrollTo(0, window.document.body.scrollHeight)}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </Button>
      </CC.ColLeftCenterBox>
    </FixedContainer>
  );
};
export default BlogFixedMenuContainer

const FixedContainer = styled(CC.ColumnDiv)`
  position: sticky;
  height: 0px;
  left: calc(100% - 2rem);
  top: 4rem;
  opacity: 0.6;

  & > div {
    position: fixed;
    top: 22rem;
    right: 0px;
  }

  button {
    background: ${(props) => props.theme.main.contrast};
    width: 2rem;
    height: 2rem;
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;