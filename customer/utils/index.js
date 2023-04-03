const jwt = require("jsonwebtoken");
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
