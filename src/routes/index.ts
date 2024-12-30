import { ComponentType } from "react"
import Error404 from "../pages/Error404"
import HomePage from "../pages/Home"
import NewOrders from "../pages/NewOrders/NewOrders"
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart"
import MyOrders from "../pages/MyOrders/MyOrders"
import Comments from "../pages/comments/Comments"
import Profile from "../pages/Profile/Profile"

interface RoutesInterface {
  path: string,
  element:ComponentType,
  name: string,
  private: boolean
}

const routes: RoutesInterface[] = [
  {
    path: '/home',
    name: 'صفحه اصلی',
    element: HomePage,
    private: true,
  },
  {
    path: '/',
    name: 'سفارش جدید',
    element: NewOrders,
    private: true,
  },
  {
    path: "/shopping-cart",
    name: 'سبد سفارش',
    element: ShoppingCart,
    private: true
  },
  {
    path: "/my-orders",
    name: 'سفارشات من',
    element: MyOrders,
    private: true
  },
  {
    path: "/order-pursuit",
    name:'سفارش خودکار',
    element: MyOrders ,
    private: true
  },
  {
    path: "/comments",
    name: 'نظرات و پیشنهادات',
    element: Comments,
    private: true
  },
  {
    path: "/profile",
    name: 'کاربر',
    element: Profile,
    private: true
  },
  {
    path: '/*',
    name: 'صفحه ۴۰۴',
    element: Error404,
    private: true,
  }

]

export default routes