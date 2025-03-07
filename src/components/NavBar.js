import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavBar(props) {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    props.showAlert("Logged out Successfully", "success");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background: "linear-gradient(90deg, #0d6efd, #6610f2)",
        padding: "10px 20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{
            fontSize: "1.6rem",
            letterSpacing: "1px",
            color: "#fff",
            textTransform: "uppercase",
          }}
        >
          VelNote
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/home" ? "active" : ""
                }`}
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  transition: "0.3s",
                  color: location.pathname === "/home" ? "#ffdd57" : "#fff",
                }}
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  transition: "0.3s",
                  color: location.pathname === "/about" ? "#ffdd57" : "#fff",
                }}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <div className="d-flex">
              <Link
                className="btn mx-1"
                to="/login"
                role="button"
                style={{
                  backgroundColor: "#ffdd57",
                  color: "#000",
                  borderRadius: "8px",
                  fontWeight: "600",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#ffc107")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ffdd57")}
              >
                Login
              </Link>
              <Link
                className="btn mx-1"
                to="/signup"
                role="button"
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  borderRadius: "8px",
                  fontWeight: "600",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
              >
                Signup
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="btn"
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                borderRadius: "8px",
                fontWeight: "600",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
