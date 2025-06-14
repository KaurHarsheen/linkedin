import React, { useState } from "react";
import InterviewHomePage from "./InterviewHomePage";
import Avalability from "./AvailabilityForm"; // Assuming Avalability is the component for scheduling interviews

const InterviewMain = () => {
  const [page, setPage] = useState("main");

  if (page === "ai") {
    return <InterviewHomePage />;
  }

  if (page === "mentor") {
    return <Avalability userId="666111111111111111111111" />;
  }

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      background: "#f5f6fa"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem", color: "#222" }}>
        Welcome to Interview
      </h1>
      <div style={{ display: "flex", gap: "2rem" }}>
        <button
          style={{
            padding: "1.5rem 2.5rem",
            fontSize: "1.2rem",
            borderRadius: "8px",
            border: "none",
            background: "#0073b1",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
          onClick={() => setPage("ai")}
        >
          Interview with AI
        </button>
        <button
          style={{
            padding: "1.5rem 2.5rem",
            fontSize: "1.2rem",
            borderRadius: "8px",
            border: "none",
            background: "#00b894",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
          onClick={() => setPage("mentor")}
        >
          Interview with Mentor/Peer
        </button>
      </div>
    </div>
  );
};

export default InterviewMain;