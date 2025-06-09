const ResourceCard = ({ title, summary }) => (
  <div
    style={{
      background: '#fff',
      padding: '16px',
      borderRadius: '10px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      width: 'calc(50% - 16px)',
      minWidth: '240px'
    }}
  >
    <h5 style={{ marginBottom: '10px', color: '#0077b6' }}>{title}</h5>
    <p style={{ color: '#555' }}>{summary}</p>
  </div>
);

export default ResourceCard;
