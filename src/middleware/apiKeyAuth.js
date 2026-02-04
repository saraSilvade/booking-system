
const apiKeyAuth = (req, res, next) => {
    const userKey = req.header('x-api-key');
    const actualKey = process.env.API_KEY;
    if (userKey && userKey === actualKey) {
        next();
    } else {
        res.status(403).json({ message: "Invalid password" });
    }
     next();
};
module.exports = apiKeyAuth;