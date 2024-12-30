import { FC, useEffect, useState } from "react"
import axios from 'axios'
import AuthService from "../../services/auth.services";
import { OrdersType } from "../../types/pages";
import { tableRowNumberGenerator } from "../../components/Navbar/TableFunction/tableFunctions";
import Header from "../../components/Header/Header";
import ModalQuestion from "../../components/Modal/modalQuestion";
import ShoppingDeatail from "./ShoppingDeatail";
import { CodeSandboxOutlined, DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Row, Image, Table, Button, message } from 'antd'
import { Link } from "react-router-dom";

const ShoppingCart: FC = () => {

    const user = JSON.parse(localStorage.getItem("user")!)
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(Number);

    let counter = 0
    const [orders, setOrders] = useState<OrdersType[]>([
        {
            productId: 0,
            title: "",
            imageLocation: "",
            quantity: 0,
            priceOfRow: 0,
            unitPrice: 0,
            quantityPerPackage: 0,
        }
    ])

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `${AuthService.GetCart}${user.branchList[0].id}`,
            headers: {
                authorization: `Bearer ${user.token}`
            }
        }
        axios.request(options).then(function (response) {
            setOrders(response.data.data.map((orders: OrdersType) => {
                return ({ ...orders, requestedQuntity: 0 })
            }))
        }).catch(function (error) {
            console.error(error)
        })
    }, [modalOpenDelete, orders])

    const handleCreateOrder = (id: number, quantity: number) => {

        axios.post(AuthService.CreateOrder,
            { "branchId": user.branchList[0].id, "orderList": [{ "productId": id, "quantity": quantity }] }
            , { headers: { authorization: `Bearer ${user.token}` } })
            .then(response => {

                const updatedOrders = orders.map((item) => {
                    if (item.productId === id) {
                        return {
                            ...item,
                            quantity: quantity,
                        };
                    }
                    return item;
                });
                setOrders(updatedOrders);
                message.success("تعداد محصولات تغییر یافت")
            })
    }

    const IncreaseProduct = (id: number, quantity: number) => {
        quantity > 0 &&
            handleCreateOrder(id, quantity + 1)
    }

    const DecreaseProduct = (id: number, quantity: number) => {
        quantity > 0 &&
            handleCreateOrder(id, quantity - 1)
    }

    const handleRemoveOrder = () => {
        const orderToRemove = orders.find(order => order.productId === selectedProduct);
        if (!orderToRemove) {
            return;
        }
        axios.post(AuthService.CreateOrder, {
            "branchId": user.branchList[0].id,
            "orderList": [{
                "productId": orderToRemove.productId,
                "quantity": 0
            }]
        }, { headers: { authorization: `Bearer ${user.token}` } })
            .then(response => {
                const newOrders = orders.filter(order => order.productId !== selectedProduct);
                setOrders(newOrders);
                setModalOpenDelete(false);
            })
    }


    const handleCanselModal = () => {
        setModalOpenDelete(false);
    }

    const TableHead = [{
        title: 'ردیف',
        width: 10,
        align: 'center',
        dataIndex: 'index',
        key: 'index',
        render: tableRowNumberGenerator,
    },
    {
        title: 'تصویر',
        width: 90,
        align: 'center',
        dataIndex: 'imageLocation',
        key: 'imageLocation',
        render: (path: string) => (
            <Row justify="center">
                {path ? <img
                    src={path}
                    width="50px"
                /> : <><Image
                    width="80px"
                    src="error"
                    fallback="data:image/png;base64,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" /><></></>}
            </Row>
        ),
    },
    {
        title: 'نام کالا',
        width: 150,
        align: 'center',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'تعداد در بسته‌بندی',
        width: 50,
        align: 'center',
        dataIndex: 'quantityPerPackage',
        key: 'quantityPerPackage',
        render: (value: number) => <Row justify="center">
            <CodeSandboxOutlined style={{ fontSize: "30px" }} />
            <h3 className="badge">{value.toLocaleString()}</h3>
        </Row>,
    },
    {
        title: 'قیمت مصرف کننده (ریال)',
        width: 100,
        align: 'center',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        render: (value: number) => <Row justify="center">{value.toLocaleString()}</Row>,
    }, {
        title: 'قیمت واحد (ریال)',
        width: 100,
        align: 'center',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        render: (value: number) => <Row justify="center" >{value.toLocaleString()}</Row>,
    },
    {
        title: 'تعداد سفارش',
        width: 150,
        align: 'center',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (value: number, product: any) => (

            <Row align="middle" justify="center">
                <Button
                    icon={<PlusCircleOutlined />}
                    onClick={() => IncreaseProduct(product.productId, value)}
                    type='ghost'
                    size='large'
                    shape='circle'
                    color="#989898"
                />
                <div className="d-flex h5 mx-2"><h3>{value.toLocaleString('fa-IR')} عدد</h3></div>
                <Button
                    icon={<MinusCircleOutlined />}
                    onClick={() => DecreaseProduct(product.productId, value)}
                    type='ghost'
                    size='large'
                    shape='circle'
                    color="#989898"
                />
            </Row>
        ),
    },
    {
        title: 'تخفیف(ریال)',
        width: 50,
        align: 'center',
        dataIndex: '',
        key: '',
        render: (value: number) => <Row justify="center">0</Row>,
    },
    {
        title: 'جمع پس از تخفیف(ریال)',
        width: 90,
        align: 'center',
        dataIndex: 'priceOfRow',
        key: 'priceOfRow',
        render: (value: number) => <Row justify="center">{value.toLocaleString()}</Row>,
    },
    {
        title: 'مالیات',
        width: 50,
        align: 'center',
        dataIndex: '',
        key: '',
        render: (value: number) => <Row justify="center">0</Row>,
    },
    {
        title: 'حذف',
        width: 80,
        align: 'center',
        dataIndex: 'productId',
        key: 'productId',
        render: (productId: number) => (
            <Row justify="center">
                <ModalQuestion
                    message="آیا از حذف سفارش مورد نظر اطمینان دارید؟"
                    onCancel={handleCanselModal}
                    onOk={handleRemoveOrder}
                    modalOpen={modalOpenDelete}
                    setModalOpen={setModalOpenDelete}
                />
                <DeleteOutlined
                    style={{ fontSize: "25px" }}
                    onClick={() => {
                        setModalOpenDelete(true)
                        setSelectedProduct(productId)
                    }
                    } />
            </Row>
        )
    },
    ];

    const icon = () => { return <ShoppingOutlined style={{ fontSize: "25px" }} /> }

    return (
        <div>
            <Header icon={icon} header="سبد سفارشات من" description=" در این صفحه میتوانید سفارشات خود را ثبت نمائید" />
            {orders.length !== 0 ?
                (<div>
                    <Row style={{ direction: "ltr", marginBlock: "10px" }}>
                        <Button type="primary">
                            <Link to="/order-by-customer" type='primary' > ثبت سفارش</Link>
                        </Button>
                    </Row>
                    <Row>
                        <Table size="large" columns={TableHead} dataSource={orders} scroll={{ x: "95vw" }} />
                    </Row>
                    <ShoppingDeatail orders={orders} />
                </div>
                ) :
                <div>سبد سفارش خالی است</div>
            }
        </div>
    )
}

export default ShoppingCart
