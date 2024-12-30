import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import PageInfoContextProvider from './context/PageInfoContext.tsx'
import faIR from 'antd/locale/fa_IR'
import { ConfigProvider } from 'antd'
import './index.css'

const theme = {
  token: {
    colorPrimary: '#8a2be2',
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PageInfoContextProvider>
      <ConfigProvider direction='rtl' locale={faIR} theme={theme}>
        <App />
      </ConfigProvider>
    </PageInfoContextProvider>
  </React.StrictMode>,
)
