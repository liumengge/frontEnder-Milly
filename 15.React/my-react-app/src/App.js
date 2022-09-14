import logo from './logo.svg';
import './App.css';
import Square from './components/Square/index.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Square />
      </header>
    </div>
  );
}

export default App;
