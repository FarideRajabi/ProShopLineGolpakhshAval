import { FC, useState, Fragment } from 'react'
import axios from 'axios'
import AuthService from '../../services/auth.services'
import Header from "../../components/Header/Header";
import TextArea from 'antd/es/input/TextArea'
import { MessageOutlined } from '@ant-design/icons'
import EnvelopePlus from './../../assets/images/logo/fi-rr-envelope-plus.png'
import Edit from './../../assets/images/logo/fi-rr-edit-alt.png'
import { Row, Col, message, Button } from "antd"

const Comments: FC = () => {
    const user = JSON.parse(localStorage.getItem("user")!)
    const [char, setChar] = useState("")

    const handleClick = () => {
        char ?
            axios.post(AuthService.CreateComment,
                {
                    "description": char
                }
                , { headers: { authorization: `Bearer ${user.token}` } })
                .then(response => {
                    setChar("")
                    message.success("پیام ارسال شد")
                }) :
            message.error(" لطفا پیام خود را وارد کنید!")
    }
    const icon = () => { return <MessageOutlined style={{ fontSize: "25px"}} /> }

    return (
        <Fragment>
            <Header icon={icon} header="نظرات و پیشنهادات" description=" در این صفحه میتوانید پیام خود را ارسال نمائید" />
            <div>
                <img src={EnvelopePlus} width="20px" />مشتری گرامی با ارائه نظرات خود کارشناسان این مرکز را جهت بهبود کیفیت کاربری این سامانه یاری فرمائید.</div>
            <div className="massage">
                <img src={Edit} width="20px" />بررسی نیازها و تحلیل اطلاعات ارسالی شما، کمک موثری در برنامه ها و خدمات آتی این واحد خواهد نمود.</div>

            <Row style={{ marginTop: "50px" }} >
                <Col span={21}>
                    <h3 > پیشنهاد و انتقاد خود را در کادر زیر بنویسید:</h3>
                    <TextArea rows={4} cols={72} value={char} placeholder="لطفا توضیحات خود را وارد کنید " onChange={((e) => setChar(e.target.value))} />
                </Col>
            </Row>
            <Row>
                <Button type='primary' style={{ marginRight: "auto", marginBlock: "30px" }} onClick={handleClick}>ارسال پیام</Button>
            </Row>
        </Fragment>
    )
}

export default Comments