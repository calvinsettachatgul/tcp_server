var net = require('net');

let all_sockets = [];

var server = net.createServer(function(socket){
    socket.on('data', function(data) {
        socket.write('broadcasted to these servers')
        socket.write(all_sockets.length.toString())
        all_sockets.forEach(single_socket => {
            if(socket !== single_socket){
                single_socket.write(data)
            }
        })
        }
    )
    socket.on('close', function(){
        let indexToRemove = all_sockets.indexOf(socket);
        all_sockets.splice(indexToRemove, 1);
    });
    all_sockets.push(socket);
});

server.listen(1337, '127.0.0.1');