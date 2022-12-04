const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }))
app.use(cookieParser())

//user database
const USERS = new Map()
USERS.set("WDS", { id: 1, username: "WDS", role: "Admin" })
USERS.set("Kyle", { id: 2, username: "Kyle", role: "User" })

//it verifies that you're actually logged in
const SESSIONS = new Map()

app.post("/login", (res, req) => {
    const user = USERS.get(req.body.username)
    if (user == null) {
        res.sendStatus(401)
        return
    }

    const sessionId = crypto.randomUUID()
    SESSIONS.set(sessionId, user)
    res
        .cookie("sessionId", sessionId, {
            secure: false, //use https?
            httpOnly: true, //very important because we don't want other form of communication since we want this cookie (for the sessionid) to be accessed with http only (cannot access this cookie with javascript for example)
            sameSite: "none", //since the clientSide and the Serverside are running on different ports, we have to set it "none"
        })
        .send(`Authed as ${req.body.username}`)
})

app.get("/adminData", (req, res) => {
    console.log(req.cookies)
    //we manipulate sessionId in cookies for authorizations
    const user = SESSIONS.get(req.cookies.sessionId)
    if (user == null) {
        res.sendStatus(401)
        return
    }

    if (user.role !== "Admin") {
        res.sendStatus(403)
        return
    }

    res.send("This is admin stuff")
})

app.listen(3000, () => {
    console.log("The server is running")
})
