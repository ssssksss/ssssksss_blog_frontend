declare module BoxFlexComponentTypes {
  export type BoxComponentProps = {
    w?: string;
    minW?: string;
    maxW?: string;
    h?: string;
    minH?: string;
    maxH?: string;
    pd?: string;
    mg?: string;
    bg?: string;
    gap?: number;
    position?: string;
    outline?: string | boolean;
    scroll?: 'hidden' | 'scrollX' | 'scrollY';
  };
  type PositionProps = {
    top: string;
    left: string;
    right: string;
    bottom: string;
  };
  export type FlexBoxProps = BoxComponentProps & PositionProps;
}
declare module BoxGridComponentTypes {
  type BoxComponentProps = {
    w?: string;
    minW?: string;
    maxW?: string;
    h?: string;
    minH?: string;
    maxH?: string;
    pd?: string;
    mg?: string;
    bg?: string;
    outline?: string;
    gap?: number;
    columns?: string;
    rows?: string;
  };
  type PositionProps = {
    top: string;
    left: string;
    right: string;
    bottom: string;
  };
  export type GridBoxProps = BoxComponentProps & PositionProps;
}
