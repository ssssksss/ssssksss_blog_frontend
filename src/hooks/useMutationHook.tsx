import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { MutationFunction, useMutation } from 'react-query';

interface IUseMutationHookProps {
  mutationFn: MutationFunction;
  onErrorHandler?: ({
    data,
    variables,
    context,
  }: {
    data: any;
    variables: any;
    context: any;
  }) => void;
  onSuccessHandler?: ({
    data,
    variables,
    context,
  }: {
    data: any;
    variables: any;
    context: any;
  }) => void;
  onSettledHandler?: ({
    data,
    variables,
    context,
  }: {
    data: any;
    variables: any;
    context: any;
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
