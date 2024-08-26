const date = new Date();

function getCurrentTime() {
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

function getCurrentDate() {
    const date = new Date();
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

// console.log(date.getDate());
// console.log(date.getMonth() + 1);
// console.log(date.getFullYear());

console.log(getCurrentTime());
console.log(getCurrentDate())