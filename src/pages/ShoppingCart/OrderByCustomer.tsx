import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import AuthService from '../../services/auth.services';
import { OptionsType } from '../../types/pages';
import ModalQuestion from '../../components/Modal/modalQuestion';
import Header from '../../components/Header/Header';
import SelectItem from '../../components/SelectItem';
import Invoice from './Invoice';
import { useNavigate } from 'react-router-dom';
import { ShoppingOutlined } from '@ant-design/icons';
import { Button, Col, Row, Input } from 'antd';

const { TextArea } = Input;

const OrderByCustomer: FC = () => {
    const user = JSON.parse(localStorage.getItem("user")!)

    const [modalOpen, setModalOpen] = useState(false);
    const [selected, setSelected] = useState(0);
    const [formData, setFormData] = useState("");
    const [data, setData] = useState([])

    const [options, setOption] = useState<OptionsType[]>([{ lable: "", value: 0 }])

    const navigate = useNavigate()


    useEffect(() => {
        const options = {
            method: 'GET',
            url: AuthService.GetPaymentType,
            headers: {
                authorization: `Bearer ${user.token}`
            }
        }

        axios.request(options).then(function (response) {
            setOption(response.data.data)

        }).catch(function (error) {
            console.error(error)
        })
    }, [data])

    const handleSubmitOrder = () => {
        axios.post(AuthService.SubmitOrderByCustomer,
            {
                "branchId": user.branchList[0].id,
                "paymentTypeId": selected,
                "description": formData
            }
            , { headers: { authorization: `Bearer ${user.token}` } })
            .then(response => {
                setData(response.data.data)
                setModalOpen(false)
                setFormData("")
                navigate('/');
            })
    }

    const handleNotSubmitOrder = () => {
        setModalOpen(false)
    }

    const icon = () => { return <ShoppingOutlined style={{ fontSize: "25px" }} /> }

    return (
        <>
            <Header icon={icon} header="انتخاب شیوه پرداخت" description=" در این صفحه میتوانید سفارشات خود را ثبت نمائید" />
            <Row gutter={[10,10]} style={{ padding: "20px" }} >

                <Col style={{ paddingLeft: "50px" }} xs={24} sm={24} md={12} lg={12}>
                    <Row>
                        <Col span={11}>
                            <h1>شیوه پرداخت :</h1>
                        </Col>
                        <Col >
                            <SelectItem options={options} setSelected={setSelected} />
                        </Col>
                    </Row>
                    <Row >
                        <Col span={21}>
                            <h1 > توضیحات تکمیلی:</h1>
                            <TextArea rows={4} cols={72} value={formData} placeholder="لطفا توضیحات خود را وارد کنید " onChange={((e) => setFormData(e.target.value))} />
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Button
                        style={{marginTop:"50px"}}
                            type='primary'
                            onClick={() => setModalOpen(true)}
                        >
                            ثبت سفارش
                        </Button>
                    </Row>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                    <Invoice />
                </Col>
            </Row>

            <div>
                <ModalQuestion message="آیا از ثبت سفارش خود مطمئن هستید؟" onCancel={handleNotSubmitOrder} onOk={handleSubmitOrder} modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>
        </>
    )
}
export default OrderByCustomer