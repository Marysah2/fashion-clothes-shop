import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import SelectRole from './pages/SelectRole';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  
  const reduxUser = useSelector((state) => state.auth.user);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = reduxUser || storedUser;

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            
            <Route
              path="/"
              element={
                user ? <Navigate to="/home" /> : <Navigate to="/select-role" />
              }
            />

          
            <Route path="/select-role" element={<SelectRole />} />
            <Route path="/auth" element={<Auth />} />

            
            <Route
              path="/home"
              element={
                <ProtectedRoute allowedRoles={['customer', 'admin']}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute allowedRoles={['customer', 'admin']}>
                  <Products />
                </ProtectedRoute>
              }
            />


            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}


export default App;