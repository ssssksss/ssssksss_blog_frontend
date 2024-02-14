import { YoutubeAPI } from '@/api/YoutubeAPI';
import { Button } from '@/components/common/button/Button';
import { Icons } from '@/components/common/icons/Icons';
import { Input } from '@/components/common/input/Input';
import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import { CC } from '@/styles/commonComponentStyle';
import UrlQueryStringToObject from '@/utils/function/UrlQueryStringToObject';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import Image from 'next/image';
import { useReducer, useRef } from 'react';
import { useQueryClient } from 'react-query';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file YoutubePlayerModal.tsx
 * @version 0.0.1 "2023-09-24 00:47:28"
 * @description 설명
 */

const YoutubePlayerModal = () => {
  const inputRef = useRef<null>();
  const queryClient = useQueryClient();
  const createYoutubeLinkMutation = YoutubeAPI.createYoutubeLink({
    onSuccessHandler: res => {
      const { id, imageUrl, tags, title, userId, youtubeUrl } =
        res.data.data.json.youtube;
      queryClient.setQueryData(['getYoutubeList'], oldData => {
        oldData.json.youtubeList.unshift({
          id,
          imageUrl,
          tags,
          title,
          userId,
          youtubeUrl,
        });
        return oldData;
      });
    },
  });
  const getYoutubeLinkListResData = YoutubeAPI.getYoutubeLinkList();
  const deleteYoutubeLinkMutation = YoutubeAPI.deleteYoutubeLink({
    onSuccessHandler: data => {
      queryClient.setQueryData('getYoutubeList', oldData => {
        oldData.json.youtubeList = oldData.json.youtubeList.filter(
          i => i.id != data.variables.id
        );
        return oldData;
      });
    },
  });
  const [toggle, toggleHandler] = useReducer(prev => !prev, true);

  const addYoutubeLinkHandler = async () => {
    axios
      .get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          key: process.env.NEXT_PUBLIC_YOUTUBE_LINK_KEY,
          id: UrlQueryStringToObject(inputRef.current.value)?.v,
          part: 'snippet',
          type: 'video',
        },
      })
      .then(i => {
        const title = i.data.items[0].snippet.title;
        const imageUrl = i.data.items[0].snippet.thumbnails.default.url;
        const tags = JSON.stringify(i.data.items[0].snippet.tags);
        const youtubeUrl = inputRef.current.value;
        createYoutubeLinkMutation({
          title,
          imageUrl,
          tags,
          youtubeUrl,
        });
      })
      .catch(err => {
        alert('잘못된 요청입니다.');
      });
  };

  const copyLinkHandler = (youtubeUrl: string) => {
    navigator.clipboard.writeText(youtubeUrl);
    store.dispatch(
      SET_TOASTIFY_MESSAGE({
        type: 'success',
        message: `복사되었습니다.`,
      })
    );
  };

  const deleteLinkHandler = (id: string) => {
    deleteYoutubeLinkMutation({
      id: id,
    });
  };

  const selectYoutubeLinkHandler = (data: any) => {
    window.localStorage.setItem('youtubeLink', data.youtubeUrl);
    toggleHandler();
    store.dispatch(
      SET_TOASTIFY_MESSAGE({
        type: 'success',
        message: `선택되었습니다.`,
      })
    );
  };

  return (
    <Container>
      <ArticleStyle>
        <h2> Add YouTube Links </h2>
        <label htmlFor={'youtube-link'}> YouTube Link </label>
        <Input
          id={'youtube-link'}
          placeholder={'Enter YouTube link'}
          onKeyPressAction={addYoutubeLinkHandler}
          ref={inputRef}
        />
        <span> Add a YouTube video link here </span>
        <Button w={'100%'} onClick={addYoutubeLinkHandler}>
          Add Link
        </Button>
      </ArticleStyle>
      <ul>
        {getYoutubeLinkListResData.isLoading ||
          getYoutubeLinkListResData.data.json.youtubeList.map(i => (
            <LiStyle
              onClick={() => selectYoutubeLinkHandler(i)}
              active={
                i.youtubeUrl == window.localStorage.getItem('youtubeLink')
              }
            >
              <div>
                <CC.RowCenterDiv>
                  <img src={i.imageUrl} width={'36px'} height={'36px'} />
                </CC.RowCenterDiv>
              </div>
              <div>
                <p> {i.title} </p>
                <CC.RowDiv color={'gray80'} gap={4}>
                  {JSON.parse(i.tags).map(j => (
                    <span> {j} </span>
                  ))}
                </CC.RowDiv>
              </div>
              <ImageBox
                onClick={e => {
                  e.stopPropagation();
                  copyLinkHandler(i.youtubeUrl);
                }}
              >
                <Image src={Icons.CopyIcon} width={'24px'} height={'24px'} />
              </ImageBox>
              <ImageBox
                onClick={e => {
                  e.stopPropagation();
                  deleteLinkHandler(i.id);
                }}
              >
                <Image src={Icons.DeleteIcon} width={'24px'} height={'24px'} />
              </ImageBox>
            </LiStyle>
          ))}
      </ul>
    </Container>
  );
};
export default YoutubePlayerModal;
// "lengthSeconds": "1746"
// <title> 제목 </title>
const Container = styled(CC.ColumnDiv.withComponent('section'))`
  gap: 8px;
  width: 100%;

  ul {
    ${props => props.theme.scroll.hidden};
    outline: solid ${props => props.theme.main.primary80} 1px;
    min-height: 120px;
    width: 100%;
  }

  li {
    height: 60px;
    border-bottom: solid ${props => props.theme.colors.gray40} 1px;
    display: grid;
    grid-template-columns: 36px calc(100% - 108px) 36px 36px;
    padding: 0px 16px;
    gap: 4px;
    align-items: center;
    width: 100%;

    &:hover {
      background: ${props => props.theme.main.primary40};
      cursor: pointer;
      color: ${props => props.theme.main.contrast};
      span {
        color: ${props => props.theme.main.contrast};
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
      padding: 0px 4px;
      ${props => props.theme.scroll.hidden};
      border-right: solid ${props => props.theme.colors.gray80} 1px;
      p {
        font-weight: 800;
        padding: 0px 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        outline: solid ${props => props.theme.colors.black40} 1px;
        border-radius: 8px;
        padding: 4px;
      }
    }
    div:not(:nth-of-type(2)) {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;
    }
  }
`;
const LiStyle = styled.li<{ active: boolean }>`
  ${props =>
    props.active &&
    css`
      background: ${props.theme.main.primary40};
      color: ${props.theme.main.contrast};
      span {
        color: ${props.theme.main.contrast};
      }
    `};
`;
const ImageBox = styled(CC.RowCenterDiv)`
  padding: 4px;
  border-radius: 8px;
  background: ${props => props.theme.colors.gray60};

  &:hover {
    background: ${props => props.theme.main.primary40};
    outline: solid ${props => props.theme.main.contrast} 2px;
  }
`;
const ArticleStyle = styled(CC.ColumnDiv.withComponent('article'))`
  gap: 8px;
  padding: 0px 8px;
  h2 {
    height: 30px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.black80};
    margin: 0px 0px 16px 0px;
    font-size: 1.4rem;
    font-weight: 700;
    border-bottom: solid ${props => props.theme.colors.gray80} 1px;
  }
  label {
    display: flex;
    justify-content: flex-start;
    font-weight: 600;
  }
  input {
    padding: 12px 4px;
    border-radius: 4px;
    border: none;
    outline: solid ${props => props.theme.colors.gray80} 2px;
  }
  input::placeholder {
    color: ${props => props.theme.colors.gray100};
  }
  span {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.gray80};
    text-align: left;
  }
  button {
    background: ${props => props.theme.colors.black80};
    color: ${props => props.theme.colors.white40};
    height: 36px;
  }
`;
