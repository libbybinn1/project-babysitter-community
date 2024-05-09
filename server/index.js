const express = require('express');
const app = express();
const port = 8080;
const user = require('./routes/userRouter');
const babysitters = require('./routes/babySitterRouter');
const manager = require('./routes/managerRouter')
var bodyParser = require('body-parser');

var path = require('path-posix')
path.resolve(__dirname, 'foo')

app.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,         
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/babySitter', babysitters);
app.use('/api/user', user);
app.use('/api/manager', manager);


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});