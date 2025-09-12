import { InputAutocompleteProps } from "./input-autocomplete.types";
import './input-autocomplete.style.scss';

const InputAutocomplete = <T,>({ data, searchKeys }: InputAutocompleteProps<T>) => {
  return (
    <div className="input-autocomplete">
      <input type="text" className="input-autocomplete__field" />
    </div>
  );
};

export default InputAutocomplete;