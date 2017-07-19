/*
Main.
*/
document.addEventListener('DOMContentLoaded', init);
chrome.storage.onChanged.addListener(restoreSettings); //Update CSS every time settings are saved.

function init() {
    //Restore settings.
    restoreSettings();

    //Start updating time.
    updateTime();
    setInterval(updateTime, 1000);

    //Retrieve set wallpaper.
    chrome.storage.local.get('wallpaper', function(items) {
        var background = get('backimage')
        if (!items.wallpaper)
            background.src = 'background.png';
        else
            background.src = items.wallpaper;
        background.style.animation = 'fadein 2s'; //Fade in after image has loaded.
    });

    //Initialize wallpaper setter.
    if (window.File && window.FileList && window.FileReader) {
        fileDrag();
    }
}

/*
Functions.
*/
function updateTime() {
    get('time').textContent = getTime();
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

/*
Restore settings from local storage.
*/
function restoreSettings() {
    chrome.storage.local.get({
        posY: 'Top', //Top, Middle, Bottom
        posX: 'Middle', //Left, Middle, Right
        edgeDistance: 100, //px
        fontColor: '#FFFFFF',
        fontSize: 110, //px
        fontOpacity: 1,
        backgroundColor: '#000000',
        backgroundOpacity: 0.4
    }, function(items) {
        //Clock background settings.
        var background = get('clock');
        var backgroundRgb = hexToRgb(items.backgroundColor);
        background.style.backgroundColor =
            `rgba(${backgroundRgb.r}, ${backgroundRgb.g}, ${backgroundRgb.b}, ${items.backgroundOpacity})`;

        //Clock position settings.
        background.style.transform = '';
        switch (items.posY) {
            case 'Top':
                background.style.top = `${items.edgeDistance}px`;
                break;
            case 'Middle':
                background.style.top = '50%';
                background.style.transform = 'translateY(-50%)';
                break;
            case 'Bottom':
                background.style.bottom = `${items.edgeDistance}px`;
                break;
        }

        switch (items.posX) {
            case 'Left':
                background.style.left = `${items.edgeDistance}px`;
                break;
            case 'Middle':
                background.style.left = '50%';
                background.style.transform += 'translateX(-50%)';
                break;
            case 'Right':
                background.style.right = `${items.edgeDistance}px`;
                break;
        }

        //Clock font settings, and adjust margins.
        var time = get('time');
        var fontRgb = hexToRgb(items.fontColor);
        time.style.color =
            `rgba(${fontRgb.r}, ${fontRgb.g}, ${fontRgb.b}, ${items.fontOpacity})`;
        time.style.fontSize = `${items.fontSize}px`;
        time.style.margin =
            `-${items.fontSize/15}px ${items.fontSize/10}px -${items.fontSize/15}px ${items.fontSize/10}px`;
    });
}


/*
File drag handling.
*/
function fileDrag() {
    var filedrag = get('filedrag');

    filedrag.addEventListener('dragover', fileDragHover, false);
    filedrag.addEventListener('dragleave', fileDragHover, false);
    filedrag.addEventListener('drop', fileSelectHandler, false);
}

function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == 'dragover' ? 'hover' : '');
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
    var image = get('backimage');
    var oldImage = get('backimageold');
    oldImage.src = image.src;
    oldImage.className = 'replace';
    image.src = source;
    chrome.storage.local.set({ wallpaper: source });

    setTimeout(function() { //Delete old background after transition.
        oldImage.src = '';
        oldImage.className = '';
    }, 2000);
}

function get(id) {
    return document.getElementById(id);
}

/*
Converts hexcode to rgb.
*/
function hexToRgb(hex) { //Written by Tim Down.
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
