import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import axios from 'axios';
import { ApiProcessHandler } from './service/ApiProcessHandler';
import { BlogAPIType } from './type/BlogAPI.d';

const addFirstCategory = async (
  props: BlogAPIType.ICreateFirstCategoryHandlerProps
) => {
  return await ApiProcessHandler({
    url: '/api/blog-first-category',
    method: 'POST',
    data: {
      name: props.name,
    },
    apiCategory: '블로그 카테고리1',
    isShowMessage: true,
  });
};

const getFirstCategory = async () => {
  return await ApiProcessHandler({
    url: '/api/blog-first-category',
    method: 'GET',
    apiCategory: '블로그 카테고리1',
  });
};

const updateFirstCategory = async (
  props: BlogAPIType.IRemoveFirstCategoryHandlerProps
) => {
  return await ApiProcessHandler({
    url: '/api/blog-first-category',
    method: 'PUT',
    data: {
      id: props.id,
      name: props.name,
    },
    apiCategory: '블로그 카테고리1',
    isShowMessage: true,
  });
};

const removeFirstCategory = async (
  props: BlogAPIType.IRemoveFirstCategoryHandlerProps
) => {
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

const addSecondCategory = async (
  props: BlogAPIType.ICreateSecondCategoryHandlerProps
) => {
  let formData = new FormData();
  formData.append('name', props.name);
  formData.append('blogFirstCategoryId', props.firstCategoryId);
  formData.append('files', props.files);
  formData.append('directory', props.directory);

  return await ApiProcessHandler({
    url: '/api/blog-second-category',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
    data: formData,
    apiCategory: '블로그 카테고리2',
    isShowMessage: true,
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
  props: BlogAPIType.IUpdateSecondCategoryHandlerProps
) => {
  let formData = new FormData();
  formData.append('id', props.id);
  formData.append('name', props.name);
  formData.append('files', props.files);
  formData.append('directory', props.directory);
  console.log('BlogAPI.ts 파일 : ', props.files);

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

const removeSecondCategory = async (
  props: BlogAPIType.IRemoveSecondCategoryHandlerProps
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

const getCategoryList = async (props: string) => {
  return await ApiProcessHandler({
    url: '/api/blog-category-list',
    method: 'GET',
    apiCategory: '블로그 카테고리 리스트',
  });
};

const addBlogPost = async (props: string) => {
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

const getBlogPost = async (props: string) => {
  return await ApiProcessHandler({
    url: '/api/blog',
    method: 'GET',
    params: {
      id: props.id,
    },
  });
};

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

  props.removeImageBucketDirectory?.map(i => {
    formData.append('removeImageBucketDirectory', i);
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

const getBlogPostList = async (props: string) => {
  return await ApiProcessHandler({
    url: '/api/blog-list',
    method: 'GET',
    params: {
      secondCategoryId: props.secondCategoryId,
      sort: props.sort,
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

const removeBlogContentTemplate = async (props: string) => {
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
  addFirstCategory,
  getFirstCategory,
  updateFirstCategory,
  removeFirstCategory,
  addSecondCategory,
  getSecondCategory,
  updateSecondCategory,
  removeSecondCategory,
  getCategoryList,
  addBlogPost,
  getBlogPost,
  updateBlogPost,
  getBlogPostList,
  addBlogContentTemplate,
  removeBlogContentTemplate,
  getBlogContentTemplate,
  getSearchBlogPostList,
};
