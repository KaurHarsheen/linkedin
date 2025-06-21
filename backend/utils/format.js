// backend/utils/format.js
export function formatProfileForEmbedding(profile) {
  return `
    Name: ${profile.name}
    Title: ${profile.title}
    Location: ${profile.location}
    Organizations: ${profile.organizations.map(o => o.name).join(', ')}
    Mutual Connections: ${profile.mutualConnections.map(m => m.name).join(', ')}
  `;
}
