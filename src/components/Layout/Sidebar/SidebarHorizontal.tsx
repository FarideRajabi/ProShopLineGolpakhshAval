import React, { Fragment, useEffect, useState } from 'react';
import { Card, Menu, MenuProps } from 'antd';
import { FieldTimeOutlined, GiftOutlined, HomeOutlined, MessageOutlined, ShopOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import Main from '../Main';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

interface SidebarHorizontalTypeProps {
  children: JSX.Element
}

interface DefaultOpenKeysState {
  defaultOpenKeys: string[],
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
  getItem('صفحه اصلی', '/home', <HomeOutlined className='icon-size' />),
  getItem('سفارش جدید', '/', <ShoppingCartOutlined className='icon-size' />),
  getItem('سبد سفارش', '/shopping-cart', <ShoppingOutlined className='icon-size' />),
  getItem('سفارشات من', 'my-orders', <ShopOutlined className='icon-size' />,),
  getItem('سفارش خودکار', '/user-record', <FieldTimeOutlined className='icon-size' />),
  getItem('پیگیری سفارشات', '/order-pursuit', <GiftOutlined className='icon-size' />),
  getItem('نظرات و پیشنهادات', '/comments', <MessageOutlined className='icon-size' />)
]
const SidebarHorizontal: React.FC<SidebarHorizontalTypeProps> = ({ children }) => {
  const navigate = useNavigate()
  const clickHandler: MenuProps['onClick'] = e => {
    navigate(e.key)
  }

  const [defaultOpenKeys, setDefaultOpenKeys] = useState<DefaultOpenKeysState['defaultOpenKeys']>([])

  useEffect(() => {
    setDefaultOpenKeys([...location.pathname.split('/').slice(1, -1).map(key => `NOTURL/${key}`)])
  }, [location])
  const openChangeHandler = (event: string[]) => {
    setDefaultOpenKeys(event)
  }
  return (
    <div style={{ margin: "20px" }}>
      <Card bordered>
        <div style={{ display: "flex" }} >
          <Navbar />
        </div>
        <Menu
          onClick={clickHandler}
          selectedKeys={[location.pathname]}
          mode="horizontal"
          defaultOpenKeys={defaultOpenKeys}
          items={items}
          theme="light"
          style={{ "fontSize": "16px" }}
          onOpenChange={openChangeHandler}
        />
        <Main >
          {children}
        </Main>
      </Card>
    </div>
  )

}

export default SidebarHorizontal;