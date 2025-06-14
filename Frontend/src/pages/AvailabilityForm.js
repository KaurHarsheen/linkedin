import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MatchPage from './MatchPage';
import { fetchMatches } from './api/fetchmatches';

export default function AvailabilityForm({ userId }) {
  const [date, setDate] = useState(null);
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try {
    // You may want to re-enable this if you're saving availability to backend:
    // await fetch(`http://localhost:5000/api/users/${userId}/availability`, {
    //   method: 'POST',
    //   headers: { 'Content-Type':'application/json' },
    //   body: JSON.stringify({ availability: [date] })
    // });

    const data = await fetchMatches(userId);
    setMatches(data.matches); // ✅ this is now correct
  } catch (err) {
    console.error("Frontend error ➜", err);
    setError('An error occurred. Please try again.');
  }
  setLoading(false);
};
  if (matches) {
    return <MatchPage userId={userId} matches={matches} selectedDate={date} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f6fa"
      }}
    >
      <form
        onSubmit={submit}
        style={{
          background: "#fff",
          padding: "2.5rem 2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          minWidth: "340px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
            color: "#222",
            fontWeight: 600,
            letterSpacing: "0.5px"
          }}
        >
          Select Your Availability
        </h2>
        <div
          style={{
            width: "100%",
            marginBottom: "1.5rem"
          }}
        >
          <DatePicker
            selected={date}
            onChange={d => setDate(d)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Pick a meeting time"
            className="custom-datepicker"
          />
        </div>
        <button
          type="submit"
          disabled={!date || loading}
          style={{
            marginTop: "1.5rem",
            padding: "0.9rem 2.2rem",
            fontSize: "1.1rem",
            borderRadius: "8px",
            border: "none",
            background: !date || loading ? "#b2bec3" : "#0073b1",
            color: "#fff",
            cursor: !date || loading ? "not-allowed" : "pointer",
            fontWeight: 500,
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            transition: "background 0.2s"
          }}
        >
          {loading ? 'Scheduling...' : 'Find Match & Schedule'}
        </button>
        {error && <div style={{ color: "#d63031", marginTop: "1rem" }}>{error}</div>}
      </form>
    </div>
  );
}