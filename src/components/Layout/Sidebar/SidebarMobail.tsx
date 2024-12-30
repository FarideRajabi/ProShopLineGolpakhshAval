import { Button, Card, Col, Menu, MenuProps } from 'antd';
import { FieldTimeOutlined, GiftOutlined, HomeOutlined, MenuOutlined, MessageOutlined, ShopOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import Main from '../Main';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import { useState } from 'react';

interface SidebarMobileTypeProps {
    children: JSX.Element
}

type MenuItemType = Required<MenuProps>['items'][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItemType[],
    type?: 'group',
): MenuItemType {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItemType;
}

const items: MenuProps['items'] = [
    getItem('صفحه اصلی', '/home', <HomeOutlined className='icon-size image-class' />),
    getItem('سفارش جدید', '/', <ShoppingCartOutlined className='icon-size image-class' />),
    getItem('سبد سفارش', '/shopping-cart', <ShoppingOutlined className='icon-size image-class' />),
    getItem('سفارشات من', 'my-orders', <ShopOutlined className='icon-size image-class' />,),
    getItem('سفارش خودکار', '/user-record', <FieldTimeOutlined className='icon-size image-class' />),
    getItem('پیگیری سفارشات', '/order-pursuit', <GiftOutlined className='icon-size image-class' />),
    getItem('نظرات و پیشنهادات', '/comments', <MessageOutlined className='icon-size image-class' />)
]
const SidebarMobile: React.FC<SidebarMobileTypeProps> = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const handleClick = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const navigate = useNavigate()
    const clickHandler: MenuProps['onClick'] = e => {
        navigate(e.key)
    }
    return (
        <div className='home' style={{ margin: "15px", padding: "5px" }}>
            <div style={{ display: "flex" }}>
                <Col xs={2} md={1}>
                    <Button
                        type='ghost'
                        icon={<MenuOutlined />}
                        size='large'
                        shape='circle'
                        onClick={handleClick}
                    />
                </Col>
                <Col xs={20} md={23}>
                    <Navbar />
                </Col>
            </div>
            {isSidebarVisible ?
                <Menu
                    onClick={clickHandler}
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    items={items}
                    theme="light"
                    style={{
                        "fontSize": "16px",
                        position: 'fixed',
                        zIndex: '3',
                        width: "210px",
                        height: "100%",
                        right: "22px",
                        background: "black",
                        color: "white"
                    }}
                /> :
                <Menu
                    onClick={clickHandler}
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    items={items}
                    theme="light"
                    style={{ "fontSize": "16px", display: "none" }}
                />}
            <Main >
                {children}
            </Main>
        </div>
    )

}

export default SidebarMobile;