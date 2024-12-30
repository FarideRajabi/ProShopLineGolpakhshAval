import { FC, useEffect, useState } from "react"
import axios from "axios"
import AuthService from "../../services/auth.services"
import SliderComponent from "../../components/SliderComponent/SliderComponent"
import SliderComponentAdvertising from "../../components/SliderComponentAdvertising/SliderComponentAdvertising"
import Border from './../../assets/images/pages/border.jpg'
import DocumentSigned from './../../assets/images/logo/fi-rr-document-signed.png'
import ListCheck from './../../assets/images/logo/fi-rr-list-check.png'
import Layers2 from './../../assets/images/logo/fi-rr-layers (2).png'
import { Col, Row } from "antd"

const HomePage: FC = () => {
  window.scrollTo(0, 0)
  const user = JSON.parse(localStorage.getItem("user")!);
  const [lastOrder, setLastOrder] = useState([{
    createdDate: "",
    sumPrice: 0,
    title: ""
  }])

  const [lastOrderByBranch, setLastOrderByBranch] = useState([{ sumPrice: 0, title: '' }])

  useEffect(() => {
    const options1 = {
      method: 'GET',
      url: AuthService.GetLastOrders,
      headers: {
        authorization: `Bearer ${user.token}`
      }
    }
    axios.request(options1).then(function (response) {
      setLastOrder(response.data.data)
    }).catch(function (error) {
      console.error(error)
    })

    const options2 = {
      method: 'GET',
      url: AuthService.GetLastOrderByBranch,
      headers: {
        authorization: `Bearer ${user.token}`
      }
    }
    axios.request(options2).then(function (response) {
      setLastOrderByBranch(response.data.data)
    }).catch(function (error) {
      console.error(error)
    })
  }, [])
  return (
    <Row gutter={[8, 20]} justify="center" align="middle" >
      <Row style={{marginTop:"50px" }}>
        <Col span={24}><SliderComponent /></Col>
      </Row>
      <Row justify="space-between">
        <Col xs={20} sm={7} md={8} lg={7} ><SliderComponentAdvertising /></Col>
        <Col xs={20} sm={7} md={8} lg={7} ><SliderComponentAdvertising /></Col>
        <Col xs={20} sm={7} md={8} lg={7} ><SliderComponentAdvertising /></Col>
      </Row>
      <Row align="middle" justify="space-between" style={{ width: "100%"}}>
        <Col xs={20} sm={7} md={7} lg={7} className="cart">
          <div className='cartTitle'><img src={Layers2} />جمع کل سفارشات آنلاین</div>
          <img width="100%" height="80%" src={Border} />
        </Col>
        <Col xs={20} sm={7} md={7} lg={7} className="cart">
          <div className='cartTitle'><img src={DocumentSigned} />مجموع خرید های گذشته</div>
          <table >
            <thead className='borderTable'>
              <tr>
                <th className="text-center">تاریخ</th>
                <th className="text-center">مجموع کل سفارشات</th>
                <th className="text-center">شعبه</th>
              </tr>
            </thead>
            <tbody>
              {lastOrder.map((item, index) => (
                <tr key={index}>
                  <td className="text-center tr">{item.createdDate}</td>
                  <td className="text-center w-25 tr">{item.sumPrice.toLocaleString('fa-IR')}</td>
                  <td className="text-center tr">{item.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        <Col xs={20} sm={7} md={7} lg={7} className="cart">
          <div className='cartTitle'><img src={ListCheck} />آخرین سفارشات</div>
          <table>
            <thead className='borderTable'>
              <tr>
                <th className="text-center">مجموع کل سفارشات</th>
                <th className="text-center">شعبه</th>
              </tr>
            </thead>
            <tbody>
              {lastOrderByBranch.map((item, index) => (
                <tr key={index}>
                  <td className="text-center w-25 tr">{item.sumPrice.toLocaleString('fa-IR')}</td>
                  <td className="text-center w-50 tr">{item.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Row>
  )

}

export default HomePage