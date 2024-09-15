export const localStorageSetHandler = (
  storageKeyName: string,
  el: unknown,
  maxLength: number,
) => {
  const data = JSON.parse(window.localStorage.getItem(storageKeyName));
  let temp = [];
  if (data) {
    temp = data.filter((i) => i.id != el.id);
    if (temp.length > maxLength) temp.pop();
  }
  temp.unshift(el);
  window.localStorage.setItem(storageKeyName, JSON.stringify(temp));
};
