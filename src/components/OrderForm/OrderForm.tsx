import { FC } from 'react';
import axios from 'axios'
import AuthService from '../../services/auth.services'
import { Button, Col, Space, message } from 'antd';
import { OrderFormPropsType } from '../../types/components/OrderForm';

const OrderForm: FC<OrderFormPropsType> = ({ findProductQuantity, products, setProducts }) => {

    const user = JSON.parse(localStorage.getItem("user")!);


    const handleOrder = () => {
        findProductQuantity.length !== 0 ?
            axios.post(AuthService.CreateOrder, {
                "branchId": user.branchList[0].id,
                "orderList": findProductQuantity.map((item) => {
                    return {
                        productId: item.id,
                        quantity: item.requestedQuntity,
                    }
                })
            }, { headers: { authorization: `Bearer ${user.token}` } })
                .then(response => {
                    message.success('محصولات به سبد خرید اضافه شدند')
                    const updatedProducts = products.map((item) => {
                        return {
                            ...item,
                            requestedQuntity: 0
                        }
                    })
                    setProducts(updatedProducts);
                }) :
            message.error('هیچ محصولی را انتخاب نکردید')
    }

    return (
        <Col dir='ltr' xs={24} sm={12} md={12}>
            <Space direction='horizontal' size='small'>
                <Button type='primary' onClick={handleOrder} >ثبت سفارش</Button>
            </Space>
        </Col>
    );
}

export default OrderForm