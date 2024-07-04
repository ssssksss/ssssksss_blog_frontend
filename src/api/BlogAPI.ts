import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { useQueryHook1 } from '@hooks/useQueryHook1';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ICreateFirstCategoryHandlerProps } from 'src/@types/api/BlogAPI';
import ApiProcessHandler from './service/ApiProcessHandler';

export const getBlogCategoryListAPI = (
  _firstCategoryId?: string | number,
  _secondCategoryId?: string | number,
) => {
  return AxiosInstance({
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
    );
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: () => {
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
    },
  });
}

export const updateFirstCategoryAPI = (firstCategoryId: number, name: string) => {
  return AxiosInstance({
    url: '/api/blog/first/category',
    method: 'put',
    data: {
      id: firstCategoryId,
      name: name,
    },
  });
}

export const deleteFirstCategoryAPI = (firstCategoryId: number) => {
  return AxiosInstance({
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
  formData.append('firstCategoryId', activeFirstCategoryId+"");
  formData.append('files', files);
  return AxiosInstance({
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
  return AxiosInstance({
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
  return await AxiosInstance({
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
    return AxiosInstance({
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
  return await AxiosInstance({
    url: `/api/blog?id=${id}`,
    method: 'delete',
  })
};

export const deleteSecondCategoryAPI = async (secondCategoryId: number) => {
  return await AxiosInstance({
    url: '/api/blog/second/category',
    method: 'delete',
    params: {
      id: secondCategoryId,
    },
  });
};

const deleteBlogFirstCategory = (props: { onSuccessHandler: () => void }) => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const mutationFn = async (reqData: {id: number}) => {
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


const createBlog = (props: { onSuccessHandler: () => void}) => {
  const router = useRouter();
  const mutationFn = async (reqData: {
    title: string,
    description: string,
    content: string,
    firstCategoryId: string,
    secondCategoryId: string,
    thumbnailImageFile: File,
    imageUrlList: string[],
    imageFileList: File[]
  }) => {
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

    return await AxiosInstance.post('/api/blog', formData);
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
  return AxiosInstance.get("/api/blog/search", {
    params: {
      keyword: keyword || '',
      page: page || 1,
    }
  })
};

// const getSearchBlogList = (
//   keyword: string,
//   enable: boolean,
//   onSuccessHandler: () => void,
// ) => {
//   const result = useInfiniteQuery(
//     ['searchBlogList', keyword || ''], // 검색어 key값
//     ({ pageParam = 1 }) => getSearchBlogList1(keyword, pageParam),
//     {
//       refetchOnWindowFocus: false,
//       retry: 0,
//       select: (data) => {
//         let temp: unknown[] = [];
//         data?.pages.map((i) => {
//           const temp1 = [
//             ...i.data.data.blogList.map((_i) => {
//               return {
//                 ..._i,
//               };
//             }),
//           ];
//           temp = temp.concat(temp1);
//         });
//         return temp;
//       },
//       getNextPageParam: (lastPage, allPages) => {
//         const nextPage = allPages.length + 1;
//         return lastPage?.data.data.blogList?.length < 10 ? undefined : nextPage;
//         // return allPages.length > 2 ? undefined : nextPage;
//       },
//       onSuccess: () => {
//         onSuccessHandler();
//       },
//       // enabled: isOpenBlogItemList && isInputChange,
//       enabled: enable,
//     },
//   );
//   return result;
// };

interface BlogPost {
  id: number;
  title: string;
  content: string;
  // Add other blog post properties as needed
}
interface BlogListResponse {
  data: {
    blogList: BlogPost[];
  };
}

const getSearchBlogList = (
  keyword: string,
  enable: boolean,
  onSuccessHandler: () => void,
) => {
  const result = useInfiniteQuery<AxiosResponse<BlogListResponse>>(
    ['searchBlogList', keyword || ''],
    ({ pageParam = 1 }) => getSearchBlogList1(keyword, pageParam),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      select: (data) => {
        // Flatten the blog lists from all pages
        const allPosts = data.pages.flatMap((page) => page.data.data.blogList);
        return {
          ...data,
          pages: [
            {
              ...data.pages[0],
              data: {
                ...data.pages[0].data,
                data: {
                  blogList: allPosts,
                },
              },
            },
          ],
        };
      },
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data.data.blogList.length < 10 ? undefined : nextPage;
      },
      onSuccess: onSuccessHandler,
      enabled: enable,
    },
  );
  return result;
};

const addBlogContentTemplate = async () => {
  // return await ApiProcessHandler({
  //   url: '/api/blog/template',
  //   method: 'POST',
  //   data: {
  //     secondCategoryId: props.secondCategoryId,
  //     content: props.content,
  //   },
  //   apiCategory: '블로그 템플릿',
  //   isShowMessage: true,
  // });
};

const getBlogContentTemplate = async (props: { secondCategoryId: string }) => {
  return await ApiProcessHandler({
    url: '/api/blog/template',
    method: 'GET',
    params: props,
    apiCategory: '블로그 템플릿',
  });
};

const deleteBlogContentTemplate = async (props: { id: string }) => {
  return await ApiProcessHandler({
    url: '/api/blog/template',
    method: 'DELETE',
    params: props,
    apiCategory: '블로그 템플릿',
    isShowMessage: true,
  });
};

export const BlogAPI = {
  getBlogCategoryList1,
  createBlogFirstCategory,
  deleteBlogFirstCategory,
  createBlog,
  getBlogList,
  addBlogContentTemplate,
  deleteBlogContentTemplate,
  getBlogContentTemplate,
  getSearchBlogList,
};
