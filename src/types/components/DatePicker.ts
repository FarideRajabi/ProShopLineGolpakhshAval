export interface DatePickerComponentPropsType {
    value: {
        year: string;
        month: string;
        day: string;
    }
    setSelected: React.Dispatch<React.SetStateAction<{
        year: string;
        month: string;
        day: string;
    }>>
}