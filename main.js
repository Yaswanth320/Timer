const hours = document.querySelector(".hr");
const minutes = document.querySelector(".min");
const seconds = document.querySelector(".sec");
const progressIndicator = document.querySelector(".progressIndicator");
const start_pause_btn = document.querySelector(".btn3");
const reset_btn = document.querySelector(".btn2");

let interval = null;
let remainingSeconds = 1800;
const totalSeconds = remainingSeconds;
updateInterfaceTime();

start_pause_btn.addEventListener("click", () => {
    if(interval === null){
        start();
    }else{
        stop();
    }
});

reset_btn.addEventListener("click", () => {
    const inputMinutes = prompt("Enter number of minutes:");

    stop();
    remainingSeconds = inputMinutes * 60;
    totalSeconds = remainingSeconds;
});

function updateInterfaceTime(){
    const hrs = Math.floor(remainingSeconds / 3600);
    const min = Math.floor(remainingSeconds / 60) - (hrs * 60);
    const sec = remainingSeconds % 60;

    hours.textContent = hrs.toString().padStart(2, "0");
    minutes.textContent = min.toString().padStart(2, "0");
    seconds.textContent = sec.toString().padStart(2, "0");
}

function updateInterfaceControls(){
    if(interval === null){
        start_pause_btn.textContent = "start";
    }else{
        start_pause_btn.textContent = "pause";
    }
}

function start(){

    if (remainingSeconds === 0) return;

    interval = setInterval(() => {
        const angle = (remainingSeconds/totalSeconds)*360;
        progressIndicator.style.backgroundImage = `conic-gradient(red ${angle}deg, #d3d3d3 0deg 360deg)`;

        remainingSeconds--;
        updateInterfaceTime();

        if(remainingSeconds === 0){
            stop();
        }
    }, 1000);

    updateInterfaceControls();
}

function stop(){
    clearInterval(interval);
    interval = null;
    updateInterfaceControls();
}

