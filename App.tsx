import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Profile from './pages/Profile';
import Guide from './pages/Guide';
import AddressList from './pages/AddressList';
import AddressEdit from './pages/AddressEdit';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          
          <Route path="/addresses" element={<AddressList />} />
          <Route path="/address/new" element={<AddressEdit />} />
          <Route path="/address/edit/:id" element={<AddressEdit />} />
          
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;