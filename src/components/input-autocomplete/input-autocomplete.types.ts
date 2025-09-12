export interface InputAutocompleteProps<T> {
  data: T[];
  searchKeys: Array<keyof T>;
}