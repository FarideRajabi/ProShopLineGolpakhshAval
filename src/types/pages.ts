import { Dispatch, SetStateAction } from "react";

export interface VerificationCodeProps {
    phoneNumber: string,
    onVerificationCodeSubmit: (code: string) => Promise<void>,
}

export interface ItemChoese {
    id: number;
    title: string;
    imagepath?: string;
}

export interface SearchFiledBrandCategoryPropsType {
    apiUrl: string,
    searchApiUrl: string,
    searchFild: String,
    itemChoese: ItemChoese,
    setItemChoese: React.Dispatch<React.SetStateAction<ItemChoese>>,
    searchHide: boolean,
    setSearchHide: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SearchByFiledProductNameBarCodePropsType {
    apiUrl: string,
    searchFild: string
}

export interface OrdersType {
    productId: number,
    title: string,
    imageLocation: string,
    quantity: number,
    priceOfRow: number,
    unitPrice: number,
    quantityPerPackage: number
}

export interface BranchesPropsType {
    setStep: React.Dispatch<React.SetStateAction<number>>
}

export interface ShoppingDeatailPropsType {
    orders: OrdersType[]
}

export interface OptionsType {
    lable: string,
    value: number
}


export interface SelectOptionPropsType {
    options: OptionsType[]
    setSelected: Dispatch<SetStateAction<number>>
}

export interface ordersType {
    createdDateTime: string
    id: number
    orderStatus: string
    orderStatusId: number
    paymentType: string
    sumPrice: number
}