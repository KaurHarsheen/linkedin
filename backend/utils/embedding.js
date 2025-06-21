// utils/embedding.js
let embedder = null;

async function getEmbedding(text) {
  try {
    if (!text || typeof text !== 'string') {
      throw new Error('Text must be a non-empty string');
    }

    if (!embedder) {
      const { pipeline } = await import('@xenova/transformers');
      embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }

    const output = await embedder(text, {
      pooling: 'mean',
      normalize: true,
    });

    // Normalize output to plain array
    let embedding;
    if (output?.data instanceof Float32Array) {
      embedding = Array.from(output.data);
    } else if (Array.isArray(output)) {
      embedding = output;
    } else {
      throw new Error('Unexpected embedding format');
    }

    console.log('✅ Embedding generated:', embedding.slice(0, 3), '...');
    return embedding;
  } catch (err) {
    console.error('❌ getEmbedding error:', err.message);
    return null;
  }
}

module.exports = { getEmbedding };
