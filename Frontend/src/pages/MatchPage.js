import React, { useEffect, useState } from 'react';
import { fetchMatches, seedData } from './api/fetchmatches';
import SchedulePage from './SchedulePage';
import { useNavigate } from 'react-router-dom';

//const userId = '666111111111111111111111'; // Replace with actual user ID

export default function MatchPage({ userId, matches: initialMatches, selectedDate }) {
  //console.log(selectedDate)
  const [matches, setMatches] = useState(initialMatches || []);
  const [summary, setSummary] = useState('');
  const [showSchedule, setShowSchedule] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  console.log("🔍 userId in MatchPage ➜", userId);
  const getMatches = async () => {
    try {
      await seedData(); // Wait for seeding to finish
      // Add a short delay to ensure DB is updated (optional, but can help with race conditions)
      await new Promise(res => setTimeout(res, 300));
      const res = await fetchMatches(userId);
      if (res && res.matches) {
        console.log("Hello");
        setMatches(res.matches || []);
        setSummary(res.summary || '');
      } else {
        console.log("Helli");
        setMatches([]);
        setSummary('');
      }
    } catch (error) {
      console.error("Error getting matches:", error);
      setMatches([]);
      setSummary('');
    }
  };

  getMatches();
}, [userId]);

  if (selectedUser) {
    // Pass all info to SchedulePage
    // console.log("🔍 userId in MatchPage ➜", selectedUser._id, selectedUser.name)
    return (
      <SchedulePage
     
        userId={userId}
        matchedUserId={selectedUser._id}
        matchedUserName={selectedUser.name}
        selectedUser={selectedUser} // <-- Make sure this is passed!
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1rem"
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "2.5rem 2rem",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "2.2rem",
            color: "#0073b1",
            marginBottom: "2rem",
            fontWeight: 700,
            letterSpacing: "0.5px",
            textAlign: "center"
          }}
        >
          Top Matches
        </h2>
        {matches.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No matches found.</p>
        ) : (
          matches.map(m => (
            <div
              key={m._id}
              style={{
                border: '1px solid #e1e4e8',
                borderRadius: "10px",
                padding: "1.2rem 1rem",
                marginBottom: "1.2rem",
                background: "#f9fafb",
                boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                position: "relative"
              }}
            >
              <h3 style={{ margin: 0, color: "#222", fontWeight: 600 }}>{m.name}</h3>
              <p style={{ margin: "0.5rem 0 0.2rem 0", color: "#555" }}>
                <strong>Skills:</strong> <span style={{ color: "#0073b1" }}>{m.skills.join(', ')}</span>
              </p>
              <p style={{ margin: 0, color: "#555" }}>
                <strong>Experience:</strong> {m.experience}
              </p>
              <button
                style={{
                  marginTop: "1rem",
                  padding: "0.6rem 1.5rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  border: "none",
                  background: "#00b894",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                  transition: "background 0.2s"
                }}
                onClick={() => setSelectedUser({ ...m, date: selectedDate })}
                
              >
                Schedule a Meet
              </button>
            </div>
          ))
        )}
        <div
          style={{
            marginTop: "2.5rem",
            padding: "1.2rem",
            background: "#eaf6ff",
            borderRadius: "10px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.02)"
          }}
        >
          <h3 style={{ color: "#0073b1", margin: 0, fontWeight: 600 }}>AI Summary</h3>
          <p style={{ margin: "0.7rem 0 0 0", color: "#333", fontSize: "1.05rem" }}>{summary}</p>
        </div>
      </div>
    </div>
  );
}