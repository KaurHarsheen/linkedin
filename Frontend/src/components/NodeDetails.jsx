import React, { useEffect, useState } from 'react';
import { fetchResourcesFromGemini } from './GeminiService';
import ResourceCard from './ResourceCard';

const NodeDetails = ({ selectedNode, toggleComplete, setSelectedNode }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      if (!selectedNode) return;
      setLoading(true);
      try {
        const res = await fetchResourcesFromGemini(selectedNode.title, selectedNode.description);
        // Ensure res is always an array to avoid runtime errors
        setResources(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error('Error fetching Gemini links:', err);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [selectedNode]);

  if (!selectedNode) return null;

  return (
    <div
      style={{
        marginTop: '20px',
        padding: '28px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        boxShadow: '0 12px 48px rgba(0,0,0,0.1)',
        border: `3px solid ${selectedNode.color}40`,
        position: 'relative'
      }}
    >
      {/* Node content */}
      <div
        style={{
          position: 'absolute',
          top: '-16px',
          left: '28px',
          background: `linear-gradient(135deg, ${selectedNode.color}, ${selectedNode.color}dd)`,
          color: 'white',
          padding: '8px 20px',
          borderRadius: '25px',
          fontSize: '13px',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}
      >
        Step {selectedNode.order}
      </div>

      <h3 style={{ marginTop: '12px', fontSize: '26px' }}>{selectedNode.title}</h3>
      <p style={{ color: '#666', marginTop: '16px' }}>{selectedNode.description}</p>

      <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <button
          onClick={() => toggleComplete(selectedNode.id)}
          style={{
            background: selectedNode.completed
              ? 'linear-gradient(135deg, #4CAF50, #45a049)'
              : `linear-gradient(135deg, ${selectedNode.color}, ${selectedNode.color}dd)`,
            color: 'white',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '15px'
          }}
        >
          {selectedNode.completed ? '✓ Completed' : 'Mark Complete'}
        </button>

        <button
          onClick={() => setSelectedNode(null)}
          style={{
            background: 'transparent',
            color: '#666',
            border: '2px solid #dee2e6',
            padding: '14px 28px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '15px'
          }}
        >
          Close
        </button>
      </div>

      {/* Resource Cards */}
      <div style={{ marginTop: '40px' }}>
        <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#444' }}>Recommended Resources</h4>
        {loading ? (
          <p style={{ color: '#999' }}>Fetching resources...</p>
        ) : resources.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {resources.map((res, index) => (
 <ResourceCard
  key={index}
  title={res.title}
  summary={res.summary}
/>

))}

          </div>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>No resources found.</p>
        )}
      </div>
    </div>
  );
};

export default NodeDetails;
