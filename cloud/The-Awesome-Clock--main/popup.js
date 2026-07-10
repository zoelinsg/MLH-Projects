function update(){
const now = new Date();

document.getElementById("time").textContent =
now.toLocaleTimeString();

document.getElementById("date").textContent =
now.toDateString();
}

setInterval(update,1000);
update();