import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingDetails = () => {
  const { id } = useParams(); // Get booking ID from URL parameters
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false); // State for cancel loading

  useEffect(() => {
    // Fetch booking details by ID
    axios.get(`http://localhost:8000/api/bookings/${id}/`)
      .then(response => {
        setBooking(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch booking details');
        setLoading(false);
      });
  }, [id]);

  const handleCancel = async () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authTokens");
    if (!token) {
      setError("You must be logged in to cancel a booking.");
      return;
    }

    const accessToken = JSON.parse(token).access;

    setCancelLoading(true); // Set cancel loading to true when submitting

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(
        `http://localhost:8000/api/cancel-booking/${id}/`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,  // Pass the token here
            'Content-Type': 'application/json',
          }
        }
      );

      setCancelled(true);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    } finally {
      setCancelLoading(false); // Set cancel loading to false when done
    }
  };

  if (loading) return <p>Loading booking details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='BookingDetails'>
      <section className="vh-150">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10 d-flex justify-content-center align-items-center">
              <div className="card" style={{ borderRadius: "1rem", width: '100%', maxWidth: '600px' }}>
                <div className="row g-0">
                  <div className="col-md-12 col-lg-12 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div className='w-100'> 
                        <h2>Booking Details</h2>
                        {booking ? (
                          <div>
                            <p><strong>Event name:</strong> {booking.event_name}</p>
                            <p><strong>Description:</strong></p><p>{booking.event_description}</p>
                            <p><strong>Date:</strong> {new Date(booking.event_date).toLocaleDateString()}</p>
                            <p><strong>Ticket Quantity:</strong> {booking.ticket_quantity}</p>
                            <p><strong>Total Cost:</strong> ${booking.total_cost}</p>
                            <p><strong>Location:</strong> {booking.event_location}</p>
                            <p><strong>Time:</strong> {booking.event_time}</p>
                            {/* You can add more booking details here */}
                            {!cancelled && (
                              <button 
                                className='btn button' 
                                type="button" 
                                onClick={handleCancel} 
                                disabled={cancelLoading} // Disable the button when cancel is loading
                              >
                                {cancelLoading ? "Processing..." : "Cancel Booking"} {/* Change button text based on loading state */}
                              </button>
                            )}
                            {cancelled && (
                              <p>Booking cancelled!</p>
                            )}
                          </div>
                        ) : (
                          <p>No booking details found.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingDetails;
