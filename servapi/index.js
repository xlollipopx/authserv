const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const jwt = require("jsonwebtoken");
const key = "iownnvklsknlisnlsvf0";
let users = [
    {
        id: "1",
        username: "TestUser1",
        password: "qwerty20",
        hwid: "",
        hasLicence: true
    },
    {
        id: "2",
        username: "bill",
        password: "werty",
        hwid: "",
        hasLicence: false
    }

];

app.post("/api/activateLicence", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { username, password, hwid } = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            if (users[i].password === password && users[i].hasLicence == true) {
                users[i].hwid = hwid;
                const response = {
                    username: username,
                    licencekey: key
                }
                const jsonContent = JSON.stringify(response);
                res.send(jsonContent);
            }
        }
    }
    return res.status(400).send({
        message: 'Activation error!'
    });
});

app.get("/api/verifyAccountId", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { username, hwid } = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            if (users[i].hasLicence == true && hwid === users[i].hwid) {
                return res.status(200).send({
                    message: 'Success!'
                });
            }
        }
    }
    return res.status(400).send({
        message: 'Validation error!'
    });
});



app.listen(5000, () => console.log("Backend is running!"));





