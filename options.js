function saveOptions() {
    var optionsY = get('posY').options;
    var optionsX = get('posX').options;

    chrome.storage.local.set({
        posY: optionsY[optionsY.selectedIndex].text,
        posX: optionsX[optionsX.selectedIndex].text,
        edgeDistance: get('edgeDistance').value,
        fontColor: get('fontColor').value,
        fontSize: get('fontSize').value,
        fontOpacity: get('fontOpacity').value,
        backgroundColor: get('backgroundColor').value,
        backgroundOpacity: get('backgroundOpacity').value
    }, function() {
        var status = document.getElementById('status');
        status.style.opacity = 1;

        setTimeout(function() {
            status.style.opacity = 0;
        }, 3000)
    })
}

function restoreOptions() {
    let arrPos = { //Convert position to array index. (Dictionary)
        'Top': 0,
        'Left': 0,
        'Middle': 1,
        'Bottom': 2,
        'Right': 2
    }
    chrome.storage.local.get({
        posY: 'Top', //top, middle, bottom
        posX: 'Middle', //left, middle, right
        edgeDistance: 100, //px
        fontColor: '#FFFFFF',
        fontSize: 110, //px
        fontOpacity: 1,
        backgroundColor: '#000000',
        backgroundOpacity: 0.4
    }, function(items) {
        get('posY').options[arrPos[items.posY]].selected = true;
        get('posX').options[arrPos[items.posX]].selected = true;
        get('edgeDistance').value = items.edgeDistance;
        get('fontColor').value = items.fontColor;
        get('fontSize').value = items.fontSize;
        get('fontOpacity').value = items.fontOpacity;
        get('backgroundColor').value = items.backgroundColor;
        get('backgroundOpacity').value = items.backgroundOpacity;
    });
}

function get(id) {
    return document.getElementById(id);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
