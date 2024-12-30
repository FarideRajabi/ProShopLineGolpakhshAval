import { FC } from "react"
import { ShoppingDeatailPropsType } from "../../types/pages"
import { Row } from "antd"

const ShoppingDeatail: FC<ShoppingDeatailPropsType> = ({ orders }) => {

    let together = 0
    orders.map((item) => {
        together += item.priceOfRow
    })

    return <>
        {orders.length !== 0 ?
            (<div>

                <Row>
                    <h3>جمع کل سفارش : </h3>
                    <h3>{together.toLocaleString('fa-IR')} ریال</h3>
                </Row>
                <Row >
                    <h3>میزان تخفیف:</h3>
                    <h3>{0} ریال</h3>
                </Row>
                <Row>
                    <h3  >جمع کل سفارش پس از تخفیف: </h3>
                    <h3>{together.toLocaleString('fa-IR')} ریال</h3>
                </Row>
                <Row >
                    <h3>تخفیف براساس نحوه ی پرداخت شما بر روی فاکتور لحاظ می گردد:</h3>

                </Row>
                <Row>
                    <h3  >جمع مالیات:</h3>
                    <h3  >0 ریال</h3>
                </Row>
                <Row >
                    <h3  >مبلغ قابل پرداخت:</h3>
                    <h3  >{together.toLocaleString('fa-IR')} ریال</h3>
                </Row>
            </div>
            ) :
            <div>سبد سفارش خالی است</div>
        }</>
}

export default ShoppingDeatail