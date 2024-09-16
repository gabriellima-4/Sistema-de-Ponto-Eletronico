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


const btnDialogEntrada = document.getElementById("btn-dialog-entrada");
btnDialogEntrada.addEventListener("click", () => {
    saveRegisterLocalStorage(JSON.stringify(getObjectRegister("entrada")));
})

const btnDialogSaida = document.getElementById("btn-dialog-saida");
btnDialogSaida.addEventListener("click", () => {
    saveRegisterLocalStorage(JSON.stringify(getObjectRegister("saida")));
});

function getObjectRegister (registertype) {
    ponto = {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": getUserLocation(),
        "id": 1,
        "type": registerType
    }
    return ponto
}


const btnDialogFechar = document.getElementById("dialog-fechar")
btnDialogFechar.addEventListener("click", () =>{
    dialogPonto.close();
})

function saveRegisterLocalStorage(register) {
    localStorage.setItem("register", register);
}

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