users = {}, socks = {};
var avatar_url = "http://192.168.4.128:9090/Public/avatars/";
var avatar_404 = ['mm', 'identicon', 'monsterid', 'wavatar', 'retro'];
function Uid() { this.id = ++Uid.lastid; }
Uid.lastid = 0;
//////////////////////////////////////////////////////////////////////////
//配合express使用，http服务和socket共用端口
// var port = process.env.PORT || 3000;   //此端口号要与客户端一致config.js
// var express = require('express');
// var app = express();
// app.use(express.static(__dirname + '/'));

// var server = require('http').Server(app);

// server.listen(port, function () {
//   var addr = server.address();
//   console.log('Linkup listening on ' + addr.address + addr.port);
// });
// var io = require('socket.io')(server);
/////////////////////////////////////////////////////////////////////////
//单独使用，已有网站仅使用socket进行信息传递
var port = process.env.PORT || 3000;  //此端口号要与客户端一致config.js
var io = require('socket.io')(port);

/////////////////////////////////////////////////////////////////////////
///
io.on('connection', function (socket) {


    // Event received by new user
  socket.on('join', function (recv, fn) {

    if (!recv.user) {
      socket.emit('custom_error', { message: 'User not found or invalid' });
      return;
    }

    // The user is already logged
    if (users[recv.user]) {
      socket.emit('custom_error', { message: 'The user '+ recv.user +' is already logged' });
      return;
    }

    // If there is users online, send the list of them
    if (Object.keys(users).length > 0)
      socket.emit('chat', JSON.stringify( { 'action': 'usrlist', 'user': users } ));

    // Set new uid
    uid = new Uid();
    socket.user = recv.user;
    // my_avatar = get_avatar_url(socket.user);
    my_avatar = get_avatar_url(Uid.lastid);

    // Add the new data user
    users[socket.user] = {'uid': Uid.lastid, 'user': socket.user, 'name': recv.name, 'status': 'online', 'avatar': my_avatar}
    socks[socket.user] = {'socket': socket}

    // Send to me my own data to get my avatar for example, usefull in future for db things
    //socket.emit('chat', JSON.stringify( { 'action': 'update_settings', 'data': users[socket.user] } ));

    // Send new user is connected to everyone
    socket.broadcast.emit('chat', JSON.stringify( {'action': 'newuser', 'user': users[socket.user]} ));

    if (typeof fn !== 'undefined')
      fn(JSON.stringify( {'login': 'successful', 'my_settings': users[socket.user]} ));
  });

  // Event received when user want change his status
  socket.on('user_status', function (recv) {
    if (users[socket.user]) {
      users[socket.user].status = recv.status;
      socket.broadcast.emit('chat', JSON.stringify( {'action': 'user_status', 'user': users[socket.user]} ));
    }
  });

  // Event received when user is typing
  socket.on('user_typing', function (recv) {
    var id = socks[recv.user].socket.id;
    io.to(id).emit('chat', JSON.stringify( {'action': 'user_typing', 'data': users[socket.user]} ));
  });

  // Event received when user send message to another
  socket.on('message', function (recv, fn) {
    var d = new Date();
    var id = socks[recv.user].socket.id;
    var msg = {'msg': recv.msg, 'user': users[socket.user]};
    if (typeof fn !== 'undefined')
      fn(JSON.stringify( {'ack': 'true', 'date': d} ));
    io.to(id).emit('chat', JSON.stringify( {'action': 'message', 'data': msg, 'date': d} ));
  });

  // Event received when user has disconnected
  socket.on('disconnect', function () {
    if (users[socket.user]) {
      socket.broadcast.emit('chat', JSON.stringify( {'action': 'disconnect', 'user': users[socket.user]} ));
      delete users[socket.user];
      delete socks[socket.user];
    }
  });

  //接收用户发来的图片
  socket.on('img', function (recv, fn) {
    var d = new Date();
    var id = socks[recv.user].socket.id;
    var msg = {'msg': recv.msg, 'user': users[socket.user]};
    if (typeof fn !== 'undefined')
      fn(JSON.stringify( {'ack': 'true', 'date': d} ));
    io.to(id).emit('chat', JSON.stringify( {'action': 'img', 'data': msg, 'date': d} ));
  });
   //接收用户发来的文件
  socket.on('file', function (recv, fn) {
    var d = new Date();
    var id = socks[recv.user].socket.id;
    var msg = {'msg': recv.msg,'filename': recv.filename, 'filetype': recv.filetype, 'user': users[socket.user]};
    if (typeof fn !== 'undefined')
      fn(JSON.stringify( {'ack': 'true', 'date': d} ));
    //这里比较特别的是发送文件用二进制的话，不能通过json转换，否则会不行。这里就直接传object.
    //因此客户端socket.on chat 要对传过去的数据进行判断。
    io.to(id).emit('chat', {'action': 'file', 'data': msg, 'date': d});
  });

});

function get_avatar_url(lastid) {
  if(lastid<10){
    lastid="a-0"+lastid;
  }else{
    lastid="a-"+lastid;
  }
  return avatar_url+lastid+".png";
}

function random(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }


//升级作了以下改变
//io.sockets.socket(id).emit 改为 io.to(id).emit
//io = require('socket.io').listen(server) 改为 var io = require('socket.io')(server);