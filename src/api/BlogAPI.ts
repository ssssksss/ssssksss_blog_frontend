import { ApiProcessHandler } from '@api/service/ApiProcessHandler';
import { IBlogCategoryListResDataProps } from '@components/blog/BlogFirstCategory/type/BlogFirstCategoryContainer.type';
import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { useQueryHook1 } from '@hooks/useQueryHook1';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import AxiosInstanceAuth from '@utils/axios/AxiosInstanceAuth';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ICreateFirstCategoryHandlerProps } from 'src/@types/api/BlogAPI';

export const getBlogCategoryListAPI = (
  _firstCategoryId?: string | number,
  _secondCategoryId?: string | number,
) => {
  // return useQueryHook({
  //   queryKey: ['blogCategoryList'],
  //   requestData: {
  //     url: '/api/blog-category-list',
  //     method: 'GET',
  //   },
  //   isRefetchWindowFocus: false,
  //   onSuccessHandler: ({ data }) => {
  //     props.onSuccessHandler(data);
  //     // let urlQueryObject = UrlQueryStringToObject(window.location.href);
  //   },
  // });
  return AxiosInstanceAuth({
    url: '/api/blog/category/list',
    method: 'GET',
    params: {
      firstCategoryId: _firstCategoryId || null,
      secondCategoryId: _secondCategoryId || null,
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
      // blogStore.activeSecondCategoryId,
      blogStore.blogListOrderOption,
      authStore.id
    ],
    requestData: {
      url: '/api/blog/list',
      method: 'GET',
      params: {
        sort: blogStore.blogListOrderOption || 'baseTimeEntity.modifiedAt',
        secondCategoryId: blogStore.activeSecondCategoryId,
      },
    },
    isRefetchWindowFocus: false,
    enabled: (blogStore.activeSecondCategoryId ?? false) as boolean,
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
    onSuccessHandler: () => {
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
      props.onSuccessHandler();
    },
  });
};

export const createFirstCategoryAPI = (firstCategoryName: string) => {
  return AxiosInstanceAuth({
    url: '/api/blog/first/category',
    method: 'post',
    data: {
      name: firstCategoryName,
    },
  });
}

export const updateFirstCategoryAPI = (firstCategoryId: number, name: string) => {
  return AxiosInstanceAuth({
    url: '/api/blog/first/category',
    method: 'put',
    data: {
      id: firstCategoryId,
      name: name,
    },
  });
}

export const deleteFirstCategoryAPI = (firstCategoryId: number) => {
  return AxiosInstanceAuth({
    url: '/api/blog/first/category',
    method: 'delete',
    params: {
      id: firstCategoryId,
    },
  });
}

export const createSecondCategoryAPI = (secondCategoryName: string, activeFirstCategoryId: number, files: File) => {
  const formData = new FormData();
  formData.append('name', secondCategoryName);
  formData.append('blogFirstCategoryId', activeFirstCategoryId+"");
  formData.append('files', files);
  return AxiosInstanceAuth({
    url: '/api/blog/second/category',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  });
};


export const updateSecondCategoryAPI = (
  secondCategoryId: number,
  secondCategoryNewName: string,
  files: File,
  firstCategoryId: number,
) => {
    const formData = new FormData();
    formData.append('id', secondCategoryId+"");
    formData.append('name', secondCategoryNewName + '');
    formData.append('files', files);
    formData.append('firstCategoryId', firstCategoryId+"");
  return AxiosInstanceAuth({
    url: '/api/blog/second/category',
    method: 'put',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  });
};

export const createBlogAPI = async (
  data: { key: string; value: string | number | string[] }[],
) => {
  const formData = new FormData();
  const ArrayObjectToFormData = (data: unknown[]) => {
    data.forEach((i: { key: string; value: string | Blob | [] }) => {
      if (Array.isArray(i.value)) {
        i.value.forEach((item) => formData.append(i.key, item));
      } else if (i.value !== undefined) {
        formData.append(i.key, i.value);
      }
    });
  };
  ArrayObjectToFormData(data);
  return await AxiosInstanceAuth({
    url: '/api/blog',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
  });
};

export const updateBlogAPI = (data: {key: string, value: string | number | string[]}[]) => {
  const formData = new FormData();
  const ArrayObjectToFormData = (data: unknown[]) => {
    data.forEach((i: { key: string; value: string | Blob | [] }) => {
      if (Array.isArray(i.value)) {
        i.value.forEach((item) => formData.append(i.key, item));
      } else if (i.value !== undefined) {
          formData.append(i.key, i.value);
        }
      });
  };
  ArrayObjectToFormData(data);
    return AxiosInstanceAuth({
      url: '/api/blog',
      method: 'put',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      data: formData,
    });
}

export const deleteBlogAPI = async (
  id: string
) => {
  return await AxiosInstanceAuth({
    url: `/api/blog?id=${id}`,
    method: 'delete',
  })
};



// const updateSecondCategory = (props: { onSuccessHandler: () => void }) => {
//   const blogStore = useSelector((state: RootState) => state.blogStore);
//   const mutationFn = async (reqData) => {
//     const formData = new FormData();
//     formData.append('id', reqData.id);
//     formData.append('name', reqData.name);
//     formData.append('files', reqData.files);
//     formData.append('directory', reqData.directory);
//     return await AxiosInstance.put('/api/blog-second-category', formData);
//   };

//   return useMutationHook({
//     mutationFn,
//     onSuccessHandler: ({ data, variables }) => {
//       const _secondCategoryList = JSON.parse(
//         JSON.stringify(blogStore.secondCategoryList),
//       );
//       _secondCategoryList[blogStore.activeFirstCategoryId][variables.id] = {
//         id: variables.id,
//         name: variables.name,
//         thumbnailImageUrl: data.data.data?.data.thumbnailImageUrl,
//         count:
//           _secondCategoryList[blogStore.activeFirstCategoryId][variables.id]
//             .count,
//       };
//       store.dispatch(
//         rootActions.blogStore.setSecondCategoryList(
//           Object.assign({}, _secondCategoryList),
//         ),
//       );
//       props.onSuccessHandler();
//     },
//   });
// };

export const deleteSecondCategoryAPI = async (secondCategoryId: number) => {
  return await AxiosInstanceAuth({
    url: '/api/blog/second/category',
    method: 'delete',
    params: {
      id: secondCategoryId,
    },
  });
};

// const deleteSecondCategory = (firstCategoryId: number) => {
//   const blogStore = useSelector((state: RootState) => state.blogStore);
//   const router = useRouter();
//   const mutationFn = async (reqData) => {
//     return await AxiosInstance({
//       url: '/api/blog-second-category',
//       method: 'DELETE',
//       params: {
//         id: reqData.id,
//       },
//       withCredentials: true,
//     });
//   };

//   return useMutationHook({
//     mutationFn,
//     onSuccessHandler: ({ variables }) => {
//       // ! 2번쨰 카테고리가 활성화되어있다면 다른 카테고리가 활성화되게 작업해야한다.
//       let _secondCategoryId = blogStore.activeSecondCategoryId;
//       const _secondCategoryList = JSON.parse(
//         JSON.stringify(blogStore.secondCategoryList),
//       );
//       if (blogStore.activeSecondCategoryId == variables.id) {
//         _secondCategoryId = Object.keys(
//           _secondCategoryList[blogStore.activeFirstCategoryId],
//         )[0];
//         store.dispatch(
//           rootActions.blogStore.setActiveSecondCategoryId(_secondCategoryId),
//         );
//       }
//       delete _secondCategoryList[blogStore.activeFirstCategoryId][variables.id];
//       store.dispatch(
//         rootActions.blogStore.setSecondCategoryList(
//           Object.assign({}, _secondCategoryList),
//         ),
//       );
//       router.replace(
//         `/blog?firstCategoryId=${blogStore.activeFirstCategoryId}&secondCategoryId=${_secondCategoryId}`,
//         undefined,
//         {
//           shallow: true,
//         },
//       );
//       props.onSuccessHandler();
//     },
//   });
// };



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
      if (variables.id == blogStore.activeFirstCategoryId) {
        const _firstCategoryId = Object.keys(_firstCategoryList)[0];
        store.dispatch(
          rootActions.blogStore.setActiveFirstCategoryId(_firstCategoryId),
        );
        const _secondCategoryId = Object.keys(
          _secondCategoryList[_firstCategoryId],
        )[0];
        store.dispatch(
          rootActions.blogStore.setActiveSecondCategoryId(_secondCategoryId),
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
        rootActions.blogStore.setActiveFirstCategoryId(
          props.data.data?.blogFirstCategoryList[0].id,
        ),
      );
    },
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
  createBlogFirstCategory,
  getBlogFirstCategoryList,
  deleteBlogFirstCategory,
  getSecondCategory,
  createBlog,
  getBlog,
  getBlogList,
  addBlogContentTemplate,
  deleteBlogContentTemplate,
  getBlogContentTemplate,
  getSearchBlogList,
};
