declare interface IModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  closeModalAfterSuccess: () => void;
}

declare interface IModalComponent {
  closeModal?: () => void;
  closeModalAfterSuccess?: () => void;
  closeButtonComponent?: ReactNode;
  loadingWithHandler?: any;
}
