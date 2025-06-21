import { useState } from 'react';
import AvailabilityForm from '../../Frontend/src/pages/AvailabilityForm';

export default function SchedulePage() {
  const userId = '666111111111111111111111'; // your constant _id

  const [meeting, setMeeting] = useState(null);
  return (
    <div>
      <AvailabilityForm userId={userId} onScheduled={setMeeting} />
      {meeting && (
        <div>
          <h3>🎉 Interview Scheduled!</h3>
          <p><strong>Time:</strong> {new Date(meeting.time).toLocaleString()}</p>
          <p>
            <strong>Link:</strong>{' '}
            <a href={meeting.link} target="_blank" rel="noopener noreferrer">{meeting.link}</a>
          </p>
        </div>
      )}
    </div>
  );
}
