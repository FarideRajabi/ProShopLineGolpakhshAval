import { Layout } from "antd"
import SidebarMid from "./Sidebar"
import SidebarHorizontal from "./Sidebar/SidebarHorizontal"
import { useEffect, useState } from "react"
import SidebarMobail from "./Sidebar/SidebarMobail"

interface RootLayoutInterface {
  children: JSX.Element
}

const RootLayout: React.FC<RootLayoutInterface> = ({ children }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [mode, setMode] = useState('block'); // حالت اولیه inline است

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1085) {
        setMode('horizontal');
        setIsOpen(false);
      } else if (window.innerWidth < 1085 && window.innerWidth > 412) {
        setMode('inline');
        setIsOpen(true);
      }
      else if (window.innerWidth < 412) {
        setMode('block');
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout className="image-class" style={{ minHeight: '100vh' }}>
      {mode === "block" ? <SidebarMobail children={children} /> : mode === 'inline' ? <SidebarMid isOpen={isOpen} setIsOpen={setIsOpen} children={children} /> : <SidebarHorizontal children={children} />}
    </Layout>
  )
}

export default RootLayout;