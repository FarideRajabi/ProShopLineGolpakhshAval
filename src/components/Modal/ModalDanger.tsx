import { FC } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { ModalDangerPropsType } from '../../types/components/Modal';

const ModalDanger:FC<ModalDangerPropsType> = ({ massage,modalOpen,setModalOpen }) => {
    return <>
        <Modal open={modalOpen} >
            <ModalBody className='m-5 p-5 rounded fw-bolder text-center text-danger'>
                {massage}
            </ModalBody>
        </Modal>
    </>
}
export default ModalDanger