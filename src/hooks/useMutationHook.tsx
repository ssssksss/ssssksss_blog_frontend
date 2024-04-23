import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { MutationFunction, useMutation } from 'react-query';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file useMutationHook.tsx
 * @version 0.0.1 "2024-01-26 01:28:03"
 * @description 설명
 */

interface IUseMutationHookProps {
  mutationFn: MutationFunction;
  onErrorHandler?: ({
    data,
    variables,
    context,
  }: {
    data: unknown;
    variables: unknown;
    context: unknown;
  }) => void;
  onSuccessHandler?: ({
    data,
    variables,
    context,
  }: {
    data: unknown;
    variables: unknown;
    context: unknown;
  }) => void;
  onSettledHandler?: ({
    data,
    variables,
    context,
  }: {
    data: unknown;
    variables: unknown;
    context: unknown;
  }) => void;
}

export const useMutationHook = (props: IUseMutationHookProps) => {
  const { mutate } = useMutation(props.mutationFn, {
    onMutate: () => {
      // variables : {id: 1}
    },
    onSuccess: (data, variables, context) => {
      if (data.data.msg) {
        store.dispatch(
          rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
            type: 'success',
            message: data.data.msg,
          }),
        );
      }
      if (props.onSuccessHandler)
        props.onSuccessHandler({ data, variables, context });
    },
    onError: (error, variables, context) => {
      store.dispatch(
        rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
          type: 'error',
          message: error.response.data?.msg,
        }),
      );
      if (props.onErrorHandler)
        props.onErrorHandler({ error, variables, context });
    },
    onSettled: (data, error, variables, context) => {
      // end
      if (props.onSettledHandler)
        props.onSettledHandler({ data, error, variables, context });
    },
  });

  return mutate; // mutation객체 반환
};
