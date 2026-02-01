module.exports = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  
console.log("Key from Header:", apiKey);
  console.log("Key from .env:", process.env.API_KEY);
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized: Invalid API key" });
  }

  next();
};
