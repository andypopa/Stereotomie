var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

document.getElementById('console-input').focus();
var oldError = console.error;
console.error = function (a) {
    oldError(a);
    log(a, true);
};
var log = function (a, red) {
    var div = document.createElement('div');
    div.innerText = '> ' + a;
    if (red) {
        console.log('isRed', a);
        div.style.color = 'red! important';
    }
    document.getElementById('console-inner').appendChild(div);
    document.getElementById('console-input').value = '';
}

var exec = function (fnstr) {
    log(fnstr);
    eval('ctx.' + fnstr)
    if (fnstr.indexOf('lineTo') !== -1) {
        ctx.stroke();
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
c.addEventListener('click', function (evt) {
    var mousePos = getMousePos(c, evt);
    exec("lineTo("+mousePos.x+","+mousePos.y+")");
}, false);