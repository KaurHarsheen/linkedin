// Basic Markdown-style link extractor
module.exports = function extractLinks(text) {
  const regex = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;
  const links = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    links.push({ title: match[1], url: match[2] });
  }

  return links;
};
