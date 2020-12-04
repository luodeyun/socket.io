var app = require('express')();

var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
  
  console.log('一个用户已连接');
  socket.on('join', (name) => {
    var roomid = 'room_1'
    socket.join(roomid);
    console.log(socket.rooms ,socket.id);
    io.emit('system', `'hello,${[...socket.rooms][0].slice(-1)}'加入了房间`)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', data => {
    console.log(data);
    io.emit('message', data)
  })
});
http.listen(3000, () => {
  console.log('正在*：3000');
});