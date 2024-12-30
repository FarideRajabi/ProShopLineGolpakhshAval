import { Layout } from 'antd'
import styles from './Sidebar.module.css'
import SidebarNav from './SidebarNav';
import Header from '../Header';
import Main from '../Main';

interface SidebarPropsInterface {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: JSX.Element
}

const SidebarMid: React.FC<SidebarPropsInterface> = ({ isOpen, setIsOpen, children }) => {

  const breakpointHandler = (broken: boolean) => {
    setIsOpen(broken ? false : true)
  }

  return (
    <>
      <Layout.Sider
        breakpoint='lg'
        collapsed={!isOpen}
        collapsedWidth='0'
        collapsible={true}
        className={styles.sidebar}
        onBreakpoint={breakpointHandler}
        width='16rem'
        zeroWidthTriggerStyle={{ display: 'none' }}
        style={{zIndex:'10' ,marginTop:'10px', display: !isOpen ? 'none' : 'block' }}
      >
        <SidebarNav />

      </Layout.Sider>
      <Layout >
       
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <Main>
            {children}
          </Main>
   
      </Layout>
    </>
  )

}

export default SidebarMid