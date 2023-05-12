const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("config")
const User = require('./model/User')
const Note = require('./model/Note');
const UserShareMap = require("./model/UserShareMap");

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(cookieParser());


const key = "abcek";

app.post("/api/addLicence", async (req, res) => {
    try {
        const { token } = req.body;
        let decoded = null;
        try {
            decoded = jwt.verify(token, config.get("secretKey"));
        } catch (err) {
            return res.status(404).send({ message: "Unauthorized" });
        }

        const user = await User.findById(decoded.id);
        if (user == null) {
            return res.status(400).send({
                message: 'Activation error!'
            });
        }

        user.hasLicence = true;
        user.save();
        return res.status(200).send({
            message: 'Success!'
        });
    } catch (err) {
        return res.status(400).send({
            message: 'Activation error!'
        });
    }

});


app.post("/api/activateLicence", async (req, res) => {
    try {
        const { username, password, hwid } = req.body;

        const user = await User.findOne({ email: username });
        if (user == null) {
            return res.status(400).send({
                message: 'Activation error!'
            });
        }

        if (user.password === password && user.hasLicence == true) {
            user.hwid = hwid;
            const response = {
                username: username,
                licencekey: key
            }
            user.save();
            return res.json(response);
        }

        return res.status(400).send({
            message: 'Activation error!'
        });
    } catch (err) {
        return res.status(400).send({
            message: 'Activation error!'
        });
    }

});

app.post("/api/verifyAccountId", async (req, res) => {
    try {
        const { hwid } = req.body;
        const user = await User.findOne({ hwid: hwid });

        if (user.hasLicence == true && hwid === user.hwid) {
            return res.status(200).send({
                message: 'Success!'
            });
        }
        return res.status(400).send({
            message: 'Validation error!'
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: 'Validation error!'
        });
    }

});


app.post('/api/registration',
    [
        check('email', 'invalid email').isEmail(),
        check('password', 'Incorrect password format').isLength({ min: 5, max: 20 }),
    ],

    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Failure" })
            }

            const { email, password } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: "User already exists!" })
            }

            const user = new User({ email, password: password, hasLicence: false });

            await user.save();
            return res.json({ message: "Registration succeed!" })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })



app.post('/api/login',
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found" })
            }

            if (password != user.password) {
                return res.status(400).json({ message: "Invalid email or password" })
            }

            const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" })
            return res.json({
                token,
                id: user.id,
                email: user.email,
                hasLicence: user.hasLicence

            })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


app.post("/api/userInfo", async (req, res) => {
    try {
        const { hwid } = req.body;
        const user = await User.findOne({ hwid: hwid });
        const notes = await getNotesForUser(user.id);

        return res.json({
            id: user.id,
            email: user.email,
            licence: user.hasLicence,
            notes: notes
        })
    } catch (err) {
        return res.status(400).send({
            message: 'Error occured!'
        });
    }

});

app.post("/api/userSiteInfo", async (req, res) => {
    try {
        const { token } = req.body;
        let decoded = null;
        try {
            decoded = jwt.verify(token, config.get("secretKey"));
        } catch (err) {
            return res.status(403).send({ message: "Unauthorized" });
        }
        const user = await User.findById(decoded.id);

        return res.json({
            id: user.id,
            email: user.email,
            username: user.email,
            licence: user.hasLicence
        })
    } catch (err) {
        return res.status(400).send({
            message: 'Error occured!'
        });
    }

});

app.post("/api/shareNotes", async (req, res) => {
    try {
        const { hwid, inviteUsername } = req.body;
        const user = await User.findOne({ hwid: hwid });
        const userFriend = await User.findOne({ email: inviteUsername });
        if (user.id === userFriend.id) {
            return res.status(400).send({
                message: 'Self sharing error!'
            });
        }
        const userShareMap = new UserShareMap({ userOne: user, userTwo: userFriend });
        await userShareMap.save();
        const allNotes = await getNotesForUser(user.id);

        return res.json({
            id: user.id,
            email: user.email,
            notes: allNotes
        })

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: 'Error occured!'
        });
    }

});

async function getNotesForUser(id) {
    const user = await User.findById(id);
    const userShareMap1 = await UserShareMap.find({ userOne: user });
    const userShareMap2 = await UserShareMap.find({ userTwo: user });
    const users = [];
    users.push(...(userShareMap1.concat(userShareMap2)).map(um => um.userOne.id.toString('hex') == id ? um.userTwo.id.toString('hex') : um.userOne.id.toString('hex')));
    users.push(id);
    console.log(users);
    let res = [];
    for (let i = 0; i < users.length; i++) {
        let usr = await User.findById(users[i]);
        let notes = await Note.find({ user: usr });
        res.push(...notes);
    }
    return res;
}

app.post("/api/addNote", async (req, res) => {
    try {
        const { hwid, text, date } = req.body;

        const user = await User.findOne({ hwid: hwid });

        await Note.create({
            text: text,
            dateCreated: date,
            ownerName: user.email,
            user: user
        })

        return res.status(200).send({
            message: 'Success!'
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: 'Some error occured!'
        });
    }

});


app.post("/api/downloadApp", async (req, res) => {
    try {
        res.download("./app.zip")

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: 'Some error occured!'
        });
    }

});




const PORT = config.get("serverPort");

const start = async () => {

    try {

        await mongoose.connect(config.get("database").get("url"));
        app.listen(PORT, () => { console.log("Server  started on port ", PORT) })

    } catch (e) {
        console.log(e);
    }
}

start()




