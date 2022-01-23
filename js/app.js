const loginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector("#loginForm input");
const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginsubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;

    localStorage.setItem(USERNAME_KEY,username);
    paintGreetings(username);
}    

loginForm.addEventListener("submit", onLoginsubmit);

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}, Have A Good Day 😉`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
    
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginsubmit);
} 
else {
    paintGreetings(savedUsername);
}