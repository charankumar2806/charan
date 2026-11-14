import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Traffic from './pages/Traffic';
import RouteOptimizer from './pages/RouteOptimizer';
import TrafficPrediction from './pages/TrafficPrediction';
import Fleet from './pages/Fleet';
import Emissions from './pages/Emissions';
import RoadSafety from './pages/RoadSafety';
import Transit from './pages/Transit';
import AIAssistant from './pages/AIAssistant';
import Notifications from './pages/Notifications';
import MobilityControlCenter from './pages/MobilityControlCenter';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center text-slate-200">Loading workspace…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/traffic" element={<Traffic />} />
        <Route path="/routes" element={<RouteOptimizer />} />
        <Route path="/traffic-prediction" element={<TrafficPrediction />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/emissions" element={<Emissions />} />
        <Route path="/road-safety" element={<RoadSafety />} />
        <Route path="/transit" element={<Transit />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/mobility-control-center" element={<MobilityControlCenter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
