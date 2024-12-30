export interface ModalDangerPropsType {
    massage: string,
    modalOpen: boolean,
    setModalOpen: () => void
}

export interface ModalQuestionPropsType {
    message: string;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onCancel: () => void;
    onOk: () => void;
}