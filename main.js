var myWorker = new SharedWorker('worker.js');
myWorker.port.start();

document.getElementById("submit").addEventListener('click', function () {
    var num = parseInt(document.getElementById("number").value);
    myWorker.port.postMessage({action: 'sum', num: num});
});

myWorker.port.addEventListener('message', function (e) {
    document.getElementById("sum").innerText = e.data.curSum;
});

window.onbeforeunload = function () {
    myWorker.port.postMessage({action: 'close'});
};