const net = require('net')

const server = net.createServer(function (socket) {
  // 新的连接
  socket.on('data', function (params) {
    socket.write('连接')
  })

  socket.on('end', function () {
    console.log('结束')
  })

  socket.write('深入浅出NodeJS')
})

server.listen(8124,function () {
  console.log('server bound')
})

