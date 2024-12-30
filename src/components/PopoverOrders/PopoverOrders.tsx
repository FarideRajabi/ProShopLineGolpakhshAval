import { Popover, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { PopoverOrdersPropsType } from '../../types/components/PopoverOrders';
import { useNavigate } from 'react-router-dom';
import { ordersType } from '../../types/pages';
import AuthService from '../../services/auth.services';
import axios from 'axios';
import ModalQuestion from '../Modal/modalQuestion';


const PopoverOrders: React.FC<PopoverOrdersPropsType> = ({ id, orders,modalOpen, setModalOpen }) => {

    const order = orders.filter((item) => {
     return Number(item.id) === id
    }
    )
   
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")!)

    const handleLocation = (order: (false | ordersType)[]) => {
        navigate('/order-items', { state: order });
    }

    const ReOrder = () => {
        axios.post(AuthService.ReOrder,
            {
                "orderId": id
            }
            , { headers: { authorization: `Bearer ${user.token}` } })
            .then(response => {
                response.data.data &&
                    setModalOpen(false);
            })
    }
    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const content = (
        <div>
            <p className='image-class' onClick={() => handleLocation(order)}>اطلاعات و جزئیات سفارش</p>
            <p className='image-class' onClick={() => setModalOpen(true)}>سفارش مجدد</p>
            <p className='image-class' onClick={() => message.error("این امکان فعلا پیاده سازی نشده است!")}>پیگیری  سفارش</p>
        </div>
    );

    return (
        <div>
            <Popover placement="right" content={content} trigger="click">
                <MoreOutlined />
            </Popover>
            <ModalQuestion message="آیا مطمئنید که میخواهید این سفارش را تکرار کنید؟" onCancel={handleCloseModal} onOk={ReOrder} modalOpen={modalOpen} setModalOpen={setModalOpen} />

        </div>
    )
};

export default PopoverOrders;