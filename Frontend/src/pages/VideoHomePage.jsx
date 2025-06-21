import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VideoHomePage() {
  const [month, setMonth] = useState('December');
  const [year, setYear] = useState(new Date().getFullYear());
  const [timeDevoted, setTimeDevoted] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const formData = {
      month,
      year,
      timeDevoted,
      projects: [{ name: "AI Video Generator" }]
    };

    try {
      // Pass the form data to the ResultPage via route state
      navigate('/result', { state: { formData } });
    } catch (error) {
      setErrorMessage('Failed to navigate. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <header className="App-header">
        <h1>AI Monthly Wrap-Up Video Generator</h1>
        <p>Enter your progress and get a custom AI-generated video summary.</p>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="wrap-form">
          <div className="form-group">
            <label>Month</label>
            <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Hours Devoted</label>
            <input type="number" value={timeDevoted} onChange={(e) => setTimeDevoted(e.target.value)} required />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Generate My Video'}
          </button>
          {errorMessage && <p className="status-error" style={{marginTop: '15px'}}>{errorMessage}</p>}
        </form>
      </main>
    </div>
  );
}

export default VideoHomePage;