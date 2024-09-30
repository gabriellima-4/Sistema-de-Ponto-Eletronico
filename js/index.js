const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");

btnRegistrarPonto.addEventListener("click", register);


diaSemana.textContent = getWeekDay();
dataAtual.textContent = getCurrentDate();


const dialogPonto = document.getElementById("dialog-ponto");

const dialogData = document.getElementById("dialog-data");
dialogData.textContent = getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");
dialogHora.textContent = getCurrentTime();

const selectRegisterType = document.getElementById("register-type");


function setRegisterType(){
    let lastType = localStorage.getItem("lastRegisterType");
    if(lastType == "entrada"){
        selectRegisterType.value = "intervalo";
        return;
    }
    if (lastType == "intervalo"){
        selectRegisterType.value = "volta-intervalo";
        return;
    }
    if (lastType == "volta-intervalo"){
        selectRegisterType.value = "saida";
        return;
    }
    if (lastType == "saida"){
        selectRegisterType.value = "entrada";
        return;
    }


}


const btnDialogRegister = document.getElementById("btn-dialog-register");
btnDialogRegister.addEventListener("click", () => {


    let register = getObjectRegister(selectRegisterType.value);
    saveRegisterLocalStorage(register);
    
    localStorage.setItem("lastRegisterType", selectRegisterType.value);


    const alertaSucesso = document.getElementById("alerta-ponto-registrado")
    alertaSucesso.classList.remove("hidden");
    alertaSucesso.classList.add("show");

    setTimeout( () => {
        alertaSucesso.classList.remove("show");
        alertaSucesso.classList.add("hidden");
    }, 5000);

    // TO-DO:
    // Informar o usuário do status do registro do ponto
    // Sucesso ou falha
    // Pode ser apresentado na tela principal no cabeçalho
    // Efeito de transição e aparecer por 3 a 5s depois sumir
    dialogPonto.close();
});


// const btnDialogEntrada = document.getElementById("btn-dialog-entrada");
// btnDialogEntrada.addEventListener("click", () => {
//     saveRegisterLocalStorage(JSON.stringify(getObjectRegister("entrada")));

// })

// const btnDialogSaida = document.getElementById("btn-dialog-saida");
// btnDialogSaida.addEventListener("click", () => {
//     saveRegisterLocalStorage(JSON.stringify(getObjectRegister("saida")));
// });

function getObjectRegister (registertype) {
    ponto = {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": getUserLocation(),
        "id": 1,
        "type": registertype
    }
    return ponto
}


const btnDialogFechar = document.getElementById("dialog-fechar")
btnDialogFechar.addEventListener("click", () =>{
    dialogPonto.close();
})

let registersLocalStorage = getRegisterLocalStorage("register");

function saveRegisterLocalStorage(register) {

    registersLocalStorage.push(register);

    localStorage.setItem("register", JSON.stringify(registersLocalStorage));
}

function getRegisterLocalStorage(key) {

    let registers = localStorage.getItem(key);

    if(!registers) {
        return [];
    }

    return JSON.parse(registers);
}

// O que é uma função assíncrona?
// O que é um objeto Javascript?
// O que é uma instância?
// O que é PROTOTYPE?

function getUserLocation() {
   
    navigator.geolocation.getCurrentPosition ((position) => {
        let userLocation = {
            "lat": position.coords.latitude,
            "long": position.coords.longitude
        }
        return userLocation
    })

};


function register() {


    
    dialogPonto.showModal();
}

function updateContentHour() {
    horaAtual.textContent = getCurrentTime();
}

//Horário na forma hr:min:seg
function getCurrentTime() {
    const date = new Date();
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");

    return hours + ":" + minutes + ":" + seconds
}

//Data na forma mm/dd/aaaa
function getCurrentDate() {
    const date = new Date();
    if ((date.getMonth() + 1) < 10) {
        return "0" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    }

    if (date.getDate < 10) {
        return (date.getMonth() + 1) + "/" + "0" + date.getDate() + "/" + date.getFullYear()
    }

}

// Dia da semana
function getWeekDay() {
    const date = new Date();
    const day = date.getDay();
    const daysOfWeek = ["Domingo-Feira", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
    
    return daysOfWeek[day]
}


updateContentHour();
setInterval(updateContentHour, 1000);


console.log(getWeekDay());
console.log(getCurrentTime());
console.log(getCurrentDate());