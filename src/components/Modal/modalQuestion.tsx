import { FC } from 'react'
import { Modal } from 'antd'
import { ModalQuestionPropsType } from '../../types/components/Modal'

const ModalQuestion: FC<ModalQuestionPropsType> = ({ message, onOk, onCancel, modalOpen }) => {

    return <>
        <Modal title={message} open={modalOpen} onOk={onOk} onCancel={onCancel}>
        </Modal>
    </>
}

export default ModalQuestion