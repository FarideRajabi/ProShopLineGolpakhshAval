import { Button, Card, Col, Row } from 'antd'
import styles from './index.module.css'
import { MenuOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { PageInfoContext } from '../../../context/PageInfoContext'
import Navbar from '../../Navbar/Navbar'

interface HeaderPropsInterface {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<(boolean)>>
}

const Header: React.FC<HeaderPropsInterface> = ({ setIsOpen }) => {

  const { pageInfo } = useContext(PageInfoContext)

  const toggleMenu = () => {
    setIsOpen((prevState: boolean) => !prevState)
  }

  return (
    <div className='home' style={{padding:"10px"}}>
      <Row style={{ display: "flex" }}>
        <Col xs={2} md={1}>
          <Button
            type='ghost'
            icon={<MenuOutlined />}
            size='large'
            shape='circle'
            onClick={toggleMenu}
          />
        </Col>
        <Col xs={20} md={23}> 
          <Navbar />
        </Col>
      </Row>
    </div>
  )

}

export default Header