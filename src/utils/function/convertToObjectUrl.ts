export const convertToObjectUrl = async (file: File) => {
  const url = URL.createObjectURL(file);
  return url;
};
