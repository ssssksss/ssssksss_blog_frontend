declare interface IModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

declare interface IModalComponent {
  closeModal?: () => void;
  closeButtonComponent?: ReactNode;
}
