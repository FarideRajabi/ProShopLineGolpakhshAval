import { FC } from "react";
import Slogan from "./../../assets/images/pages/slogan.png"
import logo from "./../../assets/images/logo/pakhshe-padideh-paydar.png"
import { PhoneOutlined, RobotOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";

const DeatialsLogin: FC = () => {
    return <>
        <Row justify="center" align="middle" style={{ padding: "4vw", color: "#fff" }}>
            <Row justify="end" align="middle" >
                <Col md={4} lg={6}>
                    <img src={logo} width="100%" />
                </Col>
                <Col md={18} lg={16}>
                    <h2 style={{ color: "#fff" }}>
                        سامانه سفارش گذاری پخش پدیده پایدار
                    </h2>
                </Col>
            </Row>
            <Row style={{ width: "85%" }} justify="center" >
                <Col>
                    <img src={Slogan} width="90%" />
                </Col>
            </Row>
            <Row justify="center" style={{ width: "100%" }} >
                <Col span={12}>
                    <Row align="top">
                        <PhoneOutlined style={{ fontSize: '20px' }} />
                        <h3>تماس با شرکت:</h3>
                    </Row>
                </Col>

                <Col span={12}>
                    <Row align="top">
                        <RobotOutlined style={{ fontSize: '20px' }} />
                        <h3>لینک اصلی سایت:</h3>
                    </Row>
                </Col>

            </Row>
        </Row>
    </>
}

export default DeatialsLogin