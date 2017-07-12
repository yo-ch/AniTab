/*
Main.
*/
updateTime();
setInterval(updateTime, 1000);

if (window.File && window.FileList && window.FileReader) {
    fileDrag();
}

/*
Functions.
*/
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

function fileDrag() {
    var filedrag = document.getElementById("filedrag");

    filedrag.addEventListener("dragover", fileDragHover, false);
    filedrag.addEventListener("dragleave", fileDragHover, false);
    filedrag.addEventListener("drop", fileSelectHandler, false);
}

function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
}

function fileSelectHandler(e) {
    //Cancel hover styling.
    fileDragHover(e);

    //Select image and change wallpaper.
    var file = e.dataTransfer.files[0];
    var imagePatt = /^image\//;
    if (!imagePatt.test(file.type)) return;

    var reader = new FileReader();
    reader.onload = function(e) {
        changeBackground(e.target.result);
    }
    reader.readAsDataURL(file);
}

/*
Crossfade old and new background.
*/
function changeBackground(source) {
    var image = document.getElementById("backimage");
    var oldImage = document.getElementById("backimageold");
    oldImage.src = image.src;
    oldImage.className = "hover";
    image.src = `${source}`;
    setTimeout(function() { //Delete old background after transition.
        oldImage.src = "";
    }, 2000);
}
