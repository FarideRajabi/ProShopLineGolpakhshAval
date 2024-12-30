import { Button, Col, Form, Row } from "antd"

interface ReportsFormProps {
  name: string,
  onFinish: (event: object) => void,
  children: React.ReactNode,
  isLoading: boolean
}

const ReportsForm: React.FC<ReportsFormProps> = ({name, onFinish, children, isLoading}) => {
  
  return (
    <Form
      name={name}
      onFinish={onFinish}
      layout="horizontal"
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
    >
      {children}
      <Row gutter={24}>
        <Col xs={24} md={{span: 4, offset: 20}} style={{textAlign: 'left'}}>
          <Button
            type="primary"
            loading={isLoading}
            htmlType="submit"
            block
          >
            جستجو
          </Button>
        </Col>
      </Row>
    </Form>
  )
  
}

export default ReportsForm