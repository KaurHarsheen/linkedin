import { useState } from 'react';

export default function SchedulePage({ userId, matchedUserId, matchedUserName, selectedUser }) {
  const passedDate = selectedUser?.date;

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use the passed date directly, don't show DatePicker
  const handleSchedule = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log("Scheduling for user:", userId, "with matched user:", matchedUserId, "at date:", passedDate);
      await fetch(`http://localhost:5000/api/users/${userId}/availability`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ availability: [passedDate] })
      });
      await fetch(`http://localhost:5000/api/users/${matchedUserId}/availability`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ availability: [passedDate] })
      });
      const res = await fetch(`http://localhost:5000/api/users/${userId}/schedule`, {
        method: 'POST'
      });
      const json = await res.json();
      if (!res.ok) {
        const errJson = await res.json();
        setError(errJson.error || 'Scheduling failed. Please try again.');
      } else {
        setMeeting(json);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  if (meeting) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3 style={{ color: "#00b894", fontWeight: 700, fontSize: "1.5rem" }}>🎉 Interview Scheduled!</h3>
        <p style={{ fontSize: "1.1rem" }}>
          <strong>Time:</strong> {new Date(meeting.time).toLocaleString()}
        </p>
        <p style={{ fontSize: "1.1rem" }}>
          <strong>Link:</strong>{' '}
          <a href={meeting.link} target="_blank" rel="noopener noreferrer" style={{ color: "#0073b1" }}>
            {meeting.link}
          </a>
        </p>
      </div>
    );
  }
console.log("passedDate:", passedDate);
  return (
    //console.log("selectedUser:", selectedUser)
   
    <div style={{ textAlign: "center" }}>
     
      <h2 style={{ color: "#0073b1", marginBottom: "1.5rem", fontWeight: 700 }}>
        Schedule Interview with {matchedUserName || matchedUserId}
      </h2>
      <p>
        <strong>Selected Time:</strong> {passedDate ? new Date(passedDate).toLocaleString() : "No time selected"}
      </p>
      <button
        onClick={handleSchedule}
        disabled={loading}
        style={{
          marginTop: "1.5rem",
          padding: "0.9rem 2.2rem",
          fontSize: "1.1rem",
          borderRadius: "8px",
          border: "none",
          background: loading ? "#b2bec3" : "#0073b1",
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: 500,
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          transition: "background 0.2s"
        }}
      >
        {loading ? "Scheduling..." : "Confirm & Generate Meeting Link"}
      </button>
      {error && (
        <div style={{ color: "#d63031", marginTop: "1rem", textAlign: "center" }}>
          {error}
        </div>
      )}
    </div>
  );
}
