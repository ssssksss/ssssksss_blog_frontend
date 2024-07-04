import { store } from '@redux/store';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { AxiosRequestConfig } from 'axios'; // Import AxiosRequestConfig for AxiosInstance type checking
interface IApiProcessHandlerProps extends AxiosRequestConfig {
  apiCategory?: string;
  isShowMessage?: boolean;
}

interface IApiResponse {
  type: string;
  code: number;
  data?: any; // Adjust the type based on your actual API response
  json?: any; // Adjust the type based on your actual API response
}


const ApiProcessHandler = async (props: IApiProcessHandlerProps): Promise<IApiResponse> => {
  let toasttifyResponse: [string, string] = ['success', ''];
  let promiseType: 'response' | 'error' = 'response'; // Changed PromiseType to promiseType for naming convention
  let data: any;
  let code: number;
  let json: any;

  const apiMethod: Record<string, string> = {
    GET: '조회',
    POST: '추가',
    PUT: '수정',
    DELETE: '삭제',
  };

  try {
    const res = await AxiosInstance(props);

    toasttifyResponse = [
      'success',
      `${props.apiCategory} ${apiMethod?.[props.method]} 성공`,
    ];
    data = res.data.data; // Adjust based on your actual API response structure
    code = 200;
    json = res.data.json; // Adjust based on your actual API response structure
  } catch (error) {
    if (error?.response?.status === 403) {
      try {
        const res = await AxiosInstance(error.config);

        toasttifyResponse = [
          'success',
          `${props.apiCategory} ${apiMethod?.[props.method]} 성공`,
        ];
        promiseType = 'response';
        data = res.data.data; // Adjust based on your actual API response structure
        code = 200;
      } catch {
        toasttifyResponse = ['error', '서버 에러'];
        promiseType = 'error';
        code = 403;
      }
    } else if (error?.response?.status === 401) {
      toasttifyResponse = ['error', '권한 없음'];
      promiseType = 'error';
      code = 401;
    } else if (error?.response?.status === 400) {
      toasttifyResponse = ['error', '데이터가 없음'];
      promiseType = 'error';
      code = 400;
    } else if (error?.response?.status === 409) {
      toasttifyResponse = ['error', '데이터 중복'];
      promiseType = 'error';
      code = 400;
    } else {
      toasttifyResponse = ['error', '서버 에러'];
      promiseType = 'error';
      code = 500;
    }
  } finally {
    if (props.isShowMessage) {
      store.dispatch(
        SET_TOASTIFY_MESSAGE({
          type: toasttifyResponse[0] as 'success' | 'error' | 'warning' | 'info' | 'default',
          message: toasttifyResponse[1],
        }),
      );
    }
  }

  if (promiseType === 'response') {
    return {
      type: promiseType,
      code,
      data,
      json,
    };
  } else {
    throw {
      type: promiseType,
      code,
      data,
    };
  }
};

export default ApiProcessHandler;
