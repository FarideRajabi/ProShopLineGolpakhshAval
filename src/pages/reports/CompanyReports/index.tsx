import ReportsTable from "../ReportsTable"
import { Space } from "antd"

const CompanyReports: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <ReportsTable />
    </Space>
  )

}

export default CompanyReports