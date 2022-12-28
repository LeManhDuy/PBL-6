const jwt = require("jsonwebtoken");
const Account = require("../model/Account");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res
            .status(401)
            .send("Don't have an allowance to access this domain");
    const token = authHeader.split(" ")[1];
    // console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).send("Invalid token"); //invalid token
        async function checkAccount() {
            if (await Account.find({ _id: decoded.accountId })) {
                next();
            } else {
                return res
                    .status(401)
                    .send("Don't have an allowance to access this domain!");
            }
        }
        checkAccount();
    });
};

module.exports = verifyJWT;
