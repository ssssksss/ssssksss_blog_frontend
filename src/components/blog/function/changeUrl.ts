export const changeBlogUrlString = (_firstCategoryId: number, _secondCategoryId: number) => {
  let _url = 'blog';
  if (_firstCategoryId != 0 && _secondCategoryId != 0) {
    _url += `?firstCategoryId=${_firstCategoryId}&secondCategoryId=${_secondCategoryId}`;
  } else if (_firstCategoryId != 0) {
    _url += `?firstCategoryId=${_firstCategoryId}`;
  }
  return _url;
};