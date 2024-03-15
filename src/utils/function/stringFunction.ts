const replaceAll = (str, searchStr, replaceStr) => {
  return str.split(searchStr).join(replaceStr);
};

const StringFunction = {
  replaceAll,
};

export default StringFunction;
