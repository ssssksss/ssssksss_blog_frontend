import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import AxiosInstance from '@/utils/axios/AxiosInstance';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file toastifyAPiProcess.ts
 * @version 0.0.1 "2023-10-18 05:59:22"
 * @description 설명
 */

interface IAPiProcessHandlerProps {
  url: string;
  method: string;
  params?: {};
  apiCategory?: string;
  isShowMessage?: boolean;
}


export const ApiProcessHandler = async (props: IAPiProcessHandlerProps) => {
  let toasttifyResponse = ['success', ''];
  let PromiseType = 'response';
  let data;
  let code;
  let jsonObject;
  let apiMethod = {
    GET: "조회",
    POST: "추가",
    PUT: "수정",
    DELETE: "삭제",
  }

  await AxiosInstance({
    ...props,
  })
    .then(res => {
      toasttifyResponse = ['success', props.apiCategory +' ' + apiMethod.[props.method] +' 성공'];
      data = res.data.data;
      code = 200;
      jsonObject = res.data.jsonObject;
    })
    .catch(async error => {
      // if (error?.response?.status === 403 || error?.response?.status === 401) {
      if (error?.response?.status === 403) {
        await AxiosInstance(error.config)
          .then(res => {
            toasttifyResponse = ['success', props.apiCategory +' ' + apiMethod.[props.method] +' 성공'];
            PromiseType = 'response';
            data = res.data.data;
            code = 200;
          })
          .catch(error => {
            toasttifyResponse = ['error', '서버 에러'];
            PromiseType = 'error';
            code = 403;
          });
        } else if(error?.response?.status == 401) {
        toasttifyResponse = ['error', '권한 없음'];
        PromiseType = 'error';
        code = 401;
      }
        else if(error?.response?.status == 400) {
        toasttifyResponse = ['error', '데이터가 없음'];
        PromiseType = 'error';
        code = 400;
      }
        else if(error?.response?.status == 409) {
        toasttifyResponse = ['error', '데이터 중복'];
        PromiseType = 'error';
        code = 400;
      }
        else {
        toasttifyResponse = ['error', '서버 에러'];
        PromiseType = 'error';
        code = 500;
      }
    })
    .finally(() => {
      if(props.isShowMessage) {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: toasttifyResponse[0],
            message: toasttifyResponse[1],
          })
          );
        }
    });
    if (PromiseType === 'response') {
      return Promise.resolve({
        type: PromiseType,
        code: code,
        data: data,
        jsonObject: jsonObject,
      });
    }else {
      return Promise.reject({
        type: PromiseType,
        code: code,
        data: data,
      });
    }
};
