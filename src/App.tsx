import './App.css';
import {DataRenderer} from './DataRenderer';

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <DataRenderer record={{aaa: 'bbb'}} />
      <DataRenderer record={{aaa: 'ddd'}} />
    </div>
  );
}

export default App;
