import { FC, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import axios from 'axios'
import AuthService from '../../services/auth.services'
import Header from "../../components/Header/Header";
import { tableRowNumberGenerator } from '../../components/Navbar/TableFunction/tableFunctions'
import { CodeSandboxOutlined, ShopOutlined } from '@ant-design/icons'
import { Row, Table, Image } from 'antd'

const OrderItems:FC = () => {
    window.scrollTo(0, 0)
    const user = JSON.parse(localStorage.getItem("user")!)

    const location = useLocation()
    const {id} = location.state[0]
    
    const [products, setProducts] = useState([])    

    const tableHeadOrder = [{
        title: "تاریخ سفارش",
        dataIndex: 'createdDateTime',
        key: 'createdDateTime',
        align: 'center',
    },{
        title: "کد رهگیری",
        dataIndex: 'id',
        key: 'id',
        align: 'center',
    },{
        title:"جمع کل سفارش" + " (ریال)",
        dataIndex: 'sumPrice',
        key: 'sumPrice',
        align: 'center',
        render: (sumPrice: string) => (
            <Row >
              {Number(sumPrice).toLocaleString('fa-IR')}
            </Row>
          ),
    }, {
        title: "شیوه پرداخت",
        dataIndex: 'paymentType',
        key: 'paymentType',
        align: 'center',
    }, {
        title:"وضعیت",
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        align: 'center',
    }]
    const tableHeadProducts = [{
        title:"ردیف",
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        align: 'center',
        render: tableRowNumberGenerator,
    },{
        title:"تصویر",
        dataIndex: 'imageLocation',
        key: 'imageLocation',
        align: 'center',
        render: (path: string) => (
            <Row>
                {path ? <img
                    src={path}
                    width="50px"
                /> : <><Image
                    width="80px"
                    src="error"
                    fallback="data:image/png;base64,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" /><></></>}
            </Row>
        ),
    },{
        title:"نام کالا",
        dataIndex: 'title',
        key: 'title',
        align: 'center',
    },{
        title:"تعداد در بسته‌بندی",
        dataIndex: 'quantityPerPackage',
        key: 'quantityPerPackage',
        align: 'center',
        render: (value: number) => <Row>
            <CodeSandboxOutlined style={{ fontSize: "30px" }} />
            <h3 className="badge">{value.toLocaleString()}</h3>
        </Row>,
    },{
        title:"قیمت مصرف کننده"+ " (ریال)",
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        align: 'center',
        render: (unitPrice: number) => (
            <Row >
                {unitPrice.toLocaleString("fa-IR")}
            </Row>
        ),
    } ,{
        title:"قیمت واحد" + " (ریال)",
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        align: 'center',
        render: (unitPrice: number) => (
            <Row>
                {unitPrice.toLocaleString("fa-IR")}
            </Row>
        ),
    },{
        title:"تعداد سفارش",
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
        render: (quantity: number) => (
            <Row justify="center" >
                {quantity.toLocaleString("fa-IR")}
            </Row>
        ),
    },{
        title:"تخفیف" + " (ریال)",
        dataIndex: 'priceOfRow',
        key: 'priceOfRow',
        align: 'center',
        render: (priceOfRow: number) => (
            <Row justify='center'>
                {priceOfRow.toLocaleString("fa-IR")}
            </Row>
        ),
    }, {
        title:"جمع پس از تخفیف" + " (ریال)",
        dataIndex: 'priceOfRow',
        key: 'priceOfRow',
        align: 'center',
        render: (priceOfRow: number) => (
            <Row justify='center'>
                {priceOfRow.toLocaleString("fa-IR")}
            </Row>
        ),
    } ,{
        title: "مالیات",
        dataIndex: 'tax',
        key: 'tax',
        align: 'center',
        render: (value: number) => <Row justify="center">
      {0}
    </Row>,
    },]

    useEffect(() => {
        axios.get(`${AuthService.GetOrderItems}${id}`

            , { headers: { authorization: `Bearer ${user.token}`} })
            .then(response => {
                setProducts(response.data.data)
            })
    }, [])

    const icon = () => { return <ShopOutlined style={{fontSize: "25px" }} /> }

    return <>
        <Header icon={icon} header="جزئیات سفارش" description="در این صفحه میتوانید جزئیات / تعداد و کلیه اطلاعات لازم در مورد سفارش خود را مشاهده نمائید" />
        <div>
           <Table columns={tableHeadOrder} dataSource={location.state} scroll={{ x: "95vw" }} />

           <Table columns={tableHeadProducts} dataSource={products} scroll={{ x: "95vw" }} />
        </div>
    </>
}
export default OrderItems