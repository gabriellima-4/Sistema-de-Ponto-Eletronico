const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");

function updateContentHour() {
    dataAtual.textContent = getCurrentDate();
    horaAtual.textContent = getCurrentTime();
}

//Horário na forma hh:mm:ss
function getCurrentTime() {
    const date = new Date();
    // if (date.getHours < 10) {
    //     return "0" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    // }

    // if (date.getMinutes < 10) {
    //     return date.getHours() + ":" + "0" + date.getMinutes() + ":" + date.getSeconds()
    // }

    // if (date.getSeconds < 10) {
    //     return date.getHours() + ":" + date.getMinutes() + ":" + "0" + date.getSeconds()
    // }
    
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
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
    //return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()

}
updateContentHour();
setInterval(updateContentHour, 1000);

console.log(getCurrentTime());
console.log(getCurrentDate());