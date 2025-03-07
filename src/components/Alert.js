import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
          style={{
            borderRadius: "8px",
            padding: "12px 16px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            fontWeight: "500",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
