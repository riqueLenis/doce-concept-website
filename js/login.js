var user = document.getElementById("username");
var pass =  document.getElementById("password");
var btn = document.querySelector(".login-button");

function checkvalidity(){
        if(user.value == "" || pass.value ==""){
            alert("Por favor, informe Usuário e Senha")
        }
    
}

btn.addEventListener("click", checkvalidity)