import { InputAutocompleteProps } from "./input-autocomplete.types";
import './input-autocomplete.style.scss';
import Dropdown from "../dropdown/dropdown.component";
import { useId, useRef, useState } from "react";

const InputAutocomplete = <T,>({ data, searchKeys, displayKey, onSelect, dropdownCharactersThreshold }: InputAutocompleteProps<T>) => {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState<T>();
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const inputId = useId();
  const listboxId = `${inputId}-listbox`;
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = (value: string) => {
    setSelectedValue(undefined);
    setSearchTerm(value);

    const terms = value.toLowerCase().trim().split(/\s+/);

    const filtered = data.filter(item =>
      terms.every(term =>
        searchKeys.some(key =>
          String(item[key]).toLowerCase().includes(term)
        )
      )
    );

    setFilteredData(filtered);
    setHighlightedIndex(-1);
  };

  const onSelectValue = (value: T) => {
    setSelectedValue(value);
    onSelect(value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredData.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => prev < filteredData.length - 1 ? prev + 1 : 0);
    } 
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>  prev > 0 ? prev - 1 : filteredData.length - 1);
    } 
    else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      onSelectValue(filteredData[highlightedIndex]);
      setShowDropdown(false);
      inputRef.current?.blur();
    }
    else if (e.key === "Escape") {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div 
      className="input-autocomplete"       
      role="combobox"
      aria-haspopup="listbox"
      aria-owns={listboxId}
      aria-expanded={showDropdown}
      aria-controls={listboxId}
      aria-autocomplete="list"
    >
      <input
        ref={inputRef}
        id={inputId}
        value={selectedValue ? String(selectedValue[displayKey]) : searchTerm}
        type="text" 
        className="input-autocomplete__field"
        aria-activedescendant={highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined}
        aria-controls={listboxId}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      {
        showDropdown && 
        filteredData.length > 0 &&
        searchTerm.length >= dropdownCharactersThreshold &&
        <div className="input-autocomplete__dropdown" aria-expanded={showDropdown}>
          <Dropdown
            data={filteredData}
            highlightedIndex={highlightedIndex}
            displayKey={displayKey} 
            onSelect={onSelectValue}
          />
        </div>
      }
    </div>
  );
};

export default InputAutocomplete;