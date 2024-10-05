import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import EventDetail from './components/EventDetail';
import BookingForm from './components/BookingForm';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/Dashboard'
import PrivateRoute from './utils/PrivateRoute'; 
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/Footer';
import BookingDetails from './components/BookingDetails';
import UserBookings from './components/UserBookings';
import './App.css';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/booking-form" element={<BookingForm />} />
            <Route path="/" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/register" exact element={<RegisterPage />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
            <Route path="/bookings" element={<UserBookings/>} />
          </Routes>
          </div>
          <Footer/>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;