updateTime();
setInterval(updateTime, 1000);

function updateTime() {
    document.getElementById("time").innerHTML = getTime();
}

function getTime() {
    var d = new Date();
    var hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    hours = hours == 0 ? 12 : hours;
    hours = hours < 10 ? '0' + hours : hours;

    var minutes = d.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

    return `${hours} ${minutes} ${seconds}`;
}
