import React from "react";

function FinancialItem({ label, value, onClick }) {
  return (
    <div
      className="take"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "1rem",
        marginRight: "1rem",

      }}
      onClick={onClick}
    >
      <p style={{ marginRight: "1.2rem" }}>{label}</p>
      <p style={{ fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

export default FinancialItem;
