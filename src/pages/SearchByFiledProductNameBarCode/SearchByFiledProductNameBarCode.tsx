import { useState, useEffect, FC } from "react";
import axios from 'axios'
import { SearchByFiledProductNameBarCodePropsType } from "../../types/pages";
import { ProductsType } from "../../types/components/ProductList";
import OrderForm from "../../components/OrderForm/OrderForm";
import { CodeSandboxOutlined } from "@ant-design/icons";
import { Table, Input, Col, InputNumber, Row, Image } from 'antd'
import "./SearchByFiledProductNameBarCode.css"
const { Search } = Input

const SearchByFiledProductNameBarCode: FC<SearchByFiledProductNameBarCodePropsType> = ({ apiUrl, searchFild }) => {


  const user = JSON.parse(localStorage.getItem("user")!);
  const [char, setChar] = useState("")
  const [loading, setLoadin] = useState(false)
  let counter = 0
  const [products, setProducts] = useState<ProductsType[]>([{
    id: 0,
    imageLocation: "",
    productPrice: 0,
    productTitle: "",
    quantity: 0,
    quantityPerPackage: 0,
    requestedQuntity: 0,
    key: 0,
  }])

  const handleChangeQuntity = (text: number, value: null | number) => {
    const index = products.findIndex((item) => item.id === text);

    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index], requestedQuntity: Number(value)
    };
    setProducts(newProducts);
  };
  const tableHead = [{
    title: <Row justify="center" >ردیف</Row>,
    width: 50,
    dataIndex: 'index',
    key: 'index',
    render: function renderCounter() {
      counter += 1
      return <Row justify="center">{counter}</Row>;
    },
  },
  {
    title: <Row justify="center" >تصویر</Row>,
    width: 100,
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
    title: <Row justify="center" >نام کالا</Row>,
    width: 200,
    dataIndex: 'productTitle',
    key: 'productTitle',
    render: (productTitle: string) => (
      <Row justify="center">
        {productTitle}
      </Row>
    ),
  },
  {
    title: <Row justify="center" >تعداد در بسته‌بندی</Row>,
    width: 100,
    dataIndex: 'quantityPerPackage',
    key: 'quantityPerPackage',
    render: (value: number) => <Row justify="center">
      <CodeSandboxOutlined style={{ fontSize: "30px" }} />
      <h3 className="badge">{value.toLocaleString()}</h3>
    </Row>,
  },
  {
    title: <Row justify="center" >قیمت مصرف کننده (ریال)</Row>,
    width: 100,
    dataIndex: 'productPrice',
    key: 'productPriceRial',
    render: (value: number) => <Row justify="center">{value.toLocaleString()}</Row>,
  },
  {
    title: <Row justify="center" >سقف سفارش</Row>,
    width: 100,
    dataIndex: '50',
    key: '50',
    render: (id: number) => <Row justify="center">50</Row>
  },
  {
    title: <Row justify="center" >تعداد سفارش</Row>,
    width: 100,
    dataIndex: 'id',
    key: 'id',
    render: (id: number) => (
      <Row justify="center">
        <InputNumber
          value={products.find((p) => p.id === id)?.requestedQuntity}
          onChange={(value: number | null) => handleChangeQuntity(id, value)}
          min={0}
          max={50}
          maxLength={4}
        />
      </Row>
    ),
  },
  ];

  useEffect(() => {
    if (char) {
      const options = {
        method: 'GET',
        url: `${apiUrl}${char}&pageNo=1&pageSize=100&BranchId=${user.branchList[0].id}`,
        headers: {
          authorization: `Bearer ${user.token}`
        }
      }
      axios.request(options).then(function (response) {
        setProducts(response.data.data.map((product: any) => {
          return ({ ...product, requestedQuntity: 0 })
        }))
      }).catch(function (error) {
        console.error(error)
      })
    }
  }, [char, searchFild])

  const findProductQuantity = products.filter((item: any) => item.requestedQuntity > 0)

  return (
    <Row>
      <Col xs={24} sm={12} md={12} style={{ marginBottom: "25px" }}>
        <Search
          loading={loading}
          placeholder={`جستجو ${searchFild}`}
          onChange={(event) => {
            const target = event.target as HTMLInputElement;
            setChar(target.value);
          }}
        />
        {!char && <Row>لطفا {searchFild} مورد نظر را جستجو کنید</Row>}
      </Col>

      {char &&
        <>
          <OrderForm findProductQuantity={findProductQuantity} products={products} setProducts={setProducts} />
          <Table size="large" columns={tableHead} dataSource={products} scroll={{ x: 1500 }} />
        </>
      } </Row>)
}
export default SearchByFiledProductNameBarCode