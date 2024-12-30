import { BrowserRouter, Route, Routes } from "react-router-dom"
import RootLayout from "../components/Layout"
import NewOrders from "../pages/NewOrders/NewOrders"
import Error404 from "../pages/Error404"
import MyOrders from "../pages/MyOrders/MyOrders"
import Home from "../pages/Home"
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart"
import OrderByCustomer from "../pages/ShoppingCart/OrderByCustomer"
import OrderItems from "../pages/OrderItems/OrderItems"
import Comments from "../pages/comments/Comments"

const AppRouter: React.FC = () => {

  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<NewOrders />} />
          <Route path='/shopping-cart' element={<ShoppingCart />} />
          <Route path='/order-by-customer' element={< OrderByCustomer />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/order-items' element={<OrderItems />} />
          <Route path='/order-pursuit' element={<Error404 />} />
          <Route path='/comments' element={<Comments />} />
          <Route path='/profile' element={<Error404 />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  )

}

export default AppRouter