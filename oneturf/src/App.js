
import { BrowserRouter as Router,  Routes, Route} from 'react-router-dom';
import './App.css';
import CreateAccount from './pages/CreateAccount';
import CreateAccount2 from './pages/CreateAccount2';
import VerifyAccount  from './pages/VerifyAccount';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CreateAccount />} />
          <Route path= "/pages/CreateAccount2" element={<CreateAccount2 />} />
          <Route path= "/pages/VerifyAccount" element={<VerifyAccount />} />
          <Route path= "/pages/login" element={<Login />} />
          <Route path="/pages/dashboard" element= {< Dashboard/>} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
