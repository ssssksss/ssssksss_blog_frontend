import { ApiProcessHandler } from '@api/service/ApiProcessHandler';
import { IBlogCategoryListResDataProps } from '@components/blog/BlogFirstCategory/type/BlogFirstCategoryContainer.type';
import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { useQueryHook1 } from '@hooks/useQueryHook1';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ICreateFirstCategoryHandlerProps } from 'src/@types/api/BlogAPI';

const getBlogCategoryList = (props: { onSuccessHandler: () => void }) => {
  return useQueryHook({
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

const getBlogCategoryList1 = () => {
  const router = useRouter();
  if (router.query.secondCategoryId == undefined) return null;
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const blogSecondCategoryId = router.query.secondCategoryId;
  return useQueryHook1({
    queryKey: ['blogCategoryList'],
    requestData: {
      url: '/api/blog/category/list',
      method: 'GET',
      params: {
        sort: blogStore.blogListOrderOption || 'baseTimeEntity.modifiedAt',
        secondCategoryId: blogSecondCategoryId,
      },
    },
    isRefetchWindowFocus: false,
  });
};

const getBlog = (props: unknown) => {
  return useQueryHook({
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
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  return useQueryHook({
    queryKey: [
      'blogList',
      // blogStore.activeSecondCategory,
      blogStore.blogListOrderOption,
      authStore.id
    ],
    requestData: {
      url: '/api/blog/list',
      method: 'GET',
      params: {
        sort: blogStore.blogListOrderOption || 'baseTimeEntity.modifiedAt',
        secondCategoryId: blogStore.activeSecondCategory,
      },
    },
    isRefetchWindowFocus: false,
    enabled: (blogStore.activeSecondCategory ?? false) as boolean,
  });
};
// TODO
const createBlogFirstCategory = (props: { onSuccessHandler: () => void }) => {
  const mutationFn = async (reqData: ICreateFirstCategoryHandlerProps) => {
    return await AxiosInstance.post(
      '/api/blog/first/category',
      {
        name: reqData.name,
      },
      { withCredentials: true },
    );
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      // const _createBlogFirstCategory = data.data.data?.createBlogFirstCategory;
      // const _firstCategoryList = JSON.parse(
      //   JSON.stringify(store.getState().blogStore.firstCategoryList),
      // );
      // _firstCategoryList[_createBlogFirstCategory.id] =
      //   _createBlogFirstCategory.name;
      // store.dispatch(
      //   rootActions.blogStore.setFirstCategoryList(
      //     Object.assign({}, _firstCategoryList),
      //   ),
      // );
      // const _secondCategoryList = JSON.parse(
      //   JSON.stringify(store.getState().blogStore.secondCategoryList),
      // );
      // _secondCategoryList[_createBlogFirstCategory.id] = {};
      // store.dispatch(
      //   rootActions.blogStore.setSecondCategoryList(
      //     Object.assign({}, _secondCategoryList),
      //   ),
      // );
      console.log("BlogAPI.ts 파일 : ",data);
      props.onSuccessHandler();
    },
  });
};

export const createFirstCategoryAPI = (firstCategoryName: string) => {
  return AxiosInstance({
      url: '/api/blog/first/category',
      method: 'post',
      data: {
        name: firstCategoryName,
      }
    })
}

const updateBlogFirstCategory = (props: { onSuccessHandler: () => void }) => {
  const mutationFn = async (reqData: { id: number; name: string }) => {
    return await AxiosInstance.put(
      '/api/blog-first-category',
      {
        id: reqData.id,
        name: reqData.name,
      },
      { withCredentials: true },
    );
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      const temp = JSON.parse(
        JSON.stringify(store.getState().blogStore.firstCategoryList),
      );
      temp[variables.id] = variables.name;
      store.dispatch(
        rootActions.blogStore.setFirstCategoryList(Object.assign({}, temp)),
      );
      props.onSuccessHandler();
    },
  });
};

const deleteBlogFirstCategory = (props: { onSuccessHandler: () => void }) => {
  const blogStore = useSelector((state) => state.blogStore);
  const mutationFn = async (reqData) => {
    return await AxiosInstance.delete(
      `/api/blog-first-category?id=${reqData?.id}`,
      { withCredentials: true },
    ).catch(() => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      // ! 1번째 카테고리를 삭제하였을 때 현재 활성화 된 카테고리면 다른 카테고리로 변경
      const _firstCategoryList = JSON.parse(
        JSON.stringify(blogStore.firstCategoryList),
      );
      const _secondCategoryList = JSON.parse(
        JSON.stringify(blogStore.secondCategoryList),
      );
      if (variables.id == blogStore.activeFirstCategory) {
        const _firstCategoryId = Object.keys(_firstCategoryList)[0];
        store.dispatch(
          rootActions.blogStore.setActiveFirstCategory(_firstCategoryId),
        );
        const _secondCategoryId = Object.keys(
          _secondCategoryList[_firstCategoryId],
        )[0];
        store.dispatch(
          rootActions.blogStore.setActiveSecondCategory(_secondCategoryId),
        );
      }
      delete _firstCategoryList[variables.id];
      store.dispatch(
        rootActions.blogStore.setFirstCategoryList(
          Object.assign({}, _firstCategoryList),
        ),
      );
      delete _secondCategoryList[variables.id];
      store.dispatch(
        rootActions.blogStore.setSecondCategoryList(
          Object.assign({}, _secondCategoryList),
        ),
      );
      props.onSuccessHandler();
    },
  });
};

const getBlogFirstCategoryList = () => {
  return useQueryHook({
    queryKey: 'blogFirstCategoryList',
    requestData: {
      url: '/api/blog-first-category',
      method: 'GET',
    },
    method: false,
    isRefetchWindowFocus: false,
    onSuccessHandler: (props: IBlogCategoryListResDataProps) => {
      store.dispatch(
        rootActions.blogStore.setActiveFirstCategory(
          props.data.data?.blogFirstCategoryList[0].id,
        ),
      );
    },
  });
};

const createSecondCategory = (props: { onSuccessHandler: () => void }) => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const mutationFn = async (reqData) => {
    const formData = new FormData();
    formData.append('name', reqData.name);
    formData.append('blogFirstCategoryId', reqData.blogFirstCategoryId);
    formData.append('files', reqData.files);
    formData.append('directory', reqData.directory);
    return await AxiosInstance({
      url: '/api/blog/second/category',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      data: formData,
      withCredentials: true,
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
      } = data.data.data?.createBlogSecondCategory;
      const _secondCategoryList = JSON.parse(
        JSON.stringify(store.getState().blogStore.secondCategoryList),
      );
      _secondCategoryList[blogStore.activeFirstCategory][
        _createBlogSecondCategory.id
      ] = {
        thumbnailImageUrl: _createBlogSecondCategory.thumbnailImageUrl,
        name: _createBlogSecondCategory.name,
        count: 0,
      };
      store.dispatch(
        rootActions.blogStore.setSecondCategoryList(_secondCategoryList),
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
  const blogStore = useSelector((state: RootState) => state.blogStore);
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
        JSON.stringify(blogStore.secondCategoryList),
      );
      _secondCategoryList[blogStore.activeFirstCategory][variables.id] = {
        id: variables.id,
        name: variables.name,
        thumbnailImageUrl: data.data.data?.data.thumbnailImageUrl,
        count:
          _secondCategoryList[blogStore.activeFirstCategory][variables.id]
            .count,
      };
      store.dispatch(
        rootActions.blogStore.setSecondCategoryList(
          Object.assign({}, _secondCategoryList),
        ),
      );
      props.onSuccessHandler();
    },
  });
};

const deleteSecondCategory = (props: { onSuccessHandler: () => void }) => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const router = useRouter();
  const mutationFn = async (reqData) => {
    return await AxiosInstance({
      url: '/api/blog-second-category',
      method: 'DELETE',
      params: {
        id: reqData.id,
      },
      withCredentials: true, 
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      // ! 2번쨰 카테고리가 활성화되어있다면 다른 카테고리가 활성화되게 작업해야한다.
      let _secondCategoryId = blogStore.activeSecondCategory;
      const _secondCategoryList = JSON.parse(
        JSON.stringify(blogStore.secondCategoryList),
      );
      if (blogStore.activeSecondCategory == variables.id) {
        _secondCategoryId = Object.keys(
          _secondCategoryList[blogStore.activeFirstCategory],
        )[0];
        store.dispatch(
          rootActions.blogStore.setActiveSecondCategory(_secondCategoryId),
        );
      }
      delete _secondCategoryList[blogStore.activeFirstCategory][variables.id];
      store.dispatch(
        rootActions.blogStore.setSecondCategoryList(
          Object.assign({}, _secondCategoryList),
        ),
      );
      router.replace(
        `/blog?firstCategoryId=${blogStore.activeFirstCategory}&secondCategoryId=${_secondCategoryId}`,
        undefined,
        {
          shallow: true,
        },
      );
      props.onSuccessHandler();
    },
  });
};

const createBlog = (props: { onSuccessHandler: () => void}) => {
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

    // ? imageUrlList와 imageFileList를 하나의 단위로 묶고서 map이 아닌 promise로 처리해버리면 속도가 빨라지지 않을까?
    reqData.imageUrlList?.map((i: string) => {
      formData.append('imageUrlList', i);
    });

    reqData.imageFileList?.map((i: File) => {
      formData.append('imageFileList', i);
    });

    return await AxiosInstance.post('/api/blog', formData, {
      withCredentials: true,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      props.onSuccessHandler();
      router.replace(`/blog/${data.data.data?.id}`);
    },
    onErrorHandler: ({ variables }) => {
      navigator.clipboard.writeText(variables.content);
    },
  });
};

const updateBlog = (props: { onSuccessHandler: () => void }) => {
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
    formData.append('status', reqData.status);

    reqData.deleteImageBucketDirectory?.map((i) => {
      formData.append('deleteImageBucketDirectory', i);
    });

    reqData.imageUrlList?.map((i) => {
      formData.append('imageUrlList', i);
    });

    reqData.imageFileList?.map((i) => {
      formData.append('imageFileList', i);
    });

    return await AxiosInstance.put('/api/blog', formData, {
      withCredentials: true,
    }).then(async (res) => {
      return res;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: () => {
      // const baseUrl =
      //   process.env.NODE_ENV === 'development'
      //     ? 'http://localhost:3000'
      //     : 'https://blog.ssssksss.xyz';
      // await axios
      //   .get({
      //     url: `/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN}&id=${variables.id}`,
      //   }).catch(()=>{
      //     return;
      //   })
      props.onSuccessHandler();
      // router.replace(`/blog/${variables.id}`, '', { shallow: true });
      router.back();
    },
    onErrorHandler: ({ variables }) => {
      navigator.clipboard.writeText(variables.content);
    },
  });
};

const deleteBlog = async (props: { id: string }) => {
  // TODO: API 수정
  return await ApiProcessHandler({
    url: '/api/blog',
    method: 'DELETE',
    params: {
      id: props.id,
    },
    withCredentials: true
  });
};

const getSearchBlogList1 = async (keyword: string, page: number) => {
  // return await ApiProcessHandler({
  //   url: '/api/blog/search',
  //   method: 'GET',
  //   params: {
  //     keyword: keyword || '',
  //     page: page || 1,
  //   },
  // });
  return AxiosInstance.get("/api/blog/search", {
    params: {
      keyword: keyword || '',
      page: page || 1,
    }
  })
};

const getSearchBlogList = (
  keyword: string,
  enable: boolean,
  onSuccessHandler: () => void,
) => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const result = useInfiniteQuery(
    ['searchBlogList', keyword || ''], // 검색어 key값
    ({ pageParam = 1 }) => getSearchBlogList1(keyword, pageParam),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      select: (data) => {
        let temp: unknown[] = [];
        data?.pages.map((i) => {
          const temp1 = [
            ...i.data.data.blogList.map((_i) => {
              return {
                ..._i,
                defaultImageUrl: blogStore.blogCategoryList.filter(
                  (i) => i.id == _i.firstCategoryId,
                )[0].blogSecondCategoryList.filter(j=>j.id == _i.secondCategoryId)[0].thumbnailImageUrl,
              };
            }),
          ];
          temp = temp.concat(temp1);
        });
        return temp;
      },
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage?.data.data.blogList?.length < 10 ? undefined : nextPage;
        // return allPages.length > 2 ? undefined : nextPage;
      },
      onSuccess: () => {
        onSuccessHandler();
      },
      // enabled: isOpenBlogItemList && isInputChange,
      enabled: enable,
    },
  );
  return result;
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
    withCredentials: true
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
  // TODO API 수정 필요, 현재 사용은 안되고 있음
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
  getBlogCategoryList1,
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
