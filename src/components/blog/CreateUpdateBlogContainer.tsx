import React, { useState, useEffect, useRef, useReducer } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { Editor } from '@toast-ui/react-editor';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { store } from '@/redux/store';
import Button from '@/components/common/button/Button';
import chart from '@toast-ui/editor-plugin-chart';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { AWSS3Prefix } from '@/utils/variables/url';
import { Input } from '@/components/common/input/Input';
import { CC } from '@/styles/commonComponentStyle';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import { useLoading } from '@/src/hooks/useLoading';
import { LoadingComponent } from '@/components/common/loading/LoadingComponent';
import Select from '@/components/common/select/Select';
import Image from 'next/image';
import { Icons } from '@/components/common/icons/Icons';
import { BlogAPI } from '@/api/BlogAPI';
import ModalButton from '../common/button/ModalButton';
import BlogContentTemplateModal from './BlogContentTemplateModal';
import { SET_BLOG_CONTENT_TEMPLATE_LIST } from '@/redux/store/blogContentTemplate';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateUpdateBlogContainer.tsx
 * @version 0.0.1 "2023-10-14 00:59:02"
 * @description 설명
 */

interface IEditCreateUpdateBlogContainerProps {
  edit?: boolean;
}

const CreateUpdateBlogContainer = (
  props: IEditCreateUpdateBlogContainerProps
) => {
  const router = useRouter();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [areaTextContent, setAreaTextContent] = useState(
    '# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n'
  );
  const editorRef = useRef<Editor>(null);
  const locationHref = window.location.pathname;
  const postUrlHref =
    '/blog/' + locationHref.split('/')[2] + '/' + locationHref.split('/')[3];
  const authStore = useSelector((state: RootState) => state.authStore);
  const blogContentTemplateStore = useSelector(
    (state: RootState) => state.blogContentTemplateStore
  );
  const [isLoading, loadingFunction] = useLoading();
  const firstCategoryRef = useRef();
  const secondCategoryRef = useRef();
  const [isHideContainer, hideContainerToggle] = useReducer(
    v => !v,
    props.edit ? true : false
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const [categoryList, setCategoryList] = useState({});
  const [firstCategoryList, setFirstCategoryList] = useState([]);
  const [secondCategoryList, setSecondCategoryList] = useState([]);
  const [firstCategory, setFirstCategory] = useState({
    id: '',
    name: '',
  });
  const [secondCategory, setSecondCategory] = useState({
    id: '',
    name: '',
  });
  const [defaultImageUrl, setDefaultImageUrl] = useState();
  const [blogContentImageList, setBlogContentImageList] = useState([]);
  const [tempBlogImage, setTempBlogImage] = useState([]);
  const [isHideBrowser, hideBrowserToggle] = useReducer(v => !v, true);

  const blogContentForm = [
    '# <span>[] 제목</span> \n' +
      '## <span>{1} 설명</span> \n' +
      '## <span>{2} 예시</span> \n' +
      '### <span>ex1)</span> \n' +
      '#### <span>결과</span> \n' +
      '### <span>ex2)</span> \n' +
      '#### <span>결과</span> \n' +
      '---',
    '# <span>[] 제목</span> \n' +
      '## <span>{1} 설명</span> \n' +
      '## <span>{2} 문법</span> \n' +
      '## <span>{3} 예시</span> \n' +
      '### <span>ex1)</span> \n' +
      '#### <span>결과</span> \n' +
      '### <span>ex2)</span> \n' +
      '#### <span>결과</span> \n' +
      '---',
    '| 속성 | 설명 |  \n' +
      '| --- | --- | \n' +
      '|  |  | \n' +
      '|  |  | \n' +
      '|  |  | \n' +
      '|  |  | \n',
    '| 속성 | 사용 | 설명  | \n' +
      '| --- | --- | --- | \n' +
      '|  |  |  | \n' +
      '|  |  |  | \n' +
      '|  |  |  | \n' +
      '|  |  |  | ',
  ];

  const submitHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    let imageUrlList = [];
    let imageFileList = [];

    if (
      !firstCategoryRef.current.value ||
      !secondCategoryRef.current.value ||
      !title ||
      !description ||
      !getContent_md
    ) {
      alert('값이 비어있음');
      return;
    }

    tempBlogImage.map(i => {
      if (getContent_md.search(i.url) != -1) {
        imageUrlList.push(i.url);
        imageFileList.push(i.file);
      }
    });

    // TODO 작업중
    loadingFunction(
      BlogAPI.addBlogPost({
        title: title,
        description: description,
        content: getContent_md,
        firstCategoryId: firstCategoryRef.current.value,
        secondCategoryId: secondCategoryRef.current.value,
        thumbnailImageFile: fileRef.current.files[0],
        directory: `/blog/thumbnail/${firstCategoryRef.current.value}/${secondCategoryRef.current.value}`,
        imageUrlList: imageUrlList,
        imageFileList: imageFileList,
      })
    )
      .then(res => {
        router.replace(`/blog/${res.data.id}`, `/blog/${res.data.id}`, {
          shallow: true,
        });
      })
      .catch(error => {
        console.log('CreateUpdateBlogContainer.tsx 파일 : ', error);
      });
  };

  const uploadHandler = async (file: any) => {
    const url = URL.createObjectURL(file).substring(5);
    setTempBlogImage(prev => [...prev, { url, file }]);
    return url;
  };

  const updateHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    let imageUrlList = [];
    let imageFileList = [];
    let removeImageBucketDirectory = [];

    if (
      !firstCategoryRef.current.value ||
      !secondCategoryRef.current.value ||
      !title ||
      !description ||
      !getContent_md
    ) {
      alert('값이 비어있음');
      return;
    }

    // 글에 적혀있는 새로운 이미지들을 파일과 경로를 수집 (이미지 생성 용도)
    tempBlogImage?.map(i => {
      if (getContent_md.search(i.url) !== -1) {
        imageUrlList.push(i.url);
        imageFileList.push(i.file);
      }
    });

    // 기존 블로그 내용에 있던 이미지 경로가 없다면 이미지 url을 수집 (이미지 삭제 용도)
    blogContentImageList?.map(i => {
      if (getContent_md.search(i) === -1) {
        removeImageBucketDirectory.push(i);
      }
    });

    loadingFunction(
      BlogAPI.updateBlogPost({
        id: router.query.id,
        title: title,
        description: description,
        content: getContent_md,
        firstCategoryId: firstCategoryRef.current.value,
        secondCategoryId: secondCategoryRef.current.value,
        thumbnailImageFile: fileRef.current.files[0],
        S3directory: `/blog/thumbnail/${firstCategoryRef.current.value}/${secondCategoryRef.current.value}`,
        imageUrlList: imageUrlList,
        imageFileList: imageFileList,
        removeImageBucketDirectory: removeImageBucketDirectory,
      })
    )
      .then(res => {
        router.replace(`/blog/${router.query.id}`);
      })
      .catch(error => {
        console.log('CreateUpdateBlogContainer.tsx 파일1 : ', error);
      });
  };

  const onChangeFirstCategoryHandler = async props => {
    setFirstCategory({
      id: props.value,
      name: props.name,
    });
    categoryList
      .filter(i => i.id == props.value)
      .map(j => {
        setSecondCategory({
          id: j.secondCategoryList[0]?.id,
          name: j.secondCategoryList[0]?.name,
        });
        secondCategoryRef.current = {
          value: j.secondCategoryList[0]?.id,
          name: j.secondCategoryList[0]?.name,
        };
        if (j.secondCategoryList.length > 0) {
          // 2번째 카테고리가 1개라도 있다면
          setTitle(
            '[' +
              j.secondCategoryList[0]?.name.toUpperCase() +
              '] ' +
              title?.substr(title.indexOf(']') + 1, title.length).trim()
          );
          setSecondCategoryList(
            j.secondCategoryList.map(k => ({
              id: k.id,
              name: k.name,
            }))
          );
          setDefaultImageUrl(j.secondCategoryList[0].thumbnailImageUrl);
          // secondCategoryRef.current = {
          //   id: j.secondCategoryList[0]?.id,
          //   name: j.secondCategoryList[0]?.name,
          // };
          BlogAPI.getBlogContentTemplate({
            secondCategoryId: j.secondCategoryList[0].id,
          }).then(res => {
            store.dispatch(
              SET_BLOG_CONTENT_TEMPLATE_LIST(res.data?.blogContentTemplateList)
            );
          });
        } else {
          setSecondCategoryList([]);
          setDefaultImageUrl('');
          setTitle(
            '[' +
              '] ' +
              title?.substr(title.indexOf(']') + 1, title.length).trim()
          );
          store.dispatch(SET_BLOG_CONTENT_TEMPLATE_LIST([]));
        }
      });
  };

  const onChangeSecondCategoryHandler = props => {
    if (props.value) {
      setSecondCategory({
        id: props.value,
        name: props.name,
      });
      BlogAPI.getBlogContentTemplate({
        secondCategoryId: props.value,
      }).then(res => {
        store.dispatch(
          SET_BLOG_CONTENT_TEMPLATE_LIST(res.data?.blogContentTemplateList)
        );
      });
      categoryList
        .filter(i => i.id == firstCategory.id)
        .map(i => {
          i.secondCategoryList.map(j => {
            if (j.id == props.value) {
              setDefaultImageUrl(j.thumbnailImageUrl);
              setTitle(
                '[' +
                  j.name.toUpperCase() +
                  '] ' +
                  title?.substr(title.indexOf(']') + 1, title.length).trim()
              );
            }
          });
        });
    }
  };

  useEffect(async () => {
    let _categoryListTemp = [];
    let _firstCategoryListTemp = [];
    let stop;
    await loadingFunction(BlogAPI.getCategoryList())
      .then(res => {
        if (Object.keys(res.data).length === 0) {
          alert('카테고리를 먼저 생성하세요');
          router.back();
        }
        Object.entries(res.data)?.map(i => {
          _firstCategoryListTemp.push({
            id: i[1].id,
            name: i[0],
          });
          _categoryListTemp.push({
            id: i[1].id,
            name: i[0],
            secondCategoryList: i[1].categoryList,
          });
        });
        setFirstCategoryList(_firstCategoryListTemp);
        setCategoryList(_categoryListTemp);
      })
      .catch(err => {
        console.log('CreateUpdateBlogContainer.tsx 파일 : ', err);
        if (err.code == 401) {
          stop = true;
          router.back();
        }
      });
    if (stop) return;

    if (props.edit) {
      await loadingFunction(
        BlogAPI.getBlogPost({
          id: router.query.id,
        })
      ).then(res => {
        let _data: {
          id: number;
          firstCategoryId: number;
          secondCategoryId: number;
          title: string;
        } = res.data.blogItem.blogDao;

        _categoryListTemp.map(i => {
          if (i.id == _data.firstCategoryId) {
            setFirstCategory({
              id: i.id,
              name: i.name,
            });
            firstCategoryRef.current = {
              value: i.id,
              name: i.name,
            };
            setSecondCategory({
              id: i.secondCategoryList[0]?.id,
              name: i.secondCategoryList[0]?.name,
            });
            setSecondCategoryList(
              i.secondCategoryList.map(j => ({
                id: j.id,
                name: j.name,
              }))
            );
            secondCategoryRef.current = {
              value: i.secondCategoryList[0]?.id,
              name: i.secondCategoryList[0]?.name,
            };
            setTitle(_data.title);
            setDescription(_data.description);
            setDefaultImageUrl(_data.thumbnailImageUrl);
          }
        });
        const viewerInstance = editorRef.current?.getInstance();
        viewerInstance?.setMarkdown(res.data.blogItem.content);

        BlogAPI.getBlogContentTemplate({
          secondCategoryId: _data.secondCategoryId,
        }).then(res => {
          store.dispatch(
            SET_BLOG_CONTENT_TEMPLATE_LIST(res.data?.blogContentTemplateList)
          );
        });

        let _blogContentImageList = [];
        let index2 = 0;
        /**
         * 블로그 글 내용에서 AWS경로Prefix를 찾고 확장자명 앞에 있는 .을 기준으로 bucket에 저장된 이미지 경로들을 추출
         * 이후에 블로그 글을 수정할 때 필요없는 이미지들을 지우기 위한 이미지 경로 수집이다.
         */
        while (1) {
          let index1 = res.data.blogItem.content.indexOf(AWSS3Prefix, index2);
          if (index1 === -1) break;
          index2 = res.data.blogItem.content.indexOf(
            '.',
            index1 + AWSS3Prefix.length
          );
          _blogContentImageList.push(
            res.data.blogItem.content.substring(
              index1 + AWSS3Prefix.length,
              index2 + 4
            )
          );
        }
        setBlogContentImageList(_blogContentImageList);
      });
    }

    let keyDownEventFunc = (e: Event) => {
      if (e.key === 'Escape') {
        hideContainerToggle();
      } else if (e.which === 32 && e.ctrlKey) {
        hideBrowserToggle();
      }
    };
    window.addEventListener('keydown', keyDownEventFunc);

    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

  return (
    <>
      {authStore.role === 'ROLE_ADMIN' && (
        <>
          {isLoading ? (
            <LoadingComponent mode={'blog'}> 로딩중 </LoadingComponent>
          ) : (
            <Container>
              <HeaderContainer gap={8}>
                <Button
                  id={'hideBlogHeaderButton'}
                  w={'100%'}
                  bg={'primary40'}
                  onClick={() => hideContainerToggle()}
                >
                  {isHideContainer ? (
                    <Image src={Icons.DownArrowIcon} />
                  ) : (
                    <Image src={Icons.UpArrowIcon} />
                  )}
                </Button>
                <HideContainer isHide={isHideContainer}>
                  <CC.RowBetweenDiv gap={8}>
                    <Select
                      w={'100%'}
                      ref={firstCategoryRef}
                      placeholder={'1번째 카테고리'}
                      onChange={onChangeFirstCategoryHandler}
                      defaultValue={{
                        value: firstCategory?.id,
                        name: firstCategory?.name,
                      }}
                      data={firstCategoryList.map(i => ({
                        value: i.id,
                        name: i.name,
                      }))}
                    ></Select>
                    <Select
                      w={'100%'}
                      ref={secondCategoryRef}
                      placeholder={'2번째 카테고리'}
                      onChange={onChangeSecondCategoryHandler}
                      defaultValue={{
                        value: secondCategory?.id,
                        name: secondCategory?.name,
                      }}
                      data={secondCategoryList.map(i => ({
                        value: i.id,
                        name: i.name,
                      }))}
                    ></Select>
                  </CC.RowBetweenDiv>
                  <Title
                    placeholder="제목을 입력해주세요"
                    value={title}
                    onChange={e => {
                      setTitle(e.target.value);
                    }}
                  />
                  <Description
                    placeholder="간단한 설명을 입력해주세요"
                    value={description}
                    onChange={e => {
                      setDescription(e.target.value);
                    }}
                  />
                  <CC.ColumnCenterDiv gap={4} pd={'4px 0px'}>
                    <CC.RowCenterDiv>
                      <b> 썸네일 이미지 </b>
                    </CC.RowCenterDiv>
                    <Input
                      type="file"
                      id="imageUpload"
                      h={'200px'}
                      ref={fileRef}
                      bg={'contrast'}
                      outline={'black80'}
                      defaultImageUrl={
                        defaultImageUrl !== 'undefined' && defaultImageUrl
                      }
                    />
                  </CC.ColumnCenterDiv>
                </HideContainer>
              </HeaderContainer>
              <EditorContainer>
                <Editor
                  autofocus={props.edit}
                  initialValue={areaTextContent}
                  previewStyle="vertical"
                  height="calc(100vh - 182px)"
                  initialEditType="markdown"
                  useCommandShortcut={true}
                  ref={editorRef}
                  plugins={[
                    colorSyntax,
                    [codeSyntaxHighlight, { highlighter: Prism }],
                  ]}
                  onChange={() => {
                    // ! TOAST UI에서 Preview 이미지가 사라지는 문제 떄문에 작성한 코드...
                    let toastUIPreviewBlobImages =
                      window.document.querySelectorAll(
                        "img[src^='" + window.location.origin + "']"
                      );
                    toastUIPreviewBlobImages.forEach(i => {
                      i.setAttribute('src', 'blob:' + i.src);
                    });
                  }}
                  hooks={{
                    addImageBlobHook: async (blob, callback) => {
                      const imageURL: any = await uploadHandler(blob);
                      await callback(imageURL, '');
                      // "blog"+directory+"/"+fileName
                    },
                  }}
                  viewer={true}
                  // language="ko-KR"
                  toolbarItems={[
                    // 툴바 옵션 설정
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                    ['table', 'image', 'link'],
                    ['code', 'codeblock'],
                  ]}
                />
              </EditorContainer>
              <EditorFooter>
                <Button
                  w={'100%'}
                  outline={true}
                  onClick={() =>
                    props.edit ? updateHandler() : submitHandler()
                  }
                >
                  {props.edit ? '수정' : '제출'}
                </Button>
                <Button w={'100%'} outline={true} onClick={() => router.back()}>
                  취소
                </Button>
              </EditorFooter>
              <BlogItemContentFormContainer>
                <ModalButton
                  color={'primary80'}
                  outline={true}
                  modal={
                    <BlogContentTemplateModal
                      firstCategoryId={firstCategoryRef.current?.value}
                      secondCategoryId={secondCategoryRef.current?.value}
                    />
                  }
                  modalOverlayVisible={true}
                  modalW={'80%'}
                  bg={'contrast'}
                >
                  <Image src={Icons.SettingIcon} alt="" />
                </ModalButton>
                {blogContentTemplateStore?.blogContentTemplateList?.map(
                  (i, index) => (
                    <BlogItemContentFormButton
                      onClick={() => {
                        navigator.clipboard.writeText(i.content);
                        store.dispatch(
                          SET_TOASTIFY_MESSAGE({
                            type: 'success',
                            message: `복사되었습니다.`,
                          })
                        );
                      }}
                    >
                      {index}
                    </BlogItemContentFormButton>
                  )
                )}
                <BlogItemContentFormButton
                  onClick={() => {
                    navigator.clipboard.writeText(blogContentForm[0]);
                  }}
                >
                  폼1
                </BlogItemContentFormButton>
                <BlogItemContentFormButton
                  onClick={() => {
                    navigator.clipboard.writeText(blogContentForm[1]);
                  }}
                >
                  폼2
                </BlogItemContentFormButton>
                <BlogItemContentFormButton
                  onClick={() => {
                    navigator.clipboard.writeText(blogContentForm[2]);
                  }}
                >
                  테1
                </BlogItemContentFormButton>
                <BlogItemContentFormButton
                  onClick={() => {
                    navigator.clipboard.writeText(blogContentForm[3]);
                  }}
                >
                  테2
                </BlogItemContentFormButton>
                <BlogItemContentFormButton onClick={() => hideBrowserToggle()}>
                  검색
                </BlogItemContentFormButton>
              </BlogItemContentFormContainer>
              <Iframe
                hide={isHideBrowser}
                src={'https://www.bing.com/'}
                name={''}
                id={''}
                frameBorder={'1'}
                scrolLing={'yes'}
                aligh={'middle'}
              >
                iframe이 있었던 자리 입니다
              </Iframe>
            </Container>
          )}
        </>
      )}
    </>
  );
};
export default CreateUpdateBlogContainer;

const Iframe = styled.iframe<{ hide: boolean }>`
  z-index: 40;
  position: fixed;
  height: calc(100% - 180px);
  bottom: 80px;
  right: 40px;
  width: calc(50% - 70px);
  background: ${props => props.theme.main.contrast};

  visibility: ${props => (props.hide ? 'hidden' : 'visible')};
`;

const Container = styled(CC.ColumnDiv.withComponent('section'))`
  position: relative;
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;
  background-color: white;
  border-radius: 0px 0px 10px 10px;
  padding: 4px 16px;
  gap: 4px;

  .toastui-editor-toolbar {
    position: sticky;
    top: 30px;
    z-index: 1;
  }
  .toastui-editor-main {
    border-top: solid transparent 4px;
    padding-top: 4px;
    height: 100%;
    font-size: 16px;

    h1[data-nodeid] {
      border: none;
      width: 100%;
      background: ${props => props.theme.colors.red20 + '33'};
      font-size: ${props => props.theme.calcRem(28)};
      padding: 4px 0px;
    }
    h1[data-nodeid]::before {
      content: '📌 ';
    }
    h2[data-nodeid] {
      border: none;
      width: 100%;
      background: ${props => props.theme.colors.orange20 + '33'};
      font-size: ${props => props.theme.calcRem(24)};
      padding: 2px 0px;
    }
    h2[data-nodeid]::before {
      content: '🚩 ';
    }
    h3[data-nodeid] {
      border: none;
      width: 100%;
      background: ${props => props.theme.colors.orange20 + '33'};
      font-size: ${props => props.theme.calcRem(20)};
    }
    h3[data-nodeid]::before {
      content: '🔶 ';
    }
    h4[data-nodeid]::before {
      content: '🔸 ';
    }
    pre {
      outline: solid ${props => props.theme.main.primary80} 1px;
      border-radius: 10px;
      padding: 2px;
      position: relative;
      box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.25);
      font-size: ${props => props.theme.calcRem(12)};
      background: ${props => props.theme.colors.white80};
      position: relative;
    }

    th {
      outline: solid black 1px;
      background: ${props => props.theme.main.primary60};
    }
    td {
      outline: solid black 1px;
      padding: 2px 4px;
    }
    hr {
      height: 12px;
      background: ${props => props.theme.main.secondary80};
    }

    p > img {
      margin: auto;
      display: block;
    }
  }
  .toastui-editor-defaultUI {
    margin-top: 42px;
    height: calc(100%);
  }
  select {
    z-index: 5;
  }

  &::before {
    content: '';
    background-size: 50%;
    background-image: url('/img/backgroundImage/원피스.jpg');
    background-repeat: repeat-x;
    background-position: right bottom;
    opacity: 0.2;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: calc(80px + 44px);
  }
`;

const HeaderContainer = styled(CC.ColumnDiv)`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 8px);
  height: max-content;
  z-index: 6;
  background: ${props => props.theme.colors.gray80};
  outline: solid black 1px;
  border-radius: 10px;
  padding: 4px;
  margin: 4px 0px 0px 4px;
  & > div {
    gap: 8px;
  }
`;

const HideContainer = styled(CC.ColumnDiv)<{ isHide: boolean }>`
  visibility: ${props => (props.isHide ? 'hidden' : 'visible')};
  height: ${props => (props.isHide ? '0px' : '100%')};
  z-index: 3;

  select {
    outline: solid black 1px;
  }

  input::placeholder {
    transition: all 0s ease-in-out;
  }
`;

const Title = styled(Input)`
  --font-size: 1.6rem;
  width: 100%;
  height: 40px;
  font-family: ${props => props.theme.fontFamily.cookieRunRegular};
  color: ${props => props.theme.colors.black80};
  padding: 0px 10px;
  z-index: 3;
  border: none;
  font-size: var(--font-size);
  border-bottom: 2px solid ${props => props.theme.colors.black40};
  border-radius: 10px;
  outline: solid black 1px;

  &::placeholder {
    font-size: var(--font-size);
    color: ${props => props.theme.colors.black40};
  }

  @media (max-width: ${props => props.theme.deviceSizes.tablet}) {
    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
    }
  }
`;

const EditorContainer = styled.div``;
const EditorFooter = styled(CC.GridColumn2)`
  gap: 10px;
  position: sticky;
  padding: 4px 4px;
  bottom: 8px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.5);
  button {
    color: ${props => props.theme.main.primary80};
    &:hover {
      transform: scale(1.02);
      background: ${props => props.theme.main.primary80};
      color: ${props => props.theme.main.contrast};
    }
  }
`;

const BlogItemContentFormContainer = styled.section`
  right: 0px;
  top: 300px;
  ${props => props.theme.scroll.hidden}
  position: fixed;
  display: flex;
  flex-flow: nowrap column;
  padding: 4px;
  background: #eaeaea;
  gap: 2px;
  z-index: 8;
`;

const BlogItemContentFormButton = styled.button`
  padding: 2px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px,
    rgba(0, 0, 0, 0.3) 0px 7px 6px -3px;
  border-radius: 4px;
`;

const Description = styled(Input)`
  --font-size: 1.4rem;
  width: 100%;
  font-family: ${props => props.theme.fontFamily.cookieRunRegular};
  font-size: var(--font-size);
  color: ${props => props.theme.colors.black60};
  padding: 0px 10px;
  border: none;
  border-radius: 0px;
  z-index: 2;
  border-radius: 10px;
  outline: solid black 1px;

  &::placeholder {
    font-size: var(--font-size);
    color: ${props => props.theme.colors.black40};
  }

  @media (max-width: ${props => props.theme.deviceSizes.tablet}) {
    font-size: 1rem;
    &::placeholder {
      font-size: 1rem;
    
`;
