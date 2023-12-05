import { CC } from '@/styles/commonComponentStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@/components/common/button/Button';
import { Shell } from '@/components/common/shell/Shell';
import { Input } from '@/components/common/input/Input';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file YoutubePlayerModal.tsx
 * @version 0.0.1 "2023-09-24 00:47:28"
 * @description 설명
 */
const YoutubePlayerModal = () => {
  return (
    <Container>
      <Header>
        <span> 유튜브 플레이리스트 </span>
        <span>유튜브 링크와 제목을 넣으면 바로 유튜브 실행이 가능합니다. </span>
      </Header>
      <YoutubeCreateContainer>
        <CC.ColumnCenterDiv gap={4}>
          <Shell outline={true} color={'white80'} h={'34px'} pd={'0px'}>
            URL
          </Shell>
          <Shell outline={true} color={'white80'} h={'34px'} pd={'0px'}>
            제목
          </Shell>
        </CC.ColumnCenterDiv>
        <CC.ColumnCenterDiv gap={4}>
          <Input
            outline={true}
            color={'white80'}
            placeholderColor={'white80'}
            h={'34px'}
            pd={'6px'}
            placeholder="URL을 입력해주세요"
          />
          <Input
            outline={true}
            color={'white80'}
            placeholderColor={'white80'}
            h={'34px'}
            pd={'6px'}
            placeholder="제목을 입력해주세요"
          />
        </CC.ColumnCenterDiv>
        <CC.RowDiv>
          <Button
            outline={true}
            color={'white80'}
            h={'100%'}
            pd={'0px'}
            onClick={() => alert('test')}
          >
            <Image src={Icons.PlusIcon} alt="plus" />
          </Button>
        </CC.RowDiv>
      </YoutubeCreateContainer>
      <YoutubePlayListContainer>
        {[1, 2, 3].map(i => (
          <YoutubePlaylistItem>
            <CC.ColumnCenterDiv gap={4}>
              <Shell outline={true} color={'white80'} pd={'4px'}>
                URL
              </Shell>
              <Shell outline={true} color={'white80'} pd={'4px'}>
                제목
              </Shell>
            </CC.ColumnCenterDiv>
            <CC.ColumnCenterDiv gap={4}>
              <Input
                outline={true}
                color={'white80'}
                placeholderColor={'white80'}
                pd={'6px'}
                placeholder="URL을 입력해주세요"
              />
              <Input
                outline={true}
                color={'white80'}
                placeholderColor={'white80'}
                pd={'6px'}
                placeholder="제목을 입력해주세요"
              />
            </CC.ColumnCenterDiv>
            <CC.RowDiv gap={4}>
              <Button
                outline={true}
                color={'white80'}
                h={'100%'}
                pd={'0px'}
                onClick={() => alert('test')}
              >
                <Image src={Icons.CheckIcon} alt="check" />
              </Button>
              <Button
                outline={true}
                color={'white80'}
                h={'100%'}
                pd={'0px'}
                onClick={() => alert('test')}
              >
                <Image src={Icons.EditIcon} alt="edit" width={14} height={14} />
              </Button>
              <Button
                outline={true}
                color={'white80'}
                h={'100%'}
                pd={'0px'}
                onClick={() => alert('test')}
              >
                <Image
                  src={Icons.DeleteIcon}
                  alt="delete"
                  width={20}
                  height={20}
                />
              </Button>
            </CC.RowDiv>
          </YoutubePlaylistItem>
        ))}
      </YoutubePlayListContainer>
    </Container>
  );
};
export default YoutubePlayerModal;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  padding: 40px 10px 10px 10px;
  gap: 20px;
  color: ${props => props.theme.colors.white80};
`;

const commonStyle = css`
  border: 1px solid #fff;
  background: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(1px);
`;

const Header = styled.header`
  ${props => props.theme.flex.column};
  padding: 16px;
  gap: 0.25rem;
  align-self: stretch;
  border-radius: ${props => props.theme.borderRadius.br10};
  ${commonStyle};

  span:nth-of-type(1) {
    font-family: ${props => props.theme.fontFamily.cookieRunRegular};
    font-size: 20px;
  }

  span:nth-of-type(2) {
    color: ${props => props.theme.colors.black40};
  }
`;
const YoutubeCreateContainer = styled.div`
  border-radius: ${props => props.theme.borderRadius.br10};
  ${commonStyle};
  padding: 4px;
  gap: 4px;
  display: grid;
  grid-template-columns: 34px auto 24px;
`;
const YoutubePlayListContainer = styled(CC.ColumnDiv)`
  gap: 4px;
  height: 160px;
  overflow: scroll;
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const YoutubePlaylistItem = styled.div`
  border-radius: ${props => props.theme.borderRadius.br10};
  ${commonStyle};
  padding: 4px;
  gap: 4px;
  display: grid;
  grid-template-columns: 34px auto 24px 24px 24px;
  height: 64px;
`;
