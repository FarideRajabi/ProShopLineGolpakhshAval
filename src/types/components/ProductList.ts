export interface ProductListPropsType {
    id: number;
    type: String;
}

export interface ProductsType {
    id: number;
    imageLocation: string;
    productPrice: number;
    productTitle: string;
    quantity: number;
    quantityPerPackage: number;
    requestedQuntity?:number;
    key?: number,
}