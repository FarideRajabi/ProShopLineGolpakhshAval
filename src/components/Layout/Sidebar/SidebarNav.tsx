import { Menu, type MenuProps } from "antd";
import { FC } from "react";
import { BarChartOutlined, HomeOutlined, ShoppingCartOutlined, SettingOutlined, ShoppingOutlined, ShopOutlined, FieldTimeOutlined, GiftOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";

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
const SidebarNav: FC = () => {

  const navigate = useNavigate()

  const clickHandler: MenuProps['onClick'] = e => {
    navigate(e.key)
  }

  return (
    <Menu
      onClick={clickHandler}
      defaultSelectedKeys={['/']}
      items={items}
      theme="dark"
      style={{ "fontSize": "16px" }}
    />
  )
}

export default SidebarNav