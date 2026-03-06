const loginBtn = document.getElementById('login-btn');
const userInput = document.getElementById('user-input');
const pinInput = document.getElementById('pin-input');


loginBtn.addEventListener('click', function (){
    const user = userInput.value.trim().toLowerCase();
    const pin = pinInput.value.trim().toLowerCase();

    if(user==='admin' && pin==='admin123'){
        alert('Login Successfull')
        window.location.replace('./home.html')
    }else{
        alert('Login Failed')
    }
})