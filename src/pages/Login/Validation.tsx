import { useState } from 'react'
import axios from 'axios'
import AuthService from '../../services/auth.services'
import { Button, Card, Col, Form, Input, Row, Space, Tabs, TabsProps, message } from "antd"

interface ValidationProps {
  phoneNumber: string,
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>,
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const Validation: React.FC<ValidationProps> = ({ phoneNumber, setPhoneNumber, setStep }) => {

  const [loading, setLoadingg] = useState<boolean>(false)
  const onChange = (key: string) => {
    console.log(key);
  };

  const phoneNumberValidator = async (_rule: Object, value: string) => {    
    if (value && !value.match(/^9/) || value && value.length> 10) throw new Error('لطفا شماره تلفن را درست وارد کنید')
  }

  const finishHandler = (event: object) => {
    setLoadingg(true)
    axios.get(`${AuthService.ValidateLogin}${phoneNumber}`, event)
      .then(res => {
        setLoadingg(false)
        if (!res.data.data) {
          setStep(1)
        } else {
          setStep(2)
        }
      })
      .catch(err => {
        setLoadingg(false)
        message.error('شماره وارد شده ثبت نام نشده است ، لطفا با پشتیبانی تماس بگیرید!')
      })
  }

  const hintStyle: React.CSSProperties = {
    textAlign: 'center',
    display: 'block',
    marginBottom: '2rem'
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `فروشنده`,
      children: <Form
        name='loginForm'
        onFinish={finishHandler}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label='شماره موبایل:'
          name='phoneNumber'
          rules={[{ required: true, validator: phoneNumberValidator }]}
        >
          <Row justify="start">
            <Col span={20}>
              <Space.Compact style={{ direction: "ltr" }} >
                <Input
                  style={{
                    width: '25%',
                    direction: "ltr",
                    textAlign: "end"
                  }}
                  defaultValue="+98"
                  readOnly
                />
                <Input
                  style={{

                    direction: "ltr",
                  }}
                  type='phoneNumber'
                  autoFocus
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </Space.Compact>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Row justify="center">
            <Col span={14}>
              <Button type='primary' htmlType='submit' block loading={loading}>
                ارسال کد
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>,
    },
    {
      key: '2',
      label: `فروشگاه`,
      children: <Form
        name='loginForm'
        onFinish={finishHandler}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label='شماره موبایل:'
          name='phoneNumber'
          rules={[{ required: true, message:"لطفا شماره تلفن را درست وارد کنید"},{ required: true, validator: phoneNumberValidator }]}
        >
          <Row justify="start">
            <Col span={20}>
              <Space.Compact style={{ direction: "ltr" }} >
                <Input
                  style={{
                    width: '25%',
                    direction: "ltr",
                    textAlign: "end"
                  }}
                  defaultValue="+98"
                  readOnly
                />
                <Input
                  style={{

                    direction: "ltr",
                  }}
                  type='phoneNumber'
                  autoFocus
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </Space.Compact>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Row justify="center">
            <Col span={14}>
              <Button type='primary' htmlType='submit' block loading={loading}>
                ارسال کد
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>,
    }
  ];

  return (
    <Row
      justify="center"
      align='middle'
    >
      <Col xs={24} lg={20}>
        <Card style={{ textAlign: "center" }} bordered>
          <h2>ورود</h2>
          <Tabs defaultActiveKey="2" items={items} onChange={onChange} style={hintStyle} />
        </Card>
        <Card align="middle">درخواست عضویت</Card>
      </Col>
    </Row>
  )
}

export default Validation
