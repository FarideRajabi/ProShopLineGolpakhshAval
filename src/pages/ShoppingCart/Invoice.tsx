import { useState, useEffect } from "react";
import axios from 'axios'
import AuthService from "../../services/auth.services";
import { Col, Row, Table } from "antd";

const Invoice = () => {

    const user = JSON.parse(localStorage.getItem("user")!)
    let counter = 0

    const [orders, setOrders] = useState([{
        title: '',
        unitPrice: 0,
        quantity: 0
    }])

    const TableHead = [{
        title: <Row justify="center" >ردیف</Row>,
        width: 10,
        dataIndex: 'index',
        key: 'index',
        render: function renderCounter() {
            counter += 1
            return <Row justify="center" >{counter.toLocaleString("fa-IR")}</Row>;
        },
    },

    {
        title: <Row justify="center" >شرح کالا</Row>,
        width: 150,
        dataIndex: 'title',
        key: 'title',
        render: (title: string) => (
            <Row justify="center">
                {title}
            </Row>
        ),
    },
    {
        title: <Row justify="center" >تعداد</Row>,
        width: 120,
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity: number) => (
            <Row justify="center">
                {quantity.toLocaleString("fa-IR")}
            </Row>
        ),
    },
    {
        title: <Row justify="center" >قیمت واحد(ریال)</Row>,
        width: 50,
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        render: (unitPrice: number) => <Row justify="center">{unitPrice.toLocaleString("fa-IR")}</Row>,
    },
    {
        title: <Row justify="center" >قیمت کل(ریال)</Row>,
        width: 80,
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        render: (unitPrice: number) => (
            <Row justify="center">{unitPrice.toLocaleString("fa-IR")} </Row>
        )
    },
    ];

    let together = 0

    orders.map((item) => {
        together += item.unitPrice * item.quantity
    })

    useEffect(() => {

        const options = {
            method: 'GET',
            url: `${AuthService.GetCart}${user.branchList[0].id}`,
            headers: {
                authorization: `Bearer ${user.token}`
            }
        }
        axios.request(options).then(function (response) {
            setOrders(response.data.data)

        }).catch(function (error) {
            console.error(error)
        })
    }, [orders])

    return <>
        <div>
            {orders.length !== 0 ?
                <>
                    <Table size="large" columns={TableHead} dataSource={orders} scroll={{ x: "50%" }} />
                    <Row justify="end" >
                        <Col span={10}><h3>جمع کل فاکتور</h3></Col>
                        <Col span={10}>{together.toLocaleString("fa-IR")}</Col>
                    </Row>
                </>
                :
                <div className="h4 text-center py-5 my-5">سبد سفارش خالی است</div>}
        </div>

    </>
}
export default Invoice