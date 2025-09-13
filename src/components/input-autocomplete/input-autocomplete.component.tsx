import { InputAutocompleteProps } from "./input-autocomplete.types";
import './input-autocomplete.style.scss';
import Dropdown from "../dropdown/dropdown.component";
import { useState } from "react";

const InputAutocomplete = <T,>({ data, searchKeys, dropdownDisplayField, dropdownValueField }: InputAutocompleteProps<T>) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const onSelectValue = (value: T) => {
    console.log(value);
  }

  return (
    <div className="input-autocomplete">
      <input 
        type="text" 
        className="input-autocomplete__field"
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
      />
      {
        showDropdown && <div className="input-autocomplete__dropdown">
          <Dropdown
            data={data} 
            displayField={dropdownDisplayField} 
            onSelect={onSelectValue}
          />
        </div>
      }
    </div>
  );
};

export default InputAutocomplete;