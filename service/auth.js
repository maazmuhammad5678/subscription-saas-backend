const jwt=require("jsonwebtoken");

function generateToken(userId) {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
}

function verifyToken(token){
      return jwt.verify(
            token,
            process.env.JWT_SECRET
        );
}

module.exports={
    generateToken,
    verifyToken
};