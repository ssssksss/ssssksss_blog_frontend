/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file urlQueryString.tsx
 * @version 0.0.1 "2023-10-11 08:54:48"
 * @description 설명
 */
const UrlQueryStringToObject = (url: string) => {
  const obj = {};
  const _url = url || window.document.location.href;
  const queryString = _url.substring(_url.indexOf('?') + 1, _url.length);
  queryString.split('&').map((i) => {
    let t1 = i.split('=')[0];
    let t2 = i.split('=')[1];
    obj[t1] = t2;
  });
  if (_url.indexOf('?') == -1) {
    return undefined;
  }
  return obj;
};
export default UrlQueryStringToObject;
