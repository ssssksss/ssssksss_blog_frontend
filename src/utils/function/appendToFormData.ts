

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
      if (Array.isArray(i.value)) {
        i.value.forEach((item) => formData.append(i.key, item));
      } else if (i.value !== undefined) {
        formData.append(i.key, i.value);
      }
  });
  return formData
};
