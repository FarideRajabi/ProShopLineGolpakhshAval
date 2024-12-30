import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'

const ReportsBase: React.FC = () => {
  
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate(-1)
  }, [])
  
  return (
    <></>
  )
  
}

export default ReportsBase