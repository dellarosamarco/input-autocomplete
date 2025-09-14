export interface DropdownProps<T> {
    data: T[];
    displayKey: keyof T;
    highlightedIndex: number;
    onSelect: (value: T) => void;
}