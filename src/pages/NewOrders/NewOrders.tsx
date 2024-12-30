import { useState, FC } from "react"
import AuthService from "../../services/auth.services"
import { ItemChoese } from "../../types/pages"
import Header from "../../components/Header/Header"
import SearchFiledBrandCategory from "../SearchFiledBrandCategory/SearchFiledBrandCategory"
import SearchByFiledProductNameBarCode from "../SearchByFiledProductNameBarCode/SearchByFiledProductNameBarCode"
import { BarcodeOutlined, BookOutlined, CodepenOutlined, DatabaseOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Row, Col, theme } from "antd"
import "./style.css"
const { useToken } = theme;


const NewOrders: FC = () => {
    window.scrollTo(0, 0)

    const [searchFild, setSearchFild] = useState("برند")
    const [itemChoese, setItemChoese] = useState<ItemChoese>({ id: 0, title: "", imagepath: "" })
    const [searchHide, setSearchHide] = useState(false)

    const { token } = useToken();

    const icon = () => { return <ShoppingCartOutlined style={{ fontSize: "25px" }} /> }

    const handleOnMouseOver = () => {
        if (window.innerWidth < 412) {
            document.querySelector('.searchFiled h3').style.display = 'none';
            document.querySelector('.searchFiled').setAttribute('title', 'نام');
        }
    }

    return <div>
        <Header icon={icon} header="سفارش جدید" description="در این صفحه میتوانید سفارشات خود را انتخاب نمائید" />
        <Row align='middle'>
            <Col xs={24} sm={12} md={16} >
                <Row justify={{ xs: 'center' }} align={{ xs: 'middle' }}>
                    <h1>
                        <SearchOutlined />
                    </h1>
                    <h1 >جستجو کالا بر اساس <span style={{color: token.colorPrimary }}>{searchFild}</span></h1>
                </Row>
            </Col>
            <Col xs={22} sm={12} md={8} className="state-style">
                <Row align="middle">
                    <Col xs={5} sm={5} md={5} onClick={() => { setSearchFild("نام") }}
                        className={`image-class searchFiled ${searchFild === 'نام' ? "borderStyle" : ""}`}
                        onMouseOver={handleOnMouseOver}
                        align='middle'
                    >
                        <CodepenOutlined />
                        <h3>نام</h3>
                    </Col>
                    <Col xs={5} sm={5} md={5} onClick={() => {
                        setSearchFild("دسته بندی");
                        setItemChoese({ id: 0, title: "" });
                        setSearchHide(false)
                    }}
                        className={`image-class searchFiled ${searchFild === 'دسته بندی' ? "borderStyle" : ""}`}
                        onMouseOver={handleOnMouseOver}
                        align='middle'>
                        <DatabaseOutlined />
                        <h3>دسته بندی</h3>
                    </Col>
                    <Col xs={5} sm={5} md={5}
                        onClick={() => {
                            setSearchFild("برند");
                            setItemChoese({ id: 0, title: "" });
                            setSearchHide(false)
                        }}
                        className={`image-class searchFiled ${searchFild === 'برند' ? "borderStyle" : ""}`}
                        align='middle'>
                        <BookOutlined />
                        <h3>برند</h3>
                    </Col>
                    <Col xs={5} sm={5} md={5}
                        onClick={() => { setSearchFild("بارکد") }}
                        className={`image-class searchFiled ${searchFild === 'بارکد' ? "borderStyle" : ""}`} align='middle'>
                        <BarcodeOutlined />
                        <h3 >بارکد</h3>
                    </Col>
                </Row>
            </Col>
        </Row>


        {
            searchFild === "برند" ?
                <SearchFiledBrandCategory
                    apiUrl={AuthService.GetBrands}
                    searchApiUrl={AuthService.GetBrandsBySearch}
                    searchFild="برند"
                    itemChoese={itemChoese}
                    setItemChoese={setItemChoese}
                    searchHide={searchHide}
                    setSearchHide={setSearchHide} />
                : searchFild === "دسته بندی" ?
                    <SearchFiledBrandCategory
                        apiUrl={AuthService.GetProductCategory}
                        searchApiUrl={AuthService.GetProductCategoryBySearch}
                        searchFild="دسته بندی"
                        itemChoese={itemChoese}
                        setItemChoese={setItemChoese}
                        searchHide={searchHide}
                        setSearchHide={setSearchHide} />
                    : searchFild === "نام" ?
                        <SearchByFiledProductNameBarCode searchFild="نام" apiUrl={AuthService.GetProductByTitleSearch} />
                        : <SearchByFiledProductNameBarCode searchFild="بارکد" apiUrl={AuthService.GetProductByBarcodeSearch} />
        }

    </div>
}
export default NewOrders