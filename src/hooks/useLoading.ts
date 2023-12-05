import { useState } from 'react';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file useLoading.ts
 * @version 0.0.1 "2023-10-09 23:03:04"
 * @description 넣어주는 함수는 return이 있어야 한다.
 */
const useLoading = action => {
  const [isLoading, setIsLoading] = useState(false);

  const loadingFunction = async action => {
    setIsLoading(true);
    let result = await action;
    setIsLoading(false);

    if (result?.type === 'response') {
      return Promise.resolve({
        code: result.code,
        data: result?.data,
      });
    } else {
      return Promise.reject({
        code: result?.code,
        data: result?.data,
      });
    }
  };

  return [isLoading, loadingFunction];
};
export default useLoading;
