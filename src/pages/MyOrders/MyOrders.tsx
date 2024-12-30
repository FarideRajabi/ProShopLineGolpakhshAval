import { useState, useEffect, FC } from "react"
import axios from 'axios'
import AuthService from "../../services/auth.services";
import { ordersType } from "../../types/pages";
import Header from "../../components/Header/Header";
import SelectItem from "../../components/SelectItem";
import DatePickerComponent from "../../components/DatePickerComponent";
import { idToKey, tableRowNumberGenerator } from "../../components/Navbar/TableFunction/tableFunctions";
import PopoverOrders from "../../components/PopoverOrders/PopoverOrders";
import { Row, Col, Button, Card, Table } from 'antd';
import { CalendarOutlined, ShopOutlined } from "@ant-design/icons";
import Filter from './../../assets/images/logo/fi-rr-filter.png'

const MyOrders: FC = () => {

    const user = JSON.parse(localStorage.getItem("user")!)
    const [tableLoading, setTableLoading] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedRowKey, setSelectedRowKey] = useState<number>()

    const [startDate, setStartDate] = useState({ year: "1399", month: "01", day: "01" })
    const selectedDayStartForm = `${startDate.year}/${startDate.month}/${startDate.day}`

    const [endDate, setEndDate] = useState({ year: "1405", month: "01", day: "01" })
    const selectedDayEndForm = `${endDate.year}/${endDate.month}/${endDate.day}`

    const [selectedValue, setSelectedValue] = useState(2);

    const [orders, setOrders] = useState<ordersType[]>([])

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: tableRowNumberGenerator,
            align: 'center',
            width: '50px',
        },
        {
            title: 'تاریخ سفارش',
            dataIndex: 'createdDateTime',
            key: 'createdDateTime',
            align: 'center',
        },
        {
            title: 'کد رهگیری',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
        },
        {
            title: "جمع کل سفارش" + " (ریال)",
            dataIndex: 'sumPrice',
            key: 'sumPrice',
            align: 'center',
            render: (sumPrice: string) => (
                <Row justify='center'>
                    {Number(sumPrice).toLocaleString("fa-IR")}
                </Row>
            ),
        },
        {
            title: 'شیوه پرداخت',
            dataIndex: 'paymentType',
            key: 'paymentType',
            align: 'center',
        },
        {
            title: 'وضعیت',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            align: 'center',
        },
        {
            title: 'عملیات',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            render: (key: string) => (
                <PopoverOrders id={selectedRowKey} orders={orders} setOrders={setOrders} modalOpen={modalOpen} setModalOpen={setModalOpen} />
            ),
        }
    ]

    const [options, setOption] = useState([
        { lable: "", value: 0 }
    ])

    useEffect(() => {
        setTableLoading(true)
        const options1 = {
            method: 'GET',
            url: `${AuthService.GetOrders}StartDate=${selectedDayStartForm}&EndDate=${selectedDayEndForm}&OrderStatus=${selectedValue}&BranchId=${ user.branchList[0].id}`,
            headers: {
                authorization: `Bearer ${user.token}`
            }
        }
        axios.request(options1).then(function (response) {
            setOrders(response.data.data.reverse())
            setTableLoading(false)
        }).catch(function (error) {
            console.error(error)
        })

        const options2 = {
            method: 'GET',
            url: AuthService.GetOrderStatusType,
            headers: {
                authorization: `Bearer ${user.token}`
            }
        }

        axios.request(options2).then(function (response) {
            setOption(response.data.data)
            setTableLoading(false)
        }).catch(function (error) {
            console.error(error)
        })
    }, [])

    useEffect(() => {
        setTableLoading(true)
        const options1 = {
            method: 'GET',
            url: `${AuthService.GetOrders}StartDate=${selectedDayStartForm}&EndDate=${selectedDayEndForm}&OrderStatus=${selectedValue}&BranchId=${user.branchList[0].id}`,
            headers: {
                authorization: `Bearer ${user.token}`
            }
        }
        axios.request(options1).then(function (response) {
            setOrders(response.data.data.reverse())
            setTableLoading(false)

        }).catch(function (error) {
            console.error(error)
        })

        const options2 = {
            method: 'GET',
            url: AuthService.GetOrderStatusType,
            headers: {
                authorization: `Bearer ${user.token}`
            }
        }

        axios.request(options2).then(function (response) {
            setOption(response.data.data)
            setTableLoading(false)
        }).catch(function (error) {
            console.error(error)
        })
    }, [modalOpen])

    const handleSubmit = () => {
        setTableLoading(true)
        const options1 = {
            method: 'GET',
            url: `${AuthService.GetOrders}StartDate=${selectedDayStartForm}&EndDate=${selectedDayEndForm}&OrderStatus=${selectedValue}&BranchId=${ user.branchList[0].id}`,
            headers: {
                authorization: `Bearer ${user.token}`
            }
        }
        axios.request(options1).then(function (response) {
            setOrders(response.data.data)
            setTableLoading(false)
        }).catch(function (error) {
            console.error(error)
        })
    }

    const icon = () => { return <ShopOutlined style={{ fontSize: "25px" }} /> }

    return (
        <div>
            <Header icon={icon} header="لیست سفارشات من" description="در این صفحه میتوانید کلیه سفارشات قبلی خود را مشاهده نمائید" />
            <Row align="middle" className="borderTable" style={{ margin: "10px" }}>
                <Col xs={20} md={24} lg={10} >
                    <Row>
                        <Col>
                            <h3>
                                وضعیت سفارش:
                            </h3>
                        </Col>
                        <Col>
                            <SelectItem options={options} setSelected={setSelectedValue} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={24} lg={14} >
                    <Row align="middle">
                        <Col lg={7}>
                            <img src={Filter} />
                            <span>مشاهده سفارشات از تاریخ</span>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8}>
                            <span style={{ margin: "10px" }}>از</span>
                            <DatePickerComponent value={startDate} setSelected={setStartDate} />
                            <CalendarOutlined style={{ margin: "10px" }} />
                        </Col>

                        <Col lg={8}>
                            <span style={{ margin: "10px" }}>تا</span>
                            <DatePickerComponent value={endDate} setSelected={setEndDate} />
                            <CalendarOutlined style={{ margin: "10px" }} />
                        </Col>
                    </Row>
                </Col>
                <Button type="primary" style={{ marginRight: "auto", marginBlock: "2px" }} onClick={() => handleSubmit()}>نمایش</Button>
            </Row>

            {orders.length !== 0 ? (

                <Card >
                    <Table size='large' loading={tableLoading}
                        onRow={(record) => ({
                            onClick: () => setSelectedRowKey(record.key),
                        })}
                        columns={columns} dataSource={idToKey(orders)} scroll={{ x: '80vw' }} />
                </Card>
            ) :
                <div>
                    <div>سفارشی وجود ندارد</div>
                </div>}
        </div>)
}

export default MyOrders