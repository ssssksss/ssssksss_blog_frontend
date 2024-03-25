import React from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Text.tsx
 * @version 0.0.1 "2024-03-24 11:32:26"
 * @description 설명
 */

type TextProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode &
    Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children'>;
};

const Text = <C extends React.ElementType>({
  as,
  children,
  ...rest
}: TextProps<C>) => {
  const Component = as || 'span';
  return <Component {...rest}> {children} </Component>;
};
export default Text;
