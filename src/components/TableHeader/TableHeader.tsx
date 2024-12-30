import { FC } from "react";
import { TableHeaderPropsTpe } from "../../types/components/TableHeader";

const TableHeader:FC<TableHeaderPropsTpe> = ({ tableHead }) => {
    return (
        <thead>
            <tr className="h6 my-1 align-items-center justify-content-center bg-table borderWhite">
                {tableHead.map((item, index) => {
                    return <th className="text-center py-3 px-2" key={index}>{item}</th>
                })}
            </tr>
        </thead>);
}
export default TableHeader
