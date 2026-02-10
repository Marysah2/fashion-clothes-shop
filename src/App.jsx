import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrderHistory from './features/orders/OrderHistory';
import AdminOrders from './features/orders/AdminOrders';
import AnalyticsDashboard from './features/admin/AnalyticsDashboard';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/orders/history" element={<OrderHistory />} />
          <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;