
const apiKeyAuth = (req, res, next) => {
    const userKey = req.header('x-api-key');
    const actualKey = process.env.API_KEY;
    if (userKey && userKey === actualKey) {
       return  next();
    } else {
       return res.status(403).json({ message: "Invalid password" });
    }
     
};
module.exports = apiKeyAuth;
