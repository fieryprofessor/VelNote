import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://velnote-backend.onrender.com/api/auth/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/home");
      props.showAlert("Successfully Logged In", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="d-flex justify-content-center my-3">
        <h1
          className="fw-bold text-uppercase"
          style={{
            color: "#333",
            fontSize: "2.2rem",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            borderBottom: "4px solid #007bff",
            display: "inline-block",
            paddingBottom: "5px",
            marginBottom: "20px",
          }}
        >
          Login to Velnote
        </h1>
      </div>

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="card p-4 shadow" style={{ width: "400px", borderRadius: "12px" }}>
          <h2 className="text-center mb-4 text-primary">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={credentials.email}
                onChange={onChange}
                id="email"
                name="email"
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={credentials.password}
                onChange={onChange}
                id="password"
                name="password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ transition: "0.3s", borderRadius: "8px" }}
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-3">
            <p className="text-muted">
              New to Velnote?{" "}
              <Link to="/signup" className="text-primary fw-bold" style={{ textDecoration: "none" }}>
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
