import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

const UserBookings = ({ userId }) => {
  // eslint-disable-next-line no-unused-vars
  const [bookings, setBookings] = useState([]);
  const [calendarBookings, setCalendarBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${userId}/bookings/`)
      .then(response => {
        setBookings(response.data);
        // Map bookings to dates in 'calendarBookings'
        const bookingDates = response.data.map(booking => ({
          date: new Date(booking.event_date),  // Use event_date from API
          id: booking.id
        }));
        setCalendarBookings(bookingDates);
      })
      .catch(error => {
        console.error(error);
      });
  }, [userId]);

  // Handle date clicks in the calendar
  const handleDateClick = (date) => {
    const booking = calendarBookings.find(booking => 
      booking.date.toDateString() === date.toDateString()
    );
    if (booking) {
      // Navigate to the booking details page
      navigate(`/bookings/${booking.id}`);
    }
  };

  return (
    <div className='UserBookings'>
      <h2 className='user-bookings__title'>My Bookings</h2>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date, view }) => {
          // Highlight the days where the user has bookings
          if (view === 'month') {
            return calendarBookings.some(booking =>
              booking.date.toDateString() === date.toDateString()
            ) ? 'highlight' : null;
          }
        }}
        className="user-bookings__calendar"
      />
    </div>
  );
};

export default UserBookings;