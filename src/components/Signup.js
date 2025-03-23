import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("https://velnote-backend.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/home");
      props.showAlert("Account created Successfully", "success");
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
          Sign up to Velnote
        </h1>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="card p-4 shadow"
          style={{ width: "400px", borderRadius: "12px" }}
        >
          <h2 className="text-center mb-4 text-primary">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onChange}
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                minLength={5}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                minLength={5}
                onChange={onChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ transition: "0.3s", borderRadius: "8px" }}
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-3">
            <p className="text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-primary fw-bold" style={{ textDecoration: "none" }}>
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
