export const delaySearch = (__callback, ms) => {
  let instance;

  return () => {
    clearTimeout(instance);
    instance = setTimeout(() => {
      __callback();
    }, ms);
  };
};
