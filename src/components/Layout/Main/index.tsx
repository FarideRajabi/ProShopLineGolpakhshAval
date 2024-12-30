import { Layout } from "antd"

interface MainInterface {
  children: React.ReactNode
}

const Main: React.FC<MainInterface> = ({children}) => {
  
  return (
    <Layout.Content>
      {children}
    </Layout.Content>
  )
  
}

export default Main