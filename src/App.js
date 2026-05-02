import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Topo from './components/Topo';
import Principal from './components/Principal';
import Rodape from './components/Rodape';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Topo />
      <Principal />
      <Rodape />
    </div>
  </BrowserRouter>
);

export default App;
