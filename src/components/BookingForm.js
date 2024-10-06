import React, { useState } from 'react';
import axios from 'axios';

function BookingForm({ eventId, ticketPrice }) {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authTokens");
    if (!token) {
      setError("You must be logged in to make a booking.");
      return;
    }

    const accessToken = JSON.parse(token).access;
    setLoading(true);

    try {
      await axios.post(
        'https://web-production-6cb9.up.railway.app/api/bookings/',
        {
          event: eventId,
          ticket_quantity: ticketQuantity,
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );

      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='BookingForm'>
      {success ? (
        <p>Booking successful!</p>
      ) : (
        <>
          <div>
            <label>Ticket Quantity:</label>
            <input
              type="number"
              value={ticketQuantity}
              onChange={(e) => setTicketQuantity(e.target.value)}
            />
          </div>
          <button className='btn button mt-4' type="submit" disabled={loading}>
            {loading ? "Processing..." : "Book Now"}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </form>
  );
}

export default BookingForm;