import { useEffect, useState } from 'react'
import axios from 'axios'
import AuthService from '../../services/auth.services'
import { VerificationCodeProps } from '../../types/pages'
import styles from './index.module.css'
import { Button, Card, Col, Form, Input, Row, Typography, message } from "antd"

const VerificationCode: React.FC<VerificationCodeProps> = ({ phoneNumber, onVerificationCodeSubmit }) => {

    const [loading, setLoadingg] = useState<boolean>(false)
    const TIMEOUT_COUNT = 60;
    const [count, setCount] = useState(TIMEOUT_COUNT);
    const [code, setCode] = useState<string>("");

    const handleSubmit = (event: { preventDefault: () => void }) => {

        // event.preventDefault();
        onVerificationCodeSubmit(code)
    };

    useEffect(() => {
        if (count >= 1) {
            setTimeout(() => {
                setCount((count) => count - 1)
            }, 1000)
        }
        if (count === TIMEOUT_COUNT) {
            handleResavedCode()
        }
    }, [count])

    const handleResavedCode = () => {
        setCount(TIMEOUT_COUNT - 1)
        setLoadingg(true)
        axios
            .post(AuthService.SendSms, {
                "userName": "wsp",
                "passWord": "wsp@@123psw",
                "phoneNumber": phoneNumber
            }).then((res) => {
                setLoadingg(false)
            })
            .catch(error => {
                message.error('مشکلی در ارتباط با سرور پیش آمده است. لطفا دوباره تلاش کنید.')
                console.log(error);
            });
    }

    const containerStyle: React.CSSProperties = {
        minHeight: '100vh',
        backgroundColor: "#F8F8FF",
        backgroundSize: 'cover'
    }

    const hintStyle: React.CSSProperties = {
        textAlign: 'center',
        display: 'block',
        marginBottom: '2rem'
    }

    return (
        <Row
            justify='center'
            align='middle'
            className={styles.container}
            style={containerStyle}
        >
            <Col xs={24} lg={20}>
                <Card title='ورود' bordered >
                    <Typography.Text
                        style={hintStyle}
                    >
                        لطفا کد دریافتی خود را وارد کنید
                    </Typography.Text>
                    <Form
                        name='loginForm'
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label='کد دریافتی'
                            name='code'
                            rules={[{ required: true, message: 'کد دریافتی را وارد کنید' }]}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <Row justify='center'>
                                <Input autoFocus style={{ textAlign: "center" }} onChange={(e) => setCode(e.target.value)} />
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            {(count === 0 || count <= 0) ?
                                <Row justify='center'>
                                    <Button type='primary' onClick={handleResavedCode} >ارسال مجدد کد</Button>
                                </Row>
                                : <Row justify='center'>مدت زمان باقی‌مانده تا امکان دریافت مجدد کد تایید : {`${count} `} </Row>}
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 24 }}
                        >
                            <Row justify="center">
                                <Col span={18}>
                                    <Button type='primary' htmlType='submit' block loading={loading}>
                                        ورود
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card>
                <Card align="middle">درخواست عضویت</Card>
            </Col>
        </Row>
    )

}

export default VerificationCode