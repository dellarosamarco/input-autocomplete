import { useState } from 'react';
import InputAutocomplete from '../components/input-autocomplete/input-autocomplete.component';
import { mock1 } from '../mock';
import './showcase.style.scss';

const Showcase = <Y,>() => {
  const [selectedValue, setSelectedValue] = useState<Y>();

  const onSelect = <T,>(item: T) => {
    setSelectedValue(item as unknown as Y);
  }

  return (
    <div className='showcase'>
      <InputAutocomplete
        data={mock1}
        dropdownCharactersThreshold={3}
        searchKeys={['id', 'name']} 
        displayKey={'name'}
        onSelect={onSelect}
      />

      <div className='showcase__selected-value'>
        Selected Value: {selectedValue ? JSON.stringify(selectedValue) : 'None'}
      </div>
    </div>
  );
}

export default Showcase;
