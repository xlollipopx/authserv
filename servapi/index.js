const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const jwt = require("jsonwebtoken");
const users = [
    {
        id: "1",
        username: "john",
        password: "qwerty"
    },
    {
        id: "2",
        username: "bill",
        password: "werty"
    }

];

app.get("/api/login", (req, res) => {
    // const { username, password } = req.body;
    res.json("aaaaaaaaaaaaaaaaaaaaaaaa");
});

app.listen(5000, () => console.log("Backend is running!"));





