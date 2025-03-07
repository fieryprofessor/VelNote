import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container my-5" >
      <div className="card shadow-lg p-4 border-0" style={{ borderRadius: "12px",background: "linear-gradient(135deg,rgb(161, 143, 202),rgb(223, 75, 181))",
}}>
        
{/* Stylish H1 Tag */}
<div className="text-center mb-4">
  <h1
    className="fw-bold text-dark p-3"
    style={{
      fontSize: "2.8rem",
      fontWeight: "bold",
      borderRadius: "8px",
      display: "inline-block",
      padding: "8px 16px",
      letterSpacing: "1.5px",
    }}
  >
    About Velnote
  </h1>
</div>





        <p className="lead text-muted text-center mb-4">
          Your personal, secure, and smart note-taking app.
        </p>

        <div className="row">
          {/* Left Section: About the App */}
          <div className="col-md-6">
            <h3 className="text-dark fw-bold">What is Velnote?</h3>
            <p>
              Velnote is a powerful note-taking application that allows you to{" "}
              <strong>securely store, manage, and organize</strong> your notes.
              Whether you're a student, professional, or just someone who likes
              jotting down ideas, Velnote helps keep your thoughts in one place.
            </p>
          </div>

          {/* Right Section: Features */}
          <div className="col-md-6">
  <div
    className="p-4 rounded shadow-sm"
    style={{
      background: "#41b991", // Dark purple background
      border: "2px solid rgb(104, 35, 158)", // Even darker purple border
      borderRadius: "12px",
    }}
  >
    <h3 className="text-primary fw-bold text-center mb-3">🚀 Key Features</h3>
    <ul className="list-group">
      <li className="list-group-item border-0 bg-transparent">
        ✅ <strong>Secure Authentication</strong> - Login and manage your notes securely.
      </li>
      <li className="list-group-item border-0 bg-transparent">
        ✅ <strong>Add, Edit & Delete Notes</strong> - Fully control your notes anytime.
      </li>
      <li className="list-group-item border-0 bg-transparent">
        ✅ <strong>Fast & Responsive</strong> - Enjoy a smooth and efficient experience.
      </li>
      <li className="list-group-item border-0 bg-transparent">
        ✅ <strong>User-friendly Interface</strong> - Simple, clean, and easy to use.
      </li>
    </ul>
  </div>
</div>

        </div>

        {/* Call to Action */}
        <div className="text-center mt-4">
          <h5 className="text-dark">Ready to take control of your notes?</h5>
          <Link
            to="/signup"
            className="btn btn-primary btn-lg mt-2"
            style={{ borderRadius: "8px", padding: "10px 25px", fontSize: "1.2rem" }}
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
