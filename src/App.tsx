import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import EditAddAparment from './pages/AddEditAparment';
import DepLibres from './pages/DepLibres';
import Home from './pages/Home';
import Login from './pages/Login';
import MyAparments from './pages/MyAparments';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              backgroundColor: '#68d391',
              color: '#ffffff',
            },
          },
          error: {
            duration: 3000,
            style: {
              backgroundColor: '#f87171',
              color: '#ffffff',
            },
          },
        }}
      />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dep-libres" element={<DepLibres />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-aparments" element={<MyAparments />} />
            <Route
              path="/add-aparment"
              element={<EditAddAparment typeAction="add" />}
            />
            <Route
              path="/edit-aparment"
              element={<EditAddAparment typeAction="edit" />}
            />
            {/* //en caso de que este logueado que no lo redireccione a login devuelta */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Route>

        {/* Por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
