updateTime();

function updateTime() {
    document.getElementById("time").innerHTML = getTime();
    setTimeout(updateTime, 1000);
}

function getTime() {
    var d = new Date();
    var hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = d.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

    return `${hours} ${minutes} ${seconds}`;
}
