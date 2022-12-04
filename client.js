/*UI for Auth (authentication and authorization), important things to remember here are:
 * - ONLY serverside has the real ability to Auth, even if some functionnalities UI appear on the client side (e.g: admin button shows in a simple user session)
 * - functions to communicate to the server are all requests (e.g: fetch())
 * - one of the most important propertie in a fetch request is to put "credentials: "include", it includes the cookies which contains the session id
*/
const loginAsWdsBtn = document.getElementById("login-wds")
const loginAsKyleBtn = document.getElementById("login-kyle")
const loginAsJimBtn = document.getElementById("login-jim")
const adminBtn = document.getElementById("admin")
const responsesDiv = document.getElementById("responses")

loginAsWdsBtn.addEventListener("click", () => {
    login("WDS")
})

loginAsKyleBtn.addEventListener("click", () => {
    login("Kyle")
})

loginAsJimBtn.addEventListener("click", () => {
    login("Jin")
})

//try to access by permission (authorization) to a fucntionnality (fetch here)
adminBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/adminData", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.text())
        .then(data => (responsesDiv.textContent = data))
})

function login(username) {
    fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    })
        .then(res => res.text())
        .then(data => (responsesDiv.textContent = data))
}
