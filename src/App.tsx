import { useLayoutEffect, useState } from 'react'
import axios from 'axios'
import AuthService from './services/auth.services'
import AppRouter from './routes/AppRouter'
import Validation from './pages/Login/Validation'
import VerificationCode from './pages/Login/VerificationCode'
import DeatialsLogin from './pages/Login/DeatialsLogin'
import logo from "./assets/images/logo/pakhshe-padideh-paydar.png"
import { Col, Row, message } from 'antd'
import './App.css'

const App = () => {

  const [userFound, setUserFound] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [step, setStep] = useState<number>(1)

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundImage: `linear-gradient(30deg,rgb(147,112,219) 20%, rgb(138,43,226) 80%)`,
    backgroundSize: 'cover'
  }

  const containerLoginStyle: React.CSSProperties = {
    minHeight: '100vh',
    maxHeight: '100vh',
    backgroundSize: 'cover',
    borderRadius: "1%",
    backgroundColor: "#F8F8FF",
    overflowY: 'hidden'
  }

  useLayoutEffect(() => {
    const userInLocalStorage = localStorage.getItem('user')
    setUserFound(!userInLocalStorage ? false : true)
  }, [userFound])

  const handleVerificationCodeSubmit = async (code: string) => {

    try {
      const response = await axios.post(AuthService.LoginBySms, {
        "phoneNumber": 0 + phoneNumber,
        "code": code
      })

      if (response.data.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem('token', JSON.stringify(response.data.data.token))
        setUserFound(true)
      } else {
        message.error("کد وارد شده نامعتبر است.")
      }
    } catch (error) {
      console.error(error);
    } finally {

    }
  };

  if (userFound) {
    return <AppRouter />
  }

  else {
    switch (step) {
      case 1:
        return <Row
          align='middle'
          style={containerLoginStyle}
          justify="center"
        >
          <Col xs={20} md={12} lg={12} >
            <Row align="middle" >
              <Col xs={4} md={0} lg={0}>
                <img src={logo} width="80%" />
              </Col>
              <Col xs={16} md={0} lg={0}>
                <h4 style={{ color: "#8a2be2" }}>
                  سامانه سفارش گذاری پخش پدیده پایدار
                </h4>
              </Col>
            </Row>
            <Validation phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} setStep={setStep} />
          </Col>
          <Col xs={0} md={12} lg={12} style={containerStyle}> <DeatialsLogin /></Col>
        </Row>
      case 2:
        return (
          <Row style={{ borderRadius: "5rem" }}>
            <Col xs={20} md={12} lg={12}>
              <Col xs={4} md={0} lg={0}>
                <img src={logo} width="80%" />
              </Col>
              <Col xs={16} md={0} lg={0}>
                <h4 style={{ color: "#8a2be2" }}>
                  سامانه سفارش گذاری پخش پدیده پایدار
                </h4>
              </Col>
              <VerificationCode phoneNumber={phoneNumber} onVerificationCodeSubmit={handleVerificationCodeSubmit} />
            </Col>
            <Col xs={0} md={12} lg={12} style={containerStyle}>
              <DeatialsLogin />
            </Col>
          </Row>
        )

      default:
        return null;
    }
  }
}


export default App