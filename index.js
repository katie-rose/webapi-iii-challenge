const express = require("express");

const server = express();
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const serverRouter = require("./server");

server.use(express.json());

server.use("/", serverRouter);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);


server.listen(8000, () => {
  console.log("server running on 8000");
});
