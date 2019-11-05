const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// our localhost port
const port = 4001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

let loggedUser = [];
let loggedUserList = {};
let appointmentList = {};

// This is what the socket.io syntax is like, we will work this later
io.on("connection", socket => {
  console.log("===================");
  console.log("User connected");
  console.log("===================");

  const socketId = socket.id;
  let user = null;

  if (!loggedUser.includes(socket.id)) {
    loggedUser.push(socket.id);
  }

  socket.on("initUser", loginData => {
    loggedUserList[loginData.user.id] = {
      socketId: socketId,
      user: loginData.user
    };
    console.log("===========");
    console.log("===========");
    console.log("loggedUserList -- ", loggedUserList);
  });

  socket.on("startCall", data => {
    console.log(data);
    io.sockets.emit("startCall", data);
  });

  socket.on("endCall", data => {
    console.log("endcall - ", data);
    io.sockets.emit("endCall", data);
  });

  socket.on("sendMSG", data => {
    console.log(data);

    let msg = {
      username: data.user,
      content: data.msg,
      img: data.img
    };
    if (appointmentList[data.appointment]) {
      appointmentList[data.appointment].push(msg);
    } else {
      appointmentList[data.appointment] = [msg];
    }

    console.log(appointmentList[data.appointment]);

    io.sockets.emit("updateChat", {
      appointment: data.appointment,
      chatList: appointmentList[data.appointment]
    });
  });

  socket.on("getChatList", data => {
    let chatList;
    if (appointmentList[data.appointment]) {
      chatList = appointmentList[data.appointment];
    } else {
      chatList = [];
    }

    io.sockets.emit("updateChat", {
      appointment: data.appointment,
      chatList: chatList
    });
  });

  socket.on("test01", val => {
    let receiver = loggedUserList["39e48f3f7bd8d5c2372533bc24f182b7"];
    console.log("receiver -- ", receiver);

    if (receiver) {
      io.sockets.emit("testMSG", "MSG TEST");
      io.to(receiver.socketId).emit("testMSG", { data: receiver.user.email });
    }
  });
  socket.on("test02", val => {
    console.log("val -- ", val);
    // io.sockets.emit("test02", val);
  });

  socket.on("disconnect", () => {
    console.log("user --- ", user);
    if (user) {
      delete loggedUserList[user.id];
      console.log("loggedUserList --- ", loggedUserList);
    }
    console.log("===================");
    console.log("user disconnected");
    console.log("===================");
  });
});

server.listen(port, function(error) {
  if (error) throw error;
  console.log(`Listening on port ${port}`);
});
