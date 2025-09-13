import { InputAutocompleteProps } from "./input-autocomplete.types";
import './input-autocomplete.style.scss';
import Dropdown from "../dropdown/dropdown.component";
import { useState } from "react";

const InputAutocomplete = <T,>({ data, searchKeys, displayKey, onSelect, dropdownCharactersThreshold }: InputAutocompleteProps<T>) => {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState<T>();

  const onSearch = (value: string) => {
    setSelectedValue(undefined);
    setSearchTerm(value);

    const lowerValue = value.toLowerCase();
    const filtered = data.filter(item => 
      searchKeys.some(key => 
        String(item[key]).toLowerCase().includes(lowerValue)
      )
    );
    
    setFilteredData(filtered);
  }

  const onSelectValue = (value: T) => {
    setSelectedValue(value);
    onSelect(value);
  }

  return (
    <div className="input-autocomplete">
      <input
        value={selectedValue ? String(selectedValue[displayKey]) : searchTerm}
        type="text" 
        className="input-autocomplete__field"
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
        onChange={(e) => onSearch(e.target.value)}
      />
      {
        showDropdown && 
        filteredData.length > 0 &&
        searchTerm.length >= dropdownCharactersThreshold &&
        <div className="input-autocomplete__dropdown">
          <Dropdown
            data={filteredData} 
            displayKey={displayKey} 
            onSelect={onSelectValue}
          />
        </div>
      }
    </div>
  );
};

export default InputAutocomplete;