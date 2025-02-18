import './App.css';
import {DataRenderer} from './DataRenderer';

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <DataRenderer componentName="first c" record={{aaa: 'first'}} />
      <DataRenderer componentName="second c" record={{aaa: 'second'}} />
    </div>
  );
}

export default App;
