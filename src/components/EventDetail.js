import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) {
      setError('Event ID is required');
      setLoading(false);
      return;
    }

    axios.get(`https://web-production-6cb9.up.railway.app/api/events/${eventId}/`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [eventId]);

  return (
    <div className='EventDetails '>
    <>
    <section className="vh-150">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10 d-flex justify-content-center align-items-center">
          <div className="card" style={{ borderRadius: "1rem",width: '100%', maxWidth: '600px' }}>
            <div className="row g-0">
              <div className="col-md-12 col-lg-12 d-flex align-items-center" >
                <div className="card-body p-4 p-lg-5 text-black" >
                <div className='w-100'> 
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p className="error-message">Error: {error}</p> 
                  ) : (
                    <div className="event-container"> 
                      <h2 className="event-title mb-4">{event.name}</h2>
                      <div className="event-details"> 
                        <p><span className="detail-label">Description:</span></p><p> {event.description}</p>
                        <p><span className="detail-label">Date:</span> {event.date}</p>
                        <p><span className="detail-label">Time:</span> {event.time}</p>
                        <p><span className="detail-label">Location:</span> {event.location}</p>
                        <p><span className="detail-label">Ticket Capacity:</span> {event.ticket_capacity}</p>
                        <p><span className="detail-label">Available Tickets:</span> {event.available_tickets}</p>
                        <p><span className="detail-label">Ticket Price:</span> {event.ticket_price}</p>
                      </div>
                      <BookingForm eventId={event.id} ticketPrice={event.ticket_price} />
                    </div>
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
  </>
    </div>
  );
}

export default EventDetail;