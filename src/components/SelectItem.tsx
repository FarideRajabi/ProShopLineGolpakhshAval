import { Select } from "antd"
import { FC } from "react";
import { SelectOptionPropsType } from "../types/pages";




const SelectOption: FC<SelectOptionPropsType> = ({ options, setSelected }) => (
  <Select
    showSearch
    autoFocus
    defaultValue={2}
    optionFilterProp="children"
    onChange={(value: number) => setSelected(value)}
    onSearch={(value: string) => setSelected(Number(value))}
    filterOption={(input, option) =>
      (option?.lable ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={options}
    style={{minWidth:"230px"}}
  />
);

export default SelectOption