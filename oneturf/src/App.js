
import { BrowserRouter as Router,  Routes, Route} from 'react-router-dom';
import './App.css';
import CreateAccount from './pages/CreateAccount';
import CreateAccount2 from './pages/CreateAccount2';
import VerifyAccount  from './pages/VerifyAccount';
import Login from './pages/Login';
import AdminLayout from './pages/Admin/AdminLayout';
import DashBoard from './pages/Admin/DashBoard';
import Estate from './pages/Admin/Estate';
import MarketPlace from './pages/Admin/Marketplace';
import Licensing from './pages/Admin/Licensing';
import Billing from './pages/Admin/Billing';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path= "/" element={<Login />} />
          <Route path="/pages/CreateAccount" element={<CreateAccount />} />
          <Route path= "/pages/CreateAccount2" element={<CreateAccount2 />} />
          <Route path= "/pages/VerifyAccount" element={<VerifyAccount />} />
          
          <Route path="/pages/Admin/DashBoard" element= {< AdminLayout />} >
          <Route index element={<DashBoard />} />
          <Route path= "DashBoard" element={<DashBoard />} />
          <Route path= "Estate" element={<Estate />} />
          <Route path= "Marketplace" element={<MarketPlace />} />
          <Route path= "Billing" element={<Billing />} />
          <Route path= "Licensing" element={<Licensing />} />
          </Route>
        
        </Routes>
    </div>
    </Router>
  );
}

export default App;
