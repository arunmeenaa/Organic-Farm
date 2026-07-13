const adviceCache = new Map();

function getCachedAdvice(key) {
  const cached = adviceCache.get(key);

  if (!cached) return null;

  
  const oneHour = 60 * 60 * 1000;

  if (Date.now() - cached.timestamp > oneHour) {
    adviceCache.delete(key);
    return null;
  }

  return cached.data;
}

function setCachedAdvice(key, data) {
  adviceCache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

module.exports = {
  getCachedAdvice,
  setCachedAdvice,
};