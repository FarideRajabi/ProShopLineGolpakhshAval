import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { FC } from "react"
import { DatePickerComponentPropsType } from "../../types/components/DatePicker"

const DatePickerComponent:FC<DatePickerComponentPropsType> = ({value, setSelected }) => {
  return (
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        onChange={setSelected}
        defultValue={value}
      />
  )
}

export default DatePickerComponent