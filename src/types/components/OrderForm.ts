import { ProductsType } from "./ProductList";

export interface OrderFormPropsType {
    findProductQuantity: ProductsType[];
    products: ProductsType[];
    setProducts: React.Dispatch<React.SetStateAction<ProductsType[]>>;
}