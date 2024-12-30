import { ordersType } from "../pages"

export interface PopoverOrdersPropsType {
    id: number | undefined
    orders: ordersType[]
    setOrders: React.Dispatch<React.SetStateAction<ordersType[]>>
    modalOpen: boolean
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}