declare interface IDropdown<T> {
  options: {value: T; name: string}[];
  dropdownHandler: (value: T) => void;
  defaultValue: T;
  value: T;
  borderClassName?: string;
  containerClassName?: string;
  elementClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  OptionContainerMaxH?: string;
}
