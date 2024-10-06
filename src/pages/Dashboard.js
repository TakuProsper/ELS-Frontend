import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import useAxios from "../utils/useAxios";
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserBookings from '../components/UserBookings';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter] = useState('this_week'); // default filter
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // eslint-disable-next-line no-unused-vars
  const api = useAxios();
  const token = localStorage.getItem("authTokens");

  let user_id, username;
  if (token) {
    const decode = jwtDecode(token);
    user_id = decode.user_id;
    username = decode.username;
  }

  // Fetch events whenever the filters change
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);  // Set loading state
      try {
        const response = await axios.get(`https://web-production-6cb9.up.railway.app/api/events/`, {
          params: {
            user_id,
            location,
            date,
            month,
            year,
            filter
          }
        });
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user_id, location, date, month, year, filter]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <>
        <section className="vh-100">
          <div className="container-fluid h-100" style={{ paddingTop: "25px" }}>
            <div className="row h-100">
              <nav className="col-md-4 d-none d-md-block bg-light sidebar mt-4">
                <div className="sidebar-sticky">
                  <UserBookings userId={user_id} />
                </div>
              </nav>
              <main role="main" className="col-md-7 ml-sm-auto col-lg-8 pt-3 px-4">
                <div className="d-flex flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                  <h1 className="h2">Hello {username}, check out the upcoming events!</h1>
                  <div className="btn-toolbar mb-2 mb-md-0" style={{ marginLeft: "20px" }}>
                    <div style={{ position: 'relative' }}>
                      <button
                        className="btn btn-sm btn-outline-secondary dropdown-toggle"
                        type="button"
                        id="filterDropdown"
                        onClick={toggleDropdown}
                      >
                        Filter Events
                      </button>
                      <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="filterDropdown">
                        <div className="dropdown-item">
                          <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="dropdown-item">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="dropdown-item">
                          <input
                            type="number"
                            placeholder="Month (1-12)"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="form-control"
                            min="1"
                            max="12"
                          />
                        </div>
                        <div className="dropdown-item">
                          <input
                            type="number"
                            placeholder="Year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr><td colSpan="3">Loading...</td></tr>
                      ) : error ? (
                        <tr><td colSpan="3">Error: {error}</td></tr>
                      ) : events.length ? (
                        events.map(event => (
                          <tr key={event.id}>
                            <td>
                              <Link to={`/events/${event.id}`}>
                                {event.name}
                              </Link>
                            </td>
                            <td>{event.location}</td>
                            <td>{event.date}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="3">No events found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}

export default Dashboard;