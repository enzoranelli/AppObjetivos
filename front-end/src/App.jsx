
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navegacion from './components/Navegacion.jsx';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  

  return (
    <Router>
      <div className='App'>
        <Navegacion />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
