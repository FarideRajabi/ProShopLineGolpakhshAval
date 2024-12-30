import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { PoweroffOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ModalQuestion from '../Modal/modalQuestion';

const Navbar: FC = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("branch")
        localStorage.removeItem("token")
        navigate('/');
        setModalOpen(false)
        window.location.reload();
    }

    return (
        <Col xs={24} md={24} style={{ display: "flex", paddingRight: "10px", paddingTop: "10px" }} >
            <Col xs={24} md={22}><h1>سامانه سفارش گذاری</h1></Col>
            <Col xs={0} md={2} >
                <Row>
                    <Col xs={8} md={8}>
                        <Link to="/">
                            <ShoppingCartOutlined className='icon-size' style={{ color: "black" }} />
                        </Link>
                    </Col>

                    <Col xs={8} md={8}>
                        <Link to="/profile">
                            <UserOutlined className='icon-size' style={{ color: "black" }} />
                        </Link>
                    </Col>

                    <Col xs={8} md={8} >
                        <div className='image-class' onClick={() => setModalOpen(true)} >
                            <PoweroffOutlined className='icon-size' />
                        </div>
                    </Col>
                </Row>

            </Col>
            <ModalQuestion message="آیا مطمئنید که میخواهید خارج شوید" onCancel={handleCloseModal} onOk={handleLogout} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Col>
    )
}
export default Navbar