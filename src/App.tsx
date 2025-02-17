import './App.css';
import {DataRenderer} from './DataRenderer';

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <DataRenderer workerName="first worker" record={{aaa: 'first'}} />
      <DataRenderer workerName="second worker" record={{aaa: 'second'}} />
    </div>
  );
}

export default App;
