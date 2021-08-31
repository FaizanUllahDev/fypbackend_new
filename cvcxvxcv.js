const io = require('socket.io')(9444);

io.on('connection' , socket => {
    socket.emit('msg' , 'hello');
    socket.on('msg' , message => {
        console.log(message);
        socket.broadcast.emit('msg' , message);
    });
});
