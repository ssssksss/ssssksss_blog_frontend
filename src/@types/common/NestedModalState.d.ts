declare interface IModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

declare interface INestedModalComponent {
  closeModal?: () => void;
  closeButtonComponent?: ReactNode;
}
