
const {verifyToken} = require("../service/auth");

function checkAuthentication(req, res, next) {
    try {
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Authorization token is required!"
            });
        }

        const token = tokenHeader.split("Bearer ")[1];
        const user = verifyToken(token);

        if (!user) {
            return res.status(401).json({
                error: "Invalid or expired token!"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Invalid or expired token!"
        });
    }
}


module.exports = {
    checkAuthentication
};
