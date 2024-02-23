import { useMutation } from 'react-query';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file useMutationHook.tsx
 * @version 0.0.1 "2024-01-26 01:28:03"
 * @description 설명
 */

interface IUseMutationHookProps {
  mutationFn: Promise<void>;
  onErrorHandler: () => void;
  onSuccessHandler: () => void;
  onSettledHandler: () => void;
}

export const useMutationHook = (props: IUseMutationHookProps) => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    props.mutationFn,
    {
      onMutate: variables => {
        // variables : {id: 1}
      },
      onSuccess: (data, variables, context) => {
        // console.log('success1', data);
        // console.log('success2', variables);
        // console.log('success3', context);
        if (props.onSuccessHandler)
          props.onSuccessHandler({ data, variables, context });
      },
      onError: (error, variables, context) => {
        // console.log('error1', error);
        // console.log('error2', variables);
        // console.log('error3', context);
        if (props.onErrorHandler)
          props.onErrorHandler({ error, variables, context });
      },
      onSettled: (data, error, variables, context) => {
        // end
        if (props.onSettledHandler)
          props.onSettledHandler({ data, error, variables, context });
      },
    }
  );

  return mutate; // mutation객체 반환
};
