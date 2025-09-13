export interface InputAutocompleteProps<T> {
  data: T[];
  searchKeys: Array<keyof T>;
  dropdownDisplayField: keyof T;
  dropdownValueField: keyof T;
}