// ** React Imports
import { Fragment, useState, useEffect, FC } from 'react'
import axios from 'axios'
import { SearchFiledBrandCategoryPropsType } from '../../types/pages'
import ProductList from '../../components/ProductList/ProductList'
import { Row, Col, Input } from 'antd'
import "./SearchFiledBrandCategory.css"

const { Search } = Input

interface User {
    branchList: [{ id: 13, title: "شعبه شرق تهران" }]
    customerId: number
    firstName: string
    lastName: string
    nationalCode: null
    token: string
}

const SearchFiledBrandCategory: FC<SearchFiledBrandCategoryPropsType> = ({ apiUrl, searchApiUrl, searchFild, itemChoese, setItemChoese, searchHide, setSearchHide }) => {
    // ** Props

    const [data, setData] = useState([{
        "id": 0,
        "title": "",
        "imagepath": ""
    }])

    const [char, setChar] = useState<string>("")
    const [loading, setLoading] = useState(false)

    const user: User = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        setLoading(true)
        if (char) {
            const options = {
                method: 'GET',
                url: `${searchApiUrl}${char}&pageNo=1&pageSize=2000&BranchId=${user.branchList[0].id}`,
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            }
            axios.request(options).then(function (response) {
                setData(response.data.data)
                setLoading(false)
            }).catch(function (error) {
                console.error(error)
                setLoading(false)
            })
        } else {

            const options = {
                method: 'GET',
                url: `${apiUrl}${user.branchList[0].id}`,
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            }
            axios.request(options).then(function (response) {
                setData(response.data.data)
                setLoading(false)
            }).catch(function (error) {
                console.error(error)
                setLoading(false)
            })

        }
    }, [char, searchFild])

    return (
        <div>
            <div >
                <div >
                    <div>
                        {itemChoese.id !== 0 && <Col xs={12} sm={8} md={12} lg={4}>
                            <div className="itemChoese">
                                {itemChoese.imagepath ? (
                                    <img src={itemChoese.imagepath} alt={itemChoese.title} />
                                ) : (
                                    <p className="">{itemChoese.title}</p>
                                )}
                            </div>
                        </Col>
                        }
                        <Col xs={24} md={12} className={` ${searchHide ? "search-class-hide" : ''}`} >
                            <Search
                                loading={loading}
                                placeholder={`جستجو ${searchFild}`}
                                onChange={(event) => {
                                    const target = event.target as HTMLInputElement;
                                    setChar(target.value);
                                    if (target.value) {
                                        setItemChoese({ id: 0, title: "" });
                                    }
                                }}
                            />
                            {itemChoese.id === 0 && <Row className='result-search'> تعداد {data?.length} {searchFild} یافت شد: </Row>}

                        </Col>
                    </div>
                </div>
                {loading ? <Row justify="center" >درحال جستجو...</Row> :

                    !data ? (
                        <div>
                            موردی وجود ندارد
                        </div>
                    ) : (

                        <Fragment>

                            <Row gutter={[24, 24]}>
                                {itemChoese.id === 0 ? data.map((item) => (
                                    <Col xs={24} sm={12} md={6} lg={4} key={item.id} onClick={() => {
                                        setItemChoese(item);
                                        setSearchHide(true);
                                    }
                                    }>
                                        <div className="image-container">
                                            {item.imagepath ? (
                                                <img src={item.imagepath} alt={item.title} style={{ maxWidth: "90px", maxHeight: "90px" }} className="responsive-image" />
                                            ) : (
                                                <h1 className="responsive-image">{item.title}</h1>
                                            )}
                                        </div>
                                    </Col>
                                )) :
                                    <ProductList id={itemChoese.id} type={searchFild} />
                                }
                            </Row>
                        </Fragment>
                    )
                }
            </div>
        </div >
    )
}

export default SearchFiledBrandCategory