export interface InputAutocompleteProps<T> {
  data: T[];
  searchKeys: Array<keyof T>;
  displayKey: keyof T;
  onSelect: (value: T) => void;
}