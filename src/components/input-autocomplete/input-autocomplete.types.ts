export interface InputAutocompleteProps<T> {
  data: T[];
  searchKeys: Array<keyof T>;
  displayKey: keyof T;
  dropdownCharactersThreshold: number;
  onSelect: (value: T) => void;
}