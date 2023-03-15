const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors/Unauthenticated");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    var authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(
            new Unauthenticated("Auth token is required for this route")
        );
    }

    const token = authHeader.split(" ")[1].trim();

    try {
        //verify you got the correct token, it returns the obj in your signed token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decode);

        //if verification is successfully, set up a property on the request object, call it user, and pass it to the next middleware which it the next route after logging in

        //req.user can be accessed in any route that is authenticated, it just prepends itself to the req as an obj, like add element to an object
        req.user = {
            userId: decode.userId,
            name: decode.name,
        };
        // console.log(req.user);

        next();
    } catch (err) {
        return next(new Unauthenticated(err));
    }
};

//export it to all the routes you want to authenticate
module.exports = { authMiddleware };
