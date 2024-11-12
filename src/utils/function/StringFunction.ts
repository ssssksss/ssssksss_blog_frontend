const replaceAll = (str: string, searchStr: string, replaceStr: string) => {
  return str.split(searchStr).join(replaceStr);
};

const generateRandomString = (num: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const StringFunction = {
  replaceAll,
  generateRandomString,
};

export default StringFunction;
