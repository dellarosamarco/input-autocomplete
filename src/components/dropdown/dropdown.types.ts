export interface DropdownProps<T> {
    data: T[];
    displayKey: keyof T;
    onSelect: (value: T) => void;
}