import InputAutocomplete from './components/input-autocomplete/input-autocomplete.component';
import { mock1 } from './mock';

function App() {
  return (
    <div className='homepage'>
      <InputAutocomplete data={mock1} searchKeys={['id', 'name']} />
    </div>
  );
}

export default App;
