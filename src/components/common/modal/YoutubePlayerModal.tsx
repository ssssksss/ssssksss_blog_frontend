import { YoutubeAPI } from '@api/YoutubeAPI';
import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import Input from '@components/common/input/Input';
import { Spinner1 } from '@components/loadingSpinner/Spinners';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import { CC } from '@styles/commonComponentStyle';
import UrlQueryStringToObject from '@utils/function/UrlQueryStringToObject';
import Image from 'next/image';
import { useReducer, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ConfirmButton } from '../button/ConfirmButton';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file YoutubePlayerModal.tsx
 * @version 0.0.1 "2023-09-24 00:47:28"
 * @description 설명
 */

const YoutubePlayerModal = () => {
  const inputRef = useRef<null>();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const createYoutubeLinkMutation = YoutubeAPI.createYoutubeLink({
    onSuccessHandler: (res) => {
      queryClient.setQueryData(['getYoutubeList'], (oldData) => {
        oldData.data?.youtubeList.unshift(res.data.data.data.youtube);
        return oldData;
      });
      setLoading(false);
    },
  });
  const getYoutubeLinkListResData = YoutubeAPI.getYoutubeLinkList();
  const deleteYoutubeLinkMutation = YoutubeAPI.deleteYoutubeLink({
    onSuccessHandler: (data) => {
      queryClient.setQueryData('getYoutubeList', (oldData) => {
        oldData.data.youtubeList = oldData?.data?.youtubeList.filter(
          (i) => i.id != data.variables.id,
        );
        return oldData;
      });
    },
  });
  const [, toggleHandler] = useReducer((prev) => !prev, true);

  const addYoutubeLinkHandler = async () => {
    createYoutubeLinkMutation({
      youtubeUrlKeyId: UrlQueryStringToObject(inputRef.current.value)?.v,
      youtubeUrl: inputRef.current.value,
    });
  };

  const copyLinkHandler = (youtubeUrl: string) => {
    navigator.clipboard.writeText(youtubeUrl);
    store.dispatch(
      SET_TOASTIFY_MESSAGE({
        type: 'success',
        message: `복사되었습니다.`,
      }),
    );
  };

  const deleteLinkHandler = (id: string) => {
    deleteYoutubeLinkMutation({
      id: id,
    });
  };

  const selectYoutubeLinkHandler = (data: unknown) => {
    window.localStorage.setItem('youtubeLink', data.youtubeUrl);
    window.localStorage.setItem('youtubeTitle', data.title);
    toggleHandler();
    store.dispatch(
      SET_TOASTIFY_MESSAGE({
        type: 'success',
        message: `선택되었습니다.`,
      }),
    );
  };

  return (
    <Container>
      <ArticleStyle>
        <CC.RowDiv gap={10}>
          <h2> Add YouTube Links </h2>
        </CC.RowDiv>
        <label htmlFor={'youtube-link'}> YouTube Link </label>
        <Input
          id={'youtube-link'}
          placeholder={'Enter YouTube link'}
          onKeyPressAction={addYoutubeLinkHandler}
          ref={inputRef}
        />
        <span> Add a YouTube video link here </span>
        <Button
          w={'100%'}
          onClick={() => {
            setLoading(true);
            addYoutubeLinkHandler();
          }}
          bg={'black80'}
        >
          {loading ? (
            <div className={'w-[1.5rem] aspect-square '}>
              <Spinner1 />
            </div>
          ) : (
            'Add Link'
          )}
        </Button>
      </ArticleStyle>
      <ul>
        {getYoutubeLinkListResData.isLoading ||
          getYoutubeLinkListResData.data?.data?.youtubeList.map((i, index) => (
            <LiStyle
              key={index}
              onClick={() => selectYoutubeLinkHandler(i)}
              active={
                i.youtubeUrl == window.localStorage.getItem('youtubeLink')
              }
            >
              <div className="w-[5rem] aspect-square">
                <img src={i.imageUrl} />
              </div>
              <div>
                <p> {`${i.title}`} </p>
                <CC.RowDiv color={'gray80'} gap={4}>
                  {JSON.parse(i.tags)?.map((j, index1) => (
                    <span key={index1}> {j} </span>
                  ))}
                </CC.RowDiv>
              </div>
              <ImageBox
                bg={'gray80'}
                onClick={(e) => {
                  e.stopPropagation();
                  copyLinkHandler(i.youtubeUrl);
                }}
              >
                <Image
                  src={Icons.CopyIcon}
                  width={'2.4rem'}
                  height={'2.4rem'}
                />
              </ImageBox>
              <ConfirmButton
                pd={'0.4rem'}
                brR={'0.8rem'}
                bg={'red80'}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteLinkHandler(i.id);
                }}
              >
                <Image
                  src={Icons.DeleteIcon}
                  width={'2.4rem'}
                  height={'2.4rem'}
                />
              </ConfirmButton>
            </LiStyle>
          ))}
      </ul>
    </Container>
  );
};
export default YoutubePlayerModal;
const Container = styled(CC.ColumnDiv.withComponent('section'))`
  gap: 0.8rem;
  width: 100%;

  ul {
    ${(props) => props.theme.scroll.hidden};
    outline: solid ${(props) => props.theme.main.primary80} 0.1rem;
    min-height: 12rem;
    width: 100%;
  }

  li {
    height: 6rem;
    border-bottom: solid ${(props) => props.theme.colors.gray40} 0.1rem;
    display: grid;
    grid-template-columns: 3.6rem calc(100% - 12.5rem) 3.6rem 3.6rem;
    padding: 0rem .25rem;
    gap: 0.4rem;
    align-items: center;
    width: 100%;

    &:hover {
      background: ${(props) => props.theme.main.primary40};
      cursor: pointer;
      color: ${(props) => props.theme.main.contrast};
      span {
        color: ${(props) => props.theme.main.contrast};
      }
    }

    div:nth-of-type(2) {
      display: flex;
      flex-flow: nowrap column;
      justify-content: flex-start;
      align-items: flex-start;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0rem 0.4rem;
      ${(props) => props.theme.scroll.hidden};
      border-right: solid ${(props) => props.theme.colors.gray80} 0.1rem;
      p {
        font-weight: 800;
        padding: 0rem 0.4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        outline: solid ${(props) => props.theme.colors.black40} 0.1rem;
        border-radius: 0.8rem;
        padding: 0.4rem;
      }
    }
    div:not(:nth-of-type(2)) {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.4rem;
    }
  }
`;
const LiStyle = styled.li<{ active: boolean }>`
  ${(props) =>
    props.active &&
    css`
      background: ${props.theme.main.primary40};
      color: ${props.theme.main.contrast};
      span {
        color: ${props.theme.main.contrast};
      }
    `};
`;
const ImageBox = styled.button`
  ${(props) => props.theme.flex.row.center.center};
  padding: 0.4rem;
  border-radius: 0.8rem;
  background: ${(props) => props.theme.colors.gray60};

  &:hover {
    background: ${(props) => props.theme.main.primary40};
    outline: solid ${(props) => props.theme.main.contrast} 0.2rem;
  }
`;
const ArticleStyle = styled(CC.ColumnDiv.withComponent('article'))`
  gap: 0.8rem;
  padding: 0rem 0.8rem;
  h2 {
    height: 3rem;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.black80};
    margin: 0rem 0rem 1.6rem 0rem;
    font-size: 1.4rem;
    font-weight: 700;
    border-bottom: solid ${(props) => props.theme.colors.gray80} 0.1rem;
  }
  label {
    display: flex;
    justify-content: flex-start;
    font-weight: 600;
  }
  input {
    padding: 1.2rem 0.4rem;
    border-radius: 0.4rem;
    border: none;
    outline: solid ${(props) => props.theme.colors.gray80} 0.2rem;
  }
  input::placeholder {
    color: ${(props) => props.theme.colors.gray100};
  }
  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.gray80};
    text-align: left;
  }
  button {
    color: ${(props) => props.theme.colors.white40};
    height: 3.6rem;
  }
`;
