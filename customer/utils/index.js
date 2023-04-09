const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

module.exports.GenerateToken = async (params) => {
    try {
        const token = await jwt.sign(params, process.env.JWT_SECRET, {});
        return token;
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports.ComparePasswords = async (plainText, hashedPassword) => {
    try {
        const comparePassword = await bcryptjs.compare(
            plainText,
            hashedPassword
        );
        return comparePassword;
    } catch (error) {
        return error;
    }
};
