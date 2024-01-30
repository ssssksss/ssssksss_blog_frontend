import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import axios from 'axios';
import { ApiProcessHandler } from './service/ApiProcessHandler';
import { UseQueryHook } from '@/components/useHook/useQueryHook';
import { IBlogCategoryListResDataProps } from '@/components/blog/BlogFirstCategory/type/BlogFirstCategoryContainer.type';
import { rootActions } from '@/redux/store/actions';
import UrlQueryStringToObject from '@/utils/function/UrlQueryStringToObject';
import { useMutationHook } from '@/components/useHook/useMutationHook';
import { useRouter } from 'next/router';
import { IAfterMutationHandlerProps } from './type/CommonAPI';
import { batch } from 'react-redux';
import { previousDay } from 'date-fns';

const getBlogCategoryList = () => {
  return UseQueryHook({
    queryKey: ['blogCategoryList'],
    requestData: {
      url: '/api/blog-category-list',
      method: 'GET',
    },
    isRefetchWindowFocus: false,
    onSuccessHandler: (props: IBlogCategoryListResDataProps) => {
      let urlQueryObject = UrlQueryStringToObject(window.location.href);
      batch(() => {
        store.dispatch(
          rootActions.blogStore.SET_ACTIVE_BLOG_FIRST_CATEGORY({
            activeBlogFirstCategoryId:
              urlQueryObject?.[`first-category`] ||
              props.data.json.blogFirstCategoryList[0].id,
            activeBlogFirstCategoryName:
              props.data.json.blogFirstCategoryList[0].name,
          })
        );
        store.dispatch(
          rootActions.blogStore.SET_ACTIVE_BLOG_SECOND_CATEGORY({
            activeBlogSecondCategoryId:
              urlQueryObject?.[`second-category`] ||
              props.data.json.blogFirstCategoryList[0].secondCategoryList[0].id,
            activeBlogSecondCategoryName:
              props.data.json.blogFirstCategoryList[0].secondCategoryList[0]
                .name,
          })
        );
        store.dispatch(
          rootActions.blogStore.SET_ACTIVE_BLOG_USER_ID(props.data.json.userId)
        );
      });
    },
  });
};

const getBlog = (props: any) => {
  return UseQueryHook({
    queryKey: ['getBlog'],
    requestData: {
      url: '/api/blog',
      method: 'GET',
      params: {
        id: props.id,
      },
    },
    isRefetchWindowFocus: false,
    onSuccessHandler: res => {
      props.onSuccessHandler(res);
    },
    enabled: props.enabled,
  });
};

const getBlogList = () => {
  // const router = useRouter();
  // if(!router.query.['second-category']) return [];
  return UseQueryHook({
    queryKey: [
      'blogList',
      store.getState().blogStore.activeBlogSecondCategoryId,
    ],
    requestData: {
      url: '/api/blog-list',
      method: 'GET',
      params: {
        secondCategoryId: store.getState().blogStore.activeBlogSecondCategoryId,
      },
    },
    isRefetchWindowFocus: false,
    enabled: store.getState().blogStore.activeBlogSecondCategoryId ?? false,
  });
};
// TODO
const createBlogFirstCategory = (props: IAfterMutationHandlerProps) => {
  const mutationFn = async (reqData: ICreateFirstCategoryHandlerProps) => {
    return await AxiosInstance.post('/api/blog-first-category', {
      name: reqData.name,
    }).catch(error => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      store.dispatch(
        rootActions.blogStore.SET_BLOG_CATEGORY_LIST([
          ...store.getState().blogStore.blogCategoryList,
          {
            name: data.data.json.createBlogFirstCategory.name + '',
            id: data.data.json.createBlogFirstCategory.id,
            secondCategoryList: [],
          },
        ])
      );
      store.dispatch(
        rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
          type: 'success',
          message: data.data.msg,
        })
      );
    },
    onErrorHandler: ({ error, variables, context }) => {
      console.log('BlogAPI.ts error : ', error);
    },
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

const updateBlogFirstCategory = () => {
  const mutationFn = async (reqData: { id: number; name: string }) => {
    return await AxiosInstance.put('/api/blog-first-category', {
      id: reqData.id,
      name: reqData.name,
    }).catch(error => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      let temp = store.getState().blogStore.blogCategoryList.map(i => {
        if (i.id == variables.id) {
          return {
            ...i,
            id: variables.id + '',
            name: variables.name,
          };
        }
        return i;
      });
      store.dispatch(rootActions.blogStore.SET_BLOG_CATEGORY_LIST(temp));
      store.dispatch(
        rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
          type: 'success',
          message: data.data.msg,
        })
      );
    },
    onErrorHandler: ({ error, variables, context }) => {},
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

const deleteBlogFirstCategory = () => {
  const mutationFn = async reqData => {
    return await AxiosInstance.delete(
      `/api/blog-first-category?id=${reqData?.id}`
    ).catch(error => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      store.dispatch(
        rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
          type: 'success',
          message: data.data?.msg,
        })
      );
      let _temp = store
        .getState()
        .blogStore.blogCategoryList.filter(i => i.id != variables.id);
      store.dispatch(rootActions.blogStore.SET_BLOG_CATEGORY_LIST([..._temp]));
    },
    onErrorHandler: ({ error, variables, context }) => {
      console.log('BlogAPI.ts 파일 : ', error);
    },
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

const deleteFirstCategory = async (props: IDeleteFirstCategoryHandlerProps) => {
  return await ApiProcessHandler({
    url: '/api/blog-first-category',
    method: 'DELETE',
    data: {
      id: props.id,
    },
    apiCategory: '블로그 카테고리1',
    isShowMessage: true,
  });
};

///////////////////////////////////////////////////////////////////////////////
// ! 아래는 일단 전부 보류인 코드

const getBlogFirstCategoryList = () => {
  return UseQueryHook({
    queryKey: 'blogFirstCategoryList',
    requestData: {
      url: '/api/blog-first-category',
      method: 'GET',
    },
    method: false,
    isRefetchWindowFocus: false,
    onSuccessHandler: (props: IBlogCategoryListResDataProps) => {
      store.dispatch(
        SET_ACTIVE_BLOG_FIRST_CATEGORY(
          props.data.json.blogFirstCategoryList[0].id
        )
      );
    },
  });
};

const createSecondCategory = () => {
  const mutationFn = async reqData => {
    let formData = new FormData();
    formData.append('name', reqData.name);
    formData.append('blogFirstCategoryId', reqData.blogFirstCategoryId);
    formData.append('files', reqData.files);
    formData.append('directory', reqData.directory);
    return await AxiosInstance({
      url: '/api/blog-second-category',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      data: formData,
    }).catch(error => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      let _secondCategoryList = store
        .getState()
        .blogStore.blogCategoryList.filter(
          i => i.id == variables.blogFirstCategoryId
        )[0].secondCategoryList;
      _secondCategoryList.push({
        id: data.data.json.createBlogSecondCategory.id + '',
        name: data.data.json.createBlogSecondCategory.name,
        thumbnailImageUrl:
          data.data.json.createBlogSecondCategory.thumbnailImageUrl,
      });
      store.dispatch(
        rootActions.blogStore.SET_BLOG_CATEGORY_LIST([
          ...store.getState().blogStore.blogCategoryList.map(i => {
            if (i.id == variables.blogFirstCategoryId) {
              i.secondCategoryList = _secondCategoryList;
              return i;
            } else {
              return i;
            }
          }),
        ])
      );
    },
    onErrorHandler: ({ error, variables, context }) => {},
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

const getSecondCategory = async (props: string) => {
  return await ApiProcessHandler({
    url: '/api/blog-second-category',
    method: 'GET',
    params: {
      blogFirstCategoryId: props.firstCategoryId,
    },
    apiCategory: '블로그 카테고리2',
  });
};

const updateSecondCategory = async (
  props: IUpdateSecondCategoryHandlerProps
) => {
  let formData = new FormData();
  formData.append('id', props.id);
  formData.append('name', props.name);
  formData.append('files', props.files);
  formData.append('directory', props.directory);

  return await ApiProcessHandler({
    url: '/api/blog-second-category',
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
    apiCategory: '블로그 카테고리2',
    isShowMessage: true,
  });
};

const deleteSecondCategory = async (
  props: IDeleteSecondCategoryHandlerProps
) => {
  return await ApiProcessHandler({
    url: '/api/blog-second-category',
    method: 'DELETE',
    data: {
      id: props.id,
    },
    apiCategory: '블로그 카테고리2',
    isShowMessage: true,
  });
};

const createBlog = async (props: string) => {
  let formData = new FormData();
  formData.append('title', props.title);
  formData.append('description', props.description);
  formData.append('content', props.content);
  formData.append('firstCategoryId', props.firstCategoryId);
  formData.append('secondCategoryId', props.secondCategoryId);
  formData.append('thumbnailImageFile', props.thumbnailImageFile);
  formData.append('directory', props.directory);

  props.imageUrlList?.map(i => {
    formData.append('imageUrlList', i);
  });

  props.imageFileList?.map(i => {
    formData.append('imageFileList', i);
  });

  return await ApiProcessHandler({
    url: '/api/blog',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  });
};

// const getBlogFirstCategoryList = () => {
//   return UseQueryHook({
//     queryKey: 'blogFirstCategoryList',
//     requestData: {
//       url: '/api/blog-first-category',
//       method: 'GET',
//     },
//     method: false,
//     isRefetchWindowFocus: false,
//     onSuccessHandler: (props: IBlogCategoryListResDataProps) => {
//       store.dispatch(
//         SET_ACTIVE_BLOG_FIRST_CATEGORY(
//           props.data.json.blogFirstCategoryList[0].id
//         )
//       );
//     },
//   });
// };

const updateBlogPost = async (props: string) => {
  let formData = new FormData();
  formData.append('id', props.id);
  formData.append('title', props.title);
  formData.append('description', props.description);
  formData.append('content', props.content);
  formData.append('firstCategoryId', props.firstCategoryId);
  formData.append('secondCategoryId', props.secondCategoryId);
  formData.append('thumbnailImageFile', props.thumbnailImageFile);
  formData.append('directory', props.S3directory);

  props.deleteImageBucketDirectory?.map(i => {
    formData.append('deleteImageBucketDirectory', i);
  });

  props.imageUrlList?.map(i => {
    formData.append('imageUrlList', i);
  });

  props.imageFileList?.map(i => {
    formData.append('imageFileList', i);
  });

  return await ApiProcessHandler({
    url: '/api/blog',
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  });
};

const deleteBlogPost = async (props: { id: string }) => {
  return await ApiProcessHandler({
    url: '/api/blog',
    method: 'DELETE',
    data: {
      id: props.id,
    },
  });
};

const getSearchBlogPostList = async (props: string) => {
  return await ApiProcessHandler({
    url: '/api/blog/search',
    method: 'GET',
    params: {
      keyword: props.keyword,
    },
  });
};

const addBlogContentTemplate = async (props: string) => {
  return await ApiProcessHandler({
    url: '/api/blog/template',
    method: 'POST',
    data: {
      secondCategoryId: props.secondCategoryId,
      content: props.content,
    },
    apiCategory: '블로그 템플릿',
    isShowMessage: true,
  });
};

const getBlogContentTemplate = async (props: string) => {
  return await ApiProcessHandler({
    url: '/api/blog/template',
    method: 'GET',
    params: {
      secondCategoryId: props.secondCategoryId,
    },
    apiCategory: '블로그 템플릿',
  });
};

const deleteBlogContentTemplate = async (props: string) => {
  return await ApiProcessHandler({
    url: '/api/blog/template',
    method: 'DELETE',
    data: {
      id: props.id,
    },
    apiCategory: '블로그 템플릿',
    isShowMessage: true,
  });
};

export const BlogAPI = {
  getBlogCategoryList,
  createBlogFirstCategory,
  getBlogFirstCategoryList,
  updateBlogFirstCategory,
  deleteBlogFirstCategory,
  createSecondCategory,
  getSecondCategory,
  updateSecondCategory,
  deleteSecondCategory,
  createBlog,
  getBlog,
  deleteBlogPost,
  updateBlogPost,
  getBlogList,
  addBlogContentTemplate,
  deleteBlogContentTemplate,
  getBlogContentTemplate,
  getSearchBlogPostList,
};
