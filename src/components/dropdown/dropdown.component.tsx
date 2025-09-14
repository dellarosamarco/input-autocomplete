import { DropdownProps } from "./dropdown.types";
import './dropdown.style.scss';
import { useEffect, useRef } from "react";

const Dropdown = <T,>({ data, displayKey, onSelect, highlightedIndex }: DropdownProps<T>) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (highlightedIndex !== undefined && highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [highlightedIndex]);

  return (
    <div className="dropdown" role="listbox">
      <div className="dropdown__list">
        {data.map((item, index) => {
          const isHighlighted = index === highlightedIndex;
          return (
            <div 
              key={index}
              role="option"
              aria-selected={isHighlighted}
              className={`dropdown__list-item ${isHighlighted ? "dropdown__list-item--highlighted" : ""}`}
              ref={(el) => { itemRefs.current[index] = el; }}
              onMouseDown={() => onSelect(item)}
            >
              {String(item[displayKey])}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;