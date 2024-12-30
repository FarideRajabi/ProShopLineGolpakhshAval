import { FC } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, theme } from "antd"
import { HeaderPropsType } from "../../types/components/Header"
const { useToken } = theme;
const Header: FC<HeaderPropsType> = ({ icon, header, description }) => {
    const { token } = useToken();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
    }
    return <Row className="borderTable ">
        <Col span={20}>
            <Col style={{ display: "flex", alignItems:"start",marginTop:"10px", color: token.colorPrimary }} >
                {icon()}
                <h2 >{header}</h2>
            </Col>
            <h3 >{description}</h3>
        </Col>
        {header !== "سفارش جدید" &&
            <Col span={4} style={{ direction: "ltr", marginTop: "2%" }} >
                <Button type="primary" onClick={handleGoBack}>بازگشت</Button>
            </Col>}
    </Row>
}
export default Header