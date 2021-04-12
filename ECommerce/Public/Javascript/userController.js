const currentURL = 'http://localhost:5000/'

localStorage.setItem('token', '')
let users = []

const getData = () => {
    fetch('/users', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            for (item in data) {
                users.push(data[item])
            }
        })
}

getData()

async function getToken() {
    return localStorage.getItem('token')
}

async function gotToSignedup() {
    getToken()
        .then(result =>
            fetch('/homesignin', {
                method: 'GET',
                headers: {
                    'Authorization': result,
                    'Content-Type': 'application/json'
                }
            }).then(result => result.json())
                .then(data => alert(data))
        )
}

//sends the user login information to the server and recives the access token to the signin page
async function signInUser() {
    let tokenStore;
    let userSignIn = {
        username: $('#UserName').val(),
        password: $('#Password').val(),
        email: $('#UserName').val()
    }
    localStorage.setItem('UserName', $('#UserName').val())
    let body = JSON.stringify(userSignIn)
    fetch('/', {
        method: 'POST',
        headers: {
            'Authorization': 'test',
            'Content-Type': 'application/json'
        },
        body: body
    })
        .then(response => response.json())
        .then( data => {
            localStorage.setItem('token', data),
            window.location.href = "http://localhost:5000/items"
        })
}

const moveToSignUp = () => {
    window.location.href = "http://localhost:5000/signup"
}

async function signupUser() {
    let user = {
        username: $('#UserName').val(),
        password: $('#Password').val(),
        email: $('#Email').val()
    }
    let body = JSON.stringify(user)
    for (item in users) {
        if (users[item].username == user.username) {
            alert('that username has already been taken')
            return
        } else if (users[item].email == user.email) {
            alert('that email has already been taken')
            return
        }
    }
    try {
        await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
    } catch (error) {
        console.log(`there was an error signing up the user: ${error}`)
    }
    console.log(body)
    window.location.href = "http://localhost:5000/"
}