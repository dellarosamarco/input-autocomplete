import { DropdownProps } from "./dropdown.types";
import './dropdown.style.scss';

const Dropdown = <T,>({ data, displayKey, onSelect }: DropdownProps<T>) => {
  return (
    <div className="dropdown">
      <div className="dropdown__list">
        {data.map((item, index) => (
          <div key={index} className="dropdown__list-item" onMouseDown={() => onSelect(item)}>
            {String(item[displayKey])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;