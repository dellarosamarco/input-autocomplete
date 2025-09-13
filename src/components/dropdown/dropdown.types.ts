export interface DropdownProps<T> {
    data: T[];
    displayField: keyof T;
    onSelect: (value: T) => void;
}