const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

async function getEmbeddings(texts) {
  try {
    console.log("texts input to cohere.embed ➜", texts);

    const response = await cohere.embed({
      texts,
      model: 'embed-english-v3.0',
      inputType: 'search_document',
      embeddingTypes: ['float']
    });

    console.log("Embedding response received");
    return response.embeddings.float;
  } catch (error) {
    console.error("❌ Error in getEmbeddings ➜", error.response?.body || error.message || error);
    throw new Error("Embedding failed");
  }
}




async function getSummary(currentUser, matches) {
  try {
    const prompt = `User: ${currentUser.name}, Skills: ${currentUser.skills.join(', ')}, Experience: ${currentUser.experience}
Top Matches:
${matches.map(u => `${u.name} - Skills: ${u.skills.join(', ')}, Experience: ${u.experience}`).join('\n')}
Generate a brief AI summary comparing the user with top matches.`;

    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [{ role: 'user', content: prompt }],
    });

    console.log("Chat response received");
    return response.text;
  } catch (error) {
    console.error("❌ Error in getSummary ➜", error.response?.body || error.message || error);
    throw new Error("Summary generation failed");
  }
}

module.exports = { getEmbeddings, getSummary };
