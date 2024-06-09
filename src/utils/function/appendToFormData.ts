

/**
 * @params : data
 * [
 *  {key: string , value: string | Blog}
 *  {key: string , value: string | Blog}
 * ]
 */

export const ArrayObjectToFormData = (
  data: unknown[], formData: FormData
) => {
  data.forEach((i: { key: string; value: string | Blob | [] }) => {
    console.log("appendToFormData.ts 파일1 : ",i.key);
    console.log("appendToFormData.ts 파일2 : ",i.value);
      if (Array.isArray(i.value)) {
        i.value.forEach((item) => formData.append(i.key, item));
      } else if (i.value !== undefined) {
        console.log("appendToFormData.ts 파일 : ",i.key);
        console.log("appendToFormData.ts 파일 : ",i.value);
        formData.append(i.key, i.value);
      }
  });
  return formData
};
