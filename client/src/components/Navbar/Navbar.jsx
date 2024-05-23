import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";

import "./Navbar.css";
import logo from "../../assets/imslogo2.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import { setCurrentUser } from "../../actions/currentUser";

const Navbar = () => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  const buttonStyle = {
    backgroundColor: isHovered ? '#ff6666' : 'red',
    color: 'white',
    transition: 'background-color 0.3s ease-in-out',
  };

  return (
    <nav className="main-nav">
      <div className="navbar">
        <div className="navbar-1">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <form>
            <input type="text" placeholder="Search.... ( i.e. tags, about, people, questions,.... ) " />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
          <Link to="/" className="nav-item nav-btn res-nav">
            About
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            Products
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            For Teams
          </Link>
        </div>
        <div className="navbar-2">
          {User === null ? (
            <Link to="/Auth" className= "nav-item nav-links">
              Log In
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#2f4f4f"
                px="12px" 
                py="5px" 
                margin="7px" 
                borderRadius="50%" 
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button
                className="nav-item nav-links"
                onClick={handleLogout}
                style={buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar ;
