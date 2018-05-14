var sum = 0;
var portList = new Array();

onconnect = function (event) {
    var port = event.ports[0];
    portList.push(port);

    port.postMessage({curSum: sum});

    port.addEventListener('message', function (e) {
        if (e.data.action === 'sum') {
            sum = sum + e.data.num;
            portList.forEach(function (port) {
                port.postMessage({curSum: sum});
            });
        } else if (e.data.action === 'close') {
            for (var i = 0; i < portList.length; i++) {
                if (portList[i] === port) {
                    portList.splice(i, 1);
                    port.close();
                }
            }
        }
    });

    port.start();

};