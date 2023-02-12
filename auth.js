Error.stackTraceLimit = Infinity;
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secret_key = "secretkey";

app.get("/", (req, res) => {
    res.json({
        message: "sample"
    })
    if (console.error());
})

app.post("/login", (req, res) => {
    const user = {
        id: 1,
        name: "test",
        email: "my@gmail.com"
    }
    jwt.sign({ user }, secret_key, { expiresIn: '3000s' }, (err, token) => {
        res.json({
            token
        })
        if (err) throw err;
    })
})

app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, secret_key, (err, authData) => {
        if (err) {
            console.log(err);
            res.send({
                result: "Invalid Token"
            })
        }
        else {
            res.json({
                message: "Verified",
                authData
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerheader = req.headers['test'];
    if (typeof bearerheader !== 'undefined') {
        const bearer = bearerheader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
    else if(Error){
        res.send({
            result: "Not Valid"
        })
        console.log(Error)
    }
}

app.listen(1500, () => {
    console.log("APP IS RUNNING ON PORT");
});