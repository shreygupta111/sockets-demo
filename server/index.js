
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    let str = '';
    if(socket.request.headers["sec-ch-ua"].includes("Google Chrome")){
        socket.join("Chrome");
        str="Chrome";
    }
    else{
        socket.join("Other");
        str="Other";
    }
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.to(str).emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );


// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => { 

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });


 
