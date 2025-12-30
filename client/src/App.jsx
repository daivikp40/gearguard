import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import all pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MaintenanceWorkflow from './pages/MaintenanceWorkflow'; // <--- Import New Page
import MaintenanceRequestForm from './pages/MaintenanceRequestForm';
import EquipmentList from './pages/EquipmentList';
import EquipmentForm from './pages/EquipmentForm';
import CalendarView from './pages/CalendarView';
import Teams from './pages/Teams';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* --- 1. DASHBOARD (Stats Only) --- */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* --- 2. MAINTENANCE (Workflow Only) --- */}
        <Route path="/maintenance" element={<MaintenanceWorkflow />} />

        {/* Maintenance Forms */}
        <Route path="/maintenance/new" element={<MaintenanceRequestForm />} />
        <Route path="/maintenance/:id" element={<MaintenanceRequestForm />} />

        {/* Equipment */}
        <Route path="/equipment" element={<EquipmentList />} />
        <Route path="/equipment/new" element={<EquipmentForm />} />
        <Route path="/equipment/:id" element={<EquipmentForm />} />

        {/* Other */}
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;