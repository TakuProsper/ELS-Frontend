import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
  const { logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  return (
    <div className='NavBar'>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid d-flex justify-content-between">
          <div className="row w-100">
            <div className="col-md-6">
              <a className="navbar-brand ml-5" href="#">
                <h2><strong>Mark Your Moment</strong></h2>
              </a>
            </div>
            <div className="col-md-6">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto pt-2">
                  <li className="nav-item d-flex align-items-center">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  {token === null && (
                    <>
                      <li className="nav-item d-flex align-items-center">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                      <li className="nav-item d-flex align-items-center">
                        <Link className="nav-link" to="/register">Register</Link>
                      </li>
                    </>
                  )}
                  {token !== null && (
                    <>
                      <li className="nav-item d-flex align-items-center">
                        <Link className="nav-link" to="/" onClick={logoutUser} style={{ cursor: "pointer" }}>Logout</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
