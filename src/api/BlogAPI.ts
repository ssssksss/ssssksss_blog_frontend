import { ApiProcessHandler } from '@api/service/ApiProcessHandler';
import { ICreateFirstCategoryHandlerProps } from '@api/type/BlogAPI.d';
import { IBlogCategoryListResDataProps } from '@components/blog/BlogFirstCategory/type/BlogFirstCategoryContainer.type';
import { useMutationHook } from '@components/useHook/useMutationHook';
import { UseQueryHook } from '@components/useHook/useQueryHook';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const getBlogCategoryList = (props: { onSuccessHandler: () => void }) => {
  return UseQueryHook({
    queryKey: ['blogCategoryList'],
    requestData: {
      url: '/api/blog-category-list',
      method: 'GET',
    },
    isRefetchWindowFocus: false,
    onSuccessHandler: ({ data }) => {
      props.onSuccessHandler(data);
      // let urlQueryObject = UrlQueryStringToObject(window.location.href);
    },
  });
};

const getBlog = (props: unknown) => {
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
    onSuccessHandler: (res) => {
      props.onSuccessHandler(res);
    },
    enabled: props.enabled,
  });
};

const getBlogList = () => {
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  return UseQueryHook({
    queryKey: [
      'blogList',
      // store.getState().blogStore.activeBlogSecondCategoryId,
      blogStore1.activeFirstCategory,
      blogStore1.activeSecondCategory,
      blogStore1.blogListOrderOption,
    ],
    requestData: {
      url: '/api/blog-list',
      method: 'GET',
      params: {
        sort: blogStore1.blogListOrderOption || 'baseTimeEntity.modifiedAt',
        // secondCategoryId: store.getState().blogStore.activeBlogSecondCategoryId,
        secondCategoryId: blogStore1.activeSecondCategory,
      },
    },
    isRefetchWindowFocus: false,
    enabled: blogStore1.activeSecondCategory ?? false,
    staleTime: 300000,
  });
};
// TODO
const createBlogFirstCategory = (props: { onSuccessHandler: () => void }) => {
  const mutationFn = async (reqData: ICreateFirstCategoryHandlerProps) => {
    return await AxiosInstance.post('/api/blog-first-category', {
      name: reqData.name,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      const _createBlogFirstCategory = data.data.json.createBlogFirstCategory;
      const _firstCategoryList = JSON.parse(
        JSON.stringify(store.getState().blogStore1.firstCategoryList),
      );
      _firstCategoryList[_createBlogFirstCategory.id] =
        _createBlogFirstCategory.name;
      store.dispatch(
        rootActions.blogStore1.setFirstCategoryList(
          Object.assign({}, _firstCategoryList),
        ),
      );
      const _secondCategoryList = JSON.parse(
        JSON.stringify(store.getState().blogStore1.secondCategoryList),
      );
      _secondCategoryList[_createBlogFirstCategory.id] = {};
      store.dispatch(
        rootActions.blogStore1.setSecondCategoryList(
          Object.assign({}, _secondCategoryList),
        ),
      );
      props.onSuccessHandler();
    },
  });
};

const updateBlogFirstCategory = (props: { onSuccessHandler: () => void }) => {
  const mutationFn = async (reqData: { id: number; name: string }) => {
    return await AxiosInstance.put('/api/blog-first-category', {
      id: reqData.id,
      name: reqData.name,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      const temp = JSON.parse(
        JSON.stringify(store.getState().blogStore1.firstCategoryList),
      );
      temp[variables.id] = variables.name;
      store.dispatch(
        rootActions.blogStore1.setFirstCategoryList(Object.assign({}, temp)),
      );
      props.onSuccessHandler();
    },
  });
};

const deleteBlogFirstCategory = (props: { onSuccessHandler: () => void }) => {
  const blogStore1 = useSelector((state) => state.blogStore1);
  const mutationFn = async (reqData) => {
    return await AxiosInstance.delete(
      `/api/blog-first-category?id=${reqData?.id}`,
    ).catch(() => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      // ! 1번째 카테고리를 삭제하였을 때 현재 활성화 된 카테고리면 다른 카테고리로 변경
      const _firstCategoryList = JSON.parse(
        JSON.stringify(blogStore1.firstCategoryList),
      );
      const _secondCategoryList = JSON.parse(
        JSON.stringify(blogStore1.secondCategoryList),
      );
      if (variables.id == blogStore1.activeFirstCategory) {
        const _firstCategoryId = Object.keys(_firstCategoryList)[0];
        store.dispatch(
          rootActions.blogStore1.setActiveFirstCategory(_firstCategoryId),
        );
        const _secondCategoryId = Object.keys(
          _secondCategoryList[_firstCategoryId],
        )[0];
        store.dispatch(
          rootActions.blogStore1.setActiveSecondCategory(_secondCategoryId),
        );
      }
      delete _firstCategoryList[variables.id];
      store.dispatch(
        rootActions.blogStore1.setFirstCategoryList(
          Object.assign({}, _firstCategoryList),
        ),
      );
      delete _secondCategoryList[variables.id];
      store.dispatch(
        rootActions.blogStore1.setSecondCategoryList(
          Object.assign({}, _secondCategoryList),
        ),
      );
      props.onSuccessHandler();
    },
  });
};

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
        store
          .getState()
          .blogStore.SET_ACTIVE_BLOG_FIRST_CATEGORY(
            props.data.json.blogFirstCategoryList[0].id,
          ),
      );
    },
  });
};

const createSecondCategory = (props: { onSuccessHandler: () => void }) => {
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  const mutationFn = async (reqData) => {
    const formData = new FormData();
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
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      const _createBlogSecondCategory: {
        id: string | number;
        thumbnailImageUrl: string;
        name: string;
        count: 0;
      } = data.data.json.createBlogSecondCategory;
      const _secondCategoryList = JSON.parse(
        JSON.stringify(store.getState().blogStore1.secondCategoryList),
      );
      _secondCategoryList[blogStore1.activeFirstCategory][
        _createBlogSecondCategory.id
      ] = {
        thumbnailImageUrl: _createBlogSecondCategory.thumbnailImageUrl,
        name: _createBlogSecondCategory.name,
        count: 0,
      };
      store.dispatch(
        rootActions.blogStore1.setSecondCategoryList(_secondCategoryList),
      );
      props.onSuccessHandler();
    },
    onErrorHandler: () => {},
    onSettledHandler: () => {},
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

const updateSecondCategory = (props: { onSuccessHandler: () => void }) => {
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  const mutationFn = async (reqData) => {
    const formData = new FormData();
    formData.append('id', reqData.id);
    formData.append('name', reqData.name);
    formData.append('files', reqData.files);
    formData.append('directory', reqData.directory);
    return await AxiosInstance.put('/api/blog-second-category', formData);
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables }) => {
      const _secondCategoryList = JSON.parse(
        JSON.stringify(blogStore1.secondCategoryList),
      );
      _secondCategoryList[blogStore1.activeFirstCategory][variables.id] = {
        id: variables.id,
        name: variables.name,
        thumbnailImageUrl: data.data.json.data.thumbnailImageUrl,
        count:
          _secondCategoryList[blogStore1.activeFirstCategory][variables.id]
            .count,
      };
      store.dispatch(
        rootActions.blogStore1.setSecondCategoryList(
          Object.assign({}, _secondCategoryList),
        ),
      );
      props.onSuccessHandler();
    },
  });
};

const deleteSecondCategory = (props: { onSuccessHandler: () => void }) => {
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  const router = useRouter();
  const mutationFn = async (reqData) => {
    return await AxiosInstance({
      url: '/api/blog-second-category',
      method: 'DELETE',
      params: {
        id: reqData.id,
      },
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      // ! 2번쨰 카테고리가 활성화되어있다면 다른 카테고리가 활성화되게 작업해야한다.
      let _secondCategoryId = blogStore1.activeSecondCategory;
      const _secondCategoryList = JSON.parse(
        JSON.stringify(blogStore1.secondCategoryList),
      );
      if (blogStore1.activeSecondCategory == variables.id) {
        _secondCategoryId = Object.keys(
          _secondCategoryList[blogStore1.activeFirstCategory],
        )[0];
        store.dispatch(
          rootActions.blogStore1.setActiveSecondCategory(_secondCategoryId),
        );
      }
      delete _secondCategoryList[blogStore1.activeFirstCategory][variables.id];
      store.dispatch(
        rootActions.blogStore1.setSecondCategoryList(
          Object.assign({}, _secondCategoryList),
        ),
      );
      router.replace(
        `/blog?first-category=${blogStore1.activeFirstCategory}&second-category=${_secondCategoryId}`,
        undefined,
        {
          shallow: true,
        },
      );
      props.onSuccessHandler();
    },
  });
};

const createBlog = (props: string) => {
  const router = useRouter();
  const mutationFn = async (reqData) => {
    const formData = new FormData();
    formData.append('title', reqData.title);
    formData.append('description', reqData.description);
    formData.append('content', reqData.content);
    formData.append('firstCategoryId', reqData.firstCategoryId);
    formData.append('secondCategoryId', reqData.secondCategoryId);
    formData.append('thumbnailImageFile', reqData.thumbnailImageFile);
    formData.append('directory', reqData.directory);

    reqData.imageUrlList?.map((i) => {
      formData.append('imageUrlList', i);
    });

    reqData.imageFileList?.map((i) => {
      formData.append('imageFileList', i);
    });

    return await AxiosInstance.post('/api/blog', formData);
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      props.onSuccessHandler();
      router.replace(`/blog/${data.data.json.id}`);
    },
    onErrorHandler: ({ variables }) => {
      navigator.clipboard.writeText(variables.content);
    },
  });
};

const updateBlog = (props: string) => {
  const router = useRouter();
  const mutationFn = async (reqData: unknown) => {
    const formData = new FormData();
    formData.append('id', reqData.id);
    formData.append('title', reqData.title);
    formData.append('description', reqData.description);
    formData.append('content', reqData.content);
    formData.append('firstCategoryId', reqData.firstCategoryId);
    formData.append('secondCategoryId', reqData.secondCategoryId);
    formData.append('thumbnailImageFile', reqData.thumbnailImageFile);
    formData.append('directory', reqData.directory);

    reqData.deleteImageBucketDirectory?.map((i) => {
      formData.append('deleteImageBucketDirectory', i);
    });

    reqData.imageUrlList?.map((i) => {
      formData.append('imageUrlList', i);
    });

    reqData.imageFileList?.map((i) => {
      formData.append('imageFileList', i);
    });

    return await AxiosInstance.put('/api/blog', formData).then(async (res) => {
      return res;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: async ({ variables }) => {
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://blog.ssssksss.xyz';
      await axios
        .post({
          url: `${baseUrl}/api/revalidate?secret=${process.env.REVALIDATE_TOKEN}`,
          data: { path: 'blog', id: variables.id + '' },
        })
        .then(() => {
          props.onSuccessHandler();
          router.back();
        })
        .catch(() => {
          props.onSuccessHandler();
        });
    },
    onErrorHandler: ({ variables }) => {
      navigator.clipboard.writeText(variables.content);
    },
  });
};

const deleteBlog = async (props: { id: string }) => {
  return await ApiProcessHandler({
    url: '/api/blog',
    method: 'DELETE',
    params: {
      id: props.id,
    },
  });
};

const getSearchBlogList = async (keyword: string, page: number) => {
  return await ApiProcessHandler({
    url: '/api/blog/search',
    method: 'GET',
    params: {
      keyword: keyword || '',
      page: page || 1,
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
    params: {
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
  deleteBlog,
  updateBlog,
  getBlogList,
  addBlogContentTemplate,
  deleteBlogContentTemplate,
  getBlogContentTemplate,
  getSearchBlogList,
};
